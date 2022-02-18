import * as PIXI from "pixi.js";
import { config } from "@/config";
import { Spine, ITrackEntry } from "pixi-spine";
import Inertia from "../physics/Inertia";
/**
 * 玩家
 */
export default class Player extends Inertia {
  scale: number;
  spineData: Spine;
  app: PIXI.Application;

  constructor(
    app: PIXI.Application,
    loader: PIXI.Loader,
    scale = 1,
    mass: number,
    A: number,
    cd: number
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const spineData = loader.resources[config.assets.spineboy.name].spineData!;
    super(mass, A, cd);
    this.spineData = new Spine(spineData);
    this.app = app;
    this.scale = scale;
    this.spineData.scale.set(this.scale, this.scale);
    this.app.stage.addChild(this.spineData);
    this.spineData.x = 100;
    this.spineData.y = 240;
  }

  /**
   * 设置轨道的当前动画，丢弃任何排队的动画。如果以前的当前轨道条目从未应用于骨架，则将其替换（不混合）
   * @param trackIndex
   * @param animationName
   * @param loop 如果为真，动画将重复。如果为 false，则不会，而是在播放超过其持续时间时应用其最后一帧。在任何一种情况下， trackEnd 都会确定轨道何时被清除。
   * @returns 允许进一步自定义动画播放的轨道条目。在dispose事件发生后，不得保留对轨道条目的引用。
   */
  setAnimation<T>(
    trackIndex: number,
    animationName: T,
    loop: boolean
  ): ITrackEntry {
    return this.spineData.state.setAnimation(
      trackIndex,
      animationName as unknown as string,
      loop
    );
  }

  /**
   * 在轨道的当前或最后一个排队动画之后添加要播放的动画。如果 track 为空，则相当于调用setAnimation。
   * @param trackIndex
   * @param animationName
   * @param loop
   * @param delay 如果 > 0，设置延迟。如果 <= 0，延迟设置是前一个轨道入口的持续时间减去任何混合持续时间（来自AnimationStateData）加上指定的delay（即混合在 ( delay= 0) 或之前 ( delay<0) 前一个轨道入口持续时间） . 如果前一个条目正在循环，则使用其下一个循环完成而不是其持续时间。
   * @returns 允许进一步自定义动画播放的轨道条目。在dispose事件发生后，不得保留对轨道条目的引用。
   */
  addAnimation<T>(
    trackIndex: number,
    animationName: T,
    loop: boolean,
    delay: number
  ): ITrackEntry {
    return this.spineData.state.addAnimation(
      trackIndex,
      animationName as unknown as string,
      loop,
      delay
    );
  }
}
