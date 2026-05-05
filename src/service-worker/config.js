import { CACHE_VERSION } from "./cache-version.js";

export const PRECACHE = "precache" + CACHE_VERSION;
export const RUNTIME = "runtime" + CACHE_VERSION;
export const IMAGE_CACHE = "images" + CACHE_VERSION;

export const CACHING_DURATION = 24 * 3600; // seconds (24h)
export const CACHE_EXPIRY_HEADER = "SW-Cache-Expires";
export const DEBUG = true;

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
