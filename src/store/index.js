import { createStore } from 'vuex'
//  引入vuex持久化存储的包,下面plugins是有关配置,默认使用localstorage
import createPersistedState from 'vuex-persistedstate'
//  用户模块
import user from './modules/user.js'
//  购物车模块
import cart from './modules/cart.js'
//  标签模块
import category from './modules/category.js'
export default createStore({
  modules: {
    user,
    cart,
    category
  },
  plugins: [createPersistedState({
    key: 'yanxuan-pc-store',
    paths: ['user', 'cart']
  })]
})

/* // 基础非模块化,vuex练习
export default createStore({
  state: {
    username: 'bwz'
  },
  getters: {
    newName (state) {
      return state.username + '!!!'
    }
  },
  mutations: {
    changeName (state) {
      state.username = 'zs'
    }
  },
  actions: {
  },
  modules: {
  }
}) */
