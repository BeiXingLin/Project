import Vue from 'vue'
import i18n from '@/lang'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import deviceRouter from './modules/device'
import dialogRouter from './modules/dialog'
import faultRouter from './modules/fault'
import interfaceRouter from './modules/interface'
import manualRouter from './modules/manual'
import monitorRouter from './modules/monitor'
import rfidRouter from './modules/rfid'
import userRouter from './modules/user'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/kanban'),
      meta: { title: i18n.t('menu.dashboard'), icon: 'dashboard' , requiresAuth: false}
    }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting',
  },
  {
    path: '/403',
    component: () => import('@/views/403'),
    hidden: true,
   
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  deviceRouter,
  dialogRouter,
  faultRouter,
  interfaceRouter,
  manualRouter,
  monitorRouter,
  rfidRouter,
  userRouter
  ]
const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  base:'/',
  routes: [...constantRoutes,...asyncRoutes]
})

const router = createRouter()

export function resetRouter() {
  console.log("进入router的index.vue里面的resetRouter")
  console.log("重置路由")
  const newRouter = createRouter()
  console.log("重置后的路由为",newRouter)
  console.log("router.matcher为", router.matcher)
  console.log("newRouter.matcher为", newRouter.matcher)
  router.matcher = newRouter.matcher
}

export default router
