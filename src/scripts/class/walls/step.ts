import * as PIXI from "pixi.js";
import { WallTextures, config } from "@/config";
import WallItem from "./wallItem";

interface navitePoint {
  highlands: Point;
  lowland: Point;
  edgePoint: Point;
}
type Point = [number, number][];

/**
 * 台阶
 */
export default class Step extends WallItem {
  static left: navitePoint = {
    highlands: [
      [0, 7],
      [10, 7],
      [10, 64],
      [0, 64],
    ],
    lowland: [
      [10, 70],
      [64, 70],
      [64, 128],
      [10, 128],
    ],
    edgePoint: [
      [10, 7],
      [10, 128],
    ],
  };

  static right: navitePoint = {
    highlands: [
      [56, 7],
      [64, 7],
      [64, 64],
      [56, 64],
    ],
    lowland: [
      [0, 70],
      [56, 70],
      [56, 128],
      [0, 128],
    ],
    edgePoint: [
      [56, 128],
      [56, 7],
    ],
  };

  /**
   * 高地面
   */
  highlands: Point = [];
  /**
   * 底地面
   */
  lowland: Point = [];
  /**
   * 边缘
   */
  edgePoint: Point = [];
  type: WallTextures;
  /**
   * 左右翻转
   */
  direction: boolean;
  step = true;
  static offsetY = (Step.left.highlands[2][1] - Step.left.highlands[1][1]) / 2;

  constructor(
    id: number,
    type: WallTextures,
    mapType: number,
    nY: number,
    assets: PIXI.Loader,
    direction = true
  ) {
    super(
      id,
      mapType,
      nY,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      assets.resources[config.assets.wall.name].textures![type]
    );
    this.direction = direction;
    if (!this.direction) {
      this.anchor.x = 1;
      this.scale.x = -1;
    }
    this.type = type;
  }

  static getPoint(direction = true): [number, number][] {
    let rectGround;
    if (direction) {
      rectGround = [
        this.left.highlands,
        this.left.edgePoint,
        this.left.lowland,
      ];
    } else {
      rectGround = [
        this.right.lowland,
        this.right.edgePoint,
        this.right.highlands,
      ];
    }

    return [
      [
        rectGround[1][0][0],
        rectGround[1][0][1] + (direction ? this.offsetY : -this.offsetY),
      ],
      [
        rectGround[1][1][0],
        rectGround[1][1][1] + (direction ? -this.offsetY : +this.offsetY),
      ],
    ];
  }
}
