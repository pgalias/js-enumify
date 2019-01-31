class EnumException extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        Error.captureStackTrace(this, EnumException);
    }

    static notInitializable() {
        return new this('It\'s abstract class, you should extend it before use', 'abstract');
    }

    static enumNotFound(value) {
        return new this(`Provided value ${value} does not exist in this particular Enum class`, 'not_found');
    }

    static invalidKey(scope, key) {
        return new this(`Passed enum key ${key} doesn't exist in ${scope}`, 'invalid_key');
    }

    static invalidValue(scope, value) {
        return new this(`Passed enum value ${value} doesn't exist in ${scope}`, 'invalid_value');
    }
}

module.exports = EnumException;
