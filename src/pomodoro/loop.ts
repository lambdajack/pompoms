import chalk from "chalk";

import { pomodoroLongBreak } from "./longBreak";
import { pomodoroShortBreak } from "./shortBreak";
import { pomodoroWork } from "./work";

let iterations = 0;

export const pomodoroLoop = async (
  roundsToComplete: number,
  longBreakInMins: number
) => {
  let mainSeqReps = 0;

  while (mainSeqReps < 3) {
    mainSeqReps++;
    await pomodoroWork();
    await pomodoroShortBreak();
  }
  await pomodoroWork();
  iterations++;

  if (iterations !== roundsToComplete) {
    console.log(`
  That's ${iterations} full pomodoro rounds complete. Great work!
    Time for a nice ${chalk.blue(`${longBreakInMins} minute break`)} to reset.
  `);
    await pomodoroLongBreak(longBreakInMins);

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

  return { roundsCompleted: iterations };
};
