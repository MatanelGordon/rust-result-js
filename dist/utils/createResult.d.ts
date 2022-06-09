import { Result } from '../results';
export declare type ResultFunction<T, K> = (ok: (val: T) => unknown, err: (errVal: K) => unknown) => unknown;
export declare const createResult: <T, K>(fn: ResultFunction<T, K>) => Promise<Result<T, K>>;
