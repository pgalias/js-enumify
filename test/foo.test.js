const {add} = require('../src/foo');

test('foo', () => {
    expect(add(2)(3)).toBe(5);
});
