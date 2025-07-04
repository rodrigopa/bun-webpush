import { Kysely } from 'kysely';
import type { Database } from './types.ts';
import { PostgresDialect } from './adapter/dialect.ts';
import { POSTGRES_CONNECTION_STRING } from '../constants.ts';

export const database = new Kysely<Database>({
  dialect: new PostgresDialect(POSTGRES_CONNECTION_STRING),
});
