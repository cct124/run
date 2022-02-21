import PIXI from "pixi.js";
import Background from "./background";

/**
 * 远景层
 */
export default class Far extends Background {
  constructor(
    app: PIXI.Application,
    container: PIXI.Container,
    texture: PIXI.Texture
  ) {
    super(app, container, texture, -0.064, 0, -40);
  }
}
