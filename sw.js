/* Network Handling
As understood from: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
and
https://blog.sessionstack.com/how-javascript-works-service-workers-their-life-cycle-and-use-cases-52b19ad98b58 */
var App_cache = 'application-cache';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(App_cache).then(function(cache) {
      console.log('cache opened');
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
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheName = ['pg-1, pg-2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheName.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

/* Network Handling
As seen at: https://codeburst.io/an-introduction-to-service-workers-in-javascript-27d6376460c2 */

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // if Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
