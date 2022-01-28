export default class Pool<T> {
  pool: Set<T>;
  constructor(targets: T[]) {
    this.pool = new Set(targets);
  }

  add(target: T): Set<T> {
    return this.pool.add(target);
  }

  fetch(): T | undefined {
    const target = [...this.pool].shift();
    if (target) {
      this.pool.delete(target);
      return target;
    } else {
      return target;
    }
  }
}
