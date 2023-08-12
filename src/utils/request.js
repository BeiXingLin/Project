import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import nprogress from 'nprogress'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, 
  timeout: 10000
})

service.interceptors.request.use((config) => {
  console.log("进入请求拦截器")
  if (store.getters.token) {
    nprogress.start() 
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  console.log("进入响应拦截器")
  if (response.data instanceof Blob) return response.data 
  console.log("返回值为",response.data)
  const { Code, Data, ErrMsg } = response.data 
  if (Code == 0) {
    console.log("Code为",Code)
    nprogress.done()
    console.log("Data为",Data)
    return Data
  } else {
    Message({ type: 'error',message: ErrMsg})
    nprogress.done()
    return Promise.reject(new Error(ErrMsg))
  }
}, async(error) => {
  if (error.response.status === 401) {
    Message({ type: 'warning', message: 'token超时了' })
    await store.dispatch('user/logout') 
    router.push('/login') 
    nprogress.done()
    return Promise.reject(error)
  }
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service
