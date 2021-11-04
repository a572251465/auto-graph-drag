import { defineComponent, reactive } from 'vue'
import Left from '@/components/Left/index'
import Right from '@/components/Right/index'
import Top from '@/components/Top/index'
import Editor from '@/components/Editor/index'
import dataConfig from '@/data-config'

import './index.scss'
import { IDataConfig } from '@/types/common'

export default defineComponent({
  name: 'container',
  components: {
    Left,
    Right,
    Top,
    Editor
  },
  setup() {
    const state = reactive<{ data: IDataConfig }>({ data: dataConfig })

    return () => (
      <div class="container">
        <Left
          class="container-left"
          modelValue={state.data}
          v-model={state.data}
        />
        <Right class="container-right" />
        <Top class="container-top" />
        <Editor
          class="container-editor"
          modelValue={state.data}
          v-model={state.data}
        />
      </div>
    )
  }
})
