import { computed, defineComponent, onMounted, PropType } from 'vue'
import { IDataConfig } from '@/types/common'
import EditorBlock from '@/components/Editor/editor-block'
import { editDataConfig, editorCanvas, quoteValues } from '@/utils/constant'

import './index.scss'
import emits from '@/utils/emits'

export default defineComponent({
  name: 'editor',
  props: {
    modelValue: {
      type: Object as PropType<IDataConfig>,
      required: true
    }
  },
  setup(props) {
    const computedStyles = computed(() => ({
      width: `${props.modelValue.container.width}px`,
      height: `${props.modelValue.container.height}px`
    }))

    // 组件被加载钩子
    onMounted(() => {
      // 赋值画布元素
      quoteValues[editorCanvas] = document.querySelector('.editor-canvas')
    })

    // 鼠标点击事件 恢复选中状态
    const clickHandle = function clickHandle() {
      emits.emit(editDataConfig, -1, { isFocus: false })
    }

    return () => (
      <div>
        <div class="editor">
          <div
            class="editor-canvas"
            onMousedown={clickHandle}
            style={computedStyles.value}
          >
            {props.modelValue.blocks.map((item) => (
              <EditorBlock block={item} />
            ))}
          </div>
        </div>
      </div>
    )
  }
})
