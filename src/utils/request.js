// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带，token从vuex中取
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise
import axios from 'axios'
import store from '@/store/index.js'
import router from '@/router'
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前，如果有token，取出并且添加在请求头里
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  // 1. 清空无效用户信息
  // 2. 跳转到登录页
  // 3. 跳转需要传参（当前路由地址）给登录页码
  // 这里要特别注意,VUE3中router.currentRoute是响应式数据，而vue3中的响应式数据取得时需要加value
  if (error.response && error.response.status === 401) {
    store.commit('user/setUsers', {})
    // 防止=导致错误
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转登录页并且传参
    router.replace(`/login?path=${fullPath}`)
  }
  return Promise.reject(error)
})
export default instance
