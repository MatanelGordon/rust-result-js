"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const results_1 = require("./results");
const utils_1 = require("./utils");
const f = () => {
    const x = 7;
    if (x > 5) {
        return (0, results_1.Ok)(x);
    }
    return (0, results_1.Err)('Blah Blah');
};
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const composed = (0, utils_1.createResult)((Ok, Err) => {
    const x = 5;
    if (x % 2 === 1) {
        Ok(x);
    }
    Err('even number');
});
const asyncComputed = (0, utils_1.createResult)(async (Ok) => {
    await sleep(200);
    Ok(2);
});
const asyncF = async () => {
    await sleep(1000);
    const x = 6;
    if (x % 2 === 0) {
        return (0, results_1.Ok)(x);
    }
    return (0, results_1.Err)('error in async function');
};
(async () => {
    const result = await composed;
    console.log(result.expect('bad shit with result'));
    const result1 = await asyncComputed;
    console.log(result1.expect('Error with async composer'));
    const result2 = await asyncF();
    console.log(result2.expect('Error with async func'));
})();
const result = f();
console.log(result.expect('error in sync result'));
//# sourceMappingURL=examples.js.map