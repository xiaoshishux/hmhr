import request from '@/utils/request'

// 组织架构-获取列表
export function departmentsListAPI(){
    return request({
        url:'/company/department'
    })
}