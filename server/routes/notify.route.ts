import { PushNotifyRequestBodySchema } from '../schemas/notify.schema';
import { sendPushNotification } from '../services/notify.service';
import type { RouterTypes } from 'bun';
import { z } from 'zod/v4-mini';

export const notifyRoute: RouterTypes.RouteHandler<'/push/notify'> = async (
  req,
) => {
  try {
    const data = PushNotifyRequestBodySchema.parse(
      Object.fromEntries(new URL(req.url).searchParams),
    );

    const results = await sendPushNotification(data);

    return Response.json({ status: 'success', results });
  } catch (e) {
    if (e instanceof z.core.$ZodError) {
      return Response.json(
        { status: 'fail', errors: z.core.flattenError(e).fieldErrors },
        { status: 400 },
      );
    }

    return Response.json(
      {
        status: 'fail',
        error: e instanceof Error ? e.message : 'Internal server error',
      },
      { status: e instanceof Error ? 400 : 500 },
    );
  }
};
