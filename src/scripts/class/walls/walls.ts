import { config } from "@/config";
import { genArr } from "@/scripts/utils";
import * as PIXI from "pixi.js";
import Scroller from "../background/scroller";
import Wall from "./wall";
import WallItem from "./wallItem";
import WallsPool from "./wallsPool";

/**
 * 墙体集合
 */
export default class Walls extends PIXI.Container {
  /**
   * 墙体集合数据
   */
  walls: number[][] = [];
  /**
   * 记录墙体对象索引数量
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
   * 当前视口显示的墙体对象
   */
  viewportWalls: Wall[] = [];
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
  constructor(walls: number[][], assets: PIXI.Loader, scroller: Scroller) {
    super();
    this.walls = walls;
    this.assets = assets;
    this.scroller = scroller;
    /**
     * 生成对象池
     */
    this.wallPool = new WallsPool(
      [0, 6, 6, 2, 2, 4, 4, 4, 4, 6, 6, 6],
      this.assets
    );
    this.VIEWPORT_NUM_SLICES =
      Math.ceil(this.scroller.app.view.width / config.wallItemWidth) + 1;

    for (const [i, iter] of this.walls.entries()) {
      const wall = new Wall(iter);
      this.wallsMap.push(wall);
      if (this.wallsIndex.length === 0) {
        this.wallsIndex.push(iter.length);
      } else {
        this.wallsIndex[i] = this.wallsIndex[i - 1] + iter.length;
      }
    }
  }

  setViewportX(viewportX: number): number {
    if (this.scroller.move) {
      this.prevViewportSliceX = this.viewportSliceX;
      this.addNewSlices(viewportX);
    }
    return viewportX;
  }

  addNewSlices(viewportX: number): void {
    this.viewportSliceX = Math.floor(viewportX / config.wallItemWidth);
    const right = Math.floor(
      (viewportX + this.scroller.app.view.width) / config.wallItemWidth
    );
    const firstX = -(viewportX % config.wallItemWidth);
    const leftIndex = this.wallsIndex.findIndex((w) => this.viewportSliceX < w);
    const rightIndex = this.wallsIndex.findIndex((w) => right < w);

    this.viewportWalls = genArr(leftIndex, rightIndex).map(
      (index) => this.wallsMap[index]
    );

    for (
      let i = this.viewportSliceX, sliceIndex = 0;
      i < this.viewportSliceX + this.VIEWPORT_NUM_SLICES;
      i++, sliceIndex++
    ) {
      const t = this.wallsIndex.findIndex((w) => i < w);
      const ti = this.walls[t].length - (this.wallsIndex[t] - i);
      const index = this.walls[t][ti];

      if (!this.viewportSpriteMap.has(i) && index !== 0) {
        const sprite = this.wallPool.get(index);
        if (sprite) {
          sprite.position.x = firstX + sliceIndex * config.wallItemWidth;
          sprite.position.y = sprite.y;
          this.addChild(sprite);
          this.wallsMap[t].add(sprite);
          this.viewportSpriteMap.set(i, sprite);
        }
      } else {
        const sprite = this.viewportSpriteMap.get(i);
        if (sprite)
          sprite.position.x = firstX + sliceIndex * config.wallItemWidth;
      }
    }

    this.removeOldSlices(this.prevViewportSliceX, this.wallsMap[leftIndex]);
  }

  getWallIndex(i: number): number {
    const t = this.wallsIndex.findIndex((w) => i < w);
    const ti = this.walls[t].length - (this.wallsIndex[t] - i);
    return this.walls[t][ti];
  }

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
      console.log(i);
      const sprite = this.viewportSpriteMap.get(i);
      if (sprite) {
        wall.sprites.delete(sprite);
        this.removeChild(sprite);
        this.wallPool.add(sprite.mapType, sprite);
        this.viewportSpriteMap.delete(i);
      }
    }
  }

  update(dt: number): void {
    if (this.scroller.move) {
      const left = Math.ceil(this.scroller.viewportX / config.wallItemWidth);
      const right = Math.ceil(
        (this.scroller.viewportX + this.scroller.app.view.width) /
          config.wallItemWidth
      );
      const leftIndex = this.wallsIndex.findIndex((w) => left < w);
      const rightIndex = this.wallsIndex.findIndex((w) => right < w);

      console.log(left, leftIndex);
    }
  }
}
