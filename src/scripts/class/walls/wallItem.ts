import * as PIXI from "pixi.js";

/**
 * 墙壁项
 */
export default class WallItem extends PIXI.Sprite {
  mapType: number;
  nY: number;
  ground: [number, number][] = [];

  constructor(
    mapType: number,
    nY: number,
    texture?: PIXI.Texture<PIXI.Resource> | undefined
  ) {
    super(texture);
    this.nY = nY;
    this.mapType = mapType;
  }
}
