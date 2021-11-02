import { defineComponent, provide } from 'vue'
import Left from '@/components/Left/index'
import Right from '@/components/Right/index'
import Top from '@/components/Top/index'
import Editor from '@/components/Editor/index'
import dataConfig from '@/data-config'

import './index.scss'

export default defineComponent({
  name: 'container',
  components: {
    Left,
    Right,
    Top,
    Editor
  },
  setup() {
    // 全局注入
    provide<{ dataConfig: typeof dataConfig }>('dataConfig', { dataConfig })

    return () => (
      <div class="container">
        <Left class="container-left" />
        <Right class="container-right" />
        <Top class="container-top" />
        <Editor class="container-editor" />
      </div>
    )
  }
})
