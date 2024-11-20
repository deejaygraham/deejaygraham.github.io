import test from 'ava';
import getAllTags from './getAllTags.js';

test('empty tag list returns empty list', t => {
    t.deepEqual(getAllTags([]), []);
});

test('single item tag list no repeated items returns sorted list', t => {
    const tags = [ { data: { tags: ['baz', 'foo', 'bar' ] } } ];
    t.deepEqual(getAllTags(tags), ['bar', 'baz', 'foo']);
});

test('multiple items with repeated returns unique items sorted', t => {
    const tags = [
        {
            data: {
                tags: ['alpha']
            }
        },
        { 
            data: {
                tags: ['charlie', 'delta', 'bravo']
            }
        },
        {
            data: {
                tags: ['bravo', 'alpha', 'charlie']
            }
        } 
    ];
    t.deepEqual(getAllTags(tags), ['alpha', 'bravo', 'charlie', 'delta']);
});
