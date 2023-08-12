import request from '@/utils/request'

// 用户登录
export function login(data) {
  console.log("进入user.js")
  console.log(data)
  return request({
    url: `Authorize/Login?User=${data.User}&PassWord=${data.PassWord}`,
    method: 'get',
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/Authorize/GetUerInfo',
    method: 'get',
  })
}

// 添加新用户
export function addUser(data) {
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

// 设置用户权限
export function addAuthority(data) {
  return request({
    url: `/Authorize/AddUserAuthority?strUserName=${data.User}&strAuthorityCode=${data.strAuthorityCode}`,
    method: 'get',
  })
}

export function getInfo(data) {
  return request({
    url: '/User/profile',
    method: 'get',
    data
  })
}

export function updatePassword(data) {
  return request({
    url: '/User/UpdatePass',
    method: 'put',
    data
  })
}
