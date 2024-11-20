import test from 'ava';
import arrayToCommaString from './arrayToCommaString.js';

test('empty array returns blank string', t => {
    t.is(arrayToCommaString([]), '');
});

test('single tag is not delimited', t => {
    t.is(arrayToCommaString(['code']), 'code');
});

test('multiple tags are delimited by commas', t => {
    t.is(arrayToCommaString(['code', 'microbit', 'python']), 'code,microbit,python');
});
