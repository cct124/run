/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { config } from "@/config";
import { DRAG_AREA, JOY_OPT } from "@/config/joystick";
import { PLAYER } from "@/config/palyer";
import { deepMixins } from "@/scripts/utils";
import * as PIXI from "pixi.js";
import Game from "../game";
import Spineboy, {
  PlayerAnimations,
  SpineboyChannel,
} from "../player/Spineboy";
import Joystick, { JoystickChannel, JoystickEvent } from "./joystick";

export interface InteractiveOptions {
  joystick?: {
    x?: number;
    y?: number;
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
  };
}

export default class Interactive extends PIXI.Container {
  label = "Interactive";
  game: Game;
  joystick: Joystick;
  interactiveArea: PIXI.Graphics;
  palyer: Spineboy;
  opt: InteractiveOptions;
  palyerStatus = {
    walk: false,
    run: false,
    idle: false,
    jump: false,
  };
  constructor(game: Game, options?: InteractiveOptions) {
    super();
    this.opt = deepMixins(
      {
        joystick: {
          x: JOY_OPT.x,
          y: JOY_OPT.y,
          speed: {
            walk: PLAYER.speed.walk,
            run: PLAYER.speed.run,
          },
        },
      },
      options || {}
    ) as InteractiveOptions;
    this.game = game;
    this.game.app.stage.addChild(this);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.joystick = new Joystick(this, {
      x: this.opt.joystick!.x!,
      y: this.opt.joystick!.y!,
    });
    this.interactiveArea = this.createInteractiveArea();
    this.palyer = this.game!.palyer! as Spineboy;
    this.init();
    this.joystickBindPlayer();
  }

  init(): void {
    this.addChild(this.interactiveArea);
    this.addChild(this.joystick);
    this.interactiveArea.on("pointerup", (evt) => this.joystick.onDragEnd(evt));
  }

  /**
   *
   * @returns 创建交互区域
   */
  createInteractiveArea(): PIXI.Graphics {
    const rect = new PIXI.Graphics();
    rect.interactive = true;
    rect.beginFill(0xffffff);
    rect.alpha = 0;
    rect.drawRect(0, 0, this.game.app.view.width, this.game.app.view.height);
    rect.endFill();
    return rect;
  }
  /**
   *操控杆和角色绑定
   */
  joystickBindPlayer(): void {
    this.joystick.listen(JoystickChannel.start, () => this.joystickSatrt());
    this.joystick.listen(JoystickChannel.move, () => this.joystickMove());
    this.joystick.listen(JoystickChannel.end, () => this.joystickEnd());
    this.palyer.listen(SpineboyChannel.jumpEnd, () => {
      this.palyerStatus.jump = false;
      if (this.joystick.dragTargetData.dragging) {
        this.joystickSatrt();
      }
    });
    this.game.app.ticker.add(() => {
      this.move();
    });
  }
  /**
   *操控杆触摸开始
   */
  joystickSatrt(): void {
    if (
      this.joystick.dragTargetData.areaType === DRAG_AREA.L &&
      !this.palyerStatus.jump
    ) {
      if (this.palyer.init) {
        if (this.joystick.dragTargetData.r < this.joystick.dragTargetData.mr) {
          this.playerWalk();
        } else {
          this.playerRun();
        }
      }
    }

    if (
      !this.palyerStatus.jump &&
      this.joystick.dragTargetData.areaType === DRAG_AREA.T &&
      this.palyer.status.groundContact
    ) {
      if (this.palyer.init) {
        this.playerJump();
      }
    }
  }
  /**
   *操控杆持续触摸
   */
  joystickMove(): void {
    // console.log(this.joystick.dragTargetData.areaType);

    if (
      !this.palyerStatus.jump &&
      this.joystick.dragTargetData.areaType === DRAG_AREA.L
    ) {
      if (
        this.joystick.dragTargetData.r < this.joystick.dragTargetData.mr &&
        this.palyerStatus.idle
      ) {
        this.playerWalk();
      }
      if (
        this.joystick.dragTargetData.r === this.joystick.dragTargetData.mr &&
        this.palyerStatus.idle
      ) {
        this.playerRun();
      }
      if (
        this.joystick.dragTargetData.r < this.joystick.dragTargetData.mr &&
        !this.palyerStatus.walk &&
        this.palyerStatus.run
      ) {
        this.playerWalk();
      }
      if (
        this.joystick.dragTargetData.r === this.joystick.dragTargetData.mr &&
        this.palyerStatus.walk &&
        !this.palyerStatus.run
      ) {
        this.playerRun();
      }
      return;
    }

    if (
      !this.palyerStatus.jump &&
      this.joystick.dragTargetData.areaType === DRAG_AREA.T &&
      this.palyer.status.groundContact
    ) {
      this.playerJump();
      return;
    }

    if (!this.palyerStatus.idle && !this.palyerStatus.jump) this.joystickEnd();
  }
  /**
   *操控杆触摸结束
   */
  joystickEnd(): void {
    if (this.palyer.init) {
      if (!this.palyerStatus.jump) {
        this.palyer.idle();
        this.palyer.walkEnd();
        this.palyer.runEnd();
        this.palyerStatus.idle = true;
        this.palyer.setCurAnimation(PlayerAnimations.idle);
        this.palyer.setAnimation(0, PlayerAnimations.idle, true);
      }
    }
  }
  /**
   * 根据角色状态移动角色
   */
  move(): void {
    // console.log(this.palyer.body.velocity);
    // console.log(Math.abs(this.palyer.body.velocity.y));

    if (
      this.joystick.dragTargetData.areaType === DRAG_AREA.L &&
      !this.palyer.status.collision &&
      !this.palyer.status.jump &&
      this.palyer.status.groundContact
    ) {
      // console.log(
      //   this.palyer.status.idle,
      //   this.palyer.status.walk,
      //   this.palyer.status.run
      // );

      if (!this.palyer.status.idle) {
        if (this.palyer.status.walk) {
          this.game.scroller!.moveViewportXBy(this.opt.joystick!.speed!.walk!);
        }
        if (this.palyer.status.run) {
          this.game.scroller!.moveViewportXBy(this.opt.joystick!.speed!.run!);
        }
      }
    }

    if (this.palyer.status.jump && !this.palyer.status.collision) {
      if (this.palyer.previAnimation === PlayerAnimations.idle) {
        this.game.scroller!.moveViewportXBy(PLAYER.jump.idle);
      }
      if (this.palyer.previAnimation === PlayerAnimations.walk) {
        this.game.scroller!.moveViewportXBy(PLAYER.jump.walk);
      }
      if (this.palyer.previAnimation === PlayerAnimations.run) {
        this.game.scroller!.moveViewportXBy(PLAYER.jump.run);
      }
    }
    // this.game.scroller!.moveViewportXBy(this.palyer.body.velocity.x);
  }

  /**
   * 角色行走
   */
  playerWalk(): void {
    this.palyer.walk();
    this.palyerStatus.walk = true;
    this.palyerStatus.run = false;
    this.palyerStatus.idle = false;
    this.palyerStatus.jump = false;
  }
  /**
   * 角色奔跑
   */
  playerRun(): void {
    this.palyer.run();
    this.palyerStatus.run = true;
    this.palyerStatus.walk = false;
    this.palyerStatus.idle = false;
    this.palyerStatus.jump = false;
  }
  /**
   * 角色跳跃
   */
  playerJump(): void {
    this.palyer.jump();
    this.palyerStatus.jump = true;
    this.palyerStatus.walk = false;
    this.palyerStatus.run = false;
    this.palyerStatus.idle = false;
  }
}
