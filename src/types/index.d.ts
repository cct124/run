namespace Print {
  type Log = (...args: unknown[]) => void;
}

interface Window {
  log: Print.Log;
}

declare const window: Window & typeof globalThis;

declare const log: Print.Log;
