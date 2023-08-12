import Vue from 'vue'
import 'normalize.css/normalize.css' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang'
import '@/styles/index.scss' 
import App from './App'
import store from './store'
import router from './router'
import '@/icons' 
import '@/permission' 
import echarts from 'echarts'  //引入echarts
import nprogress from 'nprogress'

nprogress.inc(0.2)
nprogress.configure({
  easing:'ease',
  speed:500,
  showSpinner:false
})

Vue.use(ElementUI , {size: 'middle', i18n: (key, value) => i18n.t(key, value)})

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.config.lazy= false
Vue.directive('permission', {
  inserted(el, binding) {
    console.log(el)
    const points = store.state.user.userInfo?.roles?.points || [] 
    if (!points.includes(binding.value)) {
      el.remove() 
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


