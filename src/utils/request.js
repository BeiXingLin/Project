import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import nprogress from 'nprogress'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000
})

service.interceptors.request.use((config) => {
  if (store.getters.token) {
    nprogress.start() 
    console.log("进入请求拦截器,token为:",store.getters.token)
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  console.log("进入请求拦截器,config为:",config)
  return config
}, (error) => {
  // 失败执行promise
  console.log("失败执行promise")
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  // axios默认包裹了data
  // 判断是不是Blob
  console.log("进入响应拦截器")
  
  if (response.data instanceof Blob) return response.data // 返回了Blob对象
  const { code, data, message } = response.data // 默认json格式
  console.log("response.data为",response.data)
  if (code == 0) {
    console.log("请求成功,data为",data)
    nprogress.done()
    return data
  } else {
    Message({ type: 'error', message })
    console.log("请求失败,message为",message)
    nprogress.done()
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  if (error.response.status === 401) {
    console.log("请求失败,状态码401")
    Message({ type: 'warning', message: 'token超时了' })
    console.log("token超时，Message为",Message)
    // 说明token超时了
    console.log("调用action 退出登录")
    
    await store.dispatch('user/logout') // 调用action 退出登录
    //  主动跳到登录页
    console.log("跳转到登录页")
    router.push('/login') // 跳转到登录页
    return Promise.reject(error)
    nprogress.done()
  }
  // error.message
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})
export default service
