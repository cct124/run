/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as PIXI from "pixi.js";

/**
 * 基本事件类
 */
export class Observer<T, E> {
  private map: Map<T, Set<(event: E, ...args: unknown[]) => void>>;
  constructor(observer?: [T, Set<(...args: unknown[]) => void>][]) {
    this.map = new Map(observer);
  }

  /**
   * 监听事件
   * @param channel  频道
   * @param fn 事件回调
   * @returns
   */
  listen(
    channel: T,
    fn: (event: E, ...args: unknown[]) => void
  ): () => boolean {
    if (this.map.has(channel)) {
      this.map.get(channel)!.add(fn);
    } else {
      this.map.set(channel, new Set([fn]));
    }

    return () => this.map.get(channel)!.delete(fn);
  }

  /**
   * 发送事件
   * @param channel 频道
   * @param event 事件对象
   * @param args
   * @returns
   */
  send(channel: T, event: E, ...args: unknown[]): boolean {
    if (!this.map.has(channel)) return false;
    this.map.get(channel)!.forEach((fn) => fn(event, ...args));
    return true;
  }
}

/**
 * 事件类
 */
export class PIXIContainerObserver<T, E> extends PIXI.Container {
  private map: Map<T, Set<(event: E, ...args: unknown[]) => void>>;
  constructor(observer?: [T, Set<(...args: unknown[]) => void>][]) {
    super();
    this.map = new Map(observer);
  }

  /**
   * 监听事件
   * @param channel  频道
   * @param fn 事件回调
   * @returns
   */
  listen(
    channel: T,
    fn: (event: E, ...args: unknown[]) => void
  ): () => boolean {
    if (this.map.has(channel)) {
      this.map.get(channel)!.add(fn);
    } else {
      this.map.set(channel, new Set([fn]));
    }

    return () => this.map.get(channel)!.delete(fn);
  }

  /**
   * 发送事件
   * @param channel 频道
   * @param event 事件对象
   * @param args
   * @returns
   */
  send(channel: T, event: E, ...args: unknown[]): boolean {
    if (!this.map.has(channel)) return false;
    this.map.get(channel)!.forEach((fn) => fn(event, ...args));
    return true;
  }
}
