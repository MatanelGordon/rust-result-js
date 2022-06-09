"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Ok = void 0;
const OkResult_1 = require("./OkResult");
const ErrorResult_1 = require("./ErrorResult");
const Result_1 = require("./Result");
const Ok = (val) => new OkResult_1.OkResult(val);
exports.Ok = Ok;
const Err = (err) => new ErrorResult_1.ErrorResult(err);
exports.Err = Err;
//# sourceMappingURL=index.js.map