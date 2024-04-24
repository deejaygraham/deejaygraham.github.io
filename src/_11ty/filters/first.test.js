const test = require('ava');
const first = require('./first.js');

test('empty tag list returns null', t => {
    t.is(first([]), null);
});

test('tag list single item returns that item', t => {
    const tags = ['baz', 'foo', 'bar' ];
    t.is(first(tags), 'baz');
});

test('tags list multiple item returns first item', t => {
    const tags = ['code', 'all', 'posts' ];
    t.is(first(tags), 'code');
});