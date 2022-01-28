export interface Config {
  assets: Assets;
}

export interface AssetsIter {
  name: string;
  url: string;
}

export interface Assets {
  far: AssetsIter;
  mid: AssetsIter;
  wall: AssetsIter;
  [s: string]: AssetsIter;
}

export const config: Config = {
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

/**
 * 墙壁纹理集合
 */
export enum WallTextures {
  window_1 = WallWindow.window_1,
  window_2 = WallWindow.window_2,
  step_1 = WallStep.step_1,
  edge_1 = WallEdge.edge_1,
  edge_2 = WallEdge.edge_2,
  decoration_1 = WallDecoration.decoration_1,
  decoration_2 = WallDecoration.decoration_2,
  decoration_3 = WallDecoration.decoration_3,
}
