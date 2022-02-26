"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pomodoroShortBreak = void 0;
const cli_progress_1 = __importDefault(require("cli-progress"));
const node_emoji_1 = __importDefault(require("node-emoji"));
const chalk_1 = __importDefault(require("chalk"));
const sleep_1 = require("../utils/sleep");
const shortBreakInMins = 5;
const pomodoroShortBreak = async () => {
    const sb1 = new cli_progress_1.default.Bar({
        format: ` ${node_emoji_1.default.get("cup_with_straw")} ${chalk_1.default.bgBlackBright("{bar}")} Short break  | {value}/{total} minutes`,
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
    });
    sb1.start(shortBreakInMins, 0);
    let i = 0;
    while (i < shortBreakInMins) {
        await (0, sleep_1.waitOneMin)();
        i++;
        sb1.update(i);
    }
    sb1.stop();
};
exports.pomodoroShortBreak = pomodoroShortBreak;
