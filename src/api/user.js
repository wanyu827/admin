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
