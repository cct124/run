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
  left: navitePoint = {
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

  right: navitePoint = {
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
  offsetY = (this.left.highlands[2][1] - this.left.highlands[1][1]) / 2;

  constructor(
    type: WallTextures,
    mapType: number,
    nY: number,
    assets: PIXI.Loader,
    direction = true
  ) {
    super(
      mapType,
      nY,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      assets.resources[config.assets.wall.name].textures![type]
    );
    this.direction = direction;
    if (this.direction) {
      this.highlands = this.left.highlands;
      this.lowland = this.left.lowland;
      this.edgePoint = this.left.edgePoint;
      this.rectGround = [this.highlands, this.edgePoint, this.lowland];
    } else {
      this.anchor.x = 1;
      this.scale.x = -1;
      this.highlands = this.right.highlands;
      this.lowland = this.right.lowland;
      this.edgePoint = this.right.edgePoint;
      this.rectGround = [this.lowland, this.edgePoint, this.highlands];
    }
    this.type = type;
  }

  getPoint(): [number, number][] {
    return [
      [
        this.rectGround[1][0][0] + this.x,
        this.rectGround[1][0][1] +
          this.y +
          (this.direction ? this.offsetY : -this.offsetY),
      ],
      [
        this.rectGround[1][1][0] + this.x,
        this.rectGround[1][1][1] +
          this.y +
          (this.direction ? -this.offsetY : +this.offsetY),
      ],
    ];
  }
}
