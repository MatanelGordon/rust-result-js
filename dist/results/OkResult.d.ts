import { Result } from './Result';
export declare class OkResult<T, K> extends Result<T, K> {
    private readonly value;
    constructor(val: T);
    contains(value: T): boolean;
    containsErr(): boolean;
    isOk(): boolean;
    mapOr<T1>(_defaultValue: T1, fn: (val: T) => T1): T1;
    expect(): T;
    expectErr(msg: string): K;
    map<T1>(fn: (val: T) => T1): Result<T1, K>;
    mapErr<K1>(): Result<T, K1>;
    unwrap(): T;
    unwrapErr(): K;
}
