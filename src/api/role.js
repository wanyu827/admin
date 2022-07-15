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
/**
 * 编辑提交角色
 * @param {*} id 角色id， 不能为空
 * @param {Object} param1 角色名称 不能为空 角色描述 可以为空
 * @returns
 */
export const editSubmit = (id, { roleName, roleDesc }) => request({
  method: 'PUT',
  url: `roles/${id}`,
  data: {
    roleName,
    roleDesc
  }
})
/**
 * 根据id查询角色
 * @param {*} id 角色id 不能为空
 * @returns
 */
export const searchRole = (id) => request({
  url: `roles/${id}`
})
/**
 * 删除角色
 * @param {*} id 角色id
 * @returns
 */
export const delRole = (id) => request({
  method: 'DELETE',
  url: `roles/${id}`
})
/**
 * 角色授权
 * @param {*} roleId 角色ID 不能为空
 * @param {String} data 权限 ID 列表（字符串）
 * @returns
 */
export const assignAuth = (roleId, data) => request({
  method: 'POST',
  url: `roles/${roleId}/rights`,
  data
})
/**
 * 删除角色指定权限
 * @param {*} roleId 角色id 不能为空
 * @param {*} rightId 权限id 不能为空
 * @returns
 */
export const delRoleAuth = (roleId, rightId) => request({
  url: `roles/${roleId}/rights/${rightId}`,
  method: 'DELETE'
})
