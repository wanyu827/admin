import axios from 'axios'
import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    config.headers = {
      Authorization: store.getters.token
    }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('响应·拦截器', response.data)
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.data.meta.status === 400 || error.response.data.meta.status === 401) {
    store.commit('delUser')
    router.push('/login')
  }
  return Promise.reject(error)
})
export default request
