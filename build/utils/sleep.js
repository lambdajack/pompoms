"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitOneMin = exports.sleep = void 0;
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
exports.sleep = sleep;
const waitOneMin = async () => {
    if (process.env.NODE_ENV === "development") {
        return await (0, exports.sleep)(100);
    }
    else {
        return await (0, exports.sleep)(60000);
    }
};
exports.waitOneMin = waitOneMin;
