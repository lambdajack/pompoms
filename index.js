#!/usr/bin/env Node

import chalk from "chalk";
import inquirer from "inquirer";
import cliProgress from "cli-progress";
import emoji from "node-emoji";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
const waitOneMin = async () => await sleep(60000);

const workInMins = 25;
const shortBreakInMins = 5;

let longBreakInMins = 25;
let roundsToComplete = 0;
let iterations = 0;

const welcomeMessage = async () => {
  console.log(
    chalk.redBright.bold(`

    ██████   ██████  ███    ███ ██████   ██████  ███    ███ ███████ 
    ██   ██ ██    ██ ████  ████ ██   ██ ██    ██ ████  ████ ██      
    ██████  ██    ██ ██ ████ ██ ██████  ██    ██ ██ ████ ██ ███████ 
    ██      ██    ██ ██  ██  ██ ██      ██    ██ ██  ██  ██      ██ 
    ██       ██████  ██      ██ ██       ██████  ██      ██ ███████     
    The super simple javascript Pomodoro timer____*____*____*____*
    `)
  );

  console.log(
    chalk.blueBright(`
  - A 25 minute working session, followed by a 5 minute break; repeated 4 times.
  - A longer break of around 20-30 minutes depending on preference.
  - repeat
  `)
  );
};

const readyMessage = async () => {
  console.log("\n Okay then...");
  process.stdout.write(
    chalk.redBright(` ${emoji.get("hourglass_flowing_sand")} Ready....`)
  );
  await sleep();
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(
    chalk.yellowBright(` ${emoji.get("hourglass")} Ready.... Steady...`)
  );
  await sleep();
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(
    chalk.greenBright(
      ` ${emoji.get("large_green_circle")} Ready.... Steady... Go!`
    )
  );
  await sleep();
  console.log("\n");
};

const getOptions = async () => {
  const answers = await inquirer.prompt([
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
        } else {
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
        return longBreakInMins;
      },
      validate: (input) => {
        if (isNaN(input)) {
          return "Input must be a valid number. e.g: 30";
        } else {
          return true;
        }
      },
    },
  ]);

  if (answers.intendedRounds !== "infinite") {
    roundsToComplete = +answers.intendedRounds;
  }
  longBreakInMins = +answers.longBreak;
};

const pomodoroWork = async () => {
  const w1 = new cliProgress.Bar({
    format: ` ${emoji.get("memo")} ${chalk.greenBright.bgBlackBright(
      "{bar}"
    )} Working      | {value}/{total} minutes`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });
  w1.start(workInMins, 0);

  let i = 0;
  while (i < workInMins) {
    await waitOneMin();
    i++;
    w1.update(i);
  }

  w1.stop();
};

const pomodoroShortBreak = async () => {
  const sb1 = new cliProgress.Bar({
    format: ` ${emoji.get("cup_with_straw")} ${chalk.bgBlackBright(
      "{bar}"
    )} Short break  | {value}/{total} minutes`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });
  sb1.start(shortBreakInMins, 0);

  let i = 0;
  while (i < shortBreakInMins) {
    await waitOneMin();
    i++;
    sb1.update(i);
  }

  sb1.stop();
};

const pomodoroLongBreak = async () => {
  const lb1 = new cliProgress.Bar({
    format: ` ${emoji.get("sun_with_face")} ${chalk.redBright.bgBlackBright(
      "{bar}"
    )} Long break  | {value}/{total} minutes`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });
  lb1.start(longBreakInMins, 0);

  let i = 0;
  while (i < longBreakInMins) {
    await waitOneMin();
    i++;
    lb1.update(i);
  }

  lb1.stop();
};

const pomodoroLoop = async () => {
  let repetitions = 0;
  while (repetitions < 3) {
    repetitions++;
    await pomodoroWork();
    await pomodoroShortBreak();
  }
  await pomodoroWork();
  iterations++;

  if (iterations < roundsToComplete || roundsToComplete === 0) {
    console.log(`
  That's ${iterations} full pomodoro rounds complete. Great work!
    Time for a nice ${chalk.blue(`${longBreakInMins} minute break`)} to reset.
  `);
    await pomodoroLongBreak();
  } else {
    process.exit();
  }

  if (iterations !== roundsToComplete) {
    console.log(`
  Okay, good stuff. Break's over... ${chalk.yellow.bold(
    "let's get back to it!"
  )}
  ${
    roundsToComplete > 0
      ? `${iterations} of ${roundsToComplete} rounds complete.`
      : ""
  }
  `);
  }
  if (iterations === roundsToComplete && roundsToComplete > 0) {
    process.exit();
  }
  pomodoroLoop();
};

const endMessage = (e) => {
  if (e !== "exit") process.exit();
  if (iterations !== roundsToComplete) console.log("\n");
  if (iterations > 0) {
    if (iterations === roundsToComplete) {
      console.log(`
      ${chalk.green.bold(
        "Congratulations"
      )}, you completed your goal of ${chalk.blueBright(
        `${iterations} of ${roundsToComplete}`
      )} rounds!
      
      Really great work! See you next time. ${emoji.get("tada")}
      `);
    } else {
      console.log(`
  ${chalk.green.bold("Congratulations")}, you completed ${chalk.blueBright(
        iterations
      )} full Pomodoro round${iterations === 1 ? "" : "s"}.
      Nice work! ${emoji.get("tada")}
  `);
    }
  } else {
    console.log(
      chalk.red(
        `
        You didn't complete any full Pomodoro rounds this time... ${emoji.get(
          "disappointed"
        )}
        `
      )
    );
  }
};

["SIGINT", "exit"].forEach((e) => process.on(e, () => endMessage(e)));

await welcomeMessage();
await getOptions();
await readyMessage();
await pomodoroLoop();
