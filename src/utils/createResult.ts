import { Err, Ok, Result } from '../results';

export type ResultFunction<T, K> = (
    ok: (val: T) => unknown,
    err: (errVal: K) => unknown
) => unknown;

export const createResult = <T, K>(fn: ResultFunction<T, K>) =>
    new Promise<Result<T, K>>((res) => {
        const WrappedOk = (value: T) => res(Ok(value));
        const WrappedErr = (errValue: K) => res(Err(errValue));
        fn(WrappedOk, WrappedErr);
    });
