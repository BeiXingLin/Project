import layout from '@/layout'
import i18n from '@/lang'
export default {
  path: '/dialog',
  component: layout,
  redirect: '/dialog',
  meta: {
    title: i18n.t('menu.dailycheck'),
    icon: 'daily',
    requiresAuth: true,
    roles: ['admin', 'editor'] 
  },
  children: [{
    path: 'index',
    name: 'currentlog',
    component: () => import('@/views/dialog/index'),
    meta: { title: i18n.t('menu.currentlog') ,requiresAuth: true,roles: ['admin', 'editor']}
  },
  {
    path: 'runlog',
    name: 'maintenance',
    component: () => import('@/views/dialog/runlog'),
    meta: { title:i18n.t('menu.maintenance'),requiresAuth: true,roles: ['admin', 'editor']},
  },
  {
    path: 'zhexiantu',
    name: 'zhexiantu',
    component: () => import('@/views/dialog/zhexiantu'),
  }
  ]
}