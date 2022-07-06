export default {
  namespaced: true,
  state () {
    return {
      profile: {
        account: '',
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
