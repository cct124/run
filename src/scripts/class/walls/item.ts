import * as PIXI from "pixi.js";
import { WallTextures, config } from "@/config";
import WallItem from "./wallItem";

/**
 * 墙体
 */
export default class Item extends WallItem {
  /**
   * 地面碰撞点
   */
  ground = [
    [0, 6],
    [64, 6],
    [64, 64],
    [0, 64],
  ];
  type: WallTextures;
  constructor(type: WallTextures, mapType: number, assets: PIXI.Loader) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    super(mapType, assets.resources[config.assets.wall.name].textures![type]);
    this.type = type;
  }
}
