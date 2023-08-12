import layout from '@/layout'
import i18n from '@/lang'
export default {
  path: '/monitor',
  component: layout,
  redirect: '/monitor',
  meta: {
    title: i18n.t('menu.Monitor'),
    icon: 'eye',
    requiresAuth: true,
    roles: ['admin', 'editor'] 
  },
  children: [
  {
    path: 'stationmonitor',
    name: 'warehouse',
    component: () => import('@/views/station/stationmonitor'),
    meta: { title: i18n.t('menu.schedule'),requiresAuth: true,roles: ['admin', 'editor']},
  },
  {
    path: 'index',
    name: 'TaskMonitor',
    component: () => import('@/views/station/index'),
    meta: {title: i18n.t('menu.Monitor'),requiresAuth: true,roles: ['admin', 'editor'],
  }
  },
  ]
}