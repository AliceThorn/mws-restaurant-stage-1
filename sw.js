var staticCache = 'restaurant-cache-v1';
var urlsToCache = [
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
    '/img/10.jpg'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        //open cache by name
        caches.open(staticCache).then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// As interpreted from: https://blog.sessionstack.com/how-javascript-works-service-workers-their-life-cycle-and-use-cases-52b19ad98b58

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            // Cache hit - return response
            return response || fetch(event.request);
        })
    );
});

/* As understood at: https://codeburst.io/an-introduction-to-service-workers-in-javascript-27d6376460c2
and https://css-tricks.com/serviceworker-for-offline/ */

self.addEventListener('activate', function(event) {

    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(key) {
                    return !key.startsWith('restaurant-');
                }))
            map(function(key) {
                return caches.delete(key);
            })
        })
        .then(function() {
            console.log('activation complete');
        })
    );
});
