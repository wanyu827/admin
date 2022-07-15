import request from '@/utils/request'
/**
 * 左侧菜单
 * @returns
 */
export const getLeftMenuList = () => request({
  url: 'menus'
})
/**
 *获取所有的权限列表
 * @param {*} type 值 list 或 tree , list 列表显示权限, tree 树状显示权限,
 * @returns
 */
export const getAllList = (type) => request({
  url: `rights/${type}`
})
