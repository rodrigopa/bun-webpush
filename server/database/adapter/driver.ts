import type { DatabaseConnection, Driver } from 'kysely';
import { SQL } from 'bun';
import { PostgresConnection } from './connection.ts';

export class BunPostgresDriver implements Driver {
  private readonly client: SQL;

  constructor(config: string | URL) {
    this.client = new SQL(config);
  }

  async init(): Promise<void> {
    await this.client.connect();
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    return new PostgresConnection(this.client);
  }

  async beginTransaction(connection: PostgresConnection): Promise<void> {
    await connection.beginTransaction();
  }

  async commitTransaction(connection: PostgresConnection): Promise<void> {
    await connection.commitTransaction();
  }

  async rollbackTransaction(connection: PostgresConnection): Promise<void> {
    await connection.rollbackTransaction();
  }

  async releaseConnection(): Promise<void> {}

  async destroy(): Promise<void> {}
}
