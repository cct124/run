// export class Adaptation {
//   constructor() {

//   }
// }
/**
 * 生成一个从 `start` 到 `end` 的递增数字数组
 * @param start
 * @param end
 * @returns
 */
export function genArr(start: number, end: number): number[] {
  return Array.from(new Array(end + 1).keys()).slice(start);
}

/**
 * 在某个数字区间内取随机数
 * @param maxNum 最大值
 * @param minNum 最小值
 * @param decimalNum 几位小数
 * @returns
 */
export function randomNum(
  maxNum: number,
  minNum: number,
  decimalNum?: number
): number {
  let max = 0,
    min = 0;
  minNum <= maxNum
    ? ((min = minNum), (max = maxNum))
    : ((min = maxNum), (max = minNum));
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * (max + 1));
    case 2:
      return Math.floor(Math.random() * (max - min + 1) + min);
    case 3:
      return parseFloat(
        (Math.random() * (max - min) + min).toFixed(decimalNum)
      );
    default:
      return Math.random();
  }
}

/**
 * 混合两个对象
 * @param t1
 * @param t2
 * @returns
 */
export function mixins<T>(t1: unknown, t2: T): T {
  return Object.assign(t1, t2);
}

export function deepMixins(
  obj1: { [key: string]: any },
  obj2: { [key: string]: any }
) {
  let key;
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
    obj1[key] =
      obj1[key] &&
      obj1[key].toString() === "[object Object]" &&
      obj2[key] &&
      obj2[key].toString() === "[object Object]"
        ? deepMixins(obj1[key], obj2[key])
        : (obj1[key] = obj2[key]);
  }
  return obj1;
}
