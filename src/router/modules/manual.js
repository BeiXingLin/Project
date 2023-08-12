import layout from '@/layout'
import i18n from '@/lang'
export default {
  path: '/manual',
    component: layout,
    redirect: '/manual',
    meta: {
      title: i18n.t('menu.manual'),
      icon: 'guide',
      requiresAuth: true,
      roles: ['editor'] 
    },
    children: [{
      path: 'index',
      name: 'equipmentOperation',
      component: () => import('@/views/manual/index'),
      meta: { title: i18n.t('menu.equipmentOperation'),requiresAuth: true,roles: ['editor']}
    },
    {
      path: 'index',
      name: 'Dataoperation',
      component: () => import('@/views/station/index'),
    }
    ]
}