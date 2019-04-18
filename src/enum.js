require('./utils/polyfill');
var helper = require('./enumHelper');
var validate = require('./enumValidator');
var EnumException = require('./enumException');

/**
 * An abstract class representing enum values
 *
 * @abstract
 * @class
 * @param {string} key - enum key
 * @param {string} value - enum value
 */
function Enum(key, value) {
    validate(this.constructor)(key, value);

    this.key = key;
    this.value = value;
    Object.freeze(this);
}

/**
 * Get all enum elements
 *
 * @returns {Array<Enum>} Array of enums
 */
Enum.all = function() {
    var Self = this;

    return helper.getStaticGetters(this)
        .map(function(enumerator) {
            return new Self(enumerator[0], enumerator[1].get());
        });
};

/**
 * Get enum element by its value
 *
 * @param {string} value - enum value
 * @returns {Enum} Enum object
 */
Enum.take = function(value) {
    var element = this.all().find(function(item) { return item.value === value; });
    if (!element) {
        throw EnumException.enumNotFound(value);
    }

    return element;
};

/**
 * Get all enum keys
 *
 * @returns {Array<string>} Array of enum keys
 */
Enum.keys = function() {
    return this.all().map(function(item) { return item.key; });
};

/**
 * Get all enum values
 *
 * @returns {Array<string>} Array of enum values
 */
Enum.values = function() {
    return this.all().map(function(item) { return item.value; });
};

/**
 * Check if current enum value is equal to provided value
 *
 * @param {string} value - enum value
 * @returns {boolean} Result of checking
 */
Enum.prototype.is = function(value) {
    return this.value === value;
};


/**
 * Check if current enum value is equal to one of provided values in array
 *
 * @param {Array<string>} values - array of enum values
 * @returns {boolean} Result of checking
 */
Enum.prototype.oneOf = function(values) {
    return values.indexOf(this.value) > -1;
};

/**
 * Print enum value
 *
 * @returns {string} Value of enum
 */
Enum.prototype.toString = function() {
    return this.value;
};

module.exports = Enum;
