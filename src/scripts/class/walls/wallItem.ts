import * as PIXI from "pixi.js";

/**
 * 墙壁项
 */
export default class WallItem extends PIXI.Sprite {
  mapType: number;
  constructor(
    mapType: number,
    texture?: PIXI.Texture<PIXI.Resource> | undefined
  ) {
    super(texture);
    this.mapType = mapType;
  }
}
