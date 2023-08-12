import layout from '@/layout'
import i18n from '@/lang'
export default {
  path: '/user',
    component: layout,
    redirect: '/user',
    meta: {
      title: i18n.t('menu.user'),
      icon: 'user',
      requiresAuth: true,
      roles: ['admin','editor'] 
    },
    children: [{
      path: 'index',
      name: 'Usermanagement',
      component: () => import('@/views/user/index'),
      meta: { title: i18n.t('menu.Usermanagement'),requiresAuth: true,roles: ['admin','editor']}
    },
    {
      path: 'role',
      name: 'Permission',
      component: () => import('@/views/user/role'),
      meta: { title: i18n.t('menu.Permission'),requiresAuth: true,roles: ['admin','editor']},
    }
    ]
}