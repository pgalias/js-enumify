const getStaticGetters = scope => Object.getOwnPropertyNames(scope)
    .map(key => [key, Object.getOwnPropertyDescriptor(scope, key)])
    .filter(([, descriptor]) => typeof descriptor.get === 'function');

module.exports = class Enum {
    constructor(key, value) {
        if (this.constructor === Enum) {
            throw new Error('It\'s abstract class, you should extend it');
        }

        const all = getStaticGetters(this.constructor);
        /* because of conflict with array-bracket-spacing and comma-spacing,
         * linting next line should be disabled */
        // eslint-disable-next-line array-bracket-spacing
        if (!all.find(([enumKey, ]) => enumKey === key)) {
            throw new Error(`Passed enum key doesn't exist in ${this.constructor}`);
        }
        if (!all.find(([, enumValue]) => enumValue.get() === value)) {
            throw new Error(`Passed enum value doesn't exist in ${this.constructor}`);
        }

        this.key = key;
        this.value = value;
        Object.freeze(this);
    }

    static all() {
        return getStaticGetters(this).map(([key, descriptor]) => new this(key, descriptor.get()));
    }

    static take(value) {
        const element = this.all().find(item => item.value === value);
        if (!element) {
            throw new TypeError('Provided value does not exist in this particular Enum class');
        }

        return element;
    }

    static keys() {
        return this.all().map(item => item.key);
    }

    static values() {
        return this.all().map(item => item.value);
    }

    is(value) {
        return this.value === value;
    }

    oneOf(values) {
        return values.includes(this.value);
    }

    toString() {
        return this.value;
    }
};
