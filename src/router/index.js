import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
const UserList = () => import('@/views/UserList')
const RoleList = () => import('@/views/RoleList')
const PermissionList = () => import('@/views/PermissionList')
const GoodsList = () => import('@/views/GoodsList')
const ParamsList = () => import('@/views/ParamsList')
const CateGory = () => import('@/views/CateGory')
const OrderList = () => import('@/views/OrderList')
const Reports = () => import('@/views/Reports')
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'users', component: UserList, name: '用户列表' },
      { path: 'roles', component: RoleList, name: '角色列表' },
      { path: 'rights', component: PermissionList, name: '权限列表' },
      { path: 'goods', component: GoodsList, name: '商品列表' },
      { path: 'params', component: ParamsList, name: '分类参数' },
      { path: 'categories', component: CateGory, name: '商品分类' },
      { path: 'orders', component: OrderList, name: '订单列表' },
      { path: 'reports', component: Reports, name: '数据报表' }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
