self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-site-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/js/dbhelper.js',
        '/js/main.js',
        '/register.js',
        '/js/restaurant_info.js',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
      ]).catch(error => {console.log(error);
      })
    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['my-site-cache-v2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
          }
        })
      );
    })
  );
});
/* As seen at: https://codeburst.io/an-introduction-to-service-workers-in-javascript-27d6376460c2 */

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
        })
      );
    });
