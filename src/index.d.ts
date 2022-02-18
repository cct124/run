/* eslint-disable @typescript-eslint/no-unused-vars */
import { IBone, Vector2 } from "pixi-spine";

declare module "pixi-spine" {
  export interface IBone extends IBone {
    /**
     * 本地x轴变换
     */
    x: number;
    /**
     * 本地y轴变换
     */
    y: number;

    /** The world X position. If changed, {@link #updateAppliedTransform()} should be called. */
    worldY: number;
    /** The world Y position. If changed, {@link #updateAppliedTransform()} should be called. */
    worldX: number;

    /** Computes the world transform using the parent bone and this bone's local applied transform. */
    update(): void;
    /** Computes the world transform using the parent bone and this bone's local transform.
     *
     * See {@link #updateWorldTransformWith()}. */
    updateWorldTransform(): void;
    /** Transforms a point from the bone's local coordinates to world coordinates. */
    localToWorld(local: Vector2): Vector2;
    /** Computes the applied transform values from the world transform.
     *
     * If the world transform is modified (by a constraint, {@link #rotateWorld(float)}, etc) then this method should be called so
     * the applied transform matches the world transform. The applied transform may be needed by other code (eg to apply other
     * constraints).
     *
     * Some information is ambiguous in the world transform, such as -1,-1 scale versus 180 rotation. The applied transform after
     * calling this method is equivalent to the local transform used to compute the world transform, but may not be identical. */
    updateAppliedTransform(): void;

    worldToLocal(world: Vector2): Vector2;
  }
}
