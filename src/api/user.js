import request from '@/utils/request'
/**
 * 登录
 * @param {*} param0
 * @returns
 */
export const login = ({ username, password }) => request({
  url: 'login',
  method: 'POST',
  data: {
    username,
    password
  }
})
/**
 * 获取用户数据列表
 * query 查询参数 可以为空
 * pagenum 当前页码 不能为空
 * pagesize 每页显示条数 不能为空
 * @param {*} param0
 * @returns
 */
export const getUserList = ({ query, pagenum, pagesize }) => request({
  url: 'users',
  params: {
    query,
    pagenum,
    pagesize
  }
})
