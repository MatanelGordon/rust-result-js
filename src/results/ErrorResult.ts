import { Result } from './Result';
import _ from "lodash";

export class ErrorResult<T, K> extends Result<T, K> {
    private readonly errorValue: K;

    constructor(err: K) {
        super();
        this.errorValue = err;
    }

    expect(msg: string): T {
        throw this.createPanicError(`expect() - ${msg} : ${this.errorValue}`);
    }

    expectErr(): K {
        return this.errorValue;
    }

    map<T1>(): Result<T1, K> {
        return new ErrorResult<T1, K>(this.errorValue);
    }

    mapErr<K1>(fn: (err: K) => K1): Result<T, K1> {
        return new ErrorResult<T, K1>(fn(this.errorValue));
    }

    unwrap(): T {
        throw this.createPanicError('unwrap(): called unwrap in an Err');
    }

    isOk(): boolean {
        return false;
    }

    mapOr<T1>(defaultValue: T1): T1 {
        return defaultValue;
    }

    unwrapErr(): K {
        return this.errorValue;
    }

    contains(): boolean {
        return false;
    }

    containsErr(errValue: K): boolean {
        return _.isEqual(errValue, this.errorValue);
    }
}
