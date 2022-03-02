import { Body, Pairs, ICollision } from "matter-js";

export interface DetectorOptions {
  bodies?: Body[];
  pairs?: Pairs;
}

declare module "matter-js" {
  /**
   * 该`Matter.Detector`模块包含使用广泛相位算法有效检测物体列表之间的碰撞的方法。
   */
  export declare class Detector {
    /**
     * 创建一个新的碰撞检测器。
     * @param options
     * @returns 一种新的碰撞检测器
     */
    static create(options?: DetectorOptions): Detector;

    /**
     * 清除检测器，包括其主体列表。
     * @param detector 探测器
     */
    static clear(detector: Detector): Detector;

    /**
     * `detector.bodies`使用宽相位算法有效地发现所有物体之间的所有碰撞。
     *
     * _注意：版本之间不保证返回的冲突的特定顺序，并且可能会因性能原因而改变。如果需要特定排序，则对结果数组应用排序。_
     * @param detector 探测器
     */
    static collisions(detector: Detector): ICollision[];

    /**
     * 设置检测器中的实体列表。
     * @param detector 探测器
     * @param bodies
     */
    static setBodies(detector: Detector, bodies: Body[]): void;

    /**
     * `Matter.Body`检测器发现冲突的数组。
     *
     * _注意：此阵列中物体的顺序不固定，将由探测器持续管理。_
     */
    bodies: Body[];

    /**
     * 可选的。`Matter.Pairs`可以重用先前碰撞对象的对象。供内部`Matter.Engine`使用。
     */
    pairs: Pairs;
  }
}
