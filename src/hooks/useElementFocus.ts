// 元素焦点事件
import emits from '@/utils/emits'
import { editDataConfig } from '@/utils/constant'
import { IBlockItem } from '@/types/common'

interface IFn {
  (e: MouseEvent): void
}

/**
 * @author lihh
 * @description 元素获取焦点focus
 * @param props 传递的数据
 * @param callback
 */
const useElementFocus = function elementFocusHandle(
  props: {
    block: IBlockItem
  },
  callback: IFn
) {
  // 元素聚焦事件
  const elementFocusHandle = function elementFocusHandle(e: MouseEvent) {
    e.stopPropagation()
    e.preventDefault()

    const { id } = props.block

    // 是否按住shift key
    if (e.shiftKey) {
      emits.emit(editDataConfig, id, { isFocus: !props.block.isFocus })

      // 触发事件
      Promise.resolve().then(() => callback(e))
      return
    }

    // 修改状态
    emits.emit(editDataConfig, -1, { isFocus: false })
    emits.emit(editDataConfig, id, { isFocus: !props.block.isFocus })

    // 触发事件
    Promise.resolve().then(() => callback(e))
  }

  return {
    elementFocusHandle
  }
}

export default useElementFocus
