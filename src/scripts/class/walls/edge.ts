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
  static leftGround: [number, number][] = [
    [18, 6],
    [64, 6],
    [64, 64],
    [18, 64],
  ];
  static rightGround: [number, number][] = [
    [0, 6],
    [46, 6],
    [46, 64],
    [0, 64],
  ];
  static offsetY = (Edge.leftGround[2][1] - Edge.leftGround[1][1]) / 2;
  static offsetX = 16;

  /**
   * 地面碰撞点
   */
  static rectGround: [number, number][][];
  type: WallTextures;
  edge = true;
  static direction: any;
  constructor(
    id: number,
    type: WallTextures,
    mapType: number,
    nY: number,
    assets: PIXI.Loader,
    direction = true
  ) {
    super(
      id,
      mapType,
      nY,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      assets.resources[config.assets.wall.name].textures![type]
    );
    this.direction = direction;
    this.type = type;
    // this.rectGround = [this.direction ? Edge.leftGround : Edge.rightGround];
    if (!this.direction) {
      this.anchor.x = 1;
      this.scale.x = -1;
    }
  }

  static getPoint(direction = true): [number, number][] {
    const rectGround = [direction ? this.leftGround : this.rightGround];
    return [
      [rectGround[0][0][0], rectGround[0][0][1] + this.offsetY],
      [rectGround[0][1][0], rectGround[0][1][1] + this.offsetY],
    ];
  }
}
