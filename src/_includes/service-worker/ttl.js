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
  if (!cacheResponse) {
    console.log('no cache response');
    return false;
  }
  const fetched = cacheResponse.headers.get(headerName);

  if (fetched) {
    console.log('header date', fetched);
  }
  if (!fetched) {
    console.log('no header', headerName);
    return false;
  }
  
  const expirationDate = Date.parse(fetched);
  
  if (Number.isNaN(expirationDate)) {
    console.log('Expiration not parseable');
    return false;
  }

  console.log('comparing', expirationDate, nowMs);
  
  return expirationDate >= nowMs;
}
