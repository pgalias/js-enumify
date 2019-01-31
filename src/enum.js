const { getStaticGetters } = require('./enumHelper');
const validate = require('./enumValidator');
const EnumException = require('./enumException');

module.exports = class Enum {
    constructor(key, value) {
        validate(this.constructor)(key, value);

        this.key = key;
        this.value = value;
        Object.freeze(this);
    }

    static all() {
        return getStaticGetters(this)
            .map(([key, descriptor]) => new this(key, descriptor.get()));
    }

    static take(value) {
        const element = this.all().find(item => item.value === value);
        if (!element) {
            throw EnumException.enumNotFound(value);
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
