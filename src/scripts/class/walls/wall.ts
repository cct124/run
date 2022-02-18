import { config } from "@/config";
import * as PIXI from "pixi.js";
import WallItem from "./wallItem";
import WallsPool from "./wallsPool";

/**
 * 墙体对象
 */
export default class Wall {
  id: number;
  walls: number[] = [];
  nY = 0;
  step: number | undefined;
  sprites = new Set<WallItem>();
  stepIndex = 0;
  stepLeft: number[] = [];
  stepRight: number[] = [];
  wallPool: WallsPool;
  curIndex = 0;
  curTextureIndex = 0;
  ground: [number, number][][] = [];

  constructor(
    id: number,
    wallPool: WallsPool,
    walls: number[],
    nY = config.wallDefY,
    step: number | undefined
  ) {
    this.id = id;
    this.wallPool = wallPool;
    this.walls = walls;
    this.step = step;
    this.nY = nY;
    if (this.step !== undefined) {
      this.stepIndex = this.walls.findIndex((n) => n === this.step);
      this.stepLeft = this.walls.slice(0, this.stepIndex + 1);
      this.stepRight = this.walls.slice(this.stepIndex + 1);
    }
  }

  /**
   * 添加墙体
   * @param sprite
   */
  add(sprite: WallItem): WallItem {
    this.sprites.add(sprite);
    return sprite;
  }

  /**
   * 获取当前墙体项的Y轴坐标
   * @returns
   */
  getCurSpriteY(): number {
    if (this.step !== undefined) {
      if (this.step === 3) {
        return this.curIndex <= this.stepIndex ? this.nY - 64 : this.nY;
      } else {
        return this.curIndex < this.stepIndex ? this.nY : this.nY - 64;
      }
    }
    return this.nY;
  }

  /**
   * 获取墙体项纹理索引
   * @param index
   * @returns
   */
  getWallIndex(index: number): number {
    this.curIndex = index;
    this.curTextureIndex = this.walls[index];
    return this.curTextureIndex;
  }

  /**
   * 获取当前墙体项的纹理对象
   * @param index 纹理对象索引 索引值查看 [index.d.ts](src/config/index.ts)
   * @returns
   */
  getCurSprite(index: number): WallItem | undefined {
    const sprite = this.wallPool.get(index);
    if (sprite) {
      this.add(sprite);
      sprite.position.y = this.getCurSpriteY();
    }
    return sprite;
  }

  updateGround(): void {
    if (this.step === undefined) {
      if (this.sprites.size !== 0) {
        const sprites = [...this.sprites];
        const l = sprites[0];
        const r = sprites[sprites.length - 1];
        const [ltx, lty] = l.ground[0];
        const [rtx, rty] = r.ground[1];
        const [rbx, rby] = r.ground[2];
        const [lbx, lby] = l.ground[3];
        this.ground[0] = [
          [ltx + l.x, lty + this.nY],
          [rtx + this.sprites.size * config.wallItemWidth + l.x, rty + this.nY],
          [rbx + this.sprites.size * config.wallItemWidth + l.x, rby + this.nY],
          [lbx + l.x, lby + this.nY],
        ];

        // console.log(this.id, this.ground);
      }
    }
  }

  /**
   * 负数取零
   * @param n
   * @returns
   */
  tzf(n: number): number {
    return n < 0 ? 0 : n;
  }

  groundDraw(): PIXI.Graphics {
    const triangle = new PIXI.Graphics();
    triangle.beginFill(0x9966ff);
    triangle.drawPolygon([
      ...this.ground[0][0],
      ...this.ground[0][1],
      ...this.ground[0][2],
      ...this.ground[0][3],
    ]);
    triangle.endFill();
    // triangle.drawCircle(0, 0, 10);
    // triangle.x = this.ground[0][1][0];
    // triangle.y = this.ground[0][1][1];
    // triangle.endFill();
    return triangle;
  }
}
