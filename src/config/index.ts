export interface Config {
  assets: Assets;
  wallItemWidth: number;
  walls: number[][];
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
  wallItemWidth: 64,
  walls: [
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
    [0, 0],
    [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  ],
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
export const Step = [3, 4];
export const Edge = [5, 6, 7, 8];
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
