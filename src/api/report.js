import request from '@/utils/request'
/**
 * 数据统计
 * @returns
 */
export const getReports = () => request({
  url: 'reports/type/1'
})
