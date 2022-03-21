import chalk from "chalk";
import notifier from "node-notifier";

import { pomodoroLongBreak } from "./longBreak";
import { pomodoroShortBreak } from "./shortBreak";
import { pomodoroWork } from "./work";

let iterations = 0;

export const pomodoroLoop = async (
  roundsToComplete: number,
  longBreakInMins: number,
  showSystemNotifications: boolean
) => {
  let mainSeqReps = 0;

  while (mainSeqReps < 3) {
    mainSeqReps++;
    await pomodoroWork();
    if (showSystemNotifications) {
      notifier.notify({
        title: "Pompoms",
        message: "Time for a 5 minute break",
        time: 10000,
      });
    }
    await pomodoroShortBreak();
    if (showSystemNotifications) {
      notifier.notify({
        title: "Pompoms",
        message: "Break time over; back to it!",
        time: 10000,
      });
    }
  }
  await pomodoroWork();
  iterations++;
  if (showSystemNotifications) {
    notifier.notify({
      title: "Pompoms | Great progress!",
      message: `${iterations} round${
        iterations > 1 ? "s" : ""
      } complete. Time for a long break. See you in ${longBreakInMins} minutes.`,
      time: 10000,
    });
  }

  if (iterations !== roundsToComplete) {
    console.log(`
  That's ${iterations} full Pomodoro rounds complete. Great work!
    Time for a nice ${chalk.blueBright(
      `${longBreakInMins} minute break`
    )} to reset.
  `);
    await pomodoroLongBreak(longBreakInMins);

    if (showSystemNotifications) {
      notifier.notify({
        title: "Pompoms",
        message: "Break time over, time to start another round.",
        time: 10000,
      });
    }

    console.log(`
  Okay, good stuff. Break's over... ${chalk.yellowBright.bold(
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
