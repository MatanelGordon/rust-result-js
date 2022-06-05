export abstract class Result<T, K> {
    abstract expect(msg: string): T;
    abstract expectErr(msg: string): K;
    abstract unwrap(): T;
    abstract unwrapErr(): K;
    abstract map<T1>(fn: (val: T) => T1): Result<T1, K>;
    abstract mapErr<K1>(fn: (err: K) => K1): Result<T, K1>;
    abstract isOk(): boolean;
    abstract mapOr<T1>(defaultValue: T1, fn: (val: T) => T1): T1;

    protected createPanicError(msg: string): Error {
        return new Error(`panics with ${msg}`);
    }

    isErr(): boolean {
        return !this.isOk();
    }
}
