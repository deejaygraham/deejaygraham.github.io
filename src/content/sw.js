// service worker code for site
// based on the example https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

// change v1 to allow upgrade
const version = "v1";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(version);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(version);
  await cache.put(request, response);
};

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const cacheKeepList = [version];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("install", (event) => {
  console.log("WORKER: install");
  event.waitUntil(
    addResourcesToCache([
      "/",
      "/index.html",
      "/css/site.css",
      "/css/prism.css",
    ]),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    console.log('SW', `Ignore cache request for ${event.request}`);
    return;
  }

  console.log("WORKER: fetch");
  event.respondWith(
    caches.match(event.request).then(function (cached) {

      if (cached) {
        console.log('SW', `Cache response to ${event.request}`);
      }
      
      /* Even if the response is in our cache, we go to the network as well.
           This pattern is known for producing "eventually fresh" responses,
           where we return cached responses immediately, and meanwhile pull
           a network response and store that in the cache.
           Read more:
           https://ponyfoo.com/articles/progressive-networking-serviceworker
        */
      let networked = fetch(event.request)
        .then(fetchedFromNetwork, unableToResolve)
        .catch(unableToResolve);

      /* We return the cached response immediately if there is one, and fall
           back to waiting on the network as usual.
        */
      return cached || networked;

      function fetchedFromNetwork(response) {
        console.log('SW', `Network response to ${event.request}`);
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
