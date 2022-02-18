import { config } from "@/config";
import { GameMap } from "@/config/map";
import * as PIXI from "pixi.js";
import Scroller from "../background/scroller";
import Observer from "./observer";
import Wall from "./wall";
import WallItem from "./wallItem";
import WallsPool from "./wallsPool";

export enum WallsChannel {
  update = "update",
}

export interface WallsEvent {
  event: WallsChannel;
  target: Walls;
}

/**
 * 墙体集合
 */
export default class Walls extends Observer<WallsChannel, WallsEvent> {
  /**
   * 墙体集合数据
   */
  walls: GameMap[] = [];
  /**
   * 记录墙体对象索引数量，每项将是当前项索引数量加上前面所有项之和，用于计算当前屏幕左边缘所对应的墙体对象
   */
  wallsIndex: number[] = [];
  /**
   * 墙体对象集合
   */
  wallsMap: Wall[] = [];
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
  /**
   * 视口能容纳最大的墙体项
   */
  VIEWPORT_NUM_SLICES = 0;
  /**
   * 墙体项索引
   */
  viewportSliceX = 0;
  /**
   * 上一个墙体项索引
   */
  prevViewportSliceX = 0;
  /**
   * 当前视口显示的墙体项集合
   */
  viewportSpriteMap = new Map<number, WallItem>();

  leftIndex = 0;
  rightIndex = 0;

  constructor(walls: GameMap[], assets: PIXI.Loader, scroller: Scroller) {
    super();
    this.walls = walls;
    this.assets = assets;
    this.scroller = scroller;
    // 生成对象池
    this.wallPool = new WallsPool(
      [0, 6, 6, 2, 2, 4, 4, 4, 4, 6, 6, 6],
      this.assets
    );
    // 计算屏幕能容纳多少项墙体
    this.VIEWPORT_NUM_SLICES =
      Math.ceil(this.scroller.app.view.width / config.wallItemWidth) + 1;
    this.createWall();
    this.setViewportX(0);
  }

  /**
   * 将墙体数据生成墙体对象
   */
  private createWall() {
    for (const [i, iter] of this.walls.entries()) {
      const wall = new Wall(i, this.wallPool, iter.walls, iter.nY, iter.step);
      // 保存墙体对象
      this.wallsMap.push(wall);
      if (this.wallsIndex.length === 0) {
        this.wallsIndex.push(iter.walls.length);
      } else {
        this.wallsIndex[i] = this.wallsIndex[i - 1] + iter.walls.length;
      }
    }
  }

  /**
   * 设置视口位置
   * @param viewportX 视口的X轴位移
   * @returns
   */
  setViewportX(viewportX: number): number {
    this.prevViewportSliceX = this.viewportSliceX;
    this.addNewSlices(viewportX);
    return viewportX;
  }

  /**
   * 根据视口位置生成墙体
   * @param viewportX
   */
  addNewSlices(viewportX: number): void {
    /**
     * 当前视口墙体索引
     */
    this.viewportSliceX = Math.floor(viewportX / config.wallItemWidth);

    // 屏幕左边边缘在墙体项中间部分X轴偏移值
    const firstX = -(viewportX % config.wallItemWidth);
    // 屏幕最左边的墙体对象索引
    this.leftIndex = this.wallsIndex.findIndex((w) => this.viewportSliceX < w);
    const right = Math.floor(
      (viewportX + this.scroller.app.view.width) / config.wallItemWidth
    );
    this.rightIndex = this.wallsIndex.findIndex((w) => right < w);

    // console.log(leftIndex, rightIndex);

    /**
     * 根据当前索引加视口能容纳最大的墙体项，循环创建以填充整个屏幕
     * 当前墙体存在时将移动墙体
     */
    for (
      let i = this.viewportSliceX, sliceIndex = 0;
      i < this.viewportSliceX + this.VIEWPORT_NUM_SLICES;
      i++, sliceIndex++
    ) {
      const t = this.wallsIndex.findIndex((w) => i < w);
      const ti = this.walls[t].walls.length - (this.wallsIndex[t] - i);
      // 获取当前墙体索引值
      const index = this.wallsMap[t].getWallIndex(ti);

      /**
       * 判断当前墙体项是否已创建，没有将创建墙体，有将移动墙体
       */
      if (!this.viewportSpriteMap.has(i) && index !== 0) {
        const sprite = this.wallsMap[t].getCurSprite(index);
        if (sprite) {
          sprite.position.x = firstX + sliceIndex * config.wallItemWidth;
          this.addChild(sprite);
          this.viewportSpriteMap.set(i, sprite);
        }
      } else {
        const sprite = this.viewportSpriteMap.get(i);
        if (sprite)
          sprite.position.x = firstX + sliceIndex * config.wallItemWidth;
      }
    }

    // 回收超出屏幕部分的墙体项放回对象池
    this.removeOldSlices(
      this.prevViewportSliceX,
      this.wallsMap[this.leftIndex]
    );

    for (let index = this.leftIndex; index <= this.rightIndex; index++) {
      this.wallsMap[index].updateGround();
    }

    /**
     * 位置更新事件
     */
    this.send(WallsChannel.update, {
      event: WallsChannel.update,
      target: this,
    });
  }

  /**
   * 回收墙体项
   * @param prevViewportSliceX
   * @param wall
   */
  removeOldSlices(prevViewportSliceX: number, wall: Wall): void {
    let numOldSlices = this.viewportSliceX - prevViewportSliceX;
    if (numOldSlices > this.VIEWPORT_NUM_SLICES) {
      numOldSlices = this.VIEWPORT_NUM_SLICES;
    }

    for (
      let i = prevViewportSliceX;
      i < prevViewportSliceX + numOldSlices;
      i++
    ) {
      const sprite = this.viewportSpriteMap.get(i);
      if (sprite) {
        wall.sprites.delete(sprite);
        this.removeChild(sprite);
        this.wallPool.add(sprite.mapType, sprite);
        this.viewportSpriteMap.delete(i);
      }
    }
  }
}
