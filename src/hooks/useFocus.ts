import { watch } from 'vue'
import { IBlockItem, IDataConfig } from '@/types/common'

/**
 * @author lihh
 * @description 监听元素的光标选中事件
 * @param props 所有的待监听的元素
 */
const useFocus = function useFocus(props: { modelValue: IDataConfig }) {
  const focus: IBlockItem[] = []
  const unFocus: IBlockItem[] = []

  watch(
    () => props.modelValue.blocks,
    (val) => {
      focus.length = 0
      unFocus.length = 0

      val.forEach((item) => (item.isFocus ? focus : unFocus).push(item))
    },
    {
      deep: true
    }
  )

  return {
    focus,
    unFocus
  }
}

export default useFocus
