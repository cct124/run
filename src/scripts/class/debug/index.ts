import * as PIXI from "pixi.js";
import Game from "@/scripts/class/game";
import Scroller from "@/scripts/class/background/scroller";
import Player from "@/scripts/class/player";
import DebugWalls from "./DebugWalls";
import Module from "./module";

export enum Modules {
  /**
   * 墙体碰撞线
   */
  WallCollisionLine = "wall_collision_line",
}

export default class Debug {
  game: Game;
  scroller: Scroller;
  player: Player;
  examples: {
    [Modules.WallCollisionLine]?: Module;
  } = {};
  modules = {
    [Modules.WallCollisionLine]: DebugWalls,
  };
  container = new PIXI.Container();

  constructor(game: Game, scroller: Scroller, player: Player) {
    this.game = game;
    this.scroller = scroller;
    this.player = player;
    this.game.app.stage.addChild(this.container);
  }

  /**
   * 开启功能模块
   * @returns
   */
  openModules(name: Modules): Module | undefined {
    this.examples[name] = new this.modules[name](this);
    return this.examples[name];
  }

  /**
   * 关闭功能模块
   * @returns
   */
  closeModules(name: Modules): boolean {
    if (this.examples[name]) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.examples[name]!.clear();
      this.examples[name] = undefined;
      return true;
    }
    return false;
  }
}
