import type {Result} from "./results";
import {Err, Ok} from "./results";
import type {ComposerFunction} from "./composers";
import {composeResult} from "./composers";

const f = (): Result<number, string> => {
    const x = 3;

    if (x > 5) {
        return Ok(x)
    }
    return Err("Blah Blah");
}

const fn: ComposerFunction<number, string> = (Ok, Err) => {
    const x = 6;
    if (x % 2 === 1) {
        Ok(x)
    }
    Err("even number");
}

(async () => {
    const result = await composeResult(fn);
    console.log(result.expect("bad shit with result"));
})()

const result = f();
console.log(result.expect("error in sync result"));