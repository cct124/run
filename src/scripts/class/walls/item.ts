import * as PIXI from "pixi.js";
import { WallWindow, config, WallDecoration } from "@/config";

export default class Item extends PIXI.Sprite {
  /**
   * 地面碰撞点
   */
  ground = [
    [0, 6],
    [64, 6],
    [64, 64],
    [0, 64],
  ];
  type: WallWindow | WallDecoration;
  constructor(type: WallWindow | WallDecoration, assets: PIXI.Loader) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    super(assets.resources[config.assets.wall.name].textures![type]);
    this.type = type;
  }
}
