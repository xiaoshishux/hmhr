const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device, // 这2个控制dashboard面板页左侧导航,不要注释
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username // 返回用户名
  
}
export default getters