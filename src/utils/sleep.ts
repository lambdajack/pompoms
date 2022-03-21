export const sleep = (ms: number = 1000) =>
  new Promise((r: any) => setTimeout(r, ms));
export const waitOneMin = async () => {
  if (process.env.NODE_ENV === "development") {
    return await sleep(100);
  } else {
    return await sleep(60000);
  }
};
