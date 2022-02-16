import * as PIXI from "pixi.js";
import { WallTextures, config } from "@/config";
import WallItem from "./wallItem";

/**
 * 墙壁边缘
 */
export default class Edge extends WallItem {
  /**
   * 方向
   */
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
  type: WallTextures;
  constructor(
    type: WallTextures,
    mapType: number,
    assets: PIXI.Loader,
    direction = true
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    super(mapType, assets.resources[config.assets.wall.name].textures![type]);
    this.direction = direction;
    this.type = type;
    this.ground = this.direction ? this.leftGround : this.rightGround;
    if (!this.direction) {
      this.anchor.x = 1;
      this.scale.x = -1;
    }
  }
}
