/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as PIXI from "pixi.js";
import Walls, { WallsChannel } from "../walls/walls";
import Debug from "./index";

export default class DebugWalls {
  debug: Debug;
  walls: Walls;
  container = new PIXI.Container();
  constructor(debug: Debug) {
    this.debug = debug;
    this.walls = this.debug.game.scroller!.walls;
    this.debug.container.addChild(this.container);
    console.log(this.debug.container.getChildIndex(this.container));
    this.handleWallsGround();
  }

  /**
   * 处理地面边界
   */
  handleWallsGround() {
    this.walls.listen(WallsChannel.update, () => {
      for (
        let index = this.walls.leftIndex;
        index <= this.walls.rightIndex;
        index++
      ) {
        if (this.walls.wallsMap[index].sprites.size !== 0) {
          this.container.addChild(this.walls.wallsMap[index].groundLineDraw());
        }
      }
    });
  }
}
