import request from '@/utils/request'
/**
 *商品列表数据
 * @param {*} query 查询参数 可以为空
 * @param {Object} param1 pagenum 页码 pagesize 每页显示条数 不能为空
 * @returns
 */
export const getGoodsList = ({ query, pagenum, pagesize }) => request({
  url: 'goods',
  params: {
    query,
    pagenum,
    pagesize
  }
})
/**
 * 添加商品
 * @param {Object} data
* goods_name 商品名称 不能为空
goods_cat 以为','分割的分类列表 不能为空
goods_price 价格 不能为空
goods_number 数量 不能为空
goods_weight 重量 不能为空
goods_introduce 介绍 可以为空
pics 上传的图片临时路径（对象） 可以为空
attrs 商品的参数（数组），包含 动态参数 和 静态属性 可以为空
 * @returns
 */
export const addGoods = (data) => request({
  url: 'goods',
  method: 'POST',
  data
})
/**
 * 根据ID查询商品
 * @param {*} id 商品id
 * @returns
 */
export const assignGoodsById = (id) => request({
  url: `goods/${id}`
})
/**
 * 编辑提交商品
 * @param {*} id 商品id
 * @param {*} data
 * @returns
 */
export const editGoods = (id, data) => request({
  url: `goods/${id}`,
  method: 'PUT',
  data
})
/**
 * 删除商品
 * @param {*} id 商品id
 * @returns
 */
export const delGoods = (id) => request({
  url: `goods/${id}`,
  method: 'DELETE'
})
