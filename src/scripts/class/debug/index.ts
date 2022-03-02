import * as PIXI from "pixi.js";
import Game from "@/scripts/class/game";
import Scroller from "@/scripts/class/background/scroller";
import Player from "@/scripts/class/player";
import DebugWalls from "./DebugWalls";
import Module from "./module";
import DebugMatter from "./DebugMatter";
import PhysicsEngine from "../physics/PhysicsEngine";
import Spineboy from "../player/Spineboy";

export enum Modules {
  /**
   * 墙体碰撞线
   */
  MatterTool = "matter_tool",
  /**
   * 墙体碰撞线
   */
  WallCollisionLine = "wall_collision_line",
}

export default class Debug {
  game: Game;
  scroller: Scroller;
  player: Spineboy;
  examples: {
    [Modules.MatterTool]?: Module;
    [Modules.WallCollisionLine]?: Module;
  } = {};
  modules = {
    [Modules.MatterTool]: DebugMatter,
    [Modules.WallCollisionLine]: DebugWalls,
  };
  container = new PIXI.Container();
  physicsEngine: PhysicsEngine;
  constructor(
    game: Game,
    scroller: Scroller,
    player: Spineboy,
    physicsEngine: PhysicsEngine
  ) {
    this.game = game;
    this.scroller = scroller;
    this.player = player;
    this.physicsEngine = physicsEngine;
    this.game.app.stage.addChild(this.container);
  }

  /**
   * 开启功能模块
   * @returns
   */
  openModules(name: Modules): Module | undefined {
    if (this.modules[name]) {
      this.examples[name] = new this.modules[name](this);
      return this.examples[name];
    }
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
