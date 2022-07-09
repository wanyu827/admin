import router from './router'
import store from './store'

// 页面加载的进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 定义白名单 所有不受权限控制的页面
const whiteList = ['/login', '/404']
// const token = window.localStorage.getItem('token')
router.beforeEach(function (to, from, next) {
  NProgress.start() // 开启进度条
  // console.log(store.getters.token)
  // 首先判断有无token
  if (store.getters.token) {
    // 如果有token 继续判断是不是去登录页
    if (to.path === '/login') {
      next('/home')
    } else {
      next()
    }
  } else {
    // 如果没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果找到了 表示在白名单里面
      next()
    } else {
      next('/login') // 跳到登录页
    }
  }
  // 手动强制关闭一次 为了解决 手动切换地址时 进度条不关闭的问题
  NProgress.done()
})

// 后置守卫
router.afterEach(function () {
  // 关闭进度条
  NProgress.done()
})
