var helper = require('./enumHelper');
var Enum = require('./enum');
var EnumException = require('./enumException');

var enumValidate = function(scope) {
    if (scope === Enum || scope.name === 'Enum') {
        throw EnumException.notInitializable();
    }

    return function(key, value) {
        if (!helper.validateEnumKey(scope, key)) {
            throw EnumException.invalidKey(scope, key);
        }
        if (!helper.validateEnumValue(scope, value)) {
            throw EnumException.invalidValue(scope, value);
        }
    };
};

module.exports = enumValidate;
