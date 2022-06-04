import {Err, Ok, Result} from "../results";

export type ComposerFunction<T, K> = (ok: (val: T) => void, err: (errVal: K) => void) => unknown;

export const composeResult = <T, K>(fn: ComposerFunction<T, K>) => new Promise<Result<T, K>>(res => {
    const WrappedOk = (value: T) => res(Ok(value));
    const WrappedErr = (errValue: K) => res(Err(errValue));
    fn(WrappedOk, WrappedErr);
})
