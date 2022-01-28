import * as PIXI from "pixi.js";
import { WallEdge, config } from "@/config";

/**
 * 墙壁边缘
 */
export default class Edge extends PIXI.Sprite {
  direction: boolean;
  leftGround: [number, number][] = [
    [18, 6],
    [64, 6],
    [64, 64],
    [18, 64],
  ];
  rightGround: [number, number][] = [
    [0, 6],
    [46, 6],
    [46, 64],
    [0, 64],
  ];
  /**
   * 地面碰撞点
   */
  ground: [number, number][];
  type: WallEdge;
  constructor(type: WallEdge, assets: PIXI.Loader, direction = true) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    super(assets.resources[config.assets.wall.name].textures![type]);
    this.direction = direction;
    this.type = type;
    this.ground = this.direction ? this.leftGround : this.rightGround;
    if (!this.direction) {
      this.anchor.x = 1;
      this.scale.x = -1;
    }
  }
}
