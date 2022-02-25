import { config } from "@/config";
import { deepMixins } from "@/scripts/utils";
import * as PIXI from "pixi.js";
import Game from "../game";
import Joystick from "./joystick";

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
    this.joystick = new Joystick({ x: opt.joystick!.x!, y: opt.joystick!.y! });
    this.addChild(this.joystick);
  }
}
