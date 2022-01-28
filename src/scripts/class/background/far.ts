import PIXI from "pixi.js";
import Background from "./background";

/**
 * 远景层
 */
export default class Far extends Background {
  constructor(app: PIXI.Application, texture: PIXI.Texture) {
    super(app, texture, -0.064, 0, -40);
  }
}
