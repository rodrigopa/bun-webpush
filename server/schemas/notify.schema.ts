import * as z from 'zod/v4-mini';

export const PushNotifyRequestBodySchema = z.object({
  title: z.string(),
  body: z.string(),
  icon: z.url(),
  image: z.optional(z.url()),
});

export type PushNotifyRequestBody = z.infer<typeof PushNotifyRequestBodySchema>;
