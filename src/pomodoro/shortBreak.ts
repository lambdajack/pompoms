import cliProgress from "cli-progress";
import emoji from "node-emoji";
import chalk from "chalk";

import { waitOneMin } from "../utils/sleep";

const shortBreakInMins = 5;

export const pomodoroShortBreak = async () => {
  const sb1 = new cliProgress.Bar({
    format: ` ${emoji.get("cup_with_straw")} ${chalk.whiteBright(
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
