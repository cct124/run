import Matter from "matter-js";
import Decomp from "poly-decomp";

export enum BodyType {
  Player = "Player",
}

export default class PhysicsEngine {
  engine: Matter.Engine;
  world: Matter.World;
  runner: Matter.Runner;
  detector: Matter.Detector;
  matterRunner: Matter.Runner;
  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.runner = Matter.Runner.create();
    this.detector = Matter.Detector.create();
    this.matterRunner = Matter.Runner.run(this.runner, this.engine);
    Matter.Common.setDecomp(Decomp);
  }
}
