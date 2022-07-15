import { getUserList, addUser, editUserType } from '@/api/user'
import { Message } from 'element-ui'
const state = {
  token: '',
  total: '',
  pagenum: 1,
  pagesize: 5,
  users: []
}
const mutations = {
  // 设置token
  setUser (state, payload) {
    state.token = payload
  },
  // 删除token
  delUser (state) {
    console.log(11)
    state.token = ''
  },
  // 设置总数
  setTotal (state, payload) {
    state.total = payload
  },
  setUserList (state, payload) {
    state.users = payload
  },
  // 添加用户
  addUser (state, payload) {
    state.users.push(payload)
  }
}
const actions = {
  // 获取用户列表
  async getUserInfoList (context, data) {
    try {
      const res = await getUserList(data)
      // console.log(res)
      context.commit('setTotal', res.data.data.total)
      context.commit('setUserList', res.data.data.users)
    } catch (err) {
      console.log(err)
    }
  },
  // 添加用户
  async addUser (context, data) {
    try {
      const res = await addUser(data)
      console.log(res)
      context.commit('addUser', res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  // 修改用户状态
  async editUserType (context, data) {
    console.log(data)
    try {
      const res = await editUserType(data)
      console.log(res)
      Message.success('修改用户状态成功')
    } catch (err) {
      console.log(err)
      Message.success('修改用户状态失败')
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
