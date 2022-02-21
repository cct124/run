import * as PIXI from "pixi.js";
import Game from "@/scripts/class/game";
import Scroller from "@/scripts/class/background/scroller";
import Player from "@/scripts/class/player";
import DebugWalls from "./DebugWalls";

export default class Debug {
  game: Game;
  scroller: Scroller;
  player: Player;
  modules: {
    walls?: DebugWalls;
  } = {};
  container = new PIXI.Container();

  constructor(game: Game, scroller: Scroller, player: Player) {
    this.game = game;
    this.scroller = scroller;
    this.player = player;
    this.game.app.stage.addChild(this.container);
    this.modules.walls = new DebugWalls(this);
  }
}
