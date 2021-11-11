import { reactive } from 'vue'
import { IBlockItem, IDataConfig } from '@/types/common'
import { off, on } from '@/hooks/dom'
import emits from '@/utils/emits'
import { editDataConfig, quoteValues } from '@/utils/constant'

interface IBlockPos {
  left: number
  top: number
  id: number
}

interface ILines {
  x: {
    showLeft: number
    left: number
  }[]
  y: {
    showTop: number
    top: number
  }[]
}

const markLine = reactive<{ x: number | null; y: number | null }>({
  x: null,
  y: null
})

/**
 * @author lihh
 * @description 元素移动事件
 * @param focusData 获取光标的元素
 * @param unFocusData 获取未选中光标的元素
 */
const useElementMove = function useElementMove(
  focusData: IBlockItem[],
  unFocusData: IBlockItem[],
  data: IDataConfig
) {
  const startPos: {
    startX: number
    startY: number
    blockPos: IBlockPos[]
    // 最后点击元素的坐标
    startLeft: number
    startTop: number
    lines: ILines
  } = {
    startX: 0,
    startY: 0,
    blockPos: [],
    startTop: 0,
    startLeft: 0,
    lines: { y: [], x: [] }
  }
  // 鼠标移动事件
  const mouseMoveHandle = function (e: MouseEvent) {
    let { clientX: moveX, clientY: moveY } = e

    // 计算当前元素最新的left top 到线里找 显示线的位置
    const left = moveX - startPos.startX + startPos.startLeft
    const top = moveY - startPos.startY + startPos.startTop

    let x = null as null | number
    let y = null as null | number

    for (let i = 0; i < startPos.lines.y.length; i += 1) {
      const { top: t, showTop: s } = startPos.lines.y[i]

      if (Math.abs(t - top) < 5) {
        y = s
        moveY = startPos.startY - startPos.startTop + t
        break
      }
    }

    for (let i = 0; i < startPos.lines.x.length; i += 1) {
      const { left: l, showLeft: s } = startPos.lines.x[i]

      if (Math.abs(l - left) < 5) {
        x = s
        moveX = startPos.startX - startPos.startLeft + l
        break
      }
    }

    markLine.x = x
    markLine.y = y

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
    markLine.x = null
    markLine.y = null
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

    // 获取移动元素的信息  宽/ 高/ 距left距离 距top距离
    const {
      left,
      top,
      width: bWidth,
      height: bHeight
    } = quoteValues.lastClickElement as IBlockItem
    startPos.startLeft = left
    startPos.startTop = top

    // 计算所有的移动显示辅助线的坐标
    startPos.lines.x.length = 0
    startPos.lines.y.length = 0

    // 计算所有的未选中的元素 以及container元素相对移动元素的位置
    ;(
      [
        ...unFocusData,
        {
          width: data.container.width,
          height: data.container.height,
          left: 0,
          top: 0
        }
      ] as IBlockItem[]
    ).forEach((block: IBlockItem) => {
      const { top: aTop, left: aLeft, width: aWidth, height: aHeight } = block

      if (bHeight && bWidth) {
        // 顶对顶
        startPos.lines.y.push({ showTop: aTop, top: aTop })
        // 顶对底
        startPos.lines.y.push({ showTop: aTop, top: aTop - bHeight })
        // 中对中
        startPos.lines.y.push({
          showTop: aTop + aHeight! / 2,
          top: aTop + aHeight! / 2 - bHeight / 2
        })
        // 底对顶
        startPos.lines.y.push({
          showTop: aTop + aHeight!,
          top: aTop + aHeight!
        })
        // 底对底
        startPos.lines.y.push({
          showTop: aTop + aHeight!,
          top: aTop + aHeight! - bHeight
        })

        // 左对左
        startPos.lines.x.push({ showLeft: aLeft, left: aLeft })
        startPos.lines.x.push({
          showLeft: aLeft + aWidth!,
          left: aLeft + aWidth!
        })
        startPos.lines.x.push({
          showLeft: aLeft + aWidth! / 2,
          left: aLeft + aWidth! / 2 - bWidth / 2
        })
        startPos.lines.x.push({
          showLeft: aLeft + aWidth!,
          left: aLeft + aWidth! - bWidth
        })
        startPos.lines.x.push({ showLeft: aLeft, left: aLeft - bWidth })
      }
    })
  }
}

export { useElementMove, markLine }
