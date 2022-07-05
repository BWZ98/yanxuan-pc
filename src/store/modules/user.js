export default {
  namespaced: true,
  state () {
    return {
      profile: {
        name: '',
        token: ''
      }
    }
  },
  mutations: {
    setUsers (state, payload) {
      state.profile = payload
    }
  }
}
