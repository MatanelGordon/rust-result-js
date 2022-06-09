import { Result } from "./Result";
export type { Result };
export declare const Ok: <T, K>(val: T) => Result<T, K>;
export declare const Err: <T, K>(err: K) => Result<T, K>;
