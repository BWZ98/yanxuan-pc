<template>
  <!-- 这里把头部导航中间的部分提取出来,因为吸顶导航也需要 -->
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <!-- 根据返回数据渲染的列表，这里要实现二级列表layer的现实和隐藏，点击路由的时候，把点击的这个item传过去，在vuex根据这个id找到item，并且把item的open状态改为false，而是否添加show这个类名是由item.open控制的 -->
    <li v-for='item in list'
        :key='item.id'
        @mouseenter="show(item)"
        @mouseleave="hide(item)">
      <router-link :to="`/category/${item.id}`"
                   @click="hide(item)">{{item.name}}</router-link>
      <div class="layer"
           :class="{show:item.open}">
        <ul>
          <li v-for="child in item.children"
              :key="child.id">
            <router-link :to="`/category/sub/${child.id}`"
                         @click="hide(item)">
              <img :src="child.picture"
                   alt="">
              <p>{{child.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    const list = computed(() => {
      return store.state.category.list
    })
    const show = (item) => {
      store.commit('category/show', item)
    }
    const hide = (item) => {
      store.commit('category/hide', item)
    }
    return { list, show, hide }
  }
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  &.show {
    height: 132px;
    opacity: 1;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
