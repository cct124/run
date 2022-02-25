/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Matter from "matter-js";
import Debug from "./index";
import Module from "./module";

export default class DebugMatter extends Module {
  debug: Debug;
  render: Matter.Render;
  constructor(debug: Debug) {
    super();
    this.debug = debug;
    this.render = Matter.Render.create({
      element: document.getElementById("tool")!,
      engine: debug.physicsEngine.engine,
      options: {
        width: debug.game.app.view.width,
        height: debug.game.app.view.height,
        pixelRatio: 1,
        wireframes: true,
        wireframeBackground: "transparent",
      },
    });
    Matter.Render.run(this.render);
  }

  /**
   * 清除碰撞线
   */
  clear(): boolean {
    return true;
  }
}
