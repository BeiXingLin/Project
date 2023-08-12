import store from '@/store'

const { body } = document //判断是否为移动端
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) {
      console.log("进入ResizeHandler里面的watch()监听")
      console.log("进入ResizeHandler里面的watch()监听",route)
      if (this.device === 'mobile' && this.sidebar.opened) {
        console.log("设备为手机且this.sidebar.opened为true")
        console.log("使用dispatch调用app.js里面的action的closeSideBar")
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    console.log("进入ResizeHandler里面的beforeMount挂载前")
    console.log("调用 window.addEventListener('resize', this.$_resizeHandler)")
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    console.log("进入ResizeHandler里面的beforeMount销毁前")
    console.log("调用 window.removeEventListener('resize', this.$_resizeHandler)")
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    console.log("进入ResizeHandler里面的mounted()")
    const isMobile = this.$_isMobile()
    console.log("isMobil为",isMobile)
    if (isMobile) {
      console.log("isMobil为true")
      console.log("使用dispatch调用app.js里面的action的toggleDevice和closeSideBar")
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      console.log("进入ResizeHandler里面的methods的 $_isMobile()")
      const rect = body.getBoundingClientRect()
      console.log("rect为",rect)
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      console.log("进入ResizeHandler里面的methods的  $_resizeHandler()")
      if (!document.hidden) {
        console.log("document.hidden为",document.hidden)
        const isMobile = this.$_isMobile()
        console.log("isMobile为",isMobile)
        console.log("根据isMobile值,使用dispatch调用app.js里面的action的toggleDevice")
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          console.log("isMobile为",isMobile)
          console.log("根据isMobile值,使用dispatch调用app.js里面的action的closeSideBar")
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
