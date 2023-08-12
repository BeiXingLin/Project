import layout from '@/layout'
import i18n from '@/lang'
export default {
  path: '/fault',
    component: layout,
    redirect: '/fault',
    meta: {
      title: i18n.t('menu.Fault'),
      icon: 'warning',
      requiresAuth: true,
      roles: ['admin', 'editor'] 
    },
    children: [{
      path: 'index',
      name: 'FaultQuery',
      component: () => import('@/views/fault/index'),
      meta: { title: i18n.t('menu.FaultQuery'),requiresAuth: true,roles: ['admin', 'editor']},
    },
    {
      path: 'FaultStatistics',
      name: 'FaultStatistics',
      component: () => import('@/views/fault/FaultStatistics'),
      meta: { title: i18n.t('menu.FaultStatistics'),requiresAuth: true,roles: ['admin', 'editor']},
    }
  ]
}