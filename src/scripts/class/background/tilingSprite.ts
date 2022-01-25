import * as PIXI from "pixi.js";

export default class TilingSprite extends PIXI.TilingSprite {
  constructor(
    texture: PIXI.Texture<PIXI.Resource>,
    width: number,
    height: number
  ) {
    super(texture, width, height);
    this.position.set(0, 0);
    this.tilePosition.set(0, 0);
  }
}
