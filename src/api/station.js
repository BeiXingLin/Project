import request from '@/utils/request'

// 获取站点信息

export function getStationInfo(params) {
  return request({
    url: '/Station/getStation',
    method: 'get',
    params
  })
}


