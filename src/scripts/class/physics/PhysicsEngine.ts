import Matter from "matter-js";
import Decomp from "poly-decomp";

export default class PhysicsEngine {
  engine: Matter.Engine;
  world: Matter.World;
  runner: Matter.Runner;
  matterRunner: Matter.Runner;
  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.runner = Matter.Runner.create();
    this.matterRunner = Matter.Runner.run(this.runner, this.engine);
    Matter.Common.setDecomp(Decomp);
  }
}
