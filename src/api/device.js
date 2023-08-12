import request from '@/utils/request'

/**
 * 获取设备列表
 * **/

export function getDeviceList(params) {
  return request({
    url: '/Device/GetDeviceInfo',
    // params // 地址参数 查询参数
    method: 'GET',
    params
  })
}


export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 改变接收数据的类型
    responseType: 'blob' // 使用blob接收二进制文件流
  })
}

export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob' // 二进制文件流
  })
}

/**
 * 上传excel
 *
*/
export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data // form-data类型 因为要上传文件类型
  })
}
/**
 * 删除设备
 * **/

export function delDevice(data) {
  return request({
    method: 'delete',
    url: `/Device/deleteDevice?id=${data}`,
  })
}

/**
 * 新增设备
 * ***/

export function addDevice(data) {
  console.log("进入api里面的device.js的addDevice")
  console.log(data)
  return request({
    url: '/Device/addDevice',
    method:'post',
    data
  })
}

/**
 *  获取设备详情
 * **/

export function checkdeviceInfo(params) {
  return request({
    url: `/Device/CheckDeviceInfo?id=${params}`,
    
  })
}

/**
 * 修改设备信息
 * ***/

export function updateDevice(data) {
  return request({
    url: `/Device/updateDevice/`,
    method: 'post',
    data
  })
}


