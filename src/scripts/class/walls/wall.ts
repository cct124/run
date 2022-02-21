import { config, Step } from "@/config";
import * as PIXI from "pixi.js";
import Observer from "../observer";
import WallItem from "./wallItem";
import WallsPool from "./wallsPool";

export enum WallChannel {
  /**
   * 清除资源
   */
  clear = "clear",
}

export interface WallEvent {
  event: WallChannel;
  target: Wall;
}

/**
 * 墙体对象
 */
export default class Wall extends Observer<WallChannel, WallEvent> {
  id: number;
  walls: number[] = [];
  nY = 0;
  step;
  sprites = new Set<WallItem>();
  steps: {
    index: number;
    type: number;
    offsetY: number;
    nY: number;
    render: boolean;
  }[] = [];
  stepLeft: number[] = [];
  stepRight: number[] = [];
  wallPool: WallsPool;
  curIndex = 0;
  curTextureIndex = 0;
  rectGround: [number, number][][] = [];
  lineGround: [number, number][] = [];
  graphics: PIXI.Graphics | undefined;
  groundOffestX = 0;
  groundOffestY = 6;
  lineGroundComplete = false;

  constructor(
    id: number,
    wallPool: WallsPool,
    walls: number[],
    nY = config.wallDefY,
    step = false
  ) {
    super();
    this.id = id;
    this.wallPool = wallPool;
    this.walls = walls;
    this.step = step;
    this.nY = nY;
    if (this.step) {
      this.steps = this.walls
        .map((type, index) => ({ index, type }))
        .filter((wall) => Step.includes(wall.type))
        .map((wall) => {
          return {
            ...wall,
            offsetY: wall.type === 3 ? 64 : -64,
            nY: 0,
            render: false,
          };
        });
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
    if (this.step) {
      const index = this.steps.findIndex((wall) => this.curIndex <= wall.index);
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!~index) {
        const step = this.steps[index];
        const preStep = this.steps[index - 1];
        // console.log(this.curIndex, step, preStep);
        step.nY = preStep ? preStep.nY + preStep.offsetY : this.nY;

        if (this.curIndex === step.index) {
          step.render = true;
          return step.type === 3 ? step.nY : step.nY + step.offsetY;
        }

        return step.nY;
      } else {
        const step = this.steps[this.steps.length - 1];

        return step ? step.nY + step.offsetY : this.nY;
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

  /**
   * 更新墙体碰撞线
   */
  updateLineGround(sprite: WallItem): void {
    this.lineGround = [];
    const sprites = [...this.sprites];
    const l = sprites[0];
    this.lineGround.push(l.getPoint()[0]);
    const r = sprite;
    if (this.sprites.size > 1) {
      for (const [, iter] of sprites.entries()) {
        if (iter.step) {
          this.lineGround.push(...iter.getPoint());
        }
      }
    }
    this.lineGround.push(r.getPoint()[1]);
    this.lineGround.push([r.x + r.width, 375]);
    this.lineGround.push([l.x, 375]);
  }

  /**
   * 更新墙体碰撞矩形
   */
  updateRectGround(): void {
    if (this.step === undefined) {
      const len = this.sprites.size - 1;
      if (len !== -1) {
        const sprites = [...this.sprites];
        const l = sprites[0];
        const r = sprites[sprites.length - 1];
        const [ltx, lty] = l.rectGround[0][0];
        const [rtx, rty] = r.rectGround[0][1];
        const [rbx, rby] = r.rectGround[0][2];
        const [lbx, lby] = l.rectGround[0][3];

        this.rectGround[0] = [
          [ltx + l.x, lty + this.nY],
          [rtx + len * config.wallItemWidth + l.x, rty + this.nY],
          [rbx + len * config.wallItemWidth + l.x, rby + this.nY],
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

  /**
   * 绘制墙体可碰撞矩形
   * @returns
   */
  groundRectDraw(): PIXI.Graphics {
    if (!this.graphics) {
      this.graphics = new PIXI.Graphics();
    }

    if (this.step === undefined) {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0xf31e67);
      this.graphics.drawPolygon([
        ...this.rectGround[0][0],
        ...this.rectGround[0][1],
        ...this.rectGround[0][2],
        ...this.rectGround[0][3],
      ]);
      this.graphics.endFill();
    }

    return this.graphics;
  }

  /**
   * 绘制墙体可碰撞线
   * @returns
   */
  groundLineDraw(): PIXI.Graphics {
    if (!this.graphics) {
      this.graphics = new PIXI.Graphics();
    }
    this.graphics.clear();
    this.graphics.lineStyle(1, 0xf31e67);
    const temp = [];
    for (const iterator of this.lineGround) {
      temp.push(...iterator);
      this.graphics.drawPolygon(temp);
    }
    this.graphics.endFill();

    return this.graphics;
  }

  clear(): void {
    this.lineGround = [];
    this.send(WallChannel.clear, {
      event: WallChannel.clear,
      target: this,
    });
  }
}
