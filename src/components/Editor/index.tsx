import {computed, defineComponent, onMounted, PropType, watch} from 'vue'
import { IDataConfig } from '@/types/common'
import EditorBlock from '@/components/Editor/editor-block'
import { editDataConfig, editorCanvas, quoteValues } from '@/utils/constant'

import './index.scss'
import emits from '@/utils/emits'
import useFocus from "@/hooks/useFocus";
import useElementMove from "@/hooks/useElementMove";

export default defineComponent({
  name: 'editor',
  props: {
    modelValue: {
      type: Object as PropType<IDataConfig>,
      required: true
    }
  },

  setup(props) {
    const data = computed(() => props.modelValue)

    const computedStyles = computed(() => ({
      width: `${data.value.container.width}px`,
      height: `${data.value.container.height}px`
    }))

    // 获取光标选中的元素
    const focusData = useFocus(props)

    // 组件被加载钩子
    onMounted(() => {
      // 赋值画布元素
      quoteValues[editorCanvas] = document.querySelector('.editor-canvas')
    })

    // 鼠标点击事件 恢复选中状态
    const clickHandle = function clickHandle() {
      // 判断是否有被选中的
      const checked = data.value.blocks.some(item => item.isFocus)
      if (!checked) return

      emits.emit(editDataConfig, -1, { isFocus: false })
    }

    // 鼠标移动事件
    const mouseDownHandle = useElementMove(focusData.focus)

    return () => (
      <div>
        <div class="editor">
          <div
            class="editor-canvas"
            onMousedown={clickHandle}
            style={computedStyles.value}
          >
            {data.value.blocks.map((item) => (
              <EditorBlock block={item} {...{ onMouseDown: mouseDownHandle }} />
            ))}
          </div>
        </div>
      </div>
    )
  }
})
