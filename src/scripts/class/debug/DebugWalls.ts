/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as PIXI from "pixi.js";
import Walls, { WallsChannel } from "../walls/walls";
import Debug from "./index";
import Module from "./module";

export default class DebugWalls extends Module {
  debug: Debug;
  walls: Walls;
  container = new PIXI.Container();
  clearListen: () => boolean;
  constructor(debug: Debug) {
    super();
    this.debug = debug;
    this.walls = this.debug.game.scroller!.walls;
    this.debug.container.addChild(this.container);
    this.clearListen = this.walls.listen(WallsChannel.update, () =>
      this.handleWallsGround()
    );
    // this.handleWallsGround();
  }

  /**
   * 处理地面边界
   */
  private handleWallsGround() {
    // for (
    //   let index = this.walls.leftIndex;
    //   index <= this.walls.rightIndex;
    //   index++
    // ) {
    //   // if (this.walls.wallsMap[index].sprites.size !== 0) {
    //   //   console.log(this.walls.wallsMap[index].groundLineDraw());
    //   // }
    //   // console.log(this.walls.wallsMap[index]);
    //   if (this.walls.wallsMap[index])
    //     this.container.addChild(this.walls.wallsMap[index]!.groundLineDraw());
    // }
  }

  /**
   * 清除碰撞线
   */
  clear(): boolean {
    this.debug.container.removeChild(this.container);
    this.clearListen();
    return true;
  }
}
