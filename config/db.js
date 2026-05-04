import 'dotenv/config';
import pg from 'pg';
import { createClient } from '@supabase/supabase-js';

const { Pool } = pg;

const isProd = process.env.NODE_ENV === 'production';

/**
 * Supabase Adapter
 * Used in production environment.
 * Maps standard query calls to Supabase RPC (execute_sql) or standard client methods.
 */
const createSupabaseAdapter = () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("CRITICAL: Missing Supabase credentials in environment variables (SUPABASE_URL, SUPABASE_SERVICE_KEY).");
    }

    const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '', {
        auth: { persistSession: false }
    });

    // Helper to substitute $1, $2, etc. with actual values for RPC calls
    const substituteParams = (text, params) => {
        let finalQuery = text;
        params.forEach((param, index) => {
            const placeholder = new RegExp(`\\$${index + 1}(?!\\d)`, 'g');
            let value;
            if (param === null || param === undefined) {
                value = 'NULL';
            } else if (typeof param === 'string') {
                value = `'${param.replace(/'/g, "''")}'`;
            } else if (typeof param === 'boolean') {
                value = param ? 'TRUE' : 'FALSE';
            } else {
                value = param;
            }
            finalQuery = finalQuery.replace(placeholder, value);
        });
        return finalQuery;
    };

    return {
        query: async (text, values = []) => {
            const rawSql = substituteParams(text.trim(), values);
            const { data, error } = await supabase.rpc('execute_sql', { sql_query: rawSql });
            if (error) {
                console.error("Supabase SQL Error:", error);
                throw error;
            }
            return { rows: data || [], rowCount: (data || []).length };
        },
        native: supabase,
        insert: async (table, data) => {
            console.log(`[Supabase] Inserting into ${table}`);
            const { data: result, error } = await supabase.from(table).insert([data]).select().single();
            if (error) throw new Error(JSON.stringify(error));
            return result;
        },
        update: async (table, id, data) => {
            console.log(`[Supabase] Updating ${table} (ID: ${id})`);
            const { data: result, error } = await supabase.from(table).update(data).eq('id', id).select().single();
            if (error) throw new Error(JSON.stringify(error));
            return result;
        },
        delete: async (table, id) => {
            console.log(`[Supabase] Deleting from ${table} (ID: ${id})`);
            const { data: result, error } = await supabase.from(table).delete().eq('id', id).select();
            if (error) throw new Error(JSON.stringify(error));
            return result && result.length > 0 ? result[0] : null;
        },
        findItem: async (name) => {
            const { data, error } = await supabase.from('items').select('*').eq('name', name).single();
            if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'no rows'
            return data;
        }
    };
};

/**
 * Local PostgreSQL Adapter
 * Used in development environment.
 * Uses the 'pg' library to connect to a local database.
 */
const createPgAdapter = () => {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    return {
        query: async (text, values = []) => {
            try {
                const result = await pool.query(text, values);
                console.log("from adapter..", result)
                return { rows: result.rows, rowCount: result.rowCount };
            } catch (error) {
                console.error("Local Postgres Error:", error);
                throw error;
            }
        },
        native: pool,
        insert: async (table, data) => {
            console.log(`[Local PG] Inserting into ${table}`);
            const keys = Object.keys(data);
            const values = Object.values(data);
            const columns = keys.join(', ');
            const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
            const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
            const result = await pool.query(sql, values);
            return result.rows[0];
        },
        update: async (table, id, data) => {
            console.log(`[Local PG] Updating ${table} (ID: ${id})`);
            const keys = Object.keys(data);
            const values = Object.values(data);
            const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
            values.push(id);
            const sql = `UPDATE ${table} SET ${setClause} WHERE id = $${values.length} RETURNING *`;
            const result = await pool.query(sql, values);
            return result.rows[0];
        },
        delete: async (table, id) => {
            console.log(`[Local PG] Deleting from ${table} (ID: ${id})`);
            const sql = `DELETE FROM ${table} WHERE id = $1 RETURNING *`;
            const result = await pool.query(sql, [id]);
            return result.rows[0];
        },
        findItem: async (name) => {

            const sql = `SELECT * FROM items WHERE name = $1`;
            const result = await pool.query(sql, [name]);
            return result.rows[0];
        }
    };
};

// Select the adapter based on environment
const db = isProd ? createSupabaseAdapter() : createPgAdapter();

console.log(`Database Connection Strategy: ${isProd ? "Supabase (PROD)" : "Local Postgres (DEV)"}`);

export default db;
