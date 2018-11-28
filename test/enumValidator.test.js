const Enum = require('../src/enum');
const enumValidate = require('../src/enumValidator');

class Foo extends Enum {
    static get FOO() { return 'foo'; }
    static get BAR() { return 'bar'; }
}

describe('EnumValidator', () => {
    it('should throw an error when passed key and/or value are invalid', () => {
        const validator = enumValidate(Foo);

        expect(() => validator('foo', 'foo')).toThrowError();
        expect(() => validator('FOO', 'FOO')).toThrowError();
        expect(() => validator('abc', 'ABC')).toThrowError();
        expect(() => validator('BAR', 'bar')).not.toThrowError();
    });
});
