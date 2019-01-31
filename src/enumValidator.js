const { validateEnumKey, validateEnumValue } = require('./enumHelper');
const EnumException = require('./enumException');

const enumValidate = (scope) => {
    if (scope.name === 'Enum') {
        throw EnumException.notInitializable();
    }

    return (key, value) => {
        if (!validateEnumKey(scope, key)) {
            throw EnumException.invalidKey(scope, key);
        }
        if (!validateEnumValue(scope, value)) {
            throw EnumException.invalidValue(scope, value);
        }
    };
};

module.exports = enumValidate;
