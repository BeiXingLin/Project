import layout from '@/layout'
import i18n from '@/lang'
export default {
  path: '/rfid',
    component: layout,
    redirect: '/rfid',
    meta: {
      title: i18n.t('menu.rfid'),
      icon: 'list',
      requiresAuth: true,
      roles: ['admin', 'editor'] 
    },
    children: [{
      path: 'index',
      name: 'reworkRFID',
      component: () => import('@/views/rfid/index'),
      meta: {   title: "RFID控制",requiresAuth: true, roles: ['admin', 'editor']  },
    },
    {
      path: 'rfidshow',
      name: 'emergencyRFID',
      component: () => import('@/views/rfid/rfidshow'),
      meta: { title: "RFID过程管控",requiresAuth: true,roles: ['admin', 'editor']},
    }
    ]
}