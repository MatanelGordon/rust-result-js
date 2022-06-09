import { Result } from './Result';
export declare class ErrorResult<T, K> extends Result<T, K> {
    private readonly errorValue;
    constructor(err: K);
    expect(msg: string): T;
    expectErr(): K;
    map<T1>(): Result<T1, K>;
    mapErr<K1>(fn: (err: K) => K1): Result<T, K1>;
    unwrap(): T;
    isOk(): boolean;
    mapOr<T1>(defaultValue: T1): T1;
    unwrapErr(): K;
    contains(): boolean;
    containsErr(errValue: K): boolean;
}
