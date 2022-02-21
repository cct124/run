import * as PIXI from "pixi.js";
import { config } from "@/config";
import Player from "./index";

enum Single {
  aim = "aim",
  death = "death",
  jump = "jump",
  portal = "portal",
}

enum Loop {
  hoverboard = "hoverboard",
  idle = "idle",
  run = "run",
  shoot = "shoot",
  walk = "walk",
}

/**
 * 玩家骨骼动画
 */
export enum PlayerAnimations {
  /**
   * 飞行滑板
   */
  hoverboard = Loop.hoverboard,
  /**
   * 待机
   */
  idle = Loop.idle,
  /**
   * 跑
   */
  run = Loop.run,
  /**
   * 射击
   */
  shoot = Loop.shoot,
  /**
   * 行走
   */
  walk = Loop.walk,
  /**
   * 瞄准
   */
  aim = Single.aim,
  /**
   * 死亡
   */
  death = Single.death,
  /**
   * 跳跃
   */
  jump = Single.jump,
  /**
   * 穿梭
   */
  portal = Single.portal,
}

export default class Spineboy extends Player {
  constructor(app: PIXI.Application, loader: PIXI.Loader) {
    super(app, loader, config.palyer.scale, 65, 1, 0.3);
    this.setAnimation(0, PlayerAnimations.idle, true);
  }

  /**
   * 瞄准
   */
  aim(): void {
    this.spineData.state.setAnimation(0, "walk", true);
    this.spineData.state.addAnimation(1, "aim", true, 0);

    const crosshair = this.spineData.skeleton.findBone("crosshair");
    crosshair.x = (100 - this.spineData.x) / this.scale;
    crosshair.y = (this.spineData.y - 100) / this.scale;
    crosshair.updateWorldTransform();
  }
}
