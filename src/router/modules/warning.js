import layout from '@/layout'
export default {
  path: '/warning',
  component: layout,
  meta: {
    title: '系统设置',
    icon: 'el-icon-s-tools'
  },
  children: [
    { path: 'warning', component: ()=>import('@/views/warning/index'), name: 'warningInfo', meta: { title: '报警信息' , meta:'guide'}},
    { path: 'warningdetail', component: ()=>import('@/views/warning/warningdetail'), name: 'warningAnalysis', meta: { title: '报警统计', meta:'guide' }},
  ]
}