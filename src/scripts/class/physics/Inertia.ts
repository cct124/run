import { PHYSICS } from "@/config";

/**
 * 惯性
 */
export default class Inertia {
  frameRate = 1 / 30;

  coe = -0.5;
  /**
   * x方向的速度
   */
  vx = 0;
  /**
   * y方向的速度
   */
  vy = 0;

  /**
   * 质量kg
   */
  mass: number;
  /**
   * 正面面积投影
   */
  A: number;

  /**
   * 阻力系数
   */
  cd: number;

  /**
   * 空气密度
   */
  rho = PHYSICS.RHO;

  /**
   * 重力加速度
   */
  ag = PHYSICS.AG;

  /**
   * 水平作用于物体上的力
   */
  XF = 0;
  /**
   * 垂直作用于物体上的力
   */
  YF = 0;

  /**
   * 常量
   */
  c = 0;

  /**
   * 示例化惯性
   * @param mass 质量kg
   * @param A 正面面积投影
   * @param cd 阻力系数
   */
  constructor(mass: number, A: number, cd: number) {
    this.mass = mass;
    this.A = A;
    this.cd = cd;
    this.c = -0.5 * this.cd * this.A * this.rho;
  }

  /**
   * 计算位移
   * @returns
   */
  offset(x: number, y: number): [number, number] {
    let Fx =
      this.c * Math.pow(this.vx, 2) * (this.vx / Math.abs(this.vx)) + this.XF;
    let Fy =
      this.c * Math.pow(this.vy, 2) * (this.vy / Math.abs(this.vy)) + this.YF;

    Fx = isNaN(Fx) ? 0 : Fx;
    Fy = isNaN(Fy) ? 0 : Fy;

    const ax = Fx / this.mass;
    const ay = this.ag + Fy / this.mass;

    this.vx += ax * this.frameRate;
    this.vy += ay * this.frameRate;

    return [
      x + this.vx * this.frameRate * 100,
      y + this.vy * this.frameRate * 100,
    ];
  }
}
