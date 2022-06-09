"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OkResult = void 0;
const Result_1 = require("./Result");
const lodash_1 = __importDefault(require("lodash"));
class OkResult extends Result_1.Result {
    constructor(val) {
        super();
        this.value = val;
    }
    contains(value) {
        return lodash_1.default.isEqual(value, this.value);
    }
    containsErr() {
        return false;
    }
    isOk() {
        return true;
    }
    mapOr(_defaultValue, fn) {
        return fn(this.value);
    }
    expect() {
        return this.value;
    }
    expectErr(msg) {
        throw this.createPanicError(msg);
    }
    map(fn) {
        return new OkResult(fn(this.value));
    }
    mapErr() {
        return new OkResult(this.value);
    }
    unwrap() {
        return this.value;
    }
    unwrapErr() {
        throw this.createPanicError("unwrapErr: called unwrapErr in 'Ok'");
    }
}
exports.OkResult = OkResult;
//# sourceMappingURL=OkResult.js.map