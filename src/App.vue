<template>
<!--   <div>{{$store.state.username}}</div>
  <div>{{$store.getters['newName']}}</div>
  <button @click='fn'>点击更改</button> -->
  <!-- state加不加命名空间都是一样的 -->
  <div>{{store.state.moduleA.username}}</div>
  <div>{{store.state.moduleB.username}}</div>
  <!-- 除了state以外,不加命名空间会挂在全局,加了命名空间不能用.使用,要用[]加名字,模块与方法间用/ -->
  <div>{{store.getters.newName}}</div>
  <div>{{store.getters['moduleB/newName']}}</div>
</template>

<script>
/* import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    function fn () {
      store.commit('changeName')
    }
    console.log(store.state.username)
    return { fn }
  }
} */
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup () {
    const store = useStore()
    return { store }
  }
}
</script>

<style>

</style>
