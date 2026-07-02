import 'dotenv/config';
import pg from 'pg';
import type { QueryResult } from '../types/index.js';
interface DbAdapter {
    query: (text: string, values?: unknown[]) => Promise<QueryResult<any>>;
    native: pg.Pool;
    insert: (table: string, data: Record<string, any>) => Promise<any>;
    update: (table: string, id: string, data: Record<string, any>) => Promise<any>;
    delete: (table: string, id: string) => Promise<any>;
    findItem: (name: string) => Promise<any>;
}
export declare const pool: pg.Pool;
export declare const db: DbAdapter;
export default db;
//# sourceMappingURL=db.d.ts.map