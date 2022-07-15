import { getLeftMenuList, getAllList } from '@/api/authority'
const state = {
  menuList: [],
  allList: []
}
const mutations = {
  setMenu (state, payload) {
    state.menuList = payload
  },
  setAllList (state, payload) {
    state.allList = payload
  }
}
const actions = {
  // 获取左侧菜单权限列表
  async getMenuList (context) {
    try {
      const res = await getLeftMenuList()
      console.log(res)
      context.commit('setMenu', res.data.data)
    } catch (err) {
      console.log(err)
    }
  },
  // 获取所有权限列表
  async getAllList (context, type) {
    try {
      const res = await getAllList(type)
      console.log(res)
      context.commit('setAllList', res.data.data)
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
