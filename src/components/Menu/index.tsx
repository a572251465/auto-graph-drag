import { defineComponent } from 'vue'

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
    // 关闭菜单页面
    const closeMenuPage = function closeMenuPage() {
      ctx.emit('update:modelValue', false)
    }

    return () => (
      <div class="menu">
        <div
          onClick={closeMenuPage}
          class={props.modelValue ? 'startMask menu-mask' : ''}
        />
        <div
          class={props.modelValue ? 'startShow menu-content' : 'menu-content'}
        >
          11
        </div>
      </div>
    )
  }
})
