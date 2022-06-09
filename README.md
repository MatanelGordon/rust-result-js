# rust-result-js
rust Result object implemented in javascript.

## Installation
****
via npm:
```bash
npm i rust-result-js
```

or yarn:
```bash
yarn add rust-result-js
```

## Usage
****
this package contains 2 implementations: with `createResult` and without.
its error handling is identical to rust's: expect, unwrap, map...

However, since javascript's convention is not snake-case, some methods have a different name:
 - **map_err** = `mapErr` in js
 - **is_ok** = `isOk` in js
 - **unwrap_err** = `unwrapErr` in js
 - etc...
 
Unlike rust, in javascript in order to return a value you must use the `return` keyword.
```javascript
import {Ok,Err} from 'rust-result-js';

const toNumber = (str) => {
    const parsed = +str;
    if(!parsed && parsed !== 0) return Err("could not parse")
    return Ok(parsed);
} 

const six = toNumber("6").expect("failed parsing 6");
console.log(`formatted number is ${six}`);
```

### Using `createResult`
For those who hate using `return`:
```javascript
import {createResult} from 'rust-result-js';

const toNumber = str => createResult((ok, err) => {
    const parsed = +str;
    if(!parsed && parsed !== 0) err("could not parse");
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
    }
    catch(e) {
        return Err("error fetching todos");
    }
}
```

