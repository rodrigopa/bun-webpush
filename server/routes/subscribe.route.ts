import type { RouterTypes } from 'bun';
import { database } from '../database';
import { CORS_HEADERS } from '../constants.ts';
import { uuidFromString } from '../utils';

export const subscribeRoute: RouterTypes.RouteHandler<
  '/push/subscribe'
> = async (req, server) => {
  const { subscription, browser } = await req.json();
  const subscriberIp = server.requestIP(req);

  const ipAddress = '8.8.8.8'; //subscriberIp?.address;

  const location = subscriberIp
    ? await fetch(`http://localhost:8080/location/${ipAddress}`).then((res) =>
        res.json(),
      )
    : {};

  const uuid = uuidFromString(subscription.endpoint);

  const existingSubscriber = await database
    .selectFrom('subscribers')
    .select(['uuid'])
    .where('uuid', '=', uuid)
    .executeTakeFirst();

  if (!existingSubscriber) {
    await database
      .insertInto('subscribers')
      .values({
        uuid,
        subscription,
        browser,
        location,
        createdat: new Date().toISOString(),
        updatedat: new Date().toISOString(),
      })
      .execute();

    return Response.json(
      { status: 'success', uuid },
      {
        status: 201,
        headers: CORS_HEADERS,
      },
    );
  }

  await database
    .updateTable('subscribers')
    .set({
      location,
      browser,
      updatedat: new Date().toISOString(),
    })
    .execute();

  return Response.json(
    { status: 'success', uuid },
    {
      status: 202,
      headers: CORS_HEADERS,
    },
  );
};
