import { config, Decoration, Window, StepIndex } from "@/config";
import * as PIXI from "pixi.js";
import { Observer } from "../observer";
import Edge from "./edge";
import Item from "./item";
import Step from "./step";
import WallItem from "./wallItem";
import WallsPool from "./wallsPool";
import Matter from "matter-js";
import Scroller from "../background/scroller";

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
  spriteY: number[] = [];
  nY = 0;
  step;
  sprites: WallItem[] = [];
  steps: {
    index: number;
    type: number;
    offsetY: number;
    nY: number;
    render: boolean;
  }[] = [];
  wallPool: WallsPool;
  curIndex = 0;
  curTextureIndex = 0;
  rectGround: [number, number][][] = [];
  lineGround: [number, number][] = [];
  graphics: PIXI.Graphics | undefined;
  body: Matter.Body | undefined;
  width: number;
  container = new PIXI.Container();
  graphicsCircle: PIXI.Graphics | undefined;
  scroller: Scroller | undefined;
  matterVertex: PIXI.Graphics[] = [];
  verticeOffsetX = 0;
  verticeOffsetY = 0;
  boundaryOffsetY = 0;
  static offsetY = 42;

  constructor(
    id: number,
    scroller: Scroller,
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
    this.width = this.walls.length * config.wallItemWidth;
    this.scroller = scroller;

    if (this.step) {
      this.steps = this.walls
        .map((type, index) => ({ index, type }))
        .filter((wall) => StepIndex.includes(wall.type))
        .map((wall) => {
          return {
            ...wall,
            offsetY: wall.type === 3 ? 64 : -64,
            nY: 0,
            render: false,
          };
        });
    }
    this.spriteY = this.walls.map((v, i) => this.getCurSpriteY(i));
    this.spriteY.forEach((a) => {
      if (a < this.boundaryOffsetY) {
        this.boundaryOffsetY = a;
      }
    });

    // this.container.pivot.set(0, -64);
    this.walls.forEach((v, i) => {
      const sprite = this.getCurSprite(v, i);
      if (sprite) this.container.addChild(sprite);
    });
    // this.container.updateTransform();
    this.container.y = this.nY;

    this.createlineGround();
    if (this.lineGround.length !== 0) this.body = this.createBody();

    // console.log(this.spriteY);
  }

  /**
   * 添加墙体
   * @param sprite
   */
  add(sprite: WallItem): WallItem {
    this.sprites.push(sprite);
    return sprite;
  }

  /**
   * 获取当前墙体项的Y轴坐标
   * @returns
   */
  getCurSpriteY(curIndex: number): number {
    if (this.step) {
      const index = this.steps.findIndex((wall) => curIndex <= wall.index);
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!~index) {
        const step = this.steps[index];
        const preStep = this.steps[index - 1];
        // console.log(curIndex, step, preStep);
        step.nY = preStep ? preStep.nY + preStep.offsetY : 0;

        if (curIndex === step.index) {
          step.render = true;
          return step.type === 3 ? step.nY : step.nY + step.offsetY;
        }

        return step.nY;
      } else {
        const step = this.steps[this.steps.length - 1];

        return step ? step.nY + step.offsetY : 0;
      }
    }
    return 0;
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
  getCurSprite(index: number, i: number): WallItem | undefined {
    const sprite = this.wallPool.get(index);
    if (sprite) {
      this.add(sprite);
      sprite.position.x = i * config.wallItemWidth;
      sprite.position.y = this.spriteY[i];
    }
    return sprite;
  }

  /**
   * 墙体碰撞线
   */
  createlineGround(): [number, number][] {
    // const lw = this.sprites[0];
    // const rw = this.sprites[this.sprites.length - 1];
    const li = this.walls[0];
    const lr = this.getPoint(li);
    if (this.sprites.length !== 0) {
      if (lr) this.lineGround.push([lr[0][0], lr[0][1] + this.spriteY[0]]);
      // this.lineGround.push([lw.x, lw.y]);

      for (const [i, index] of this.walls.entries()) {
        if (StepIndex.includes(index)) {
          const sr = this.getPoint(index);
          if (sr) {
            for (const iter of sr) {
              this.lineGround.push([
                iter[0] + i * config.wallItemWidth,
                iter[1] + this.spriteY[i],
              ]);
            }
          }
        }
      }

      const ri = this.walls[this.walls.length - 1];
      const rr = this.getPoint(ri);
      if (rr && lr) {
        const ei = this.walls.length - 1;
        const r = rr[1];
        const width = ei * config.wallItemWidth;
        this.lineGround.push([r[0] + width, r[1] + this.spriteY[ei]]);
        this.lineGround.push([
          r[0] + width + Edge.offsetX,
          this.container.height,
        ]);
        this.lineGround.push([lr[0][0] - Edge.offsetX, this.container.height]);
      }
    }
    return this.lineGround;
  }

  /**
   * 负数取零
   * @param n
   * @returns
   */
  tzf(n: number): number {
    return n < 0 ? 0 : n;
  }

  clear(): void {
    this.lineGround = [];
    if (this.body) {
      Matter.Composite.remove(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.scroller!.game.physicsEngine!.world,
        this.body
      );
    }

    this.send(WallChannel.clear, {
      event: WallChannel.clear,
      target: this,
    });
  }

  getPoint(index: number): [number, number][] | undefined {
    if ([...Window, ...Decoration].includes(index)) {
      return Item.getPoint();
    }
    switch (index) {
      case 3:
        return Step.getPoint();
      case 4:
        return Step.getPoint(false);
      case 5:
        return Edge.getPoint();
      case 6:
        return Edge.getPoint(false);
      case 7:
        return Edge.getPoint();
      case 8:
        return Edge.getPoint(false);
      default:
        break;
    }
  }

  ptv(p: number[]): Matter.Vector {
    return Matter.Vector.create(p[0], p[1]);
  }

  createBody(): Matter.Body {
    const body = Matter.Bodies.fromVertices(
      this.container.x + this.container.width / 2,
      this.container.y + this.container.height / 2,
      [this.lineGround.map((p) => this.ptv(p))],
      {
        isStatic: true,
        label: this.id.toString(),
      }
    );
    // console.log(body);
    // const ver = body.vertices.sort((a, b) => a.x - b.x);
    this.verticeOffsetX = body.vertices[0].x;
    body.vertices.forEach((a) => {
      if (a.x < this.verticeOffsetX) this.verticeOffsetX = a.x;
    });
    this.verticeOffsetX = this.container.x - this.verticeOffsetX;

    this.verticeOffsetY = body.vertices[0].y;
    body.vertices.forEach((a) => {
      if (a.y < this.verticeOffsetY) this.verticeOffsetY = a.y;
    });
    // console.log(body.vertices);
    // console.log(this.verticeOffsetY);

    this.verticeOffsetY = this.container.y - this.verticeOffsetY;

    Matter.Body.setCentre(
      body,
      {
        x: -this.verticeOffsetX,
        y: -this.verticeOffsetY - this.boundaryOffsetY - Wall.offsetY,
      },
      true
    );
    Matter.Body.setPosition(body, {
      x: this.container.x + this.container.width / 2,
      y: this.container.y + this.container.height / 2,
    });

    return body;
  }

  setOffsetXY(x: number, y?: number): void {
    this.container.x = x;
    this.container.y = y || this.container.y;
    if (this.body) {
      Matter.Body.setPosition(this.body, {
        x: this.container.x + this.container.width / 2,
        y: this.body.position.y,
      });

      // this.drawCircle(this.body.position.x, this.body.position.y);
    }
    // this.drawVertex();
  }

  /**
   * 绘制 Body 中心点
   * @param x
   * @param y
   */
  drawCircle(x: number, y: number): void {
    if (!this.graphicsCircle) {
      this.graphicsCircle = new PIXI.Graphics();
      if (this.scroller) this.scroller.app.stage.addChild(this.graphicsCircle);
    }
    this.graphicsCircle.clear();
    this.graphicsCircle.beginFill(0x50fa7b);
    this.graphicsCircle.drawCircle(0, 0, 2);
    this.graphicsCircle.endFill();
    this.graphicsCircle.x = x;
    this.graphicsCircle.y = y;
  }

  /**
   * 绘制墙体边界
   */
  drawRect(): void {
    const rectangle = new PIXI.Graphics();
    rectangle.lineStyle(1, 0xff3300, 1);
    rectangle.drawRect(0, 0, this.container.width, this.container.height);
    rectangle.endFill();
    const circle = new PIXI.Graphics();
    circle.beginFill(0xff3300);
    circle.drawCircle(0, 0, 2);
    circle.endFill();
    circle.x = this.container.width / 2;
    circle.y = this.container.height / 2;
    this.container.addChild(rectangle);
    this.container.addChild(circle);
  }

  /**
   * 绘制Body顶点
   */
  drawVertex(): void {
    if (this.matterVertex.length === 0) {
      if (this.body)
        this.body.vertices.forEach(() => {
          const circle = new PIXI.Graphics();
          circle.clear();
          circle.beginFill(0x1bb4fd);
          circle.drawCircle(0, 0, 2);
          circle.endFill();
          this.matterVertex.push(circle);
          if (this.scroller) this.scroller.app.stage.addChild(circle);
        });
    }
    if (this.body) {
      this.body.vertices.forEach((vertice, index) => {
        const circle = this.matterVertex[index];
        circle.x = vertice.x;
        circle.y = vertice.y;
      });
    }
  }
}
