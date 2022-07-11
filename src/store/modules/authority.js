import { getLeftMenuList } from '@/api/authority'
const state = {
  menuList: []
}
const mutations = {
  setMenu (state, payload) {
    state.menuList = payload
  }
}
const actions = {
  async getMenuList (context) {
    try {
      const res = await getLeftMenuList()
      console.log(res)
      context.commit('setMenu', res.data.data)
    } catch (err) {
      console.log(err)
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
