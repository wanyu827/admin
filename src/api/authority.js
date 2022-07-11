import request from '@/utils/request'
/**
 * 左侧菜单
 * @returns
 */
export const getLeftMenuList = () => request({
  url: 'menus'
})
