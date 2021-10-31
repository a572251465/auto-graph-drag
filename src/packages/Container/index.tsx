import { defineComponent } from 'vue'
import Left from '@/components/Left/index'
import Right from '@/components/Right/index'
import Top from '@/components/Top/index'
import Editor from '@/components/Editor/index'

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
