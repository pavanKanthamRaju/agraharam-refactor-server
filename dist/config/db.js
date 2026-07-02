import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;
const isProduction = process.env.NODE_ENV === 'production';
const quoteIdentifier = (identifier) => `"${identifier.replace(/"/g, '""')}"`;
const getPoolConfig = () => {
    if (isProduction) {
        const connectionString = process.env.SUPABASE_DB_URL;
        if (!connectionString) {
            throw new Error('Missing SUPABASE_DB_URL for production database connection.');
        }
        return {
            connectionString,
            ssl: {
                rejectUnauthorized: false,
            },
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
        };
    }
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    if (!DB_HOST || !DB_USER || !DB_NAME) {
        throw new Error('Missing database configuration. Expected DB_HOST, DB_USER, and DB_NAME for local development.');
    }
    return {
        host: DB_HOST,
        port: DB_PORT ? Number(DB_PORT) : 5432,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
    };
};
const createPool = () => {
    const pool = new Pool(getPoolConfig());
    pool.on('error', (err) => {
        console.error('Unexpected PostgreSQL pool error:', err);
    });
    return pool;
};
let poolInstance = null;
const getPool = () => {
    if (!poolInstance) {
        poolInstance = createPool();
    }
    return poolInstance;
};
const createDbAdapter = () => {
    const pool = getPool();
    return {
        query: async (text, values = []) => {
            try {
                const result = await pool.query(text, values);
                return {
                    rows: result.rows,
                    rowCount: result.rowCount ?? result.rows.length,
                };
            }
            catch (error) {
                console.error('PostgreSQL query error:', error);
                throw error;
            }
        },
        native: pool,
        insert: async (table, data) => {
            const columns = Object.keys(data);
            const values = Object.values(data);
            const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
            const sql = `INSERT INTO ${quoteIdentifier(table)} (${columns.map(quoteIdentifier).join(', ')}) VALUES (${placeholders}) RETURNING *`;
            const result = await pool.query(sql, values);
            return result.rows[0];
        },
        update: async (table, id, data) => {
            const entries = Object.entries(data);
            const values = entries.map(([, value]) => value);
            const setClause = entries.map(([key, _], index) => `${quoteIdentifier(key)} = $${index + 1}`).join(', ');
            values.push(id);
            const sql = `UPDATE ${quoteIdentifier(table)} SET ${setClause} WHERE id = $${values.length} RETURNING *`;
            const result = await pool.query(sql, values);
            return result.rows[0];
        },
        delete: async (table, id) => {
            const sql = `DELETE FROM ${quoteIdentifier(table)} WHERE id = $1 RETURNING *`;
            const result = await pool.query(sql, [id]);
            return result.rows[0];
        },
        findItem: async (name) => {
            const sql = `SELECT * FROM items WHERE name = $1`;
            const result = await pool.query(sql, [name]);
            return result.rows[0];
        },
    };
};
export const pool = getPool();
export const db = createDbAdapter();
console.log(`Database Connection Strategy: ${isProduction ? 'Supabase PostgreSQL (Direct)' : 'Local PostgreSQL'}`);
export default db;
//# sourceMappingURL=db.js.map