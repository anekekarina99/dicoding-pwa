importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: "/", revision: "1" },
    { url:  "/js/riwayat.js", revision: "1"},
    { url:  "/manifest.json", revision: "1"},
    { url:  "/nav.html", revision: "1"},
    { url: "/index.html", revision: "1"},
    { url: "/riwayat_tim2.html", revision: "1"},
    { url: "/riwayat_tim1.html", revision: "1"},
    { url: "/riwayat_tim.html", revision: "1"},
    { url: "/pages/beranda.html", revision: "1"},
    { url: "/pages/lanjut2.html", revision: "1"},
    { url: "/pages/lanjut.html", revision: "1"},
    { url: "/pages/riwayat.html", revision: "1"},
    { url: "/css/materialize.min.css", revision: "1"},
    { url: "/js/app.js", revision: "1"},
    { url: "/js/database.js", revision: "1"},
    { url: "/js/helper.js", revision: "1"},
    { url: "/js/idb.js", revision: "1"},
    { url: "/push.js", revision: "1"},
    {url : "/images/maskable_icon.png",revision : "1"},
    { url: "/js/materialize.js", revision: "1"},
    { url: "/js/materialize.min.js", revision: "1"},
    { url: "/js/script.js", revision: "1"},
    { url: "/js/nav-effect.js", revision: "1"},
    { url: "/images/icons/icon-144x144.png", revision: "1"},
    { url: "/images/icons/icon-72x72.png", revision: "1"},
    { url: "/images/icons/icon-96x96.png", revision: "1"},
    { url: "/images/icons/icon-192x192.png", revision: "1"},
    { url: "/images/icons/icon-512x512.png", revision: "1"},
    { url: "/images/ball.jpg", revision: "1"},
    { url: "/images/bell.png", revision: "1"},
    { url: "https://code.jquery.com/jquery-2.1.1.min.js", revision: "1"},
    { url: "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Quicksand:wght@700&display=swap", revision: "1"},
    { url: "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js", revision: "1"},
    { url: "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.3/js/materialize.min.js", revision: "1"},
    { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1"},
    { url: "https://fonts.gstatic.com/s/quicksand/v21/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkBgv58a-wg.woff2", revision: "1"},
    { url: "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision: "1"},
],{
    ignoreUrlParametersMatching: [/.*/]
});
//CSS
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );


// file font gstatic
workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 350,
          maxEntries: 60,
        }),
      ],
    })
  );

//Images
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 365 * 24 * 60 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.stateWhileRevalidate({
        cacheName : "pages"
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)



self.addEventListener("push", function(event) {
    var body;
    
    if (event.data) {
        body = event.data.text();
    } else {
        body = "Push message no payload";
    }

    var options = {
        body: body,
        icon: " /images/bell.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification("Notifikasi Push", options)
    );
});