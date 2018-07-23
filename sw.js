var staticCache = `restaurant-cache-v1`;
var urlsToCache = [
    'https://alicethorn.github.io/mws-restaurant-stage-1/',
    'https://alicethorn.github.io/mws-restaurant-stage-1/index.html',
    'https://alicethorn.github.io/mws-restaurant-stage-1/restaurant.html',
    'https://alicethorn.github.io/mws-restaurant-stage-1/css/styles.css',
    'https://alicethorn.github.io/mws-restaurant-stage-1/data/restaurants.json',
    'https://alicethorn.github.io/mws-restaurant-stage-1/js/dbhelper.js',
    'https://alicethorn.github.io/mws-restaurant-stage-1/js/main.js',
    'https://alicethorn.github.io/mws-restaurant-stage-1/register.js',
    'https://alicethorn.github.io/mws-restaurant-stage-1/js/restaurant_info.js',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/1.jpg',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/2.jpg',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/3.jpg',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/4.jpg',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/5.jpg',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/6.jpg',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/7.jpg',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/8.jpg',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/9.jpg',
    'https://alicethorn.github.io/mws-restaurant-stage-1/img/10.jpg'
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
                    return !key.startsWith(`restaurant-`);
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
