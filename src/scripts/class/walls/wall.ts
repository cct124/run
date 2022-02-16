import { config } from "@/config";
import * as PIXI from "pixi.js";

/**
 * 墙体对象
 */
export default class Wall {
  wallWidth = 0;
  walls: number[] = [];
  sprites = new Set<PIXI.Sprite>();

  constructor(walls: number[]) {
    this.walls = walls;
    this.wallWidth = this.walls.length * config.wallItemWidth;
  }

  /**
   * 添加墙体
   * @param sprite
   */
  add(sprite: PIXI.Sprite): PIXI.Sprite {
    this.sprites.add(sprite);
    return sprite;
  }
}
