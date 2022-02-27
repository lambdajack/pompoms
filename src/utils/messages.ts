import chalk from "chalk";
import emoji from "node-emoji";

import { sleep } from "./sleep";

export const welcomeMessage = async () => {
  console.log(
    chalk.redBright.bold(`

    ██████   ██████  ███    ███ ██████   ██████  ███    ███ ███████ 
    ██   ██ ██    ██ ████  ████ ██   ██ ██    ██ ████  ████ ██      
    ██████  ██    ██ ██ ████ ██ ██████  ██    ██ ██ ████ ██ ███████ 
    ██      ██    ██ ██  ██  ██ ██      ██    ██ ██  ██  ██      ██ 
    ██       ██████  ██      ██ ██       ██████  ██      ██ ███████     
    The pretty & simple terminal Pomodoro timer____*____*____*____*
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

export const readyMessage = async () => {
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

export const endMessage = (
  roundsCompleted: number,
  roundsToComplete: number,
  e?: string
) => {
  if (e !== "exit") process.exit();

  if (roundsCompleted !== roundsToComplete || roundsCompleted === 0)
    console.log("\n");
  if (roundsCompleted > 0) {
    if (roundsCompleted === roundsToComplete) {
      console.log(`
      ${chalk.green.bold(
        "Congratulations"
      )}, you completed your goal of ${chalk.blueBright.bold(
        `${roundsCompleted} of ${roundsToComplete}`
      )} rounds!

      Really great work! See you next time. ${emoji.get("tada")}
      `);
    } else {
      console.log(`
  ${chalk.green.bold("Congratulations")}, you completed ${chalk.blueBright(
        roundsCompleted
      )} full Pomodoro round${roundsCompleted === 1 ? "" : "s"}.
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
