import PIXI from "pixi.js";
import Background from "./background";

/**
 * 中景层
 */
export default class Mid extends Background {
  constructor(
    app: PIXI.Application,
    container: PIXI.Container,
    texture: PIXI.Texture
  ) {
    super(app, container, texture, -0.32, 0, 20);
  }
}
