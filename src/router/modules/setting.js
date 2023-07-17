import layout from '@/layout'
export default {
  path: '/setting',
  component: layout,
  meta: {
    title: '系统设置',
    icon: 'el-icon-s-tools'
  },
  children: [
    { path: 'setting', component: ()=>import('@/views/setting/index'), name: 'userCon', meta: { title: '用户管理' , icon:"el-icon-user"}},
    { path: 'setting', component: ()=>import('@/views/setting/index'), name: 'roleCon', meta: { title: '权限管理', icon:"el-icon-s-opportunity"}},
  ]
}