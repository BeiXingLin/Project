import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import i18n from './lang'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI ,{locale},VueI18n)
// 如果想要中文版 element-ui，按如下方式声明
//Vue.use(ElementUI ,{i18n: (key, value) => i18n.t(key, value)})
Vue.use(ElementUI , {size: 'small', // size设置元素默认大小
    i18n: (key, value) => i18n.t(key, value)// 在注册Element时设置i18n的处理方法
  })

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
console.log("在main.js文件内创建Vue实例对象")
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})


