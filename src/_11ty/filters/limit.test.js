const test = require('ava');
const limit = require('./limit.js');

test('empty tag list returns null', t => {
    t.deepEqual(limit([], 1), []);
});

test('limit higher than list length returns full list', t => {
    const tags = ['baz', 'foo', 'bar' ];
    t.deepEqual(limit(tags, 4), tags);
});

test('tags limit returns items from front of list', t => {
    const tags = ['code', 'all', 'posts' ];
    t.deepEqual(limit(tags, 2), ['code', 'all']);
});