const {
    getStaticGetters,
    validateEnumKey,
    validateEnumValue
} = require('../src/enumHelper');
const Enum = require('../src/enum');

describe('EnumHelpers', () => {
    describe('getting static getters array', () => {
        class Foo {
            constructor() {
                this.foo = 'foo';
            }

            get bar() {
                return 'bar';
            }

            baz() {
                return 'baz';
            }

            static fooBar()  {
                return 'fooBar';
            }

            static get fooBarBaz() {
                return 'fooBarBaz';
            }
        }

        it('should return array with one element from Foo class', () => {
            const staticGetters = getStaticGetters(Foo);
            const first = staticGetters[0];

            expect(staticGetters).toHaveLength(1);
            expect(first[0]).toEqual('fooBarBaz');
            expect(first[1]).toHaveProperty('configurable');
            expect(first[1]).toHaveProperty('enumerable');
            expect(first[1]).toHaveProperty('get');
            expect(first[1]).toHaveProperty('set');
            expect(first[1].get).toBeInstanceOf(Function);
            expect(first[1].set).toBeUndefined();
        });
    });

    describe('validate enum key and value', () => {
        class AnotherFoo extends Enum {
            static get FOO() { return 'foo'; }
            static get BAR() { return 'bar'; }
        }

        it('should return proper bool value depending on passed key to AnotherFoo Enum scope', () => {
            expect(validateEnumKey(AnotherFoo, 'FOO')).toBeTruthy();
            expect(validateEnumKey(AnotherFoo, 'foo')).toBeFalsy();
            expect(validateEnumKey(AnotherFoo, 'BAZ')).toBeFalsy();
        });

        it('should return proper bool value depending on passed value to AnotherFoo Enum scope', () => {
            expect(validateEnumValue(AnotherFoo, 'bar')).toBeTruthy();
            expect(validateEnumValue(AnotherFoo, 'BAR')).toBeFalsy();
            expect(validateEnumValue(AnotherFoo, 'baz')).toBeFalsy();
        });
    });
});