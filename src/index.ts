import type {Result} from "./results";
import {Err, Ok} from "./results";
import {createResult} from "./utils";

const f = (): Result<number, string> => {
    const x = 7;

    if (x > 5) {
        return Ok(x)
    }
    return Err("Blah Blah");
}

const sleep = (ms:number) => new Promise(res => setTimeout(res,ms));

const composed = createResult((Ok, Err) => {
    const x = 5;
    if (x % 2 === 1) {
        Ok(x)
    }
    Err("even number");
});

const asyncComputed = createResult(async (Ok) => {
   await sleep(200);
   Ok(2);
});

(async () => {
    const result = await composed;
    console.log(result.expect("bad shit with result"));

    const result1 = await asyncComputed;
    console.log(result1.expect("Error with async composer"))
})()

const result = f();
console.log(result.expect("error in sync result"));