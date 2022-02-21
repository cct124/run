import * as PIXI from "pixi.js";
import { Assets, AssetsIter, config } from "@/config";
import Scroller from "@/scripts/class/background/scroller";
import Player from "@/scripts/class/player";
import Spineboy from "./player/Spineboy";
import Debug from "./debug";
import Observer from "./observer";

export enum GameChannel {
  /**
   * 资源加载完成
   */
  loaderComplete = "loaderComplete",
  /**
   * 游戏初始化完成
   */
  init = "init",
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

  palyer: Player | undefined;

  debugObject: Debug | undefined;

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
      width,
      height,
      view,
      backgroundColor: 0xf1f3f4,
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
    // 背景视差滚动
    this.scroller = new Scroller(this.app, this.assets);
    this.palyer = new Spineboy(this.app, this.assets);
    if (this.debug)
      this.debugObject = new Debug(this, this.scroller, this.palyer);
    this.send(GameChannel.init, {
      event: GameChannel.init,
      target: this,
    });
  }
}
