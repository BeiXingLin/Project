import layout from '@/layout'
export default {
  path: '/dashboard',
  component: layout,
  children: [{
    path: '',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'guide'
    }
  }]
}