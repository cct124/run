import PIXI from "pixi.js";
import TilingSprite from "./tilingSprite";

/**
 * 背景
 */
export default class Background extends TilingSprite {
  /**
   * 背景移动速度
   */
  DELTA_X: number;
  /**
   * 视口位移
   */
  viewportX = 0;

  /**
   * 实例化背景
   * @param app
   * @param texture
   * @param DELTA_X 背景移动速度
   * @param px X轴偏移
   * @param py y轴偏移
   */
  constructor(
    app: PIXI.Application,
    texture: PIXI.Texture,
    DELTA_X = -0.064,
    px = 0,
    py = 0
  ) {
    super(texture, app.screen.width, app.screen.height);
    this.DELTA_X = DELTA_X;
    this.position.set(px, py);
    app.stage.addChild(this);
  }

  update(): this {
    this.tilePosition.x += this.DELTA_X;
    return this;
  }

  setViewportX(newViewportX: number): void {
    const distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x += distanceTravelled * this.DELTA_X;
  }
}
