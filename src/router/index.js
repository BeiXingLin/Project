import Vue from 'vue'
import i18n from '@/lang'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import deviceRouter from './modules/device'
import permissionRouter from './modules/permission'
import roleRouter from './modules/role'
import interfaceRouter from './modules/interface'
import taskRouter from './modules/task'
import warningRouter from './modules/warning'
import settingRouter from './modules/setting'
import monitorRouter from './modules/monitor'
import dashboardRouter from './modules/dashboard'



 //定义静态路由数组
export const constantRoutes = [
  
  {
    // path 表示要匹配的hash地址
    // component 表示要展示的路由组件
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  
 
  {
    //redirect:指定一个新的路由地址，可以很方便地设置路由的重定向
    //用户在访问地址 A 的时候，强制用户跳转到地址 C ，从而展示特定的组件页面
    //防止hash为/时什么也没显示，场景就是刚进入页面时，默认显示首页
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: i18n.t('menu.dashboard'), icon: 'dashboard' }
    }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'monitor',
      name: 'Monitor',
      component: () => import('@/views/monitor/index'),
      meta: { title: i18n.t('menu.guide'), icon: 'guide' },
    }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'device',
      name: 'Device',
      component: () => import('@/views/station/index'),
      meta: { title: i18n.t('menu.device'), icon: 'device' },
    }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: i18n.t('menu.task'),
      icon: 'task'
    },
    children: [
      { path: 'task', component: ()=>import('@/views/task/index'), name: 'taskInfo', meta: { title: i18n.t('menu.taskInfo') }},
      { path: 'taskdetail', component: ()=>import('@/views/task/taskdetail'), name: 'taskAnalysis', meta: { title: i18n.t('menu.taskAnalysis')}},
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'interface',
      name: 'Interface',
      component: () => import('@/views/interface/index'),
      meta: { title:i18n.t('menu.interface') , icon: 'interface' }
    }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: i18n.t('menu.warning'),
      icon: 'warning'
    },
    children: [
      { path: 'warning', component: ()=>import('@/views/warning/index'), name: 'warningInfo', meta: { title: i18n.t('menu.warningInfo') , meta:'guide'}},
      { path: 'warningdetail', component: ()=>import('@/views/warning/warningdetail'), name: 'warningAnalysis', meta: { title: i18n.t('menu.warningAnalysis'), meta:'guide' }},
    ]
    
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: i18n.t('menu.setting'),
      icon: 'el-icon-s-tools'
    },
    children: [
      { path: 'setting', component: ()=>import('@/views/setting/index'), name: 'userCon', meta: { title:i18n.t('menu.userCon') , icon:"el-icon-user"}},
    ]
    
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  
]
// 定义动态路由数组
export const asyncRoutes = [
  dashboardRouter,
  roleRouter,
  deviceRouter,
  permissionRouter,
  interfaceRouter,
  warningRouter,
  taskRouter,
  settingRouter,
  monitorRouter,
  
  ]
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes // 默认引入静态路由
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  // router.matcher是比较核心的一个属性。对外提供两个方法match(负责route匹配), addRoutes（动态添加路由）。
  // 对router.matcher属性做修改，即新的routes就会替换老的routes, 其实就是replaceRoutes()的含义（但是官方没有提供这个API）。
  router.matcher = newRouter.matcher // reset router
}

export default router
