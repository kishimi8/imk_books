import { DatabaseError, NotImplemented } from 'fyo/utils/errors';
import { SchemaMap } from 'schemas/types';
import { DatabaseDemuxBase, DatabaseMethod } from 'utils/db/types';
import { BackendResponse } from 'utils/ipc/types';
import { MobileSqlite } from './mobileSqlite';

export class DatabaseDemux extends DatabaseDemuxBase {
  #isElectron = false;
  #isMobile = false;
  #mobileSqlite: MobileSqlite | null = null;

  constructor(isElectron: boolean, isMobile = false) {
    super();
    this.#isElectron = isElectron;
    this.#isMobile = isMobile;
    if (isMobile) {
      this.#mobileSqlite = new MobileSqlite();
    }
  }

  async #handleDBCall(func: () => Promise<BackendResponse>): Promise<unknown> {
    const response = await func();

    if (response.error?.name) {
      const { name, message, stack } = response.error;
      const dberror = new DatabaseError(`${name}\n${message}`);
      dberror.stack = stack;

      throw dberror;
    }

    return response.data;
  }

  async getSchemaMap(): Promise<SchemaMap> {
    if (this.#isMobile) {
      return this.#mobileSqlite!.getSchemaMap();
    }

    return (await this.#handleDBCall(async () => {
      return await ipc.db.getSchema();
    })) as SchemaMap;
  }

  async createNewDatabase(
    dbPath: string,
    countryCode?: string
  ): Promise<string> {
    if (this.#isMobile) {
      // In mobile, dbPath might be just a filename
      await this.#mobileSqlite!.connect(dbPath);
      return countryCode ?? 'in'; // Simplified
    }

    return (await this.#handleDBCall(async () => {
      return ipc.db.create(dbPath, countryCode);
    })) as string;
  }

  async connectToDatabase(
    dbPath: string,
    countryCode?: string
  ): Promise<string> {
    if (this.#isMobile) {
      await this.#mobileSqlite!.connect(dbPath);
      return countryCode ?? 'in'; // Simplified
    }

    return (await this.#handleDBCall(async () => {
      return ipc.db.connect(dbPath, countryCode);
    })) as string;
  }

  async call(method: DatabaseMethod, ...args: unknown[]): Promise<unknown> {
    if (this.#isMobile) {
      return this.#mobileSqlite!.call(method, ...args);
    }

    return await this.#handleDBCall(async () => {
      return await ipc.db.call(method, ...args);
    });
  }

  async callBespoke(method: string, ...args: unknown[]): Promise<unknown> {
    if (this.#isMobile) {
      // Placeholder for bespoke queries on mobile
      throw new NotImplemented(`Bespoke method ${method} not implemented on mobile`);
    }

    return await this.#handleDBCall(async () => {
      return await ipc.db.bespoke(method, ...args);
    });
  }
}
