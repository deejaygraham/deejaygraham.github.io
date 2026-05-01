import test from 'ava';
import { computeTTLSeconds, isCacheResponseStillValid } from './ttl.js';

test('computeTTLSeconds honors max-age below default', (t) => {
  const res = new Response(null, {
    headers: { 'Cache-Control': 'max-age=60' },
  });
  t.is(computeTTLSeconds(res, 86400, false), 60);
});

test('isCacheResponseStillValid uses header and now', (t) => {
  const past = new Date(Date.now() - 1000).toUTCString();
  const res = new Response(null, {
    headers: { 'SW-Cache-Expires': past },
  });
  t.false(isCacheResponseStillValid(res, 'SW-Cache-Expires', Date.now()));
});
