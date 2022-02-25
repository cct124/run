import * as PIXI from "pixi.js";

/**
 * 墙壁项
 */
export default class WallItem extends PIXI.Sprite {
  id: number;
  mapType: number;
  nY: number;
  rectGround: [number, number][][] = [];
  rectWall: [number, number][][] = [];
  step = false;
  edge = false;
  direction = false;

  constructor(
    id: number,
    mapType: number,
    nY: number,
    texture?: PIXI.Texture<PIXI.Resource> | undefined
  ) {
    super(texture);
    this.id = id;
    this.nY = nY;
    this.mapType = mapType;
  }

  /**
   * 获取碰撞点
   * @returns [0]左碰撞点，[1]右碰撞点
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getPoint(direction = true): [number, number][] {
    return [[0, 0]];
  }
}
