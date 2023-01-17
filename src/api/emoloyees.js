import request from '@/utils/request'

// 获取员工列表
export function getEmployeeListAPI(param) {
    return request({
        url: '/sys/user',
        methods: 'get',
        param
    })
}