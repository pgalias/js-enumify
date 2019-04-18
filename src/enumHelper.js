var isEqual = require('./utils/isEqual');

var getStaticGetters = function(scope) {
    return Object.getOwnPropertyNames(scope)
        .map(function(key) {
            return [key, Object.getOwnPropertyDescriptor(scope, key)];
        })
        .filter(function(getter) {
            return typeof getter[1].get === 'function';
        });
};

var validateEnumKey = function(scope, key)  {
    return Boolean(
        getStaticGetters(scope).find(function(enumerator) {
            return isEqual(enumerator[0], key);
        })
    );
};

var validateEnumValue = function(scope, value)  {
    return Boolean(
        getStaticGetters(scope).find(function(enumerator) {
            return isEqual(enumerator[1].get(), value);
        })
    );
};

module.exports = {
    getStaticGetters: getStaticGetters,
    validateEnumKey: validateEnumKey,
    validateEnumValue: validateEnumValue
};
