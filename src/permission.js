import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { asyncRoutes } from '@/router'

/**
 *前置守卫
 *初始化，路由切换前执行
*/
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  console.log("进入全局前置守卫")
  console.log("to为",to)
  console.log("from为",from)
  console.log("next为",next)
  nprogress.start() 
  console.log("开启进度条并判断是否有token")
  if (store.getters.token) {
    // 存在token
    console.log("存在token为:",store.getters.token)
    console.log("to.path为",to.path)
    if (to.path === '/login') {
      // 跳转到主页
      console.log("to.path等于login,由登录页进入主页")
      next('/dashboard/index') // 中转到主页
      // next（地址）并没有执行后置守卫
      nprogress.done()
    } else {
      console.log("to.path不等于login")
      // 判断是否获取过资料
      console.log("userId为",!store.getters.userId)
      if (!store.getters.userId) {
        console.log("获取过资料，过滤路由")
        const { roles } = await store.dispatch('user/getUserInfo')
        console.log(roles.menus) // 数组 不确定 可能是8个 1个 0个
        console.log(asyncRoutes) // 数组 8个
        const filterRoutes = asyncRoutes.filter(item => {
          // return true/false
          return roles.menus.includes(item.name)
        }) // 筛选后的路由
        store.commit('user/setRoutes', filterRoutes)
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }]) // 添加动态路由信息到路由表
        // router添加动态路由之后 需要转发一下
        next(to.path) // 目的是让路由拥有信息 router的已知缺陷
      } else {
        console.log("没有获取过资料，放行去登录页:")
        next() // 放过
      }
    }
  } else {
    // 没有token
    console.log("没有token,to.path为:",to.path)
    if (whiteList.includes(to.path)) {
      console.log("to.path在白名单内，放过:",to.path)
      next()
    } else {
      console.log("to.path不在白名单内，放行去登录页:",to.path)
      next('/login') // 中转到登录页
      console.log("关闭进度条")
      nprogress.done()
    }
  }
})

/** *
 * 后置守卫
 * **/
router.afterEach(() => {
  console.log('进入后置守卫')
  console.log("关闭进度条")
  nprogress.done()
})
