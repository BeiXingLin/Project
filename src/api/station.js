import request from '@/utils/request'

// 获取站点信息
console.log("进入api里面的station.js的getStationInfo")
export function getStationInfo(params) {
  console.log("params为",params)
  return request({
    url: '/Station/getStation',
    method: 'get',
    params
  })
}


