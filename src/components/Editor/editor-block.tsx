import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { IBlockItem, IComponentInfo, IDataConfig } from '@/types/common'
import { componentMap } from '@/hooks/registerComponent'

import './index.scss'
import emits from '@/utils/emits'
import { editDataConfig } from '@/utils/constant'
import useElementFocus from '@/hooks/useElementFocus'

export default defineComponent({
  name: 'editor-block',
  props: {
    block: {
      type: Object as PropType<IBlockItem>,
      required: true
    }
  },
  emits: ['mouse-down'],
  setup(props, ctx) {
    const blockRef = ref<HTMLDivElement | null>(null)

    // 设置样式的计算属性
    const computedStyles = computed(() => ({
      width: `${props.block.width}px`,
      height: `${props.block.height}px`,
      left: `${props.block.left}px`,
      top: `${props.block.top}px`,
      zIndex: props.block.zIndex
    }))

    // 指定渲染的组件
    const compMap: Record<string, IComponentInfo> = componentMap
    const componentInfo: IComponentInfo = compMap[props.block.key]
    const render = Reflect.has(componentInfo, 'render')
      ? compMap[props.block.key].render()
      : `暂无此组件_${componentInfo.label}`

    // 组件加载钩子函数
    onMounted(() => {
      if (props.block.isCenter) return

      if (blockRef.value) {
        const { offsetWidth, offsetHeight } = blockRef.value

        emits.emit(editDataConfig, props.block.id, {
          left: props.block.left - offsetWidth / 2,
          top: props.block.top - offsetHeight / 2,
          isCenter: true
        })
      }
    })

    // 鼠标按下事件
    const { elementFocusHandle } = useElementFocus(props, (e: MouseEvent) => {
      ctx.emit('mouse-down', e)
    })

    return () => (
      <div
        class={props.block.isFocus ? 'block-item is-focus' : 'block-item'}
        onMousedown={(e) => elementFocusHandle(e)}
        style={computedStyles.value}
        ref={blockRef}
      >
        {render}
      </div>
    )
  }
})
