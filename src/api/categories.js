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
/**
 *添加分类
 * @param {*} data
 * cat_pid 分类父 ID 不能为空，如果要添加 1 级分类，则父分类 Id 应该设置为 0
cat_name 分类名称 不能为空
cat_level 分类层级 不能为空，0表示一级分类；1表示二级分类；2表示三级分类
 * @returns
 */
export const addCategory = (data) => request({
  url: 'categories',
  method: 'POST',
  data
})
/**
 * 根据id查询分类
 * @param {*} id 分类id
 * @returns
 */
export const getCategoryById = (id) => request({
  url: `categories/${id}`
})
/**
 *编辑提交分类
 * @param {*} id 分类id
 * @param {*} data 分类名称
 * @returns
 */
export const editSubmitCategory = (id, data) => request({
  url: `categories/${id}`,
  method: 'PUT',
  data
})
/**
 * 删除分类
 * @param {*} id 分类id
 * @returns
 */
export const delCategory = (id) => request({
  url: `categories/${id}`,
  method: 'DELETE'
})
