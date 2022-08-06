export abstract class Result<T, K> {
    /**
     * @param {string} msg error message
     * @returns value if Ok(), throws with msg if Err()
     */
    abstract expect(msg: string): T;

    /**
     * @param {string} msg error message
     * @returns value if Err(), throws with msg if Ok()
     */
    abstract expectErr(msg: string): K;

    /**
     * @returns the contained Ok value, throws if Err
     */
    abstract unwrap(): T;

    /**
     * @returns the contained Err value, throws if Ok
     */
    abstract unwrapErr(): K;

    /**
     * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched.
     * This function can be used to compose the results of two functions.
     * @param fn {function} value mapping function
     * @returns new Result after mapping
     */
    abstract map<T1>(fn: (val: T) => T1): Result<T1, K>;

    /**
     * Maps a Result<T, E> to Result<T, F> by applying a function to a contained Err value, leaving an Ok value untouched.
     *
     * This function can be used to pass through a successful result while handling an error.
     * @param fn {function} err value mapping function
     * @returns new Result after mapping
     */
    abstract mapErr<K1>(fn: (err: K) => K1): Result<T, K1>;

    /**
     * @returns {boolean} true if the result is Ok.
     */
    abstract isOk(): boolean;

    /**
     * @param defaultValue default value
     * @param fn {function} Ok value mapping function
     * @returns the provided default (if Err), or applies a function to the contained value (if Ok)
     */
    abstract mapOr<T1>(defaultValue: T1, fn: (val: T) => T1): T1;

    /**
     * @param value value you think is contained inside Ok
     * @returns {boolean} true if the result is an Ok value containing the given value.
     */
    abstract contains(value:T): boolean;

    /**
     * @param errValue value you think is contained inside Err
     * @returns {boolean} true if the result is Err value containing the given value.
     */
    abstract containsErr(errValue:K): boolean;

    /**
     * @returns {boolean} the opposite of isOk()
     */
    isErr(): boolean {
        return !this.isOk();
    }

    /**
     * @param msg {string} error message to panic
     * @protected
     * @returns new Error with a panic
     */
    protected createPanicError(msg: string): Error {
        return new Error(`panics with ${msg}`);
    }
}
