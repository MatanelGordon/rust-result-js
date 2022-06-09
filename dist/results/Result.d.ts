export declare abstract class Result<T, K> {
    abstract expect(msg: string): T;
    abstract expectErr(msg: string): K;
    abstract unwrap(): T;
    abstract unwrapErr(): K;
    abstract map<T1>(fn: (val: T) => T1): Result<T1, K>;
    abstract mapErr<K1>(fn: (err: K) => K1): Result<T, K1>;
    abstract isOk(): boolean;
    abstract mapOr<T1>(defaultValue: T1, fn: (val: T) => T1): T1;
    abstract contains(value: T): boolean;
    abstract containsErr(errValue: K): boolean;
    protected createPanicError(msg: string): Error;
    isErr(): boolean;
}
