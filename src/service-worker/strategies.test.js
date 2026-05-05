import test from "ava";
import {
  cacheFirstWithLimitAndTTL,
  cacheThenNetworkWithTTL,
  handleNavigation,
  precacheWithTTL,
  staleWhileRevalidateWithTTL,
} from "./strategies.js";

const HEADER = "SW-Cache-Expires";

function keyOf(request) {
  if (typeof request === "string") return request;
  return request.url;
}

function makeCache() {
  const store = new Map();
  const deleted = [];

  return {
    store,
    deleted,
    async match(request) {
      return store.get(keyOf(request));
    },
    async put(request, response) {
      store.set(keyOf(request), response);
    },
    async keys() {
      return [...store.keys()].map((url) => new Request(url));
    },
    async delete(request) {
      deleted.push(keyOf(request));
      return store.delete(keyOf(request));
    },
  };
}

function installGlobals(t, { cache, fetchImpl, matchImpl }) {
  const originalFetch = globalThis.fetch;
  const originalCaches = globalThis.caches;
  const originalWarn = console.warn;
  const originalLog = console.log;

  globalThis.fetch = fetchImpl;
  globalThis.caches = {
    async open() {
      return cache;
    },
    async match(request) {
      if (matchImpl) return matchImpl(request);
      return undefined;
    },
  };
  console.warn = () => {};
  console.log = () => {};

  t.teardown(() => {
    globalThis.fetch = originalFetch;
    globalThis.caches = originalCaches;
    console.warn = originalWarn;
    console.log = originalLog;
  });
}

test.serial("handleNavigation returns preload response when available", async (t) => {
  const preload = new Response("from-preload", { status: 200 });
  const fetchCalls = [];
  const cache = makeCache();

  installGlobals(t, {
    cache,
    fetchImpl: async (...args) => {
      fetchCalls.push(args);
      return new Response("net", { status: 200 });
    },
  });

  const out = await handleNavigation({
    request: new Request("https://example.com/post"),
    preloadResponse: Promise.resolve(preload),
  });

  t.is(await out.text(), "from-preload");
  t.is(fetchCalls.length, 0);
});

test.serial("handleNavigation serves 404 page from cache on navigation 404", async (t) => {
  const notFound = new Response("not-found-page", { status: 200 });
  const cache = makeCache();

  installGlobals(t, {
    cache,
    fetchImpl: async () => new Response("missing", { status: 404 }),
    matchImpl: async (request) => {
      if (request === "/404.html") return notFound;
      return undefined;
    },
  });

  const out = await handleNavigation({
    request: new Request("https://example.com/missing"),
    preloadResponse: Promise.resolve(undefined),
  });

  t.is(await out.text(), "not-found-page");
});

test.serial("handleNavigation returns offline fallback response when all else fails", async (t) => {
  const cache = makeCache();

  installGlobals(t, {
    cache,
    fetchImpl: async () => {
      throw new Error("offline");
    },
    matchImpl: async () => undefined,
  });

  const out = await handleNavigation({
    request: new Request("https://example.com/offline"),
    preloadResponse: Promise.resolve(undefined),
  });

  t.is(out.status, 503);
  t.is(await out.text(), "Offline");
});

test.serial("cacheThenNetworkWithTTL returns valid cached response without fetch", async (t) => {
  const cache = makeCache();
  const request = new Request("https://example.com/site.css");
  const future = new Date(Date.now() + 60_000).toUTCString();
  await cache.put(request, new Response("cached-css", { headers: { [HEADER]: future } }));
  let fetchCalled = false;

  installGlobals(t, {
    cache,
    fetchImpl: async () => {
      fetchCalled = true;
      return new Response("network-css", { status: 200 });
    },
  });

  const out = await cacheThenNetworkWithTTL(request, "runtime-cache");
  t.is(await out.text(), "cached-css");
  t.false(fetchCalled);
});

test.serial("staleWhileRevalidateWithTTL returns cached and schedules update", async (t) => {
  const cache = makeCache();
  const request = new Request("https://example.com/app.js");
  const future = new Date(Date.now() + 60_000).toUTCString();
  await cache.put(request, new Response("cached-js", { headers: { [HEADER]: future } }));

  const waitUntilCalls = [];
  const fetchCalls = [];
  installGlobals(t, {
    cache,
    fetchImpl: async (...args) => {
      fetchCalls.push(args);
      return new Response("fresh-js", { status: 200 });
    },
  });

  const out = await staleWhileRevalidateWithTTL(request, "runtime-cache", {
    waitUntil(promise) {
      waitUntilCalls.push(promise);
    },
  });

  t.is(await out.text(), "cached-js");
  t.is(waitUntilCalls.length, 1);
  await Promise.all(waitUntilCalls);
  t.true(fetchCalls.some(([, options]) => options?.cache === "no-store"));
});

test.serial("cacheFirstWithLimitAndTTL trims oldest entry beyond max limit", async (t) => {
  const cache = makeCache();
  const oldRequest = new Request("https://example.com/old.png");
  await cache.put(
    oldRequest,
    new Response("old-image", {
      headers: { [HEADER]: new Date(Date.now() - 1_000).toUTCString() },
    }),
  );

  installGlobals(t, {
    cache,
    fetchImpl: async () => new Response("new-image", { status: 200 }),
  });

  const out = await cacheFirstWithLimitAndTTL(
    new Request("https://example.com/new.png"),
    "image-cache",
    1,
  );

  t.is(await out.text(), "new-image");
  t.deepEqual(cache.deleted, ["https://example.com/old.png"]);
});

test.serial("precacheWithTTL stores only successful responses", async (t) => {
  const cache = makeCache();
  const responses = {
    "https://example.com/ok.css": new Response("ok", { status: 200 }),
    "https://example.com/missing.css": new Response("missing", { status: 404 }),
  };

  installGlobals(t, {
    cache,
    fetchImpl: async (url) => {
      if (url === "https://example.com/error.css") throw new Error("boom");
      return responses[url];
    },
  });

  await precacheWithTTL(
    [
      "https://example.com/ok.css",
      "https://example.com/missing.css",
      "https://example.com/error.css",
    ],
    "precache",
  );

  t.true(cache.store.has("https://example.com/ok.css"));
  t.false(cache.store.has("https://example.com/missing.css"));
  t.false(cache.store.has("https://example.com/error.css"));
});
