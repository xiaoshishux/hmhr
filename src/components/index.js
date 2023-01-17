import PageTools from './index.vue'

export default {
     // 在 install 方法中，使用 Vue.component 挂载组件
  install(Vue) {
    Vue.component('PageTools', PageTools)
  }
}
