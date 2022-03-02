/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { config } from "@/config";
import { deepMixins } from "@/scripts/utils";
import * as PIXI from "pixi.js";
import Interactive from "..";
import Gsap from "gsap";
import { PIXIContainerObserver } from "../../observer";
import { DragArea, DRAG_AREA, JOY_OPT } from "@/config/joystick";
export enum JoystickChannel {
  start = "start",
  move = "move",
  end = "end",
}

export interface JoystickEvent {
  event: JoystickChannel;
  target: Joystick;
}

export interface JoystickOptions {
  /**
   * 操纵杆位置 X
   */
  x: number;
  /**
   * 操纵杆位置 Y
   */
  y: number;
  /**
   * 是否可操控
   */
  interactive?: boolean;
  limitArea?: limitAreaOptions;
  dragTarget?: limitAreaOptions;
  dragArea?: DragAreaOptions;
  dragAreaTypes?: DragArea[];
}
export interface DragAreaOptions {
  /**
   * 半径大小
   */
  size?: number;
  /**
   * 透明度
   */
  alpha?: number;
}

export interface limitAreaOptions {
  color?: number;
  /**
   * 半径大小
   */
  size?: number;
  /**
   * 透明度
   */
  alpha?: number;
  /**
   * 拖拽时的透明度
   */
  targetAlpha?: number;
}

export interface DragTargetData {
  angle: number;
  x: number;
  y: number;
  /**
   * 点到中心的半径
   */
  r: number;
  mr: number;
  /**
   * 开始拖拽
   */
  dragging: boolean;
  areaType: DRAG_AREA | null;
}

export default class Joystick extends PIXIContainerObserver<
  JoystickChannel,
  JoystickEvent
