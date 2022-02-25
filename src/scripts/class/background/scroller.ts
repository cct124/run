import { config } from "@/config";
import { MAP } from "@/config/map";
import * as PIXI from "pixi.js";
import Game from "../game";
import Walls from "../walls/walls";
import Far from "./far";
import Mid from "./mid";

/**
 * 视差滚动
 */
export default class Scroller {
  app: PIXI.Application;
  assets: PIXI.Loader;
  far: Far;
  mid: Mid;
  /**
   * 视口
   */
  viewportX = 0;
  viewportSpeed: number;
  walls: Walls;
  container = new PIXI.Container();
  game: Game;
  units = 0;
  constructor(
    game: Game,
    app: PIXI.Application,
    assets: PIXI.Loader,
    viewportSpeed = 5
  ) {
    this.game = game;
    this.app = app;
    this.assets = assets;
    this.viewportSpeed = viewportSpeed;
    // 实例化远景层
    this.far = new Far(
      this.app,
      this.container,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.assets.resources[config.assets.far.name].texture!
    );
    // 实例化近景层
    this.mid = new Mid(
      this.app,
      this.container,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.assets.resources[config.assets.mid.name].texture!
    );
    this.walls = new Walls(this.container, MAP, this.assets, this);
    this.app.stage.addChild(this.container);
    // this.setViewportX(3180);
    this.setViewportX(0);
    // this.setViewportX(0);
  }
  /**
   * 设置视口位置
   * @param viewportX
   */
  setViewportX(viewportX: number): void {
    this.viewportX = viewportX;
    // console.log(Math.ceil(this.viewportX / 64));
    this.far.setViewportX(this.viewportX);
    this.mid.setViewportX(this.viewportX);
    this.walls.setViewportX(this.viewportX);
  }

  /**
   * 移动视口
   * @param units
   */
  moveViewportXBy(units: number): void {
    this.units = units;
    const newViewportX = this.viewportX + this.units;
    this.setViewportX(newViewportX);
  }

  /**
   * 更新视口位置
   * @param dt
   */
  update(dt: number): void {
    this.moveViewportXBy(this.viewportSpeed);
  }
}
