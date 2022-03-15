"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pomodoroLoop = void 0;
const chalk_1 = __importDefault(require("chalk"));
const longBreak_1 = require("./longBreak");
const shortBreak_1 = require("./shortBreak");
const work_1 = require("./work");
let iterations = 0;
const pomodoroLoop = async (roundsToComplete, longBreakInMins) => {
    let mainSeqReps = 0;
    while (mainSeqReps < 3) {
        mainSeqReps++;
        await (0, work_1.pomodoroWork)();
        await (0, shortBreak_1.pomodoroShortBreak)();
    }
    await (0, work_1.pomodoroWork)();
    iterations++;
    if (iterations !== roundsToComplete) {
        console.log(`
  That's ${iterations} full Pomodoro rounds complete. Great work!
    Time for a nice ${chalk_1.default.blueBright(`${longBreakInMins} minute break`)} to reset.
  `);
        await (0, longBreak_1.pomodoroLongBreak)(longBreakInMins);
        console.log(`
  Okay, good stuff. Break's over... ${chalk_1.default.yellowBright.bold("let's get back to it!")}
  ${roundsToComplete > 0
            ? `${iterations} of ${roundsToComplete} rounds complete.`
            : ""}
  `);
    }
    return { roundsCompleted: iterations };
};
exports.pomodoroLoop = pomodoroLoop;
