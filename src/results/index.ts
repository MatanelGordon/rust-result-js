import { OkResult } from './OkResult';
import { ErrorResult } from './ErrorResult';
import {Result} from "./Result";

export type { Result };
export const Ok = <T, K>(val: T):Result<T, K> => new OkResult<T, K>(val);
export const Err = <T, K>(err: K):Result<T, K> => new ErrorResult<T, K>(err);
