import {computed, defineComponent, PropType} from 'vue'
import deepcopy from "deepcopy";
import {IComponentInfo, IDataConfig} from '@/types/common'
import { componentList } from '@/hooks/registerComponent'

import './index.scss'
import dragMenu from "@/hooks/dragMenu";

export default defineComponent({
  name: 'left',
  props: {
    modelValue: {
      type: Object as PropType<IDataConfig>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    // 获取组件列表
    const compList: IComponentInfo[] = componentList

    // 监听数据变化
    const data = computed<IDataConfig>({
      get() {
        return props.modelValue
      },
      set(newValue) {
        ctx.emit('update:modelValue', deepcopy(newValue))
      }
    })

    // 获取绑定事件
    const {dragStart, dragEnd} = dragMenu(data)

    return () => (
      <div class="left">
        <ul class="left-ul">
          {compList.map((item) => (
            <li class="left-ul-li" draggable = "true" onDragstart = {() => dragStart(item)} onDragend = {dragEnd}>
              <span class="flagLabel">{item.label}</span>
              {item.preview()}
            </li>
          ))}
        </ul>
      </div>
    )
  }
})
