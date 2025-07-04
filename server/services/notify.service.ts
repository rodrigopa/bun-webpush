import webPush from 'web-push';
import type { PushNotifyRequestBody } from '../schemas/notify.schema';
import { database } from '../database';
import { uuidFromString } from '../utils';

export async function sendPushNotification(data: PushNotifyRequestBody) {
  const subscriptions = await database
    .selectFrom('subscribers')
    .select(['subscription'])
    .execute();

  const results = await Promise.allSettled(
    subscriptions.map(({ subscription }) =>
      webPush.sendNotification(subscription, JSON.stringify(data), {
        vapidDetails: {
          subject: process.env.VAPID_SUBJECT,
          publicKey: process.env.VAPID_PUBLIC_KEY,
          privateKey: process.env.VAPID_PRIVATE_KEY,
        },
      }),
    ),
  );

  const uuidsToDelete = results
    .filter((result) => result.status === 'rejected')
    .map((result) => uuidFromString(result.reason.endpoint));

  await database
    .deleteFrom('subscribers')
    .where('uuid', 'in', uuidsToDelete)
    .execute();

  return results;
}
