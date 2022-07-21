import request from '@/utils/request'
/**
 *获取参数列表
 * @param {*} id :id 分类 ID 不能为空
 * @param {*} params sel [only,many] 不能为空,通过 only 或 many 来获取分类静态参数还是动态参数
 * @returns
 */
export const getParamsList = (id, { sel }) => request({
  url: `categories/${id}/attributes`,
  params: {
    sel
  }
})
/**
 * 编辑提交参数
 * @param {*} id 分类id
 * @param {*} attrid 属性id
 * @param {*} data { attr_name 新属性名字 not null, attr_sel 属性类型(many,only) not null, attr_vals 参数的属性值 可选 }
 * @returns
 */
export const editSubmitParams = (data) => request({
  url: `categories/${data.cat_id}/attributes/${data.attr_id}`,
  method: 'PUT',
  data
})
/**
 * 添加动态参数或者静态参数
 * @param {*} data
 * :id 分类 ID 不能为空携带在url中
attr_name 参数名称 不能为空
attr_sel [only,many] 不能为空
attr_vals 如果是 many 就需要填写值的选项，以逗号分隔 【可选参数】
 * @returns
 */
export const addParams = (data) => request({
  url: `categories/${data.cat_id}/attributes`,
  method: 'POST',
  data
})
/**
 * 删除参数
 * @param {*} data
 * @returns
 */
export const delParams = (data) => request({
  url: `categories/${data.cat_id}/attributes/${data.attr_id}`,
  method: 'DELETE',
  data
})
