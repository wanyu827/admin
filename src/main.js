import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './permission'
import BreadCrumb from '@/components/BreadCrumb.vue'
import Pagination from '@/components/Pagination.vue'
Vue.component('BreadCrumb', BreadCrumb)
Vue.component('Pagination', Pagination)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
