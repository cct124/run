export interface JoystickOptions {
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
  dragAreaTypes: DragArea[];
}

export interface DragArea {
  type: DRAG_AREA;
  scope: (angle: number) => boolean;
}

export enum DRAG_AREA {
  L = "left",
  LT = "LEFT_TOP",
  T = "TOP",
  RT = "RIGHT_TOP",
  R = "RIGHT",
  RB = "RIGHT_BOTTOM",
  B = "BOTTOM",
  LB = "LEFT_BOTTOM",
}

/**
 * 操控杆配置
 */
export const JOY_OPT: JoystickOptions = {
  x: 100,
  y: 270,
  interactive: true,
  dragArea: {
    size: 250,
    alpha: 0,
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
  dragAreaTypes: [
    {
      type: DRAG_AREA.L,
      scope: (angle) =>
        (angle > 315 && angle <= 360) || (angle >= 0 && angle <= 45),
    },
    {
      type: DRAG_AREA.T,
      scope: (angle) => angle > 45 && angle <= 135,
    },
    {
      type: DRAG_AREA.R,
      scope: (angle) => angle > 135 && angle <= 225,
    },
    {
      type: DRAG_AREA.B,
      scope: (angle) => angle > 225 && angle <= 315,
    },
  ],
};
