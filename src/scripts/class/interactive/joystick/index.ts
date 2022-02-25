/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { config } from "@/config";
import { deepMixins } from "@/scripts/utils";
import * as PIXI from "pixi.js";
import { PIXIContainerObserver } from "../../observer";
export enum JoystickChannel {
  update = "update",
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
  dragArea?: DragAreaOptions;
  dragTarget?: DragAreaOptions;
}

export interface DragAreaOptions {
  color?: number;
  size?: number;
  alpha?: number;
}

export default class Joystick extends PIXIContainerObserver<
  JoystickChannel,
  JoystickEvent
> {
  dragArea: PIXI.Graphics;
  dragTarget: PIXI.Graphics;
  constructor(options: JoystickOptions) {
    super();
    const opt = deepMixins(
      {
        interactive: config.joystick.interactive,
        dragArea: {
          color: config.joystick.dragArea.color,
          size: config.joystick.dragArea.size,
          alpha: config.joystick.dragArea.alpha,
        },
        dragTarget: {
          color: config.joystick.dragTarget.color,
          size: config.joystick.dragTarget.size,
          alpha: config.joystick.dragTarget.alpha,
        },
      },
      options || {}
    ) as JoystickOptions;
    this.x = opt.x;
    this.y = opt.y;
    this.dragArea = this.createDragArea(opt.dragArea!);
    this.dragTarget = this.createDragTarget(opt.interactive!, opt.dragTarget!);
    this.addChild(this.dragArea);
    this.addChild(this.dragTarget);
  }

  /**
   * 创建操纵杆可拖拽目标
   * @param opt
   * @returns
   */
  createDragTarget(interactive: boolean, opt: DragAreaOptions): PIXI.Graphics {
    const target = this.createGraphics(opt.color!, opt.size!, opt.alpha!);
    target.interactive = interactive;
    target.on("pointerdown", (evt) => this.onDragStart(evt));
    return target;
  }

  /**
   * 创建操纵杆可拖拽区域
   * @param opt
   * @returns
   */
  createDragArea(opt: DragAreaOptions): PIXI.Graphics {
    return this.createGraphics(opt.color!, opt.size!, opt.alpha!);
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

  onDragStart(evt: any) {
    console.log(evt);
  }
}
