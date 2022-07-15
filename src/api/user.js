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
/**
 * 添加用户
 * @param {用户名* 用户密码* 邮箱 手机号} param0
 * @returns
 */
export const addUser = ({ username, password, email, mobile }) => request({
  method: 'POST',
  url: 'users',
  data: {
    username,
    password,
    email,
    mobile
  }
})
/**
 * 修改用户状态
 * @param {用户id} uid 不能为空
 * @param {用户状态} type 不能为空 值为true或false
 * @returns
 */
export const editUserType = (data) => request({
  method: 'PUT',
  url: `users/${data.uid}/state/${data.type}`
})
/**
 *编辑用户提交
 * @param {用户id} id 不能为空
 * @param {邮箱，手机号} param1  可以为空
 * @returns
 */
export const editUser = (id, { email, mobile }) => request({
  method: 'PUT',
  url: `users/${id}`,
  data: {
    email,
    mobile
  }
})
/**
 * 删除单个用户
 * @param {用户id} id 不能为空
 * @returns
 */
export const delUserTable = (id) => request({
  method: 'DELETE',
  url: `users/${id}`
})
