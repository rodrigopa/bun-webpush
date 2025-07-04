import {
  type DatabaseIntrospector,
  type Dialect,
  type Driver,
  type Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
  type QueryCompiler,
} from 'kysely';
import { BunPostgresDriver } from './driver.ts';

export class PostgresDialect implements Dialect {
  constructor(private readonly connectionString: string | URL) {}

  createAdapter() {
    return new PostgresAdapter();
  }

  createDriver(): Driver {
    return new BunPostgresDriver(this.connectionString);
  }

  createQueryCompiler(): QueryCompiler {
    return new PostgresQueryCompiler();
  }

  createIntrospector(db: Kysely<unknown>): DatabaseIntrospector {
    return new PostgresIntrospector(db);
  }
}
