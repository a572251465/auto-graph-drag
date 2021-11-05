/**
 * @author lihh
 * @description 表示拖拽菜单事件
 */
import { WritableComputedRef } from 'vue'
import on, { IFn } from '@/hooks/dom'
import { editorCanvas, quoteValues } from '@/utils/constant'
import { IComponentInfo, IDataConfig } from '@/types/common'

/**
 * @author lihh
 * @description 表示拖拽的菜单
 * @param data
 */
const dragMenu = function (data: WritableComputedRef<IDataConfig>) {
  const eventStack: IFn[] = []
  let currentEditorComponent: IComponentInfo | null = null

  // 绑定事件
  const dragenter = function dragenter(e: DragEvent) {
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move'
    }
  }
  const dragover = function dragover(e: DragEvent) {
    e.preventDefault()
  }
  const dragleave = function dragleave(e: DragEvent) {
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'none'
    }
  }
  const drop = function drop(e: DragEvent) {
    const left = e.offsetX
    const top = e.offsetY

    data.value = {
      ...data.value,
      blocks: [
        ...data.value.blocks,
        {
          key: currentEditorComponent?.key,
          left,
          isCenter: false,
          top,
          zIndex: 1,
          isFocus: false,
          id: +new Date()
        }
      ]
    } as IDataConfig

    currentEditorComponent = null
  }

  // 拖拽开始时
  const dragStart = function dragStart(component: IComponentInfo) {
    const el = quoteValues[editorCanvas]
    if (el) {
      eventStack.push(on(el, 'dragenter', dragenter))
      eventStack.push(on(el, 'dragover', dragover))
      eventStack.push(on(el, 'dragleave', dragleave))
      eventStack.push(on(el, 'drop', drop))
    }

    currentEditorComponent = component
  }

  // 拖拽离开时
  const dragEnd = function dragLeave() {
    eventStack.forEach((fn) => fn())
    eventStack.length = 0
  }

  return {
    dragStart,
    dragEnd
  }
}

export default dragMenu
