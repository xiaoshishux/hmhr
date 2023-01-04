import request from '@/utils/request'

export function loginAPI(data) {
    return request({
        url: '/sys/login',
        method: "post",
        data
    })
}
// 获取用户信息
export function getUserProfileAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
//获取用户头像
export function getUserPhotoAPI(id){
  return request({
    url:`/sys/user/${id}`
  })
}