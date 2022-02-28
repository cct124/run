/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { config } from "@/config";
import { deepMixins } from "@/scripts/utils";
import * as PIXI from "pixi.js";
import Game from "../game";
import Joystick, { JoystickChannel } from "./joystick";

export interface InteractiveOptions {
  joystick?: {
    x?: number;
    y?: number;
  };
}

export default class Interactive extends PIXI.Container {
  label = "Interactive";
  game: Game;
  joystick: Joystick;
  interactiveArea: PIXI.Graphics;
  constructor(game: Game, options?: InteractiveOptions) {
    super();
    const opt = deepMixins(
      {
        joystick: {
          x: config.joystick.x,
          y: config.joystick.y,
        },
      },
      options || {}
    ) as InteractiveOptions;
    this.game = game;
    this.game.app.stage.addChild(this);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.joystick = new Joystick(this, {
      x: opt.joystick!.x!,
      y: opt.joystick!.y!,
    });
    this.interactiveArea = this.createInteractiveArea();
    this.init();
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
}