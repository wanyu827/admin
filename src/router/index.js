import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('@/views/Home')
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

export default router
