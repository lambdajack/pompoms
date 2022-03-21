"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endMessage = exports.readyMessage = exports.welcomeMessage = void 0;
const chalk_1 = __importDefault(require("chalk"));
const node_emoji_1 = __importDefault(require("node-emoji"));
const node_notifier_1 = __importDefault(require("node-notifier"));
const sleep_1 = require("./sleep");
const welcomeMessage = async () => {
    console.log(chalk_1.default.redBright.bold(`

    ██████   ██████  ███    ███ ██████   ██████  ███    ███ ███████ 
    ██   ██ ██    ██ ████  ████ ██   ██ ██    ██ ████  ████ ██      
    ██████  ██    ██ ██ ████ ██ ██████  ██    ██ ██ ████ ██ ███████ 
    ██      ██    ██ ██  ██  ██ ██      ██    ██ ██  ██  ██      ██ 
    ██       ██████  ██      ██ ██       ██████  ██      ██ ███████     
    The pretty & simple terminal Pomodoro timer____*____*____*____*
    `));
    console.log(chalk_1.default.blueBright(`
  - A 25 minute working session, followed by a 5 minute break; repeated 4 times.
  - A longer break of around 20-30 minutes depending on preference.
  - repeat
  `));
};
exports.welcomeMessage = welcomeMessage;
const readyMessage = async () => {
    console.log("\n Okay then...");
    process.stdout.write(chalk_1.default.redBright(` ${node_emoji_1.default.get("hourglass_flowing_sand")} Ready....`));
    await (0, sleep_1.sleep)();
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(chalk_1.default.yellowBright(` ${node_emoji_1.default.get("hourglass")} Ready.... Steady...`));
    await (0, sleep_1.sleep)();
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(chalk_1.default.greenBright(` ${node_emoji_1.default.get("large_green_circle")} Ready.... Steady... Go!`));
    await (0, sleep_1.sleep)();
    console.log("\n");
};
exports.readyMessage = readyMessage;
const endMessage = (roundsCompleted, roundsToComplete, showSystemNotifications, e) => {
    if (e !== "exit")
        process.exit();
    if (roundsCompleted !== roundsToComplete || roundsCompleted === 0)
        console.log("\n");
    if (roundsCompleted > 0) {
        if (roundsCompleted === roundsToComplete) {
            console.log(`
      ${chalk_1.default.green.bold("Congratulations")}, you completed your goal of ${chalk_1.default.blueBright.bold(`${roundsCompleted} of ${roundsToComplete}`)} rounds!

      Really great work! See you next time. ${node_emoji_1.default.get("tada")}
      `);
            if (showSystemNotifications) {
                node_notifier_1.default.notify({
                    title: `Pompoms | Congratulations ${node_emoji_1.default.get("tada")}`,
                    message: `You completed your goal of ${roundsCompleted} rounds.`,
                    time: 10000,
                });
            }
        }
        else {
            console.log(`
  ${chalk_1.default.green.bold("Congratulations")}, you completed ${chalk_1.default.blueBright(roundsCompleted)} full Pomodoro round${roundsCompleted === 1 ? "" : "s"}.
      Nice work! ${node_emoji_1.default.get("tada")}
  `);
        }
    }
    else {
        console.log(chalk_1.default.red(`
        You didn't complete any full Pomodoro rounds this time... ${node_emoji_1.default.get("disappointed")}
        `));
    }
};
exports.endMessage = endMessage;
