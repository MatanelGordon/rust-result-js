"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResult = void 0;
const results_1 = require("../results");
const createResult = (fn) => new Promise((res) => {
    const WrappedOk = (value) => res((0, results_1.Ok)(value));
    const WrappedErr = (errValue) => res((0, results_1.Err)(errValue));
    fn(WrappedOk, WrappedErr);
});
exports.createResult = createResult;
//# sourceMappingURL=createResult.js.map