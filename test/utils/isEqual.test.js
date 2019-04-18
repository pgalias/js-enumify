const isEqual = require('../../src/utils/isEqual');

describe('isEqual function', () => {
    const dataProvider = [
        [1, 1, true],
        [1, 2, false],
        ['a', 'a', true],
        ['a', 'b', false],
        [1, '1', false],
        [true, true, true],
        [true, false, false],
        [null, null, true],
        [undefined, undefined, true],
        [1, '1', false],
        [[1,2], [1,2], true],
        [[1,2], [2,1], false],
        [[1,2], [1,2,3], false],
        [[1,2,{a:1}], [1,2,{a:1}], true],
        [[1,2,[],[['a']]], [1,2,[],[['a']]], true],
        [[1,2,[],[['a']]], [1,2,['b'],[[null]]], false],
        [{a:1, b:2}, {a:1, b:2}, true],
        [{a:1, b:2}, {a:2, b:1}, false],
        [{a:1, b:2}, {a:1, b:2, c:3}, false],
        [{a: {b: {c: 4}}}, {a: {b: {c: 4}}}, true],
        [{a: {b: {c: 4}}}, {a: {d: {c: 4}}}, false],
        [{foo: 'bar'}, {bar: 'baz'}, false],
        [() => {}, () => {}, true],
        [(a) => a, (a) => a + 'b', false]
    ];

    it.each(dataProvider)('should check equality for %o and %o', (first, second, expected) => {
        expect(isEqual(first, second)).toBe(expected);
    });
});
