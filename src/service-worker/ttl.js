/** @param {Response} response */
export function computeTTLSeconds(response, cachingDuration, debug) {
  const cc = response.headers.get("Cache-Control") || "";
  const m = cc.match(/max-age=(\d+)/);
  let ttl = cachingDuration;
  if (m) ttl = Math.min(cachingDuration, parseInt(m[1], 10));
  if (debug) console.log("[sw] ttl seconds computed:", ttl);
  return ttl;
}

export function isCacheResponseStillValid(cacheResponse, headerName, nowMs, debug) {
  if (!cacheResponse) {
    if (debug) console.log("no cache response");
    return false;
  }
  const fetched = cacheResponse.headers.get(headerName);

  if (fetched) {
    if (debug) console.log("header date", fetched);
  } else {
    if (debug) console.log("no header", headerName);
    return false;
  }

  const expirationDate = Date.parse(fetched);

  if (Number.isNaN(expirationDate)) {
    if (debug) console.log("Expiration not parseable");
    return false;
  }

  if (debug) console.log("comparing", expirationDate, nowMs);

  return expirationDate >= nowMs;
}

/**
 * Clone an OK response, add SW-Cache-Expires (or your header), and cache.put.
 * No-op if liveResponse is missing or not ok.
 *
 * @param {Cache} cache
 * @param {RequestInfo} request
 * @param {Response | null | undefined} liveResponse
 * @param {{
 *   cachingDurationSeconds: number,
 *   expiryHeaderName: string,
 *   debug?: boolean,
 *   now?: () => number,
 * }} options
 */
export async function putWithExpiry(cache, request, liveResponse, options) {
  const {
    cachingDurationSeconds,
    expiryHeaderName,
    debug = false,
    now = Date.now,
  } = options;

  try {
    if (!liveResponse || !liveResponse.ok) {
      return;
    }

    const copy = liveResponse.clone();
    const headers = new Headers(copy.headers);

    const ttlSec = computeTTLSeconds(copy, cachingDurationSeconds, debug);
    const expires = new Date(now() + ttlSec * 1000);
    headers.set(expiryHeaderName, expires.toUTCString());

    const body = await copy.blob();
    const responseForCache = new Response(body, {
      status: copy.status,
      statusText: copy.statusText,
      headers,
    });

    await cache.put(request, responseForCache);

    if (debug) {
      console.log(
        "[sw] cached with expiry:",
        new URL(typeof request === "string" ? request : request.url).pathname,
        expires.toUTCString(),
      );
    }
  } catch (e) {
    if (debug) {
      console.warn("[sw] putWithExpiry failed:", e);
    }
  }
}
