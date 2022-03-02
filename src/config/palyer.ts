/**
 * 玩家
 */
export interface PalyerOptions {
  /**
   * 玩家开始X位置
   */
  startX: number;
  /**
   * 玩家大小
   */
  scale: number;
  /**
   * 玩家运动速度
   */
  speed: {
    /**
     * 行走
     */
    walk: number;
    /**
     * 奔跑
     */
    run: number;
  };
  jump: {
    /**
     * 待机时
     */
    idle: number;
    /**
     * 行走时
     */
    walk: number;
    /**
     * 奔跑时
     */
    run: number;
  };
  /**
   * 空气阻力
   */
  frictionAir: number;
}

/**
 * 玩家配置
 */
export const PLAYER: PalyerOptions = {
  startX: 150,
  scale: 0.2,
  speed: {
    walk: 2,
    run: 5,
  },
  jump: {
    /**
     * 待机时
     */
    idle: 1,
    /**
     * 行走时
     */
    walk: 2,
    /**
     * 奔跑时
     */
    run: 4,
  },
  frictionAir: 0,
};
