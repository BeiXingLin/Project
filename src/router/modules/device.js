import layout from '@/layout'
export default {
  path: '/device',
  component: layout,
  children: [{
    path: '',
    name: 'Device',
    component: () => import('@/views/device/index'),
    meta: {
      title: '设备监控',
      icon: 'guide'
    }
  }]
}