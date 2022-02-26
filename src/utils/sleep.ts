export const sleep = (ms: number = 1000) =>
  new Promise((r: any) => setTimeout(r, ms));
export const waitOneMin = async () => await sleep(10);
