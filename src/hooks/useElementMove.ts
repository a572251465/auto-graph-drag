import { IBlockItem } from '@/types/common'
import { off, on } from '@/hooks/dom'
import emits from '@/utils/emits'
import { editDataConfig } from '@/utils/constant'

interface IBlockPos {
  left: number
  top: number
  id: number
}

/**
 * @author lihh
 * @description 元素移动事件
 * @param focusData 获取光标的元素
 */
const useElementMove = function useElementMove(focusData: IBlockItem[]) {
  const startPos: {
    startX: number
    startY: number
    blockPos: IBlockPos[]
  } = {
    startX: 0,
    startY: 0,
    blockPos: []
  }
  // 鼠标移动事件
  const mouseMoveHandle = function (e: MouseEvent) {
    const { clientX: moveX, clientY: moveY } = e
    const curX = moveX - startPos.startX
    const curY = moveY - startPos.startY

    startPos.blockPos.forEach((block) => {
      emits.emit(editDataConfig, block.id, {
        left: block.left + curX,
        top: block.top + curY
      })
    })
  }

  // 鼠标up 事件
  const mouseUpHandle = function () {
    off(document, 'mousemove', mouseMoveHandle)
    off(document, 'mouseup', mouseUpHandle)
  }

  return function (e: MouseEvent) {
    on(document, 'mousemove', mouseMoveHandle)
    on(document, 'mouseup', mouseUpHandle)

    startPos.startX = e.clientX
    startPos.startY = e.clientY
    startPos.blockPos = focusData.map(
      (item) =>
        ({
          left: item.left,
          top: item.top,
          id: item.id
        } as IBlockPos)
    )
  }
}

export default useElementMove
