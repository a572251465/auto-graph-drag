interface IFn {
  (...args: any[]): void
}

interface IEmits {
  [keyName: string]: IFn[]
}
const pool: IEmits = {}

/**
 * @author lihh
 * @description 进行简单的事件发布订阅
 */
const emits = {
  on: function on(keyName: string, fn: IFn) {
    const arr = pool[keyName] || (pool[keyName] = [])

    if (arr.includes(fn)) return
    arr.push(fn)
  },
  emit: function on(keyName: string, ...args: any[]) {
    const arr = pool[keyName] || []

    if (arr.length === 0) return
    arr.forEach((fn) => fn(...args))
  }
}

export default emits
