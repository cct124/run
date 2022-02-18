import { config, WallStep } from "@/config";
import { MAP } from "@/config/map";
import * as PIXI from "pixi.js";
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

  constructor(app: PIXI.Application, assets: PIXI.Loader, viewportSpeed = 5) {
    this.app = app;
    this.assets = assets;
    this.viewportSpeed = viewportSpeed;
    // 实例化远景层
    this.far = new Far(
      this.app,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.assets.resources[config.assets.far.name].texture!
    );
    // 实例化近景层
    this.mid = new Mid(
      this.app,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.assets.resources[config.assets.mid.name].texture!
    );
    // 移动视口
    // this.app.ticker.add((dt) => this.update(dt));

    this.walls = new Walls(MAP, this.assets, this);
    this.app.stage.addChild(this.walls);

    // const edge = new Step(WallStep.step_1, this.assets);
    // this.app.stage.addChild(edge);

    // const graphics = new PIXI.Graphics();
    // graphics.alpha = 0.5;
    // graphics.beginFill(0xea1d63);
    // graphics.drawPolygon(edge.highlands.map(([x, y]) => new PIXI.Point(x, y)));
    // graphics.endFill();
    // this.app.stage.addChild(graphics);

    // const line = new PIXI.Graphics();
    // line.lineStyle(2, 0xffffff, 1);
    // console.log(edge.edge[0], edge.edge[1]);

    // line.moveTo(...edge.edge[0]);
    // line.lineTo(...edge.edge[1]);
    // app.stage.addChild(line);
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
    const newViewportX = this.viewportX + units;
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
