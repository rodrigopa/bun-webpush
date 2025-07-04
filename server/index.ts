import { notifyRoute } from './routes/notify.route.ts';
import { subscribeRoute } from './routes/subscribe.route.ts';
import { unsubscribeRoute } from './routes/unsubscribe.route.ts';
import { SERVER_PORT } from './constants.ts';

Bun.serve({
  port: SERVER_PORT,
  reusePort: true,
  routes: {
    '/push/subscribe': {
      POST: subscribeRoute,
    },
    '/push/unsubscribe': {
      POST: unsubscribeRoute,
    },
    '/push/notify': {
      GET: notifyRoute,
    },
  },

  fetch: () =>
    Response.json(
      { status: 'fail', message: 'Page not found.' },
      { status: 404 },
    ),
});
