import { config, MapPoolOpt } from "@/config";
import { GameMap } from "@/config/map";
import Matter from "matter-js";
import * as PIXI from "pixi.js";
import Scroller from "../background/scroller";
import Wall from "./wall";
import WallsPool from "./wallsPool";

export enum WallsChannel {
  wall_update = "wall_update",
}

export interface WallsEvent {
  event: WallsChannel;
  target: Walls;
}

/**
 * 墙体集合
 */
export default class Walls extends PIXI.Container {
  /**
   * 墙体集合数据
   */
  walls: GameMap[] = [];

  wallWidths: number[] = [];
  /**
   * 墙体对象集合
   */
  wallMap = new Map<number, Wall>();
  /**
   * 墙体对象池
   */
  wallPool: WallsPool;
  /**
   * 资源列表
   */
  assets: PIXI.Loader;
  /**
   * 视差滚动对象
   */
  scroller: Scroller;

  leftIndex = 0;
  rightIndex = 0;

  constructor(
    container: PIXI.Container,
    walls: GameMap[],
    assets: PIXI.Loader,
    scroller: Scroller
  ) {
    super();
    this.walls = walls;
    this.assets = assets;
    this.scroller = scroller;
    // 生成对象池
    this.wallPool = new WallsPool(MapPoolOpt.pools, this.assets);
    this.createWalls();
    container.addChild(this);
  }

  /**
   * 将墙体数据生成墙体对象
   */
  private createWalls() {
    for (const [i, iter] of this.walls.entries()) {
      if (this.wallWidths.length === 0) {
        this.wallWidths.push(iter.walls.length * config.wallItemWidth);
      } else {
        this.wallWidths[i] =
          this.wallWidths[i - 1] + iter.walls.length * config.wallItemWidth;
      }
    }
  }

  /**
   * 设置视口位置
   * @param viewportX 视口的X轴位移
   * @returns
   */
  setViewportX(viewportX: number): number {
    this.addNewSlices(viewportX);
    return viewportX;
  }

  /**
   * 根据视口位置生成墙体
   * @param viewportX
   */
  addNewSlices(viewportX: number): void {
    this.leftIndex = this.wallWidths.findIndex((w) => viewportX < w);
    this.rightIndex = this.wallWidths.findIndex(
      (w) => viewportX + this.scroller.app.view.width < w
    );

    const indexOffsetX =
      this.wallWidths[this.leftIndex] -
      viewportX -
      this.walls[this.leftIndex].walls.length * config.wallItemWidth;

    for (let i = this.leftIndex; i <= this.rightIndex; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let wall = this.wallMap.get(i)!;
      if (!this.wallMap.has(i)) {
        const walls = this.walls[i];
        wall = new Wall(
          i,
          this.scroller,
          this.wallPool,
          walls.walls,
          walls.nY,
          walls.step
        );
        this.wallMap.set(i, wall);
        this.addChild(wall.container);
        // wall.drawRect();
        if (this.scroller.game.physicsEngine && wall.body)
          Matter.Composite.add(
            this.scroller.game.physicsEngine.world,
            wall.body
          );
      }

      if (i === this.leftIndex) {
        wall.setOffsetXY(indexOffsetX);
      } else {
        let offsetX = 0;
        for (let index = this.leftIndex; index < i; index++) {
          offsetX += this.walls[index].walls.length * config.wallItemWidth;
        }
        wall.setOffsetXY(offsetX + indexOffsetX);
      }
    }

    // 回收超出屏幕部分的墙体回收清除
    this.removeOldSlices();

    /**
     * 位置更新事件
     */
    this.emit(WallsChannel.wall_update, {
      event: WallsChannel.wall_update,
      target: this,
    });
  }

  /**
   * 回收墙体项
   * @param prevViewportSliceX
   * @param wall
   */
  removeOldSlices(): void {
    for (let i = 0; i < this.leftIndex; i++) {
      if (this.wallMap.has(i)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const wall = this.wallMap.get(i)!;
        wall.sprites.forEach((sprite) => {
          this.wallPool.add(sprite.mapType, sprite);
        });
        this.removeChild(wall.container);
        wall.sprites = [];
        wall.clear();
        if (this.scroller.game.physicsEngine && wall.body)
          Matter.Composite.remove(
            this.scroller.game.physicsEngine.world,
            wall.body
          );
        this.wallMap.delete(i);
      }
    }
  }
}
