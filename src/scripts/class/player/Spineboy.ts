import * as PIXI from "pixi.js";
import Player from "./index";
import Game from "../game";
import { ITrackEntry } from "pixi-spine";

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
  status = {
    walk: false,
  };

  constructor(
    game: Game,
    loader: PIXI.Loader,
    x: number,
    y: number,
    scale: number
  ) {
    super(game, loader, x, y, scale);
    this.init = true;
    this.enter();
  }

  /**
   * 行走
   * @returns
   */
  walk(): ITrackEntry {
    const ITrackEntry = this.setAnimation(0, PlayerAnimations.walk, true);
    this.status.walk = true;
    return ITrackEntry;
  }
  /**
   * 行走结束
   * @returns
   */
  walkEnd(): boolean {
    return (this.status.walk = false);
  }

  /**
   * 进入游戏
   */
  enter(): ITrackEntry {
    // const ITrackEntry = this.setAnimation(0, PlayerAnimations.portal, false);
    // ITrackEntry.listener = {
    //   complete: () => {
    //     this.init = true;
    //   },
    // };
    return this.addAnimation(0, PlayerAnimations.idle, true, 0);
  }

  /**
   * 瞄准
   */
  aim(): void {
    this.spineData.state.setAnimation(0, "walk", true);
    this.spineData.state.addAnimation(1, "aim", true, 0);

    const crosshair = this.spineData.skeleton.findBone("crosshair");
    crosshair.x = (100 - this.spineData.x) / this.scale.x;
    crosshair.y = (this.spineData.y - 100) / this.scale.y;
    crosshair.updateWorldTransform();
  }
}
