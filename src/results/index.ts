import {OkResult} from "./OkResult";
import {ErrorResult} from "./ErrorResult";
export type {Result} from "./Result";

export const Ok = <T,K>(val:T) => new OkResult<T,K>(val);
export const Err = <T,K>(err:K) => new ErrorResult<T,K>(err);