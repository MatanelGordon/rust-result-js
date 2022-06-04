import type {Result} from "./results/Result";
import {Err, Ok} from "./results";


/*const f = (): Result<number, string> => {
    const x = 3;

    if(x > 5){
        return Ok(x)
    }
    return Err("Blah Blah");
}*/

type ComposerFunction<T,K> = (ok:(val:T) => void, err: (errVal:K) => void) => unknown;

const composeResult = <T, K>(fn:ComposerFunction<T,K>) => new Promise<Result<T, K>>(res => {
    const WrappedOk = (value:T) => res(Ok(value));
    const WrappedErr = (errValue:K) => res(Err(errValue));
    fn(WrappedOk, WrappedErr);
})

const fn:ComposerFunction<number, string> = (Ok, Err) => {
    const x = 6;
    if(x % 2 === 1){
        Ok(x)
    }
    Err("even number");
}

(async () => {
    const result = await composeResult(fn);
    console.log(result.expect("bad shit with result"));
})()
