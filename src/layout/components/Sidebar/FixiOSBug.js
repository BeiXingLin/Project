export default {
  computed: {
    device() {
      console.log("进入FixiOSBug里面的device()计算属性")
      console.log("this.$store.state.app.device为",this.$store.state.app.device)
      return this.$store.state.app.device
    }
  },
  mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    console.log("进入FixiOSBug里面的mounted()")
    this.fixBugIniOS()
  },
  methods: {
    fixBugIniOS() {
      console.log("进入FixiOSBug里面的methods()")
      const $subMenu = this.$refs.subMenu
      console.log("$subMenu",$subMenu)
      if ($subMenu) {
        console.log("判断$subMenu为",$subMenu)
        const handleMouseleave = $subMenu.handleMouseleave
        console.log("handleMouseleave为",handleMouseleave)
        $subMenu.handleMouseleave = (e) => {
          if (this.device === 'mobile') {
            return
          }
          console.log("设备不是手机")
          handleMouseleave(e)
        }
      }
    }
  }
}
