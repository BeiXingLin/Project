import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo} from '@/api/user'
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'
const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {}, // 存储用户基本资料状态
  routes: constantRoutes // 静态路由的数组
}
console.log("进入store里面的modules的user.js")
console.log("进入store里面的mutations")
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    // 删除Vuex的token
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 静态路由 + 动态路由
  }
}
console.log("进入store里面的modules的user.js")
console.log("进入store里面的actions")
const actions = {
  // context上下文，传入参数
  async login(context, data) {
    console.log(data)
    console.log("进入user.js里面的actions的login")
    // todo: 调用登录接口
    const token = await login(data)
    // 返回一个token 123456
    context.commit('setToken', token)
  },
  // 获取用户的基本资料
  async getUserInfo(context) {
    console.log("进入user.js里面的actions的getUserInfo")
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    console.log("getUserInfo的返回值为",result)
    return result // 返回数据
  },
  // 退出登录的action
  logout(context) {
    console.log("进入退出登录的action")
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 设置用户信息为空对象
    // 重置路由
    resetRouter()
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
