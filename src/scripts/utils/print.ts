export default class Print {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  log(...data: unknown[]): void {
    console.log(...data);
  }
}
