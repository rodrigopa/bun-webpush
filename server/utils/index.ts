import getUuidByString from 'uuid-by-string';
import type { UUID } from '../database/types.ts';

export function uuidFromString(value: string): UUID {
  return getUuidByString(value) as UUID;
}
