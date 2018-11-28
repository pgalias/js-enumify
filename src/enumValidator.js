const { validateEnumKey, validateEnumValue } = require('./enumHelper');

const enumValidate = scope => (key, value) => {
    if (!validateEnumKey(scope, key)) {
        throw new Error(`Passed enum key doesn't exist in ${scope}`);
    }
    if (!validateEnumValue(scope, value)) {
        throw new Error(`Passed enum value doesn't exist in ${scope}`);
    }
};

module.exports = enumValidate;
