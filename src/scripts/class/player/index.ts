import * as PIXI from "pixi.js";
import { config } from "@/config";
import { Spine, ITrackEntry } from "pixi-spine";
import Game from "../game";
import Matter from "matter-js";

/**
 * 玩家
 */
export default class Player extends PIXI.Container {
  spineData: Spine;
  game: Game;
  body: Matter.Body;
  cw = 0;
  ch = 0;
  init = false;

  constructor(
    game: Game,
    loader: PIXI.Loader,
    x: number,
    y: number,
    scale = 1
  ) {
    super();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const spineData = loader.resources[config.assets.spineboy.name].spineData!;
    this.spineData = new Spine(spineData);
    this.game = game;
    this.spineData.scale.set(scale, scale);

    this.addChild(this.spineData);
    this.x = x;
    this.y = y;
    this.cw = this.width / 2;
    this.ch = this.height / 2;
    if (this.game.scroller) this.game.scroller.container.addChild(this);
    this.body = this.createBody();
    this.drawBoundary();
    if (this.game.physicsEngine)
      Matter.Composite.add(this.game.physicsEngine.world, this.body);
    this.game.app.ticker.add((dt: number) => this.update(dt));
    // console.log(this.width, this.height);
  }

  /**
   * 设置轨道的当前动画，丢弃任何排队的动画。如果以前的当前轨道条目从未应用于骨架，则将其替换（不混合）
   * @param trackIndex
   * @param animationName
   * @param loop 如果为真，动画将重复。如果为 false，则不会，而是在播放超过其持续时间时应用其最后一帧。在任何一种情况下， trackEnd 都会确定轨道何时被清除。
   * @returns 允许进一步自定义动画播放的轨道条目。在dispose事件发生后，不得保留对轨道条目的引用。
   */
  setAnimation<T>(
    trackIndex: number,
    animationName: T,
    loop: boolean
  ): ITrackEntry {
    return this.spineData.state.setAnimation(
      trackIndex,
      animationName as unknown as string,
      loop
    );
  }

  /**
   * 在轨道的当前或最后一个排队动画之后添加要播放的动画。如果 track 为空，则相当于调用setAnimation。
   * @param trackIndex
   * @param animationName
   * @param loop
   * @param delay 如果 > 0，设置延迟。如果 <= 0，延迟设置是前一个轨道入口的持续时间减去任何混合持续时间（来自AnimationStateData）加上指定的delay（即混合在 ( delay= 0) 或之前 ( delay<0) 前一个轨道入口持续时间） . 如果前一个条目正在循环，则使用其下一个循环完成而不是其持续时间。
   * @returns 允许进一步自定义动画播放的轨道条目。在dispose事件发生后，不得保留对轨道条目的引用。
   */
  addAnimation<T>(
    trackIndex: number,
    animationName: T,
    loop: boolean,
    delay: number
  ): ITrackEntry {
    return this.spineData.state.addAnimation(
      trackIndex,
      animationName as unknown as string,
      loop,
      delay
    );
  }

  /**
   * 绘制边界
   */
  drawBoundary(): void {
    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(1, 0xff3300, 1);
    rectangle.drawRect(0, 0, this.width, this.height);
    rectangle.endFill();
    rectangle.x = -this.width / 2;
    rectangle.y = -this.height;
    this.addChild(rectangle);
  }

  /**
   * 创建物理引擎刚体
   */
  createBody(): Matter.Body {
    const body = Matter.Bodies.rectangle(
      this.x,
      this.y,
      this.width,
      this.height
    );
    return body;
  }

  coorTrans(rad: number): { cx: number; sy: number } {
    const cx = this.ch * Math.cos(rad);
    const sy = Math.sin(rad) * cx;
    return { cx, sy };
  }

  update(dt: number): void {
    const { x: x1, y: y1 } = this.body.vertices[2];
    const { x: x2, y: y2 } = this.body.vertices[3];
    this.x = x2 - (x2 - x1) / 2;
    this.y = y2 - (y2 - y1) / 2;
    this.rotation = this.body.angle;
  }

  circle(): PIXI.Graphics {
    const circle = new PIXI.Graphics();
    circle.beginFill(0x1989fa);
    circle.drawCircle(0, 0, 4);
    circle.endFill();
    return circle;
  }
}
