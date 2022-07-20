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
