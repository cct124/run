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
