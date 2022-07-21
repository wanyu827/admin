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
import dayjs from 'dayjs'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 全局引入echarts
import echarts from 'echarts'
// 需要挂载到Vue原型上
Vue.prototype.$echarts = echarts
Vue.use(VueQuillEditor /* { default global options } */)
Vue.component('BreadCrumb', BreadCrumb)
Vue.component('Pagination', Pagination)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.dayjs = dayjs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
