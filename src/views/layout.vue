<template>
<app-topnav></app-topnav>
<button @click="fn">登录</button>
<button @click="fn2">退出登录</button>
<header>头部</header>
<div class="container">
  <router-view></router-view>
</div>
<footer>底部</footer>
</template>

<script>
import AppTopnav from '@/components/appTopnav.vue'
import { useStore } from 'vuex'
export default {
  name: 'LayoutCom',
  components: {
    AppTopnav
  },
  setup () {
    const store = useStore()
    const fn = () => {
      store.commit('user/setUsers', {
        account: 'bwz',
        token: 'abc'
      })
    }
    const fn2 = () => {
      store.commit('user/setUsers', {
        account: '',
        token: ''
      })
    }
    return { fn, fn2 }
  }
}
</script>

<style scoped lang='less'>
.main {
  .hoverShadow ()
}
</style>
