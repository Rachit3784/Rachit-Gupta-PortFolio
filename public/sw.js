// public/sw.js - Service Worker for Background Call Notifications & Web Push
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: '📹 Incoming Video Call', body: event.data ? event.data.text() : 'You have an incoming call' };
  }

  const title = data.title || '📹 Incoming WebRTC Video Call';
  const options = {
    body: data.body || 'Super Admin is calling you on WebRTC Video Call...',
    icon: '/Profile.jpg',
    badge: '/Profile.jpg',
    vibrate: [400, 200, 400, 200, 400],
    tag: 'incoming-call',
    renotify: true,
    requireInteraction: true,
    data: { url: data.url || '/contact' },
    actions: [
      { action: 'answer', title: '📞 Answer Call' },
      { action: 'decline', title: '❌ Decline' }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || '/contact';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/contact') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
