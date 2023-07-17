import { constantRoutes } from '@/router' 
export default {
  namespaced: true,
  // 公共数据
  state: {
    // 本地取一下token
    menuList: [] // 所有可以访问的路由配置
  },
  mutations: {
    setMenuList(state, asyncRoutes) { 
      console.log('asyncRoutes', asyncRoutes) //第二个参数是调用mutatains时传过来的动态路由参数
      state.menuList = [...constantRoutes, ...asyncRoutes]
    }
  }
}