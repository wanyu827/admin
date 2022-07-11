
const state = {
  token: ''
}
const mutations = {
  setUser (state, payload) {
    state.token = payload
  },
  delUser (state) {
    state.token = ''
  }
}
const actions = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
