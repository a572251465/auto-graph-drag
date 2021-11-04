export interface IFn {
  (): void
}

const eventStack = new WeakMap()

/**
 * @author lihh
 * @description 进行时间的绑定等
 * @param el 待绑定的dom
 * @param eventName 绑定的方法
 * @param handle 绑定的事件
 */
const on = function on(
  el: HTMLDivElement,
  eventName: string,
  // eslint-disable-next-line
  handle: (...args: any[]) => void
): IFn {
  if (eventStack.get(handle) === eventName) return () => ({})
  el.addEventListener(eventName, handle, false)

  // 保存缓存
  eventStack.set(handle, eventName)
  // 返回解绑方法
  return function off() {
    eventStack.delete(handle)
    el.removeEventListener(eventName, handle, false)
  }
}

export default on
