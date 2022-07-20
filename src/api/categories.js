import request from '@/utils/request'
/**
 * 商品分类数据列表
 * @param {Object} param0
 * type [1,2,3] 值：1，2，3 分别表示显示一层二层三层分类列表
 *【可选参数】如果不传递，则默认获取所有级别的分类
 * pagenum 当前页码值 【可选参数】如果不传递，则默认获取所有分类
 * pagesize 每页显示多少条数据 【可选参数】如果不传递，则默认获取所有分类
 * @returns
 */
export const getCategoryList = (params) => request({
  url: 'categories',
  params
})
