/** @param {Response} response */
export function computeTTLSeconds(response, cachingDuration, debug) {
  const cc = response.headers.get('Cache-Control') || '';
  const m = cc.match(/max-age=(\d+)/);
  let ttl = cachingDuration;
  if (m) ttl = Math.min(cachingDuration, parseInt(m[1], 10));
  if (debug) console.log('[sw] ttl seconds computed:', ttl);
  return ttl;
}

export function isCacheResponseStillValid(cacheResponse, headerName, nowMs) {
  if (!cacheResponse) return false;
  const fetched = cacheResponse.headers.get(headerName);
  if (!fetched) return false;
  const expirationDate = Date.parse(fetched);
  if (Number.isNaN(expirationDate)) return false;
  return expirationDate > nowMs;
}
