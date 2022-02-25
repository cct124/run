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
  static rectGround: [number, number][][] = [
    [
      [0, 6],
      [64, 6],
      [64, 64],
      [0, 64],
    ],
  ];
  type: WallTextures;
  static offsetY = (Item.rectGround[0][2][1] - Item.rectGround[0][1][1]) / 2;
  constructor(
    id: number,
    type: WallTextures,
    mapType: number,
    nY: number,
    assets: PIXI.Loader
  ) {
    super(
      id,
      mapType,
      nY,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      assets.resources[config.assets.wall.name].textures![type]
    );
    this.type = type;
  }

  static getPoint(): [number, number][] {
    return [
      [this.rectGround[0][0][0], this.rectGround[0][0][1] + this.offsetY],
      [this.rectGround[0][1][0], this.rectGround[0][1][1] + this.offsetY],
    ];
  }
}
