import {ErrorResult} from "./ErrorResult";
import {OkResult} from "./OkResult";
import type {Result as Result} from "./Result";

const Ok = <T,K>(val:T) => new OkResult<T,K>(val);
const Err = <T,K>(err:K) => new ErrorResult<T,K>(err);

const f = (): Result<number, string> => {
    const x = 3;

    if(x > 5){
        return Ok(x)
    }
    return Err("Blah Blah");
}

const result = f();
console.log(result.expect("errored in f"))