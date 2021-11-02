import { computed, defineComponent, inject } from 'vue'
import { IDataConfig } from '@/types/common'
import EditorBlock from '@/components/Editor/editor-block'

import './index.scss'

export default defineComponent({
  name: 'editor',
  setup() {
    // 进行内容注入
    const injectData: { dataConfig: IDataConfig } | undefined =
      inject<{ dataConfig: IDataConfig }>('dataConfig')

    const computedStyles = computed(() => ({
      width: `${injectData?.dataConfig.container.width}px`,
      height: `${injectData?.dataConfig.container.height}px`
    }))

    return () => (
      <div>
        <div class="editor">
          <div class="editor-canvas" style={computedStyles.value}>
            {injectData?.dataConfig.blocks.map((item) => (
              <EditorBlock block={item} />
            ))}
          </div>
        </div>
      </div>
    )
  }
})
