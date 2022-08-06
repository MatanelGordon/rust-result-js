# rust-result-js

rust Result object implemented in javascript.

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Available Functions](#available-functions)

## Installation

via npm⚡:

```bash
$ npm i rust-result-js
```

or yarn⚡:

```bash
$ yarn add rust-result-js
```

or pnpm⚡:

```bash
$ pnpm add rust-result-js
```

## Usage

This package contains 2 implementations- with `createResult` and without. Its error handling is identical to rust's:
expect, unwrap, map...

However, since Javascript's convention is not snake-case, some methods differ by their name - all those with snake case
were converted to camelCase.

examples:

* **map_err** = `mapErr` in js
* **is_ok** = `isOk` in js
* **unwrap_err** = `unwrapErr` in js
* etc...

### Example

Unlike rust, in javascript, in order to return a value you must use the `return` keyword.

```javascript
import { Ok, Err } from 'rust-result-js';

const toNumber = (str) => {
    const parsed = +str;
    if (!parsed && parsed !== 0) return Err("could not parse");
    return Ok(parsed);
}

const six = toNumber("6").expect("failed parsing 6");
console.log(`formatted number is ${six}`);

// throws error: 
// panics with expect() - failed parsing someInput : could not parse
const someInput = toNumber("not a number").expect("failed parsing someInput");
```

### Using `createResult`

For those who **HATE** using `return`:

```javascript
import { createResult } from 'rust-result-js';

const toNumber = str => createResult((ok, err) => {
    const parsed = +str;
    if (!parsed && parsed !== 0) err("could not parse");
    ok(parsed);
})

const four = toNumber("4").expect("failed parsing 4");
console.log(`formatted number is ${four}`);
```

This way it looks a lot more like the original `rust` syntax, but overall, it seems less aesthetic.

**Note**: when using `createResult`, you shouldn't use `return` with `ok` and `err`.

### Typescript

This package also supports typescript, as it introduces the `Result` abstract class

```typescript
import {Ok, Err, Result} from 'rust-result-js';

const fetchSomething = async (): Result<string[], string> => {
    try {
        const todosFetch = await fetch('http://something:1234/todos');
        const todos: string[] = await todosFetch.json();
        return Ok(todos);
    } catch (e) {
        return Err("error fetching todos");
    }
}
```

## Available functions

**NOTE**: `available functions` API is identical to rust's original implementation.

This is what implemented so far in this library:

* [`isOk`](#isok)    [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.is_ok)
* [`isErr`](#iserr)  [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.is_err)
* [`expect`](#expect) [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect)
* [`expectErr`](#expecterr) [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.expect_err)
* [`unwrap`](#unwrap) [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap)
* [`unwrapErr`](#unwraperr) [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.unwrap_err)
* [`map`](#map) [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.map)
* [`mapErr`](#maperr) [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.map_err)
* [`mapOr`](#mapor) [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.map_or)
* [`contains`](#contains) [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.contains)
* [`containsErr`](#containserr) [rust docs](https://doc.rust-lang.org/std/result/enum.Result.html#method.contains_err)
* And more to come...

## API References

### isOk

```typescript
function isOk(): boolean{/*...*/}
```

returns `true` if the Result is `Ok`, else returns `false`.

```javascript
const x = Ok(5);
const y = Err('oops! something went wrong');

console.log(x.isOk()) // true
console.log(y.isOk()) // false
```

### isErr

```typescript
function isErr(): boolean{/*...*/}
```

Opposite of `isOk`, returns `true` if Result is `Err`, else returns `false`

```javascript
const x = Ok('im Ok!');
const y = Err('oops! something went wrong');

console.log(x.isErr()) // false
console.log(y.isErr()) // true
```

### expect

```typescript
function expect(msg: string): T{/*...*/}
```

where T - type of `Ok` value

**Returns** the contained `Ok` value. If `Err`, throws error with `msg` including the errorValue.

```javascript
const x = Err("emergency failure");
const val = x.expect("testing expect");
//output: panics with expect() - testing expect : emergency failure.
```

```javascript
const x = Ok(6).expect("error with x"); // x = 6
console.log(x) //output: 6
```

### expectErr

```typescript
function expectErr(msg: string): K{/*...*/}
```

where K - type of `Err` value

**Returns** the contained `Err` value. If `Ok`, throws error with `msg` including Ok's value

```javascript
const x = Ok(6).expectErr("error with x");
//output: [Error] panics with expectErr() : error with x : 6 
```

```javascript
const x = Err("my error value").expectErr("testing expect");
console.log(x) // output: "my error value"
```

### unwrap

```typescript
function unwrap(): T{/*...*/}
```

where `T` type = Ok value's type

Returns the contained `Ok` value, throws if the value is an `Err`.

```javascript
const x = Err(3);
x.unwrap();
// this will throw an error
```

```javascript
const x = Ok(3);
console.log(x.unwrap())
//output: 3
```

### unwrapErr

```typescript
function unwrapErr(): K{/*...*/}
```

where `K` is Err value's Type

Returns the contained `Err` value, throws if the value is an `Ok`.

### map

```typescript
function map<T1>(fn: (val: T) => T1): Result<T1, K>{/*...*/}
```

Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained `Ok` value, leaving an `Err` value
untouched.

```javascript
const three = Ok('3');
const threeAsNumber = three.map(val => parseInt(val));

console.log(typeof val.unwrap());
//output: number
```

### mapErr

```typescript
function mapErr<K1>(fn: (err: K) => K1): Result<T, K1>{/*...*/}
```

Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value
untouched.

```javascript
const errMsg = Err('this is just a message')
const decoratedError = errMsg.mapErr(val => `[ERROR]: ${val}`);
console.log(decoratedError.unwrapErr());
//output: [Error]: this is just a message
```

### mapOr

```typescript
function mapOr<T1>(defaultValue: T1, fn: (val: T) => T1): T1{/*...*/}
```

where T1 new `Ok` value's type

Returns the provided default (if `Err`), or applies a function to the contained value (if `Ok`).

```javascript
const weirdFetch = async () => {
    await sleep(1000);
    const shouldCrash = Math.random() < .5;
    if (shouldCrash) {
        return Err(null)
    }
    return Ok({
        name: 'Deez Nuts',
        id: '666666666'
    });
}

const fetchedPerson = await weirdFetch();
const person = fetchedPerson.mapOr(
    {lname: '', fname: '', id: '0'},
    person => {
        const [fname, ...lname] = person.name.split(' ');
        return {
            id: person.id,
            fname,
            lname: lname.join(' '),
        }
    }
)

console.log(person)
//output: 
// in case of Err: 
//  {lname: '', fname: '', id: '0'}
// in case of Ok:  
//  {lname: 'Nuts', fname: 'Deez', id: '6666666666'}
```

### contains

```typescript
function contains(value: T): boolean{/*...*/}
```

Returns `true` if the result is an `Ok` value containing the given value.

NOTE: It uses `Lodash.isEqual` to compare deep between objects.

```javascript
const x = Ok({a: {b: 3}});

console.log(x.contains({a: {b: 3}})) // returns true
```

### containsErr

```typescript
function containsErr(errValue: K): boolean{/*...*/}
```

Returns true if the result is an Err value containing the given value.

NOTE: It uses `Lodash.isEqual` to compare deep between objects.

```javascript
const x = Err({a: {b: 3}});

console.log(x.containsErr({a: {b: 3}})) // returns true
```

## Contributions

First, if you read this far you deserve congratulations.

Every contributor is welcome. There is a need to keep implementing more functions provided by `rust`'s Result Object (at
least those which we can implement).

## Code Structure

The `Ok` and `Err` are basically wrappers for 2 classes, both of which are inheriting from an abstract
class `Result<T,K>`.

Should you choose to add more functionality, please do the following:

1. Add abstract function to `Result<T,K>`

```typescript
abstract class Result<T, K> {
    abstract myFucntion()
}
```

2. Implement it in both `OkResult` and `ErrResult` classes respectively.

## Branch Convention

For writing features - please branch out from `dev` under `feature/` (e.g. `feature/contains_or`)

For fixing bugs - please branch out from `dev` under `bugfix/` (e.g. `bugfix/create-result-for-async`)
