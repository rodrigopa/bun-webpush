import type { CompiledQuery, DatabaseConnection, QueryResult } from 'kysely';
import type { SQL } from 'bun';

export class PostgresConnection implements DatabaseConnection {
  constructor(private readonly client: SQL) {}

  async executeQuery<R>(compiledQuery: CompiledQuery): Promise<QueryResult<R>> {
    const rows = await this.client.unsafe(
      compiledQuery.sql,
      compiledQuery.parameters.map((param) =>
        typeof param === 'object'
          ? param
          : `${param}`
              .replace(/'/g, "''") // Escape single quotes
              .replace(/\\/g, '\\\\') // Escape backslashes
              .replace(/;/g, ''),
      ),
    );

    return {
      rows: rows as R[],
    };
  }

  streamQuery<R>(): AsyncIterableIterator<QueryResult<R>> {
    throw new Error('Method not implemented.');
  }

  async beginTransaction(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async commitTransaction(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async rollbackTransaction(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
