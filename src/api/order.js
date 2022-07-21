import request from '@/utils/request'
/**
 * 订单数据列表
 * @param {*} params
 * query 查询参数 可以为空
pagenum 当前页码 不能为空
pagesize 每页显示条数 不能为空
user_id 用户 ID 可以为空
pay_status 支付状态 可以为空
is_send 是否发货 可以为空
order_fapiao_title ['个人','公司'] 可以为空
order_fapiao_company 公司名称 可以为空
order_fapiao_content 发票内容 可以为空
consignee_addr 发货地址 可以为空
 *
 *
 * @returns
 */
export const getOrdersList = (params) => request({
  url: 'orders',
  params
})
