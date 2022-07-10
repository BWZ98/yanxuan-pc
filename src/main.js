import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局组件的文件
import AllComp from '@/components/library/index.js'
import 'normalize.css'
import '@/assets/styles/common.less'
import '@/assets/styles/iconfont.css'
createApp(App).use(store).use(router).use(AllComp).mount('#app')
