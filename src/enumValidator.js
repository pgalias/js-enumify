const { validateEnumKey, validateEnumValue } = require('./enumHelper');
const EnumException = require('./enumException');

const enumValidate = scope => (key, value) => {
    if (!validateEnumKey(scope, key)) {
        EnumException.invalidKey(scope, key);
    }
    if (!validateEnumValue(scope, value)) {
        EnumException.invalidValue(scope, value);
    }
};

module.exports = enumValidate;
