/** @param {Response} response */
export function computeTTLSeconds(response, cachingDuration, debug) {
  const cc = response.headers.get('Cache-Control') || '';
  const m = cc.match(/max-age=(\d+)/);
  let ttl = cachingDuration;
  if (m) ttl = Math.min(cachingDuration, parseInt(m[1], 10));
  if (debug) console.log('[sw] ttl seconds computed:', ttl);
  return ttl;
}

export function isCacheResponseStillValid(cacheResponse, headerName, nowMs, debug) {
  if (!cacheResponse) {
    if (debug) console.log('no cache response');
    return false;
  }
  const fetched = cacheResponse.headers.get(headerName);

  if (fetched) {
    if (debug) console.log('header date', fetched);
  } else {
    if (debug) console.log('no header', headerName);
    return false;
  }
  
  const expirationDate = Date.parse(fetched);
  
  if (Number.isNaN(expirationDate)) {
    if (debug) console.log('Expiration not parseable');
    return false;
  }

  if (debug) console.log('comparing', expirationDate, nowMs);
  
  return expirationDate >= nowMs;
}
