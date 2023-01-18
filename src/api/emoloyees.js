import request from '@/utils/request'

// 获取员工列表
export function getEmployeeListAPI(param) {
    return request({
        url: '/sys/user',
        methods: 'get',
        param
    })
}
// 添加员工
export function addEmployeeAPI(data) {
    return request({
        url: '/sys/user',
        methods: 'post',
        data
    })
}