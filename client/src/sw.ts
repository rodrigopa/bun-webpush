declare var self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const { title, body, icon, image = undefined } = event.data.json();

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      actions: [
        {
          action: 'archive',
          title: 'Archive',
        },
        { action: 'archive2', title: 'Archive2' },
      ],
      ...(!!image ? { image } : {}),
    } as any),
  );
});
