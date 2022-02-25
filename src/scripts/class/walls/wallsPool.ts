import { config, Decoration, WallMap, Window } from "@/config";
import { genArr } from "@/scripts/utils";
import * as PIXI from "pixi.js";
import Edge from "./edge";
import Item from "./item";
import Step from "./step";
import WallItem from "./wallItem";

/**
 * 墙体对象池
 */
export default class WallsPool {
  poolSize: number[] = [];
  pool: WallItem[][] = genArr(0, 11).map(() => []);
  assets: PIXI.Loader;
  constructor(poolSize: number[], assets: PIXI.Loader) {
    this.assets = assets;
    this.poolSize = poolSize;
    this.createPool(this.poolSize);
  }

  createPool(poolSize: number[]): WallItem[][] {
    for (const [index, iter] of poolSize.entries()) {
      for (let i = 0; i < iter; i++) {
        const sprite = this.mapWall(index + iter, index);
        if (sprite) this.pool[index].push(sprite);
      }
    }
    return this.pool;
  }

  /**
   * 在对象池中获取 Sprite 对象
   * @param index
   * @returns
   */
  get(index: number): WallItem | undefined {
    return this.pool[index].shift();
  }

  /**
   * 往对象池中添加 Sprite 对象
   * @param index
   * @returns
   */
  add(index: number, sprite: WallItem): number {
    return this.pool[index].push(sprite);
  }

  /**
   * 将索引映射到对应的Sprite
   * @param index
   * @returns
   */
  mapWall(id: number, index: number): WallItem | undefined {
    if ([...Window, ...Decoration].includes(index)) {
      return new Item(id, WallMap[index], index, config.wallDefY, this.assets);
    }
    switch (index) {
      case 3:
        return new Step(id, WallMap[3], index, config.wallDefY, this.assets);
      case 4:
        return new Step(
          id,
          WallMap[4],
          index,
          config.wallDefY,
          this.assets,
          false
        );
      case 5:
        return new Edge(id, WallMap[5], index, config.wallDefY, this.assets);
      case 6:
        return new Edge(
          id,
          WallMap[6],
          index,
          config.wallDefY,
          this.assets,
          false
        );
      case 7:
        return new Edge(id, WallMap[7], index, config.wallDefY, this.assets);
      case 8:
        return new Edge(
          id,
          WallMap[8],
          index,
          config.wallDefY,
          this.assets,
          false
        );
      default:
        break;
    }
  }
}
