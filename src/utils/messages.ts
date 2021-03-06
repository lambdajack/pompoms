import chalk from "chalk";
import emoji from "node-emoji";
import notifier from "node-notifier";

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
  Pomodoro Round:

  1. A 25 minute work session, followed by a 5 minute break; repeated 3 times.
  2. A 25 minute work session, followed by a longer break.
  3. Repeat steps 1 and 2, as desired.
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

export const colourInspirationMessage = () => {
  console.log(
    chalk.cyan(
      `I find myself falling deeper and deeper into the realms of science fiction. 
This colour palette reflects my visions...`
    )
  );
  console.log(
    chalk.cyanBright(`The colour theme will change periodically, and whimsically.
    `)
  );
};

export const endMessage = (
  roundsCompleted: number,
  roundsToComplete: number,
  showSystemNotifications: boolean,
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
      if (showSystemNotifications) {
        notifier.notify({
          title: `Pompoms | Congratulations ${emoji.get("tada")}`,
          message: `You completed your goal of ${roundsCompleted} rounds.`,
          time: 10000,
        });
      }
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
