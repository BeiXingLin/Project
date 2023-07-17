import layout from '@/layout'
export default {
  path: '/task',
  component: layout,
  meta: {
    title: '任务管理',
    icon: 'task'
  },
  children: [
    { path: 'task', component: ()=>import('@/views/task/index'), name: 'taskInfo', meta: { title: '任务信息' }},
    { path: 'taskdetail', component: ()=>import('@/views/task/taskdetail'), name: 'taskAnalysis', meta: { title: '任务汇总'}},
  ]
}