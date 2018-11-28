const getStaticGetters = scope => Object.getOwnPropertyNames(scope)
    .map(key => [key, Object.getOwnPropertyDescriptor(scope, key)])
    .filter(([, descriptor]) => typeof descriptor.get === 'function');

const validateEnumKey = (scope, key) => Boolean(
    /* because of conflict with array-bracket-spacing and comma-spacing,
     * linting next line should be disabled */
    // eslint-disable-next-line array-bracket-spacing
    getStaticGetters(scope).find(([enumKey, ]) => enumKey === key)
);

const validateEnumValue = (scope, value) => Boolean(
    getStaticGetters(scope).find(([, enumValue]) => enumValue.get() === value)
);

module.exports = {
    getStaticGetters,
    validateEnumKey,
    validateEnumValue
};
