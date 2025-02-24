// service worker code for site
// based on the example https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// some ideas from https://github.com/bnijenhuis/bnijenhuis-nl

// change version to allow upgrade
const version = "v1.3";

const coreAssets = [
      "/",
      "/index.html",
      "/css/site.css",
      "/css/prism.css",
      "/favicon.ico",
      "/img/avatar.svg",
      "/offline.html"
];

// install this version of the service worker 
// and cache the core assets we need for basic 
// site functioning
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(version).then(cache => {
          cache.addAll(coreAssets)
    })
  );
});

// activate this worker - clean up any old 
// versions of our cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
                        .filter(key => key !== version)
                        .map(key => caches.delete(key))
                        )
        })
  );
});

const putInCache = async (request, response) => {
  const cache = await caches.open(version);
  await cache.put(request, response);
};

// every requests passes through this fetch method.
self.addEventListener("fetch", (event) => {
  // ignore anything that's not a GET
  if (event.request.method !== "GET") {
    return;
  }
  
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      
      /* Even if the response is in our cache, we go to the network as well.
           This pattern is known for producing "eventually fresh" responses,
           where we return cached responses immediately, and meanwhile pull
           a network response and store that in the cache.
           Read more:
           https://ponyfoo.com/articles/progressive-networking-serviceworker
        */
      const networked = fetch(event.request)
        .then(fetchedFromNetwork, unableToResolve)
        .catch(unableToResolve);

      /* We return the cached response immediately if there is one, and fall
           back to waiting on the network as usual.
        */
      return cached || networked;

      function fetchedFromNetwork(response) {
        putInCache(event.request, response.clone());
        return response;
      }

      /* When this method is called, it means we were unable to produce a response
           from either the cache or the network. This is our opportunity to produce
           a meaningful response even when all else fails. It's the last chance, so
           you probably want to display a "Service Unavailable" view or a generic
           error response.
        */
      function unableToResolve() {
        /* There's a couple of things we can do here.
             - Test the Accept header and then return one of the `offlineFundamentals`
               e.g: `return caches.match('/some/cached/image.png')`
             - You should also consider the origin. It's easier to decide what
               "unavailable" means for requests against your origins than for requests
               against a third party, such as an ad provider
             - Generate a Response programmaticaly, as shown below, and return that
          */

         
        /* Here we're creating a response programmatically. The first parameter is the
             response body, and the second one defines the options for the response.
          */
        return new Response("<h1>Service Unavailable</h1>", {
          status: 503,
          statusText: "Service Unavailable",
          headers: new Headers({
            "Content-Type": "text/html",
          }),
        });
      }
    }),
  );
});
