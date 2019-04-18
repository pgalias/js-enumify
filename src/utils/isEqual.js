function isEqual(value, other) {
    if (!value && !other) {
        return true;
    }

    if (value instanceof Array && other instanceof Array) {
        return checkArray(value, other);
    }

    if (value instanceof Function && other instanceof Function) {
        return checkFunction(value, other);
    }

    if (typeof value === 'object' && typeof other === 'object') {
        return checkObject(value, other);
    }

    return value === other;
}

function checkArray(value, other) {
    if (value.length !== other.length) {
        return false;
    }

    for (var i = 0; i < value.length; i++) {
        if (!isEqual(value[i], other[i])) {
            return false;
        }
    }

    return true;
}

function checkObject(value, other) {
    var valueKeys = Object.keys(value);
    var otherKeys = Object.keys(other);

    if (valueKeys.length !== otherKeys.length) {
        return false;
    }

    if (!checkArray(valueKeys, otherKeys)) {
        return false;
    }

    for (var key in value) {
        if (value.hasOwnProperty(key) && !isEqual(value[key], other[key])) {
            return false;
        }
    }

    return true;
}

function checkFunction(value, other) {
    return value.toString() === other.toString();
}

module.exports = isEqual;
