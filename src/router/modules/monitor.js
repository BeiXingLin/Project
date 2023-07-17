import layout from '@/layout'
export default {
  path: '/monitor',
  component: layout,
  children: [{
    path: '',
    name: 'Monitor',
    component: () => import('@/views/monitor/index'),
    meta: {
      title: '任务管理',
      icon: 'task'
    }
  }]
}