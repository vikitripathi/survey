var CACHE_STATIC_NAME = 'static-v7';
var CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);

  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');

        //send request to server and then download it to cache
        cache.addAll([
          '/',
          '/index.html',
          '/js/app.js',
          '/js/promise.js',
          '/js/fetch.js',
          '/js/form.js',
          '/css/survey.css',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css',
          'https://formden.com/static/cdn/font-awesome/4.4.0/css/font-awesome.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/10.0.2/css/bootstrap-slider.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.42/css/uikit.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.0/css/bootstrap-select.min.css',
          'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
          'https://unpkg.com/popper.js@1.14.3/dist/umd/popper.min.js',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.0/js/bootstrap-select.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-slider/10.0.2/bootstrap-slider.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.42/js/uikit.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.42/js/uikit-icons.min.js'          
        ]);
      })
  )
});

//clean old cache here when new cache version is installed 
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);

  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        //return from function when all removed
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );

  return self.clients.claim();
});

//Fetch Listener
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  //Put doenst make any request to server
                  cache.put(event.request.url, res.clone()); //responses consumed only once
                  return res;
                })
            })
            .catch(function(err){

            });
        }
      })
  );

});
