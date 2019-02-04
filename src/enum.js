const { getStaticGetters } = require('./enumHelper');
const validate = require('./enumValidator');
const EnumException = require('./enumException');

/**
 * An abstract class representing enum values
 *
 * @abstract
 * @class
 */
class Enum {
    /**
     * Create enum element
     *
     * @param {string} key - enum key
     * @param {string} value - enum value
     */
    constructor(key, value) {
        validate(this.constructor)(key, value);

        this.key = key;
        this.value = value;
        Object.freeze(this);
    }

    /**
     * Get all enum elements
     *
     * @returns {Enum[]}
     */
    static all() {
        return getStaticGetters(this)
            .map(([key, descriptor]) => new this(key, descriptor.get()));
    }

    /**
     * Get enum element by its value
     *
     * @param {string} value - enum value
     * @returns {Enum}
     */
    static take(value) {
        const element = this.all().find(item => item.value === value);
        if (!element) {
            throw EnumException.enumNotFound(value);
        }

        return element;
    }

    /**
     * Get all enum keys
     *
     * @returns {string[]}
     */
    static keys() {
        return this.all().map(item => item.key);
    }

    /**
     * Get all enum values
     *
     * @returns {string[]}
     */
    static values() {
        return this.all().map(item => item.value);
    }

    /**
     * Check if current enum value is equal to provided value
     *
     * @param {string} value - enum value
     * @returns {boolean}
     */
    is(value) {
        return this.value === value;
    }

    /**
     * Check if current enum value is equal to one of provided values in array
     *
     * @param {string[]} values - array of enum values
     * @returns {boolean}
     */
    oneOf(values) {
        return values.includes(this.value);
    }

    /**
     * Print enum value
     *
     * @returns {string}
     */
    toString() {
        return this.value;
    }
}

module.exports = Enum;
