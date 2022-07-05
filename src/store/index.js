import { createStore } from 'vuex'
const moduleA = {
  state: {
    username: 'zs'
  },
  getters: {
    newName (state) {
      return state.username + '!!!'
    }
  }
}
const moduleB = {
  namespaced: true,
  state: {
    username: 'bwz'
  },
  getters: {
    newName (state) {
      return state.username + '!!!'
    }
  }
}

export default createStore({
  modules: {
    moduleA,
    moduleB
  }
})

/* // 基础非模块化
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
