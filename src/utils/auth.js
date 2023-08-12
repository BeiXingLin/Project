import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  console.log("进入auth.js里面的getToken，获取token")
  console.log("Cookies为",Cookies)
  console.log("Cookies.get(TokenKey)为",Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log("进入auth.js里面的getToken，设置token")
  console.log("Cookies为",Cookies)
  console.log("Cookies.set(TokenKey, token)为",Cookies.set(TokenKey, token))
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  console.log("进入auth.js里面的getToken，清除token")
  console.log("Cookies为",Cookies)
  console.log("Cookies.remove(TokenKey)为",Cookies.remove(TokenKey))
  return Cookies.remove(TokenKey)
}
