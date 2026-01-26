import { SchemaMap } from 'schemas/types';
import { DatabaseMethod, QueryFilter } from 'utils/db/types';
import { DatabaseError, NotImplemented } from 'fyo/utils/errors';

export class MobileSqlite {
    sqlite: any;
    db: any = null;
    schemaMap: SchemaMap = {};

    constructor() {
        try {
            const { SQLiteConnection, CapacitorSQLite } = require('@capacitor-community/sqlite');
            this.sqlite = new SQLiteConnection(CapacitorSQLite);
        } catch {
            // Fallback
        }
    }

    async setSchemaMap(schemaMap: SchemaMap) {
        this.schemaMap = schemaMap;
    }

    async connect(dbName: string) {
        if (!this.sqlite) throw new DatabaseError("SQLite not initialized");
        try {
            this.db = await this.sqlite.createConnection(dbName, false, "no-encryption", 1, false);
            await this.db.open();
        } catch (err) {
            throw new DatabaseError(`Failed to connect to SQLite: ${(err as Error).message}`);
        }
    }

    async getSchemaMap(): Promise<SchemaMap> {
        const { getSchemas } = await import('schemas/index');
        // We can't easily get custom fields without a DB connection, 
        // but for initial SCHEMA loading, this might suffice.
        return getSchemas('-', []);
    }

    async call(method: DatabaseMethod, ...args: unknown[]): Promise<unknown> {
        if (!this.db) throw new DatabaseError("Database not connected");

        switch (method) {
            case 'get':
                return this.get(args[0] as string, args[1] as string, args[2] as string | string[]);
            case 'getAll':
                return this.getAll(args[0] as string, args[1] as any);
            case 'insert':
                return this.insert(args[0] as string, args[1] as any);
            case 'update':
                return this.update(args[0] as string, args[1] as any);
            case 'delete':
                return this.delete(args[0] as string, args[1] as string);
            case 'exists':
                return this.exists(args[0] as string, args[1] as string);
            case 'close':
                return this.close();
            default:
                throw new NotImplemented(`Method ${method} not implemented on mobile`);
        }
    }

    async get(schemaName: string, name: string, fields?: string | string[]): Promise<any> {
        // Simple implementation
        const sql = `SELECT * FROM "${schemaName}" WHERE name = ?`;
        const res = await this.db!.query(sql, [name]);
        return res.values?.[0];
    }

    async getAll(schemaName: string, options: any = {}): Promise<any[]> {
        const sql = `SELECT * FROM "${schemaName}"`;
        const res = await this.db!.query(sql);
        return res.values ?? [];
    }

    async insert(schemaName: string, fieldValueMap: any): Promise<any> {
        const keys = Object.keys(fieldValueMap);
        const placeholders = keys.map(() => '?').join(', ');
        const sql = `INSERT INTO "${schemaName}" (${keys.join(', ')}) VALUES (${placeholders})`;
        await this.db!.run(sql, Object.values(fieldValueMap));
        return fieldValueMap;
    }

    async update(schemaName: string, fieldValueMap: any): Promise<void> {
        const { name, ...rest } = fieldValueMap;
        const keys = Object.keys(rest);
        const setClause = keys.map(k => `${k} = ?`).join(', ');
        const sql = `UPDATE "${schemaName}" SET ${setClause} WHERE name = ?`;
        await this.db!.run(sql, [...Object.values(rest), name]);
    }

    async delete(schemaName: string, name: string): Promise<void> {
        const sql = `DELETE FROM "${schemaName}" WHERE name = ?`;
        await this.db!.run(sql, [name]);
    }

    async exists(schemaName: string, name?: string): Promise<boolean> {
        const sql = `SELECT count(*) as count FROM "${schemaName}" WHERE name = ?`;
        const res = await this.db!.query(sql, [name]);
        return (res.values?.[0]?.count ?? 0) > 0;
    }

    async close() {
        if (this.db) {
            await this.sqlite.closeConnection(this.db.getConnectionDBName(), false);
            this.db = null;
        }
    }
}
