import {Result} from "./Result";

export class OkResult<T,K> extends Result<T, K>{
    private readonly value: T;

    constructor(val:T) {
        super();
        this.value = val;
    }

    isOk(): boolean {
        return true;
    }

    mapOr<T1>(_defaultValue: T1, fn: (val: T) => T1): T1 {
        return fn(this.value)
    }

    expect(): T {
        return this.value;
    }

    expectErr(msg: string): K {
        throw this.createPanicError(msg);
    }

    map<T1>(fn: (val: T) => T1): Result<T1, K> {
        return new OkResult<T1,K>(fn(this.value));
    }

    mapErr<K1>(): Result<T, K1> {
        return new OkResult(this.value);
    }

    unwrap(): T {
        return this.value
    }

    unwrapErr():K{
        throw this.createPanicError('unwrapErr: called unwrapErr in \'Ok\'');
    }
}