import layout from '@/layout'
export default {
  path: '/interface',
  component: layout,
  children: [{
    path: '',
    name: 'Interface',
    component: () => import('@/views/interface/index'),
    meta: {
      title: '接口管理',
      icon: 'interface'
    }
  }]
}