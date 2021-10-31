import { defineComponent } from 'vue'

export default defineComponent({
  name: 'right',
  setup() {
    return () => <div class="right">left</div>
  }
})
