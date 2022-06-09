"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResult = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Result_1 = require("./Result");
class ErrorResult extends Result_1.Result {
    constructor(err) {
        super();
        this.errorValue = err;
    }
    expect(msg) {
        throw this.createPanicError(`expect() - ${msg} : ${this.errorValue}`);
    }
    expectErr() {
        return this.errorValue;
    }
    map() {
        return new ErrorResult(this.errorValue);
    }
    mapErr(fn) {
        return new ErrorResult(fn(this.errorValue));
    }
    unwrap() {
        throw this.createPanicError('unwrap(): called unwrap in an Err');
    }
    isOk() {
        return false;
    }
    mapOr(defaultValue) {
        return defaultValue;
    }
    unwrapErr() {
        return this.errorValue;
    }
    contains() {
        return false;
    }
    containsErr(errValue) {
        return lodash_1.default.isEqual(errValue, this.errorValue);
    }
}
exports.ErrorResult = ErrorResult;
//# sourceMappingURL=ErrorResult.js.map