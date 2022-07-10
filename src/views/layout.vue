<template>
<app-topnav></app-topnav>
<app-header></app-header>
<app-header-sticky></app-header-sticky>
<!-- layout的二级路由挂载点,这里控制切换显示主页或者某类目点击后的页面 -->
<div class="layout-container">
  <router-view></router-view>
</div>
<app-footer></app-footer>

</template>

<script>
import AppTopnav from '@/components/appTopnav.vue'
import AppHeader from '@/components/appHeader.vue'
import AppFooter from '@/components/appFooter.vue'
import AppHeaderSticky from '@/components/appHeaderSticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'LayoutCom',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang='less'>
</style>
