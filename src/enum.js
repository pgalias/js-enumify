const { getStaticGetters } = require('./enumHelper');
const enumValidate = require('./enumValidator');

module.exports = class Enum {
    constructor(key, value) {
        if (this.constructor === Enum) {
            throw new Error('It\'s abstract class, you should extend it');
        }

        enumValidate(this.constructor)(key, value);

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
