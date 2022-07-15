import request from '@/utils/request'
/**
 * 获取角色列表
 * @returns
 */
export const getRoleList = () => request({
  url: 'roles'
})
/**
 * 分配用户角色
 * @param {用户id} id 不能为空
 * @param {角色id} param1 不能为空
 * @returns
 */
export const assignUser = (id, { rid }) => request({
  url: `users/${id}/role`,
  method: 'PUT',
  data: { rid }
})
/**
 * 添加角色
 * @param {Object} param0 角色名称 角色描述
 * @returns
 */
export const addRole = ({ roleName, roleDesc }) => request({
  url: 'roles',
  method: 'POST',
  data: {
    roleName,
    roleDesc
  }
})
