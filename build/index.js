#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loop_1 = require("./pomodoro/loop");
const messages_1 = require("./utils/messages");
const userInput_1 = require("./utils/userInput");
const workInMins = 25;
const shortBreakInMins = 5;
let roundsToComplete = 0;
let roundsCompleted = 0;
let longBreakInMins = 25;
const main = async () => {
    (0, messages_1.welcomeMessage)();
    ({ longBreakInMins, roundsToComplete } = await (0, userInput_1.getUserInput)(longBreakInMins));
    await (0, messages_1.readyMessage)();
    while (roundsCompleted < roundsToComplete || roundsToComplete === 0) {
        ({ roundsCompleted } = await (0, loop_1.pomodoroLoop)(roundsToComplete, longBreakInMins));
    }
};
["SIGINT", "exit"].forEach((e) => process.on(e, () => (0, messages_1.endMessage)(roundsCompleted, roundsToComplete, e)));
main();
