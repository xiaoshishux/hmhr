import { getToken, setToken, removeToken } from "@/utils/auth"
// 共享的数据
const getDefaultState = () => {
  return {
    token: getToken()// 用户 Token，默认为 ''
  }
}
const state = getDefaultState()
// 操作数据的方法
const mutations = {
  // 
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState)
  },
  // 设置token
  SET_TOKEN(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  // 删除token
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}