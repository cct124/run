import * as PIXI from "pixi.js";
import { WallTextures, config } from "@/config";
import WallItem from "./wallItem";

interface navitePoint {
  highlands: Point;
  lowland: Point;
  edge: Point;
}
type Point = [number, number][];

/**
 * 台阶
 */
export default class Step extends WallItem {
  left: navitePoint = {
    highlands: [
      [0, 7],
      [10, 7],
      [10, 64],
      [0, 64],
    ],
    lowland: [
      [10, 70],
      [64, 70],
      [64, 128],
      [10, 128],
    ],
    edge: [
      [10, 7],
      [10, 128],
    ],
  };

  right: navitePoint = {
    highlands: [
      [56, 7],
      [64, 7],
      [64, 64],
      [56, 64],
    ],
    lowland: [
      [0, 70],
      [56, 70],
      [56, 128],
      [0, 128],
    ],
    edge: [
      [56, 7],
      [56, 128],
    ],
  };

  /**
   * 高地面
   */
  highlands: Point = [];
  /**
   * 底地面
   */
  lowland: Point = [];
  /**
   * 边缘
   */
  edge: Point = [];
  type: WallTextures;
  /**
   * 左右翻转
   */
  direction: boolean;

  constructor(
    type: WallTextures,
    mapType: number,
    assets: PIXI.Loader,
    direction = true
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    super(mapType, assets.resources[config.assets.wall.name].textures![type]);
    this.direction = direction;
    if (this.direction) {
      this.highlands = this.left.highlands;
      this.lowland = this.left.lowland;
      this.edge = this.left.edge;
    } else {
      this.anchor.x = 1;
      this.scale.x = -1;
      this.highlands = this.right.highlands;
      this.lowland = this.right.lowland;
      this.edge = this.right.edge;
    }
    this.type = type;
  }
}
