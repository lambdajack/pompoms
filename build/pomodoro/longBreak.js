"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pomodoroLongBreak = void 0;
const cli_progress_1 = __importDefault(require("cli-progress"));
const chalk_1 = __importDefault(require("chalk"));
const node_emoji_1 = __importDefault(require("node-emoji"));
const sleep_1 = require("../utils/sleep");
const pomodoroLongBreak = async (longBreakInMins) => {
    const lb1 = new cli_progress_1.default.Bar({
        format: ` ${node_emoji_1.default.get("sun_with_face")} ${chalk_1.default.redBright.bgBlackBright("{bar}")} Long break  | {value}/{total} minutes`,
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
    });
    lb1.start(longBreakInMins, 0);
    let i = 0;
    while (i < longBreakInMins) {
        await (0, sleep_1.waitOneMin)();
        i++;
        lb1.update(i);
    }
    lb1.stop();
};
exports.pomodoroLongBreak = pomodoroLongBreak;
