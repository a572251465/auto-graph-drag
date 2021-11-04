import {computed, defineComponent, PropType, ref, watch} from 'vue'
import deepcopy from 'deepcopy'
import { IComponentInfo, IDataConfig } from '@/types/common'
import { componentList } from '@/hooks/registerComponent'

import './index.scss'
import menuImg from '@/assets/images/menuImg.png'
import dragMenu from '@/hooks/dragMenu'

export default defineComponent({
  name: 'left',
  props: {
    modelValue: {
      type: Object as PropType<IDataConfig>,
      required: true
    },
    currentPageShowFlag: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'show-menu-page'],
  setup(props, ctx) {
    // 获取组件列表
    const compList: IComponentInfo[] = componentList
    // 菜单页面的显示
    const menuPageShowFlag = ref<boolean>(false)

    watch(() => props.currentPageShowFlag, (val) => {
      if (val) return

      menuPageShowFlag.value = val
    })

    // 点击显示菜单页面
    const menuPageHandle = () => {
      ctx.emit('show-menu-page', (menuPageShowFlag.value = !menuPageShowFlag.value))
    }

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
    const { dragStart, dragEnd } = dragMenu(data)

    return () => (
      <div class="left">
        <div class="left-flags">
          <img src={menuImg} alt="点击设置" onClick = {menuPageHandle} />
        </div>
        <ul class="left-ul">
          {compList.map((item) => (
            <li
              class="left-ul-li"
              draggable="true"
              onDragstart={() => dragStart(item)}
              onDragend={dragEnd}
            >
              <span class="flagLabel">{item.label}</span>
              {item.preview()}
            </li>
          ))}
        </ul>
      </div>
    )
  }
})