> {
  /**
   * 交互类
   */
  inter: Interactive;
  /**
   * 限制拖拽目标区域
   */
  limitArea: PIXI.Graphics;
  /**
   * 拖拽目标
   */
  dragTarget: PIXI.Graphics;
  /**
   * 可拖拽区域
   */
  dragArea: PIXI.Graphics;

  /**
   * PIXI事件对象DATA
   */
  evtData: any;
  /**
   * 配置对象
   */
  opt: JoystickOptions;
  /**
   * 拖拽目标角度
   */
  dragTargetData: DragTargetData = {
    angle: 0,
    x: 0,
    y: 0,
    r: 0,
    mr: 0,
    /**
     * 是否开始拖拽
     */
    dragging: false,
    areaType: null,
  };

  constructor(interactive: Interactive, options: JoystickOptions) {
    super();
    /**
     * 初始化配置对象
     */
    this.opt = deepMixins(
      {
        interactive: JOY_OPT.interactive,
        limitArea: {
          color: JOY_OPT.limitArea.color,
          size: JOY_OPT.limitArea.size,
          alpha: JOY_OPT.limitArea.alpha,
        },
        dragTarget: {
          color: JOY_OPT.dragTarget.color,
          size: JOY_OPT.dragTarget.size,
          alpha: JOY_OPT.dragTarget.alpha,
          targetAlpha: JOY_OPT.dragTarget.targetAlpha,
        },
        dragArea: {
          size: JOY_OPT.dragArea.size,
          alpha: JOY_OPT.dragArea.alpha,
        },
        dragAreaTypes: JOY_OPT.dragAreaTypes,
      },
      options || {}
    ) as JoystickOptions;
    this.inter = interactive;
    this.x = this.opt.x;
    this.y = this.opt.y;
    this.dragTargetData.mr = this.opt.limitArea!.size!;
    this.limitArea = this.createLimitArea(this.opt.limitArea!);
    this.dragTarget = this.createDragTarget(this.opt.dragTarget!);
    this.dragArea = this.createDragArea(this.opt.dragArea!);
    this.addChild(this.dragArea);
    this.addChild(this.limitArea);
    this.addChild(this.dragTarget);
    this.dragArea.interactive = this.opt.interactive!;
    this.dragTarget.interactive = this.opt.interactive!;
    this.limitArea.interactive = this.opt.interactive!;
    this.listener();
  }

  /**
   * 监听事件
   */
  listener(): void {
    this.dragArea.on("pointerdown", (evt) => this.onDragStart(evt));
    this.limitArea.on("pointerdown", (evt) => this.onDragStart(evt));
    this.dragTarget.on("pointerdown", (evt) => this.onDragStart(evt));
    this.dragArea.on("pointermove", (evt) => this.onDragMove(evt));
    this.dragArea.on("pointermove", (evt) => this.onDragMove(evt));
    this.dragArea.on("pointerupoutside", (evt) => this.onDragEnd(evt));
    this.dragArea.on("pointerup", (evt) => this.onDragEnd(evt));
    this.dragTarget.on("pointerup", (evt) => this.onDragEnd(evt));
  }

  /**
   * 创建操纵杆可拖拽目标
   * @param opt
   * @returns
   */
  createDragTarget(opt: limitAreaOptions): PIXI.Graphics {
    const target = this.createGraphics(opt.color!, opt.size!, opt.alpha!);
    return target;
  }

  /**
   * 创建操纵杆可拖拽区域
   * @param opt
   * @returns
   */
  createLimitArea(opt: limitAreaOptions): PIXI.Graphics {
    const target = this.createGraphics(opt.color!, opt.size!, opt.alpha!);
    return target;
  }

  /**
   * 事件响应区域
   * @param opt
   * @returns
   */
  createDragArea(opt: DragAreaOptions): PIXI.Graphics {
    const target = this.createGraphics(0xffffff, opt.size!, opt.alpha!);
    return target;
  }

  /**
   * 创建圆形图形
   * @param color
   * @param size
   * @param alpha
   * @returns
   */
  createGraphics(color: number, size: number, alpha: number): PIXI.Graphics {
    const circle = new PIXI.Graphics();
    circle.beginFill(color);
    circle.drawCircle(0, 0, size);
    circle.endFill();
    circle.alpha = alpha;
    return circle;
  }

  /**
   * 拖拽开始
   * @param evt
   */
  onDragStart(evt: any): void {
    this.evtData = evt.data;
    const { x, y } = this.evtData.getLocalPosition(this.dragTarget.parent);
    const p = this.limitAreaPosition(x, y);
    this.dragTarget.x = p.x;
    this.dragTarget.y = p.y;
    this.dragTargetData.dragging = true;
    this.dragTarget.alpha = this.opt.dragTarget!.targetAlpha!;
    this.send(JoystickChannel.start, {
      event: JoystickChannel.start,
      target: this,
    });
  }
  /**
   * 拖拽结束
   * @param evt
   */
  onDragEnd(evt: any): void {
    this.dragTargetData.dragging = false;
    this.dragTarget.alpha = this.opt.dragTarget!.alpha!;
    this.evtData = evt.data;
    this.reboundAnimation(this.dragTarget);
  }
  /**
   * 拖拽
   * @param evt
   */
  onDragMove(evt: any): void {
    if (this.dragTargetData.dragging) {
      const { x, y } = this.evtData.getLocalPosition(this.dragTarget.parent);
      const p = this.limitAreaPosition(x, y);

      this.dragTarget.x = p.x;
      this.dragTarget.y = p.y;
    }
  }

  /**
   * 获取限制拖拽区域内的X,Y值
   * @param x
   * @param y
   * @returns
   */
  limitAreaPosition(x: number, y: number): { x: number; y: number } {
    const size = this.opt.limitArea!.size!;
    const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const cos = x / r;
    const sin = y / r;
    const cosRad = Math.acos(cos);
    const angle = (cosRad * 180) / Math.PI;
    this.dragTargetData.r = r;
    if (r > size) {
      this.dragTargetData.r = size;
      x = cos * size;
      y = sin * size;
    }
    this.dragTargetData.angle = Math.round(sin < 0 ? angle : 180 - angle + 180);
    this.dragTargetData.x = x;
    this.dragTargetData.y = y;
    this.dragTargetData.areaType = this.dragAreaType(this.dragTargetData.angle);

    this.send(JoystickChannel.move, {
      event: JoystickChannel.move,
      target: this,
    });
    return { x, y };
  }

  reboundAnimation(target: PIXI.Graphics) {
    const line = Gsap.timeline({
      onComplete: () => {
        this.dragTargetData.angle = 0;
        this.dragTargetData.x = 0;
        this.dragTargetData.y = 0;
        this.send(JoystickChannel.end, {
          event: JoystickChannel.end,
          target: this,
        });
      },
    });
    line.to(target, { x: 0, y: 0, duration: 0.1 });
  }

  dragAreaType(angle: number): DRAG_AREA {
    const t = this.opt.dragAreaTypes!.find((p) => p.scope(angle));
    return t!.type;
  }
}
