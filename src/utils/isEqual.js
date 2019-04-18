var specificObjectTypes = [
    {type: /object Array/, method: checkArray},
    {type: /object Function/, method: checkFunction},
    {type: /object Object/, method: checkObject}
];

function isEqual(value, other) {
    if (!value && !other) {
        return true;
    }

    var valueType = Object.prototype.toString.call(value);
    var otherType = Object.prototype.toString.call(other);

    if (valueType !== otherType) {
        return false;
    }

    for (var i = 0; i < specificObjectTypes.length; i++) {
        var regex = specificObjectTypes[i].type;
        var method = specificObjectTypes[i].method;

        if (regex.test(valueType)) {
            return method(value, other);
        }
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
