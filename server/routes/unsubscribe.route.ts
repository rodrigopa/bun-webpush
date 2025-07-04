import type { RouterTypes } from 'bun';
import { database } from '../database';
import { uuidFromString } from '../utils';

export const unsubscribeRoute: RouterTypes.RouteHandler<
  '/push/unsubscribe'
> = async (req) => {
  const { endpoint } = await req.json();

  const uuid = uuidFromString(endpoint);

  await database.deleteFrom('subscribers').where('uuid', '=', uuid).execute();

  return Response.json(
    { status: 'success' },
    {
      status: 202,
    },
  );
};
