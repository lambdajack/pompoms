"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pomodoroLoop = void 0;
const chalk_1 = __importDefault(require("chalk"));
const node_notifier_1 = __importDefault(require("node-notifier"));
const longBreak_1 = require("./longBreak");
const shortBreak_1 = require("./shortBreak");
const work_1 = require("./work");
let iterations = 0;
const pomodoroLoop = async (roundsToComplete, longBreakInMins, showSystemNotifications) => {
    let mainSeqReps = 0;
    while (mainSeqReps < 3) {
        mainSeqReps++;
        await (0, work_1.pomodoroWork)();
        if (showSystemNotifications) {
            node_notifier_1.default.notify({
                title: "Pompoms",
                message: "Time for a 5 minute break",
                time: 10000,
            });
        }
        await (0, shortBreak_1.pomodoroShortBreak)();
        if (showSystemNotifications) {
            node_notifier_1.default.notify({
                title: "Pompoms",
                message: "Break time over; back to it!",
                time: 10000,
            });
        }
    }
    await (0, work_1.pomodoroWork)();
    iterations++;
    if (showSystemNotifications) {
        node_notifier_1.default.notify({
            title: "Pompoms | Great progress!",
            message: `${iterations} round${iterations > 1 ? "s" : ""} complete. Time for a long break. See you in ${longBreakInMins} minutes.`,
            time: 10000,
        });
    }
    if (iterations !== roundsToComplete) {
        console.log(`
  That's ${iterations} full Pomodoro rounds complete. Great work!
    Time for a nice ${chalk_1.default.blueBright(`${longBreakInMins} minute break`)} to reset.
  `);
        await (0, longBreak_1.pomodoroLongBreak)(longBreakInMins);
        if (showSystemNotifications) {
            node_notifier_1.default.notify({
                title: "Pompoms",
                message: "Break time over, time to start another round.",
                time: 10000,
            });
        }
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
