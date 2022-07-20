import { getGoodsList } from '@/api/goods'
const state = {
  pagenum: 1, // 当前页码
  pagesize: 5, // 每页显示条数
  goods: [], // 商品列表
  total: 0,
  goods_id: null
}
const mutations = {
  // 设置商品列表
  setGoods (state, payload) {
    state.goods = payload
  },
  // 设置总数
  setTotal (state, payload) {
    state.total = payload
  },
  setGoodsId (state, payload) {
    state.goods_id = payload
  },
  editPagenum (state, payload) {
    state.pagenum = payload
  }
}
const actions = {
  // 获取商品列表
  async getGoodsList (context, params) {
    const res = await getGoodsList(params)
    context.commit('setGoods', res.data.data.goods)
    context.commit('setTotal', res.data.data.total)
    // console.log('res', res)
    // 解决删除最后一个显示空
    if (res.data.data.goods.length === 0) {
      if (this.state.goods.pagenum > 1) {
        context.commit('editPagenum', this.state.goods.pagenum - 1)
        this.dispatch('goods/getGoodsList', { query: '', pagenum: this.state.goods.pagenum, pagesize: this.state.goods.pagesize })
      }
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
