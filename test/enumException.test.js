const EnumException = require('../src/enumException');

describe('Enum Exception', () => {
    it('not initializable error should has \'abstract\' code', () => {
        const error = EnumException.notInitializable();
        expect(error.code).toBe('abstract');
    });

    it('enum not found error should has \'not_found\' code ', () => {
        const error = EnumException.enumNotFound('foo');
        expect(error.code).toBe('not_found');
    });

    it('invalid key error should has \'invald_key\' code', () => {
        const error = EnumException.invalidKey('Foo', 'BAR');
        expect(error.code).toBe('invalid_key');
    });

    it('invalid value error should has \'invalid_value\' code', () => {
        const error = EnumException.invalidValue('Foo', 'foo');
        expect(error.code).toBe('invalid_value');
    });
});
