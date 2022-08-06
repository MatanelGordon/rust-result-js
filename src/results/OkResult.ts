import { Result } from './Result';
import _ from "lodash";

export class OkResult<T, K> extends Result<T, K> {
    private readonly value: T;

    constructor(val: T) {
        super();
        this.value = val;
    }

    contains(value: T): boolean {
        return _.isEqual(value, this.value);
    }

    containsErr(): boolean {
        return false;
    }
    
    isOk(): boolean {
        return true;
    }

    mapOr<T1>(_defaultValue: T1, fn: (val: T) => T1): T1 {
        return fn(this.value);
    }

    expect(): T {
        return this.value;
    }

    expectErr(msg: string): K {
        throw this.createPanicError(`expectErr() : ${msg} - ${this.value}`);
    }

    map<T1>(fn: (val: T) => T1): Result<T1, K> {
        return new OkResult<T1, K>(fn(this.value));
    }

    mapErr<K1>(): Result<T, K1> {
        return new OkResult(this.value);
    }

    unwrap(): T {
        return this.value;
    }

    unwrapErr(): K {
        throw this.createPanicError("unwrapErr: called unwrapErr in 'Ok'");
    }
}
