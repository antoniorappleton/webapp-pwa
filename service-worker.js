self.addEventListener("install", (e) => {
  console.log("Service Worker instalado");
  e.waitUntil(
    caches.open("webapp-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/home.html",
        "/app.js",
        "/home.js",
        "/firebase-config.js",
        "/style.css",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
