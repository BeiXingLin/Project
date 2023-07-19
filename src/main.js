import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang'
import '@/styles/index.scss' 
import App from './App'
import store from './store'
import router from './router'
import '@/icons' 
import '@/permission' 


Vue.use(ElementUI , {size: 'small', i18n: (key, value) => i18n.t(key, value)})

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.config.lazy= false
// 封装自定义指令 用来控制操作权
Vue.directive('permission', {
  // 会在指令作用的元素插入到页面完成以后触发
  inserted(el, binding) {
    // el 指令作用的元素的dom对象
    console.log(el)
    const points = store.state.user.userInfo?.roles?.points || [] // 当前用户信息的操作权
    if (!points.includes(binding.value)) {
      // 不存在就要删除或者禁用
      el.remove() // 删除元素
      // el.disabled = true
      // 线上的权限数据和线下的代码进行对应
    }
  }

})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})


