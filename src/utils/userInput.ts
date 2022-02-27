import inquirer from "inquirer";

export const getUserInput = async (defaultLongBreakLength: number) => {
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
      20-30 minutes is recommended`,
      default() {
        return defaultLongBreakLength;
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

  if (answers.intendedRounds === "infinite") {
    answers.intendedRounds = 0;
  }

  return {
    roundsToComplete: Math.round(+answers.intendedRounds),
    longBreakInMins: Math.round(+answers.longBreak),
  };
};
