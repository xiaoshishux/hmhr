import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { removeToken } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      config.headers.Authorization = `Bearer${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { success, message } = response.data
    if (success) {
      return response.data
    } else {
      Message.error(message) //http：状态码2xx
      // 返回Promise错误的对象, 等同reject() -> 自己根据success字段判断逻辑错误(账号密码错误)
      return Promise.reject(new Error(message))
    }
  },
  error => { // http状态码4xx
    Message.error(error.response.data.message)
    // if (error.response && error.response.data && error.response.data.code === 10002) {
    //   store.commit('user/REMOVE_TOKEN')
    //   store.commit('user/RESET_STATE')
    //   router.replace(`/login?redirect=${encodeURIComponent(router.currentRoute.fullPath)}`)
    // }
    return Promise.reject(error)
  }
)

export default service