// Self-destructing service worker - clears old caches and unregisters
self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      return self.registration.unregister();
    }).then(function() {
      return clients.matchAll().then(function(clients) {
        clients.forEach(function(client) { client.navigate(client.url); });
      });
    })
  );
});
