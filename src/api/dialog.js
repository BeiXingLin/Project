import request from '@/utils/request'

// 控制站点启动/停止

export function ControlStation(params) {
  return request({
    url: `/ASRS_WCS/ControlStation?nId=${params}&strCommandMsg=START`,
    method: 'get',
  })
}

export function GetStationList() {
  return request({
    url: '/ASRS_WCS/GetStationList',
    method: 'get',
  })
}

export function GetTaskMsg() {
  return request({
    url: '/ASRS_WCS/GetTaskMsg',
    method: 'get',
    params
  })
}