"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInput = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const getUserInput = async (defaultLongBreakLength) => {
    const answers = await inquirer_1.default.prompt([
        {
            name: "intendedRounds",
            type: "input",
            message: `How many rounds do you want to complete? 
      Leave blank to go forever!`,
            default() {
                return "infinite";
            },
            validate: (input) => {
                if (isNaN(input) && input !== "infinite") {
                    return "Input must be a valid number, or 'infinite'. e.g: 2";
                }
                else {
                    return true;
                }
            },
        },
        {
            name: "longBreak",
            type: "input",
            message: `How long will your 'long breaks' be?
      20-30 minutes is recommend`,
            default() {
                return defaultLongBreakLength;
            },
            validate: (input) => {
                if (isNaN(input)) {
                    return "Input must be a valid number. e.g: 30";
                }
                else {
                    return true;
                }
            },
        },
    ]);
    if (answers.intendedRounds === "infinite") {
        answers.intendedRounds = 0;
    }
    return {
        roundsToComplete: +answers.intendedRounds,
        longBreakInMins: +answers.longBreak,
    };
};
exports.getUserInput = getUserInput;
