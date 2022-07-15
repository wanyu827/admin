import { getRoleList } from '@/api/role'
const state = {
  roles: []
}
const mutations = {
  // 设置角色列表
  setRoleList (state, payload) {
    state.roles = payload
  }
}
const actions = {
  // 获取角色列表
  async getRoleList (context) {
    try {
      const res = await getRoleList()
      console.log('role', res)
      context.commit('setRoleList', res.data.data)
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
