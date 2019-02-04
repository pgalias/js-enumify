/**
 * Enum exception class
 *
 * @class
 * @extends Error
 */
class EnumException extends Error {
    /**
     * @param {string} message - error message
     * @param {string} code - auxiliary error code
     */
    constructor(message, code) {
        super(message);
        this.code = code;
        Error.captureStackTrace(this, EnumException);
    }

    /**
     * It is throwing on attempt to create abstract Enum object
     *
     * @returns {EnumException}
     */
    static notInitializable() {
        return new this('It\'s abstract class, you should extend it before use', 'abstract');
    }

    /**
     * It is throwing on attempt to get enum element which does not exist in current enum scope
     *
     * @param {string} value - enum value which does not exist
     * @returns {EnumException}
     */
    static enumNotFound(value) {
        return new this(`Provided value ${value} does not exist in this particular Enum class`, 'not_found');
    }

    /**
     * It is throwing on attempt to create enum object with invalid key
     *
     * @param {Enum} scope - particular enum class
     * @param {string} key - key which was used to create new enum object
     * @returns {EnumException}
     */
    static invalidKey(scope, key) {
        return new this(`Passed enum key ${key} doesn't exist in ${scope}`, 'invalid_key');
    }

    /**
     * It is throwing on attempt to create enum object with invalid value
     *
     * @param {Enum} scope - particular enum class
     * @param {string} value - value which was used to create new enum object
     * @returns {EnumException}
     */
    static invalidValue(scope, value) {
        return new this(`Passed enum value ${value} doesn't exist in ${scope}`, 'invalid_value');
    }
}

module.exports = EnumException;
