import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { Message } from 'element-ui'
import { asyncRoutes } from '@/router'
import { removeToken } from './utils/auth'

const whiteList = ['/login','/404','/403']

router.beforeEach(async(to, from, next) => {

    nprogress.start()

    console.log("进入前置路由守卫判断是否有用户token")
    console.log("用户token为",store.getters.token)

    if (store.getters.token) 
    {
      console.log("有用户token")
      console.log("判断是否去登录页")
      console.log("to.path为",to.path)
      if (to.path==='/login') {
        console.log("有用户token需去往登录页")
        console.log("放行去首页")
        Message({ type: 'success',message: "当前用户已登录"})
        next('/') 
      }
      else {
        console.log("有用户token,不是去往登录页")
        console.log("判断store中的name是否为空")
        console.log("store中的name为",store.getters.name)
        if (!store.getters.name){
          console.log("store中的name为空，使用dispatch调用actions中的getUserInfo")
          await store.dispatch('user/getUserInfo')
          next()
        }
        else{ 
          console.log("store中的name为不为空")
          console.log("store中的name为不为空，判断to.path是否在白名单中")
          if(whiteList.includes(to.path))
          {
            console.log("store中的name为不为空，to.path在白名单中")
            next()
          }
          else{
            console.log("store中的name为不为空，to.path不在白名单中,判断requiresAuth是否为true")
            if(to.meta.requiresAuth===false)
            {
            console.log("store中的name为不为空，to.path不在白名单中,requiresAuth为false")
            next()
            }
            else
            {
            console.log("store中的name为不为空，to.path不在白名单中,requiresAuth为true")
                if(to.meta.roles.indexOf(store.getters.name)<=-1){
                  console.log("该页面没有权限访问")
                  next('/403')
                }
                else{
                  console.log("该页面有权限访问")
                  next()
                }
            }
          }
        }
      }
    }
   else 
    {
        console.log("没有用户token，to.path是否在白名单中")
        if (whiteList.indexOf(to.path) !== -1) {
          console.log("没有用户token，to.path在白名单中")
          next()
        } else {
          console.log("没有用户token，to.path不在白名单中")
          next('/login')
          nprogress.done()
        }
    }
  }
)

router.afterEach(() => {
  nprogress.done()
})
