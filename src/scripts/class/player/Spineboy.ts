/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as PIXI from "pixi.js";
import Player from "./index";
import Game from "../game";
import { IBone, ITrackEntry } from "pixi-spine";
import Matter from "matter-js";
import { deepMixins } from "@/scripts/utils";

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

export interface SpineboyOptions {
  speed?: {
    /**
     * 行走
     */
    walk?: number;
    /**
     * 奔跑
     */
    run?: number;
  };
}

export enum SpineboyChannel {
  /**
   * 跳跃开始
   */
  jumpStart = "jump_start",
  /**
   * 跳跃结束
   */
  jumpEnd = "jump_end",
}

export interface SpineboyEvent {
  event: SpineboyChannel;
  target: Spineboy;
}

export default class Spineboy extends Player<SpineboyChannel, SpineboyEvent> {
  status = {
    walk: false,
    run: false,
    idle: true,
    jump: false,
    collision: false,
    groundContact: false,
    speed: {
      x: 0,
      y: 0,
    },
  };
  curAnimation: PlayerAnimations | undefined;
  previAnimation: PlayerAnimations | undefined;
  opt: SpineboyOptions;
  hit: IBone;
  constructor(
    game: Game,
    loader: PIXI.Loader,
    x: number,
    y: number,
    scale: number,
    options: SpineboyOptions = {}
  ) {
    super(game, loader, x, y, scale);
    this.opt = deepMixins(
      {
        speed: {
          walk: 1,
          run: 2,
        },
      },
      options || {}
    ) as SpineboyOptions;
    this.hit = this.spineData.skeleton.findBone("hip");
    this.init = true;
    this.enter();
    // this.spineData
    this.game.app.ticker.add((dt: number) => this.update(dt));
  }

  idle(): boolean {
    this.status.speed.x = 0;
    return (this.status.idle = true);
  }
  idleEnd(): boolean {
    return (this.status.idle = false);
  }

  /**
   * 行走
   * @returns
   */
  walk(): ITrackEntry {
    // this.curAnimation = PlayerAnimations.walk;
    this.setCurAnimation(PlayerAnimations.walk);
    const ITrackEntry = this.setAnimation(0, PlayerAnimations.walk, true);
    this.status.walk = true;
    this.status.speed.x = this.opt.speed!.walk!;
    this.runEnd();
    this.idleEnd();
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
   * 奔跑
   * @returns
   */
  run(): ITrackEntry {
    this.setCurAnimation(PlayerAnimations.run);
    const ITrackEntry = this.setAnimation(0, PlayerAnimations.run, true);
    this.status.run = true;
    this.status.speed.x = this.opt.speed!.run!;
    this.walkEnd();
    this.idleEnd();
    return ITrackEntry;
  }
  /**
   * 奔跑结束
   * @returns
   */
  runEnd(): boolean {
    return (this.status.run = false);
  }

  /**
   * 玩家跳跃
   */
  jump(): ITrackEntry {
    this.status.jump = true;
    this.setCurAnimation(PlayerAnimations.jump);
    const jumpITrackEntry = this.setAnimation(0, PlayerAnimations.jump, false);
    this.send(SpineboyChannel.jumpStart, {
      event: SpineboyChannel.jumpStart,
      target: this,
    });
    jumpITrackEntry.timeScale = 1.4;
    this.curAnimation = PlayerAnimations.idle;
    const idleITrackEntry = this.addAnimation(
      0,
      PlayerAnimations.idle,
      true,
      0
    );
    Matter.Body.setVelocity(this.body, {
      x: 0,
      y: -8,
    });
    idleITrackEntry.listener = {
      start: () => {
        Matter.Body.setVelocity(this.body, {
          x: 0,
          y: 0,
        });
        this.status.idle = true;
        this.status.jump = false;

        this.send(SpineboyChannel.jumpEnd, {
          event: SpineboyChannel.jumpEnd,
          target: this,
        });
      },
    };
    this.walkEnd();
    this.runEnd();
    this.idleEnd();
    return idleITrackEntry;
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
    this.setCurAnimation(PlayerAnimations.idle);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(dt: number): void {
    const { x: x1, y: y1 } = this.body.vertices[2];
    const { x: x2, y: y2 } = this.body.vertices[3];
    if (this.status.jump) {
      const cy = y2 - (y2 - y1) / 2 + this.hit.y * 0.1;
      this.y = cy;
    } else {
      this.y = y2 - (y2 - y1) / 2;
    }
    // this.x = x2 - (x2 - x1) / 2;
    // this.rotation = this.body.angle;
    // Matter.Body.setAngle(this.body, 0);
    Matter.Body.setPosition(this.body, {
      x: this.x,
      y: this.body.position.y,
    });

    // console.log(this.game.scroller!.walls.wallMap.size);

    const cx = this.x + this.cw * 0.8;
    const cy = this.y - this.ch / 2;
    const target = [...this.game.scroller!.walls.wallMap]
      .map(([, w]) => ({
        w: w.container.x + w.width,
        t: w,
      }))
      .find((w) => this.x < w.w);

    if (target && target.t.body) {
      const bodys = Matter.Query.point([target.t.body], {
        x: cx,
        y: cy,
      });
      this.status.collision = bodys.length !== 0;
      const ground = Matter.Query.collides(this.body, [target.t.body]);
      this.status.groundContact = ground.length !== 0;
    } else {
      this.status.groundContact = false;
    }
  }

  setCurAnimation(name: PlayerAnimations): PlayerAnimations {
    this.previAnimation = this.curAnimation;
    this.curAnimation = name;
    return this.curAnimation;
  }
}
