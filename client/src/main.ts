import { urlBase64ToUint8Array } from './utils';
import Bowser from 'bowser';

(async function wpushMain() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service worker is not supported');
  }

  if (!process.env.VAPID_PUBLIC_KEY) {
    throw new Error('VAPID public key is not defined');
  }

  let registration: ServiceWorkerRegistration;
  let subscription: PushSubscription;

  try {
    registration = await navigator.serviceWorker.register('/sw.js');
  } catch {
    console.error('Service worker registration failed');
    return;
  }

  try {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(process.env.VAPID_PUBLIC_KEY),
    });
  } catch {
    console.error('Push subscription failed');
    return;
  }

  try {
    const result = await fetch('http://localhost:3001/push/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        subscription,
        browser: Bowser.parse(window.navigator.userAgent),
      }),
    }).then((res) => res.json());

    console.log(
      `⚡️Push subscription successful! Your UUID is: ${result.uuid}.`,
    );
  } catch {
    console.error('Sync push device with server failed');
  }
})();
