import 'dotenv/config';
import { QueryResult } from '../types/index.js';
interface DbAdapter {
    query: (text: string, values?: any[]) => Promise<QueryResult<any>>;
    native: any;
    insert: (table: string, data: Record<string, any>) => Promise<any>;
    update: (table: string, id: string, data: Record<string, any>) => Promise<any>;
    delete: (table: string, id: string) => Promise<any>;
    findItem: (name: string) => Promise<any>;
}
declare const db: DbAdapter;
export default db;
//# sourceMappingURL=db.d.ts.map