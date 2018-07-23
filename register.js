/* Register Service Worker
As seen on: https://codeburst.io/an-introduction-to-service-workers-in-javascript-27d6376460c2 */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://alicethorn.github.io/mws-restaurant-stage-1/sw.js').then(function(reg) {

    // Service worker registration done
    console.log('Service Worker registration Successful' + reg.scope);
  }).catch (function(err){
    // Service worker registration failed
    console.log('Service Worker registration Failed' + err);
  })
};
