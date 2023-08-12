import layout from '@/layout'
import i18n from '@/lang'
export default {
  path: '/device',
    component: layout,
    redirect: '/device',
    meta: {
      title: i18n.t('menu.device'),
      icon: 'device',
      requiresAuth: true,
      roles: ['admin', 'editor'] 
    },
    children: [{
      path: 'index',
      name: 'deviceQuery',
      component: () => import('@/views/device/index'),
      meta: { title: i18n.t('menu.deviceQuery'),requiresAuth: true,roles: ['admin', 'editor']}
    },
    {
      path: 'repair',
      name: 'deviceService',
      component: () => import('@/views/device/repair'),
      meta: { title: i18n.t('menu.deviceService'),requiresAuth: true,roles: ['admin', 'editor']},
    }
    ]
}