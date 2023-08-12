import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: `Authorize/Login?username=${data.User}&password=${data.PassWord}`,
    method: 'get',
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: `/Authorize/GetUerInfo?data=[]`,
    method: 'get',
  })
}

// 添加新用户/编辑用户
export function editUser(data) {
  return request({
    url: `/Authorize/AddNewUserInfo?strUserName=${data.User}&strPassWord=${data.PassWord}`,
    method: 'get',
  })
}

// 删除用户
export function deleteUser(data) {
  return request({
    url:`/Authorize/DeleteUserInfo?strUserName=${data.User}`,
    method: 'get',
  })
}

// 修改密码
export function updatePassword(data) {
  return request({
    url: '/User/UpdatePass',
    method: 'put',
    data
  })
}
