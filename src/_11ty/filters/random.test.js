const test = require('ava');
const random = require('./random.js');

test('empty tag list returns undefined', t => {
    t.is(random([]), undefined);
});

test('random returns one item from list', t => {
    const tags = ['baz', 'foo', 'bar' ];
    t.true(tags.includes(random(tags)));
});

test('single item in list is always returned', t => {
    const tags = ['code'];
    t.is(random(tags), 'code');
});