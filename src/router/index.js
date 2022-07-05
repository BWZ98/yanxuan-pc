import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []
// vue2.0采用new VueRouter()
const router = createRouter({
  //  使用哈希模式
  history: createWebHashHistory(),
  routes
})

export default router
