# js-enumify [![Build Status](https://travis-ci.com/pgalias/js-enumify.svg?branch=master)](https://travis-ci.com/pgalias/js-enumify) [![Coverage Status](https://coveralls.io/repos/github/pgalias/js-enumify/badge.svg)](https://coveralls.io/github/pgalias/js-enumify)

js-enumify introduces Enum Type to JavaScript. Works well on node and browser environments.

## Installing

- `npm install js-enumify`

## Usage

- Creating enum
````js
import Enum from 'js-enumify'; // or const Enum = require('js-enumify');

class SomeEnum extends Enum {
    static get FOO() {return 'foo';}
    static get BAR() {return 320;}
    static get BAZ() {return false;}
    static get ARR() {return ['a', 2, undefined];}
    static get FUN() {return (a) => a + 1;}
    static get OBJ() {return {a:1, b:3};}
}
````

- Getting enum value
````js
SomeEnum.FOO; // 'foo'
SomeEnum.take(SomeEnum.FOO); // Foo { key: 'FOO', value: 'foo' } 
````

- Getting all enums
````js
SomeEnum.all() // [Foo { key: 'FOO', value: 'foo' }, Foo { key: 'BAR', value: 320 }, Foo { key: 'BAZ', value: false }]
````

- Getting all enum keys
````js
SomeEnum.keys() // ['FOO', 'BAR', 'BAZ']
````

- Getting all enum values
````js
SomeEnum.values() // ['foo', 320, false]
````

- Checking if current enum is equal to given one
````js
const foo = SomeEnum.take(SomeEnum.BAR);
foo.is(SomeEnum.BAR) // true
foo.is(320) // true
foo.is(SomeEnum.BAR) // false
````

- Checking if current enum value is equal to one of given ones
````js
const foo = SomeEnum.take(SomeEnum.BAR);
foo.oneOf([SomeEnum.BAR, undefined, 'foo']); // true
foo.oneOf([SomeEnum.BAZ, false, 'foo']); // false
````

- Parsing enum value to string
````js
const foo = SomeEnum.take(SomeEnum.BAR);
foo.toString(); // '320'
String(foo); // '320'
foo + ''; // '320'
````

## Testing

- `npm test`

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/pgalias/js-enumify/blob/master/LICENSE) file for details
