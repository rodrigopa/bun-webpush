# wpush

### Web push notifications server and client

Use a VAPID keys to manage your subscribers and send push notifications to them.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run server
```

or 

```bash
bun run server/cluster.ts
```

Build the client side

```bash
bun run client:build
```

and serve the files inside client/dist