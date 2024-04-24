const test = require('ava');
const arryToCommaString = require('./arrayToCommaString.js');

test('empty array returns blank string', t => {
    t.is(arryToCommaString([]), '');
});

test('single tag is not delimited', t => {
    t.is(arryToCommaString(['code']), 'code');
});

test('multiple tags are delimited by commas', t => {
    t.is(arryToCommaString(['code', 'microbit', 'python']), 'code,microbit,python');
});