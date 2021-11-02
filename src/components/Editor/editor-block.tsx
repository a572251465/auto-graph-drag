import { computed, defineComponent, PropType } from 'vue'
import {IBlockItem, IComponentInfo} from '@/types/common'
import {componentMap} from "@/hooks/registerComponent";

import './index.scss'

export default defineComponent({
  name: 'editor-block',
  props: {
    block: {
      type: Object as PropType<IBlockItem>,
      required: true
    }
  },
  setup(props) {
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
    const render = Reflect.has(componentInfo, 'render') ? compMap[props.block.key].render() : `暂无次组件_${componentInfo.label}`

    return () => (
      <div class="block-item" style={computedStyles.value}>
        {render}
      </div>
    )
  }
})
