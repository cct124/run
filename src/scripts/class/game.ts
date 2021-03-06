/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as PIXI from "pixi.js";
import { Assets, AssetsIter, config } from "@/config";
import Scroller from "@/scripts/class/background/scroller";
import Player from "@/scripts/class/player";
import Spineboy from "./player/Spineboy";
import Debug from "./debug";
import { Observer } from "./observer";
import PhysicsEngine from "./physics/PhysicsEngine";
import { MAP } from "@/config/map";
import Wall from "./walls/wall";
import Interactive from "./interactive";
import { PLAYER } from "@/config/palyer";

export enum GameChannel {
  /**
   * 资源加载完成
   */
  loaderComplete = "loaderComplete",
  /**
   * 游戏初始化完成
   */
  init = "init",
  /**
   * 游戏结束
   */
  gameover = "gameover",
  /**
   * 得分变化
   */
  scoreChange = "score_change",
}

export interface GameEvent {
  event: GameChannel;
  target: Game;
}

export default class Game extends Observer<GameChannel, GameEvent> {
  debug = config.debug;
  /**
   * 游戏资源加载对象
   */
  loader = new PIXI.Loader();
  app: PIXI.Application;
  /**
   * 实例化游戏的DOM
   */
  view: HTMLCanvasElement;
  /**
   * 画布的宽度
   */
  width: number;
  /**
   * 画布的高度
   */
  height: number;

  /**
   * 加载的资源
   */
  assets: PIXI.Loader | undefined;

  move = false;

  /**
   * 视差滚动
   */
  scroller: Scroller | undefined;

  palyer: Spineboy | undefined;

  debugModules: Debug | undefined;

  physicsEngine: PhysicsEngine | undefined;
  interactive: Interactive | undefined;

  /**
   * 游戏结束
   */
  gameover = false;

  /**
   * 得分
   */
  score = 0;

  constructor({
    view,
    width,
    height,
    assets,
  }: {
    view: HTMLCanvasElement;
    width: number;
    height: number;
    assets: Assets;
  }) {
    super();
    this.view = view;
    this.width = width;
    this.height = height;
    this.app = new PIXI.Application({
      width, // 舞台宽度
      height, // 舞台高度
      view, // HTMLCanvasElement DOM对象
      backgroundColor: 0xf1f3f4, // 舞台背景色
    });
    // 资源加载完成事件监听
    this.loader.onComplete.add((loader) => {
      this.loaderComplete(loader);
    });
    // 将配置的资源载入加载器
    for (const iterator of Object.values<AssetsIter>(assets)) {
      this.loader.add(iterator.name, iterator.url);
    }
    // 开始加载资源
    this.loader.load(() => {
      log("load assets");
    });
  }

  /**
   * 资源加载完成调用此函数
   * @param loader
   */
  private loaderComplete(loader: PIXI.Loader) {
    this.send(GameChannel.loaderComplete, {
      event: GameChannel.loaderComplete,
      target: this,
    });
    // log("loader assets complete", loader);
    // 保存资源
    this.assets = loader;
    this.physicsEngine = new PhysicsEngine(this);
    // 背景视差滚动
    this.scroller = new Scroller(this, this.app, this.assets);
    this.palyer = new Spineboy(
      this,
      this.assets,
      PLAYER.startX,
      MAP[0].nY + Wall.offsetY,
      PLAYER.scale
    );

    this.interactive = new Interactive(this);

    /**
     * 是否开启调试功能
     */
    if (this.debug)
      this.debugModules = new Debug(
        this,
        this.scroller,
        this.palyer,
        this.physicsEngine
      );

    this.app.ticker.add(() => {
      this.setScore(this.scroller!);
    });

    this.send(GameChannel.init, {
      event: GameChannel.init,
      target: this,
    });
  }

  sendGameoverEvent(): boolean {
    if (!this.gameover) {
      this.gameover = true;
      this.send(GameChannel.gameover, {
        event: GameChannel.gameover,
        target: this,
      });
    }
    return this.gameover;
  }

  setScore(scroller: Scroller): void {
    const score = Math.round(scroller.viewportX * config.score.viewportX);
    if (this.score !== score) {
      this.score = score;
      this.send(GameChannel.scoreChange, {
        event: GameChannel.scoreChange,
        target: this,
      });
    }
  }

  restart(): void {
    this.scroller!.reset();
    this.palyer!.reset();
    this.gameover = false;
  }
}
