export interface Config {
  /**
   * 是否开启DEBUG
   */
  debug: boolean;
  /**
   * 资源对象
   */
  assets: Assets;
  /**
   * 地图项的纹理宽度
   */
  wallItemWidth: number;
  /**
   * 地图项的纹理高度
   */
  wallItemHeight: number;
  /**
   * 墙体默认高度
   */
  wallDefY: number;
  /**
   * 玩家
   */
  palyer: {
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
  };
  /**
   * 操控杆配置
   */
  joystick: {
    /**
     * 操控杆X位置
     */
    x: number;
    /**
     * 操控杆Y位置
     */
    y: number;
    /**
     * 是否可操控
     */
    interactive: boolean;
    /**
     * 操控杆可拖拽区域
     */
    dragArea: {
      size: number;
      alpha: number;
    };
    /**
     * 操控杆可拖拽限制区域
     */
    limitArea: {
      color: number;
      size: number;
      alpha: number;
    };
    /**
     * 操控杆可拖拽目标
     */
    dragTarget: {
      color: number;
      size: number;
      alpha: number;
      targetAlpha: number;
    };
  };
}

export interface AssetsIter {
  name: string;
  url: string;
}

export interface Assets {
  far: AssetsIter;
  mid: AssetsIter;
  wall: AssetsIter;
  spineboy: AssetsIter;
  [s: string]: AssetsIter;
}

export const config: Config = {
  debug: true,
  assets: {
    far: {
      name: "far",
      url: "./assets/bg-far.png",
    },
    mid: {
      name: "mid",
      url: "./assets/bg-mid.png",
    },
    wall: {
      name: "wall",
      url: "./assets/wall.json",
    },
    spineboy: {
      name: "spineboy",
      url: "./assets/spineboy-pro.json",
    },
  },
  wallItemWidth: 64,
  wallItemHeight: 256,
  wallDefY: 200,
  palyer: {
    startX: 150,
    scale: 0.2,
    speed: {
      walk: 5,
      run: 10,
    },
  },
  joystick: {
    x: 100,
    y: 270,
    interactive: true,
    dragArea: {
      size: 250,
      alpha: 0.05,
    },
    limitArea: {
      color: 0xffffff,
      size: 45,
      alpha: 0.05,
    },
    dragTarget: {
      color: 0xffffff,
      size: 25,
      alpha: 0.06,
      targetAlpha: 0.1,
    },
  },
};

/**
 * 窗户
 */
export enum WallWindow {
  window_1 = "window_01",
  window_2 = "window_02",
}

/**
 * 台阶
 */
export enum WallStep {
  step_1 = "step_01",
}

/**
 * 边缘
 */
export enum WallEdge {
  edge_1 = "edge_01",
  edge_2 = "edge_01",
}

/**
 * 墙壁装饰
 */
export enum WallDecoration {
  decoration_1 = "decoration_01",
  decoration_2 = "decoration_02",
  decoration_3 = "decoration_03",
}

export enum Space {
  none = "none",
}

/**
 * 墙壁纹理集合
 */
export enum WallTextures {
  space = Space.none,
  window_1 = WallWindow.window_1,
  window_2 = WallWindow.window_2,
  step_1 = WallStep.step_1,
  edge_1 = WallEdge.edge_1,
  edge_2 = WallEdge.edge_2,
  decoration_1 = WallDecoration.decoration_1,
  decoration_2 = WallDecoration.decoration_2,
  decoration_3 = WallDecoration.decoration_3,
}

export const Window = [1, 2];
export const StepIndex = [3, 4];
export const EdgeIndex = [5, 6, 7, 8];
export const Decoration = [9, 10, 11];

export const WallMap: { [key: number]: WallTextures } = {
  0: WallTextures.space,
  1: WallTextures.window_1,
  2: WallTextures.window_2,
  3: WallTextures.step_1,
  4: WallTextures.step_1,
  5: WallTextures.edge_1,
  6: WallTextures.edge_1,
  7: WallTextures.edge_2,
  8: WallTextures.edge_2,
  9: WallTextures.decoration_1,
  10: WallTextures.decoration_2,
  11: WallTextures.decoration_3,
};

export interface Physics {
  /**
   * 空气密度
   */
  RHO: number;

  /**
   * 重力加速度
   */
  AG: number;
}

export const PHYSICS: Physics = {
  AG: 9.81,
  RHO: 1.22,
};
