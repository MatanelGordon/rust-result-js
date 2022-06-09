"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    createPanicError(msg) {
        return new Error(`panics with ${msg}`);
    }
    isErr() {
        return !this.isOk();
    }
}
exports.Result = Result;
//# sourceMappingURL=Result.js.map