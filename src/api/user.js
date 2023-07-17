import request from '@/utils/request'

console.log("进入api里面的user.js的login")
export function login(data) {
  console.log(data)
  return request({
    url: '/User/Login',
    method: 'post',
    data
  })
}
console.log("进入api里面的user.js的getUserInfo")
export function getUserInfo() {
  return request({
    url: '/User/profile',
    method: 'get',
  })
}

console.log("进入api里面的user.js的getInfo")
export function getInfo(data) {
  return request({
    url: '/User/profile',
    method: 'get',
    data
  })
}

/**
 * 更新密码
 * **/
 console.log("进入api里面的user.js的updatePassword")
export function updatePassword(data) {
  return request({
    url: '/User/UpdatePass',
    method: 'put',
    data
  })
}
