import Debug from "./";

export default abstract class Module {
  abstract debug: Debug;
  abstract clear(): boolean;
}
