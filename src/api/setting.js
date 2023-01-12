import request from '@/utils/request'

// 获取所有角色信息

export function getRolesAPI(params){
    return request({
        url:'/sys/role',
        method:'get',
        params
    })
}

// 获取公司信息

export function getCompanyInfoAPI(companyId) {
    return request({
      url: `/company/${companyId}`
    })
  }

//   新增角色
export function addRoleAPI(data){
    return request({
        url:'/sys/role',
        method:'post',
        data
    })
}
// 获取某个角色的列表
export function getRoleIdAPI(id) {
    return request({
      url: `/sys/role/${id}`
    })
  }
