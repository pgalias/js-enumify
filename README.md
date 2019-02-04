[![Build Status](https://travis-ci.com/pgalias/js-enumify.svg?branch=master)](https://travis-ci.com/pgalias/js-enumify)
[![Coverage Status](https://coveralls.io/repos/github/pgalias/js-enumify/badge.svg)](https://coveralls.io/github/pgalias/js-enumify)

## Usage

```js
class FooEnum extends Enum {
    static get KEY1() { return 'value1'; }
    static get KEY2() { return 'value2'; }
    static get KEY3() { return 'value3'; }
}
```

```js
const enumObj1 = new FooEnum('KEY1', 'value1');
const enumObj2 = FooEnum.take(FooEnum.KEY1); // recommended
```

## Available methods

```js
/** Static methods */

// Get all elements from
const enums = FooEnum.all(); // returns [{key: 'KEY1', value: 'value1'}: FooEnum, {key: 'KEY2', value: 'value2'}: FooEnum, ...]

// Get enum object by its value
const enumObj = FooEnum.take(FooEnum.KEY2); // returns {key: 'KEY2', value; 'value2'}: FooEnum

// Get all enum keys
const enumKeys = FooEnum.keys(); // returns ['KEY1', 'KEY2', ...]

// Get all enum values
const enumValues = FooEnum.values(); // returns ['value1', 'value2', ...]

/** Non static methods */
const enumObject = new FooEnum('KEY1', 'value1');

// Check if current enum has a value equal to provided value
console.log(enumObject.is('value1')); // prints 'true'
console.log(enumObject.is('value2')); // prints 'false'

// Check if current enum has a value equal to one of provided values in array
console.log(enumObject.oneOf(['value1', 'value2'])); // prints 'true'
console.log(enumObject.oneOf(['foo', 'bar'])); // prints 'false'

// Return enum value as string
console.log(enumObject.toString()); // prints 'value1'
console.log(enumObject + ''); // prints 'value1'
console.log(String(enumObject)); // prints 'value1'
```
