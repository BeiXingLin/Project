import request from '@/utils/request'

// 控制站点启动
export function ControlStationStart(params) {
  console.log("启动站点传入",params)
  return request({
    url: `/ASRS_WCS/ControlStation?nId=${params}&strCommandMsg=START`,
    method: 'get',
  })
}

// 控制站点停止
export function ControlStationStop(params) {
  console.log("停止站点传入",params)
  return request({
    url: `/ASRS_WCS/ControlStation?nId=${params}&strCommandMsg=STOP`,
    method: 'get',
  })
}

// 获取站点信息列表
export function GetStationList() {
  return request({
    url: '/ASRS_WCS/GetStationList',
    method: 'get',
  })
}

//查看工作站详情
export function GetTaskMsg(params) {
  console.log("staton.js查看详情传入",params)
  return request({
    url: `/ASRS_WCS/GetTaskMsg?nId=${params}`,
    method: 'get',
  })
}

//获取站点状态
export function GetStationStatus(params) {
  console.log("staton.js查看详情传入",params)
  return request({
    url: `/ASRS_WCS/GetStationStatus?nId=${params}`,
    method: 'get',
  })
}
