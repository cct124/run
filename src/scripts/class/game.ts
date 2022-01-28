import * as PIXI from "pixi.js";
import { Assets, AssetsIter } from "@/config";
import Scroller from "@/scripts/class/background/scroller";

export default class Game {
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

  /**
   * 视差滚动
   */
  scroller: Scroller | undefined;

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
    log("loader assets complete", loader);
    // 保存资源
    this.assets = loader;
    // 背景视差滚动
    this.scroller = new Scroller(this.app, this.assets);
  }
}
