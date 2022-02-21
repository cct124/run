import * as PIXI from "pixi.js";

/**
 * 墙壁项
 */
export default class WallItem extends PIXI.Sprite {
  mapType: number;
  nY: number;
  rectGround: [number, number][][] = [];
  rectWall: [number, number][][] = [];
  step = false;
  edge = false;
  direction = false;

  constructor(
    mapType: number,
    nY: number,
    texture?: PIXI.Texture<PIXI.Resource> | undefined
  ) {
    super(texture);
    this.nY = nY;
    this.mapType = mapType;
  }

  /**
   * 获取碰撞点
   * @returns [0]左碰撞点，[1]右碰撞点
   */
  getPoint(): [number, number][] {
    return [[this.x, this.y]];
  }
}
