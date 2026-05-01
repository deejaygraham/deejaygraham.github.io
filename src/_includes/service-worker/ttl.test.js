import test from 'ava';
import { computeTTLSeconds, isCacheResponseStillValid } from './ttl.js';

test('Time to live honors max-age below default', (t) => {
  const res = new Response(null, {
    headers: { 'Cache-Control': 'max-age=60' },
  });
  t.is(computeTTLSeconds(res, 86400, false), 60);
});

test('Time to live uses default if max-age too much', (t) => {
  const res = new Response(null, {
    headers: { 'Cache-Control': 'max-age=600' },
  });
  t.is(computeTTLSeconds(res, 100, false), 100);
});

test('cache is expired if date in the past', (t) => {
  const past = new Date(Date.now() - 1000).toUTCString();
  const res = new Response(null, {
    headers: { 'SW-Cache-Expires': past },
  });
  t.false(isCacheResponseStillValid(res, 'SW-Cache-Expires', Date.now()));
});

test('cache is expired if no header present', (t) => {
  const res = new Response(null);
  t.false(isCacheResponseStillValid(res, 'SW-Cache-Expires', Date.now()));
});

test('cache is expired if date not readable', (t) => {
  const res = new Response(null, {
    headers: { 'SW-Cache-Expires': "hello" },
  });
  t.false(isCacheResponseStillValid(res, 'SW-Cache-Expires', Date.now()));
});

test('cache is not expired if recently retrieved', (t) => {
  const recentPast = new Date(Date.now() + 100).toUTCString();
  const res = new Response(null, {
    headers: { 'SW-Cache-Expires': recentPast },
  });
  t.true(isCacheResponseStillValid(res, 'SW-Cache-Expires', Date.now()));
});

