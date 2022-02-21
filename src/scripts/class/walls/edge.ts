import * as PIXI from "pixi.js";
import { WallTextures, config } from "@/config";
import WallItem from "./wallItem";

/**
 * 墙壁边缘
 */
export default class Edge extends WallItem {
  /**
   * 方向
   */
  direction: boolean;
  leftGround: [number, number][] = [
    [18, 6],
    [64, 6],
    [64, 64],
    [18, 64],
  ];
  rightGround: [number, number][] = [
    [0, 6],
    [46, 6],
    [46, 64],
    [0, 64],
  ];
  offsetY = (this.leftGround[2][1] - this.leftGround[1][1]) / 2;
  /**
   * 地面碰撞点
   */
  rectGround: [number, number][][];
  type: WallTextures;
  edge = true;
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
    this.type = type;
    this.rectGround = [this.direction ? this.leftGround : this.rightGround];
    if (!this.direction) {
      this.anchor.x = 1;
      this.scale.x = -1;
    }
  }

  getPoint(): [number, number][] {
    return [
      [
        this.x + this.rectGround[0][0][0],
        this.y + this.rectGround[0][0][1] + this.offsetY,
      ],
      [
        this.x + this.rectGround[0][1][0],
        this.y + this.rectGround[0][1][1] + this.offsetY,
      ],
    ];
  }
}
