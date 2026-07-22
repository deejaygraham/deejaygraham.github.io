/** Injected at bundle time by scripts/build-service-worker.mjs; "-dev" for unit tests. */
export const CACHE_VERSION =
  typeof __SW_CACHE_VERSION__ !== "undefined" ? __SW_CACHE_VERSION__ : "-dev";

export const PRECACHE = "precache" + CACHE_VERSION;
export const RUNTIME = "runtime" + CACHE_VERSION;
export const IMAGE_CACHE = "images" + CACHE_VERSION;

export const CACHING_DURATION = 24 * 3600; // seconds (24h)
export const STATIC_CACHING_DURATION = 7 * 24 * 3600; // seconds (7d)
export const IMAGE_CACHING_DURATION = 30 * 24 * 3600; // seconds (30d)
export const CACHE_EXPIRY_HEADER = "SW-Cache-Expires";
export const DEBUG = false;

export const offlinePage = "/offline.html";
export const searchDatabase = "/search-index.json";
export const siteStylesheet = "/css/site.css";
export const notFoundPage = "/404.html";

export const coreAssets = [
  "/",
  "/index.html",
  siteStylesheet,
  "/favicon.ico",
  "/img/favicon.png",
  "/img/avatar.svg",
  offlinePage,
  searchDatabase,
  notFoundPage,
];
