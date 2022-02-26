"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pomodoroWork = void 0;
const cli_progress_1 = __importDefault(require("cli-progress"));
const chalk_1 = __importDefault(require("chalk"));
const node_emoji_1 = __importDefault(require("node-emoji"));
const sleep_1 = require("../utils/sleep");
const workInMins = 25;
const pomodoroWork = async () => {
    const w1 = new cli_progress_1.default.Bar({
        format: ` ${node_emoji_1.default.get("memo")} ${chalk_1.default.greenBright.bgBlackBright("{bar}")} Working      | {value}/{total} minutes`,
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
    });
    w1.start(workInMins, 0);
    let i = 0;
    while (i < workInMins) {
        await (0, sleep_1.waitOneMin)();
        i++;
        w1.update(i);
    }
    w1.stop();
};
exports.pomodoroWork = pomodoroWork;
