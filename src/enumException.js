module.exports = class EnumException extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }

    static notInitializable() {
        throw new this('It\'s abstract class, you should extend it', 'abstract');
    }

    static enumNotFound(value) {
        throw new this(`Provided value ${value} does not exist in this particular Enum class`, 'not_found');
    }

    static invalidKey(scope, key) {
        throw new this(`Passed enum key ${key} doesn't exist in ${scope}`, 'invalid_key');
    }

    static invalidValue(scope, value) {
        throw new this(`Passed enum value ${value} doesn't exist in ${scope}`, 'invalid_value');
    }
};
