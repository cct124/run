export interface GameMap {
  nY: number;
  walls: number[];
  step?: boolean;
}

export default [
  [5, 1, 9, 2, 1, 9, 10, 10, 11, 1, 9, 2, 1, 9, 10, 10, 11, 6],
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
];

export const MAP: GameMap[] = [
  // {
  //   nY: 190,
  //   walls: [
  //     5, 1, 9, 2, 1, 9, 10, 10, 11, 1, 9, 2, 1, 9, 10, 10, 11, 1, 9, 2, 1, 9,
  //     10, 10, 11, 6,
  //   ],
  // },
  // {
  //   nY: 0,
  //   walls: [0, 0],
  // },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 2, 3, 9, 10, 4, 2, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 4, 11, 2, 3, 9, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 4, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },

  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 4, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 2, 3, 9, 10, 4, 2, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 4, 11, 2, 3, 9, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 4, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },

  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 4, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 2, 3, 9, 10, 4, 2, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 4, 11, 2, 3, 9, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 4, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },

  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 4, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 2, 3, 9, 10, 4, 2, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 4, 11, 2, 3, 9, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 4, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },
  {
    nY: 200,
    walls: [5, 1, 9, 2, 1, 9, 10, 10, 11, 6],
  },
  {
    nY: 0,
    walls: [0, 0],
  },

  {
    nY: 190,
    walls: [5, 1, 9, 2, 3, 9, 10, 10, 11, 6],
    step: true,
  },
  {
    nY: 0,
    walls: [0],
  },
  {
    nY: 190,
    walls: [5, 1, 9, 2, 4, 9, 10, 10, 11, 6],
    step: true,
  },
];
