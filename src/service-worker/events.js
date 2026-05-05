import {
  coreAssets,
  DEBUG,
  IMAGE_CACHE,
  PRECACHE,
  RUNTIME,
} from "./config.js";
import { getFetchRoute } from "./route.js";
import {
  cacheFirstWithLimitAndTTL,
  cacheThenNetworkWithTTL,
  handleNavigation,
  precacheWithTTL,
  staleWhileRevalidateWithTTL,
} from "./strategies.js";

// ---------- Install: precache with TTL ----------
self.addEventListener("install", (event) => {
  if (DEBUG) console.log("[sw] install");
  event.waitUntil(
    (async () => {
      try {
        await precacheWithTTL(coreAssets, PRECACHE);
      } catch (e) {
        if (DEBUG) console.warn("[sw] precacheWithTTL failed:", e);
        const cache = await caches.open(PRECACHE);
        try {
          await cache.addAll(coreAssets);
        } catch (e2) {
          if (DEBUG) console.warn("[sw] addAll fallback failed:", e2);
          for (const asset of coreAssets) {
            try {
              await cache.add(asset);
            } catch (err) {
              if (DEBUG) console.warn("[sw] cache.add failed:", asset, err);
            }
          }
        }
      }
    })(),
  );
});

// ---------- Activate: cleanup & claim ----------
self.addEventListener("activate", (event) => {
  if (DEBUG) console.log("[sw] activate");
  event.waitUntil(
    (async () => {
      const allow = new Set([PRECACHE, RUNTIME, IMAGE_CACHE]);
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => !allow.has(k)).map((k) => caches.delete(k)));

      if ("navigationPreload" in self.registration) {
        try {
          await self.registration.navigationPreload.enable();
        } catch (e) {
          if (DEBUG) console.warn("[sw] navigationPreload enable failed:", e);
        }
      }
      await self.clients.claim();
    })(),
  );
});

// ---------- Fetch routing ----------
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const route = getFetchRoute(request, self.location.origin);
  if (route === "none") return;

  if (route === "navigate") {
    event.respondWith(handleNavigation(event));
    return;
  }

  if (route === "cssjs") {
    event.respondWith(staleWhileRevalidateWithTTL(request, RUNTIME, event));
    return;
  }

  if (route === "image") {
    event.respondWith(cacheFirstWithLimitAndTTL(request, IMAGE_CACHE, 150));
    return;
  }

  event.respondWith(cacheThenNetworkWithTTL(request, RUNTIME));
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
