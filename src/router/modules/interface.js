import layout from '@/layout'
import i18n from '@/lang'
export default {
  path: '/interface',
    component: layout,
    redirect: '/interface',
    meta: {
      title: i18n.t('menu.interface'),
      icon: 'interface',
      requiresAuth: true,
      roles: ['admin'] 
    },
    children: [{
      path: 'index',
      name: 'AWMS',
      component: () => import('@/views/interface/index'),
      meta: { title: i18n.t('menu.AWMS'),requiresAuth: true,roles: ['admin']},
    },
    {
      path: 'PLC',
      name: 'PLC',
      component: () => import('@/views/interface/PLC'),
      meta: { title: i18n.t('menu.PLC'),requiresAuth: true,roles: ['admin']},
    }
    ]
}