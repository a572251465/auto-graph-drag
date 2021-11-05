import { computed, defineComponent } from 'vue'
import { ElDrawer } from 'element-plus'

import './index.scss'

export default defineComponent({
  name: 'Menu',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    // 当前页面的显示/隐藏
    const currentPageShowFlag = computed<boolean>({
      get() {
        return props.modelValue
      },
      set(newVal) {
        ctx.emit('update:modelValue', newVal)
      }
    })

    return () => (
      <div class="menu">
        <ElDrawer
          direction="ttb"
          size={80}
          show-close={false}
          modelValue={currentPageShowFlag.value}
          v-model={currentPageShowFlag.value}
        />
      </div>
    )
  }
})
