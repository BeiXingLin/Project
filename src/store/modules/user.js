import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo} from '@/api/user'
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'
const state = {
  token: getToken(), 
  userInfo: {},
  name:"", 
  routes: constantRoutes 
}

const mutations = {
  setToken(state, token) {
    console.log("上传store里面state的token值")
    console.log("进入store的user.js的mutations的setToken")
    console.log("state为",state)
    console.log("token为",token)
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    console.log("删除store里面state的token值")
    console.log("进入store的user.js的mutations的removeToken")
    console.log("state为",state)
    console.log("state.token为",state.token)
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    console.log("上传store里面state的userInfo值")
    console.log("进入store的user.js的mutations的setUserInfo")
    console.log("state为",state)
    console.log("userInfo为",userInfo)
    state.userInfo = userInfo
  },
  setUserName(state, name) {
    console.log("上传store里面state的userName值")
    console.log("进入store的user.js的mutations的setUserName")
    console.log("state为",state)
    console.log("userInfo为",name)
    state.name = name
  },
  setRoutes(state, newRoutes) {
    console.log("上传store里面state的routes值")
    console.log("进入store的user.js的mutations的setRoutes")
    console.log("state为",state)
    console.log("newRoutes为",newRoutes)
    state.routes = [...constantRoutes, ...newRoutes] 
    console.log("所有的Routes为",state.routes)
  }
}

const actions = {
  async login(context, data) {
    console.log("进入store的user.js的login")
    console.log(data)
    const token = await login(data)
    console.log("store的user.js的actions调用login接口,获取返回值为",token)
    console.log("store的user.js的actions调用mutations里面的setToken")
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    console.log("进入store的user.js的getUserInfo")
    const result = await getUserInfo()
    console.log("store的user.js的actions调用getUserInfo接口,获取返回值为",result)
    console.log("store的user.js的actions调用mutations里面的setUserInfo")
    context.commit('setUserInfo', result)

    console.log("store的user.js的actions调用getUserInfo接口,其中name为",result[0].Name)
    console.log("store的user.js的actions调用mutations里面的setUserName")
    context.commit("setUserName",result[0].Name)
    return result 
  },
  logout(context) {
    console.log("进入store的user.js的logout")
    console.log("store的user.js的actions调用mutations里面的removeToken")
    console.log("store的user.js的actions调用mutations里面的setUserInfo")
    context.commit('removeToken') 
    context.commit('setUserInfo', {}) 
    console.log("store的user.js的actions调用router里面的resetRouter")
    resetRouter()
  }
}

export default {
  namespaced: true, 
  state,
  mutations,
  actions
}
