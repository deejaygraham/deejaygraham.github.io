import {
  CACHING_DURATION,
  CACHE_EXPIRY_HEADER,
  DEBUG,
  notFoundPage,
  offlinePage,
} from "./config.js";
import { isCacheResponseStillValid, putWithExpiry } from "./ttl.js";

// ---------- Navigation handler ----------
export async function handleNavigation(event) {
  try {
    const preload = await event.preloadResponse;
    if (preload && preload.ok) return preload;

    const net = await fetch(event.request, { cache: "no-store" });
    if (net.ok) return net;

    if (net.status === 404) {
      const nf = await caches.match(notFoundPage);
      if (nf) return nf;
    }
    return net;
  } catch (e) {
    if (DEBUG) console.warn("[sw] handleNavigation failed:", e);
    const off = await caches.match(offlinePage);
    if (off) return off;
    const cached = await caches.match(event.request);
    return cached || new Response("Offline", { status: 503, statusText: "Service Unavailable" });
  }
}

// ---------- Strategies with TTL header ----------
export async function cacheThenNetworkWithTTL(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached && isCacheResponseStillValid(cached, CACHE_EXPIRY_HEADER, Date.now(), DEBUG))
    return cached;

  try {
    const res = await fetch(request);
    if (res && res.ok)
      await putWithExpiry(cache, request, res, {
        cachingDurationSeconds: CACHING_DURATION,
        expiryHeaderName: CACHE_EXPIRY_HEADER,
        debug: DEBUG,
        now: Date.now,
      });
    return cached || res;
  } catch {
    return cached || new Response("", { status: 504, statusText: "Gateway Timeout" });
  }
}

export async function staleWhileRevalidateWithTTL(request, cacheName, event) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached && isCacheResponseStillValid(cached, CACHE_EXPIRY_HEADER, Date.now(), DEBUG)) {
    if (event) event.waitUntil(eventlessUpdate(cache, request));
    return cached;
  }
  try {
    const res = await fetch(request);
    if (res && res.ok)
      await putWithExpiry(cache, request, res, {
        cachingDurationSeconds: CACHING_DURATION,
        expiryHeaderName: CACHE_EXPIRY_HEADER,
        debug: DEBUG,
        now: Date.now,
      });
    return cached || res;
  } catch {
    return cached || new Response("", { status: 504, statusText: "Gateway Timeout" });
  }
}

export async function cacheFirstWithLimitAndTTL(request, cacheName, maxEntries = 100) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached && isCacheResponseStillValid(cached, CACHE_EXPIRY_HEADER, Date.now(), DEBUG))
    return cached;

  try {
    const res = await fetch(request);
    if (res && res.ok) {
      await putWithExpiry(cache, request, res, {
        cachingDurationSeconds: CACHING_DURATION,
        expiryHeaderName: CACHE_EXPIRY_HEADER,
        debug: DEBUG,
        now: Date.now,
      });
      const keys = await cache.keys();
      if (keys.length > maxEntries) {
        await cache.delete(keys[0]);
      }
    }
    return cached || res;
  } catch {
    return cached || new Response("", { status: 504, statusText: "Gateway Timeout" });
  }
}

async function eventlessUpdate(cache, request) {
  try {
    const res = await fetch(request, { cache: "no-store" });
    if (res && res.ok)
      await putWithExpiry(cache, request, res, {
        cachingDurationSeconds: CACHING_DURATION,
        expiryHeaderName: CACHE_EXPIRY_HEADER,
        debug: DEBUG,
        now: Date.now,
      });
  } catch (e) {
    if (DEBUG) console.warn("[sw] eventlessUpdate failed:", e);
  }
}

export async function precacheWithTTL(urls, cacheName) {
  const cache = await caches.open(cacheName);
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res && res.ok) {
        await putWithExpiry(cache, new Request(url), res, {
          cachingDurationSeconds: CACHING_DURATION,
          expiryHeaderName: CACHE_EXPIRY_HEADER,
          debug: DEBUG,
          now: Date.now,
        });
        if (DEBUG) console.log("[sw] precached with expiry:", url);
      }
    } catch (e) {
      if (DEBUG) console.warn("[sw] precache failed:", url, e);
    }
  }
}
