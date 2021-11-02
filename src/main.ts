import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// 导入共同的样式
import '@/assets/css/common.css'
import 'element-plus/theme-chalk/index.css'

createApp(App).use(store).mount('#app')
