const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  language: state => state.app.language,
  token: state => state.user.token,
  // userId: state => state.user.userInfo.userId,
  // avatar: state => state.user.userInfo.avatar, 
  userInfo: state => state.user.userInfo, 
  name: state => state.user.name, 
  routes: state => state.user.routes,
  // company: state => state.user.userInfo.company, 
  // departmentName: state => state.user.userInfo.departmentName ,
}

export default getters
