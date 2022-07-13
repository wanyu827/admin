import { getUserList } from '@/api/user'
const state = {
  token: '',
  total: '',
  users: []
}
const mutations = {
  // 设置token
  setUser (state, payload) {
    state.token = payload
  },
  // 删除token
  delUser (state) {
    state.token = ''
  },
  // 设置总数
  setTotal (state, payload) {
    state.total = payload
  },
  setUserList (state, payload) {
    state.users = payload
  }
}
const actions = {
  async getUserInfoList (context, data) {
    try {
      const res = await getUserList(data)
      console.log(res)
      context.commit('setTotal', res.data.data.total)
      context.commit('setUserList', res.data.data.users)
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
