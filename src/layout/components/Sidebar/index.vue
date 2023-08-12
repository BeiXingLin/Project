<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 左侧菜单 -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 循环路由信息 -->
        <!-- 遍历路由，生成sidebaritem -->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

console.log("进入layout的components的sidebar里面的index.vue")
export default {
  components: { SidebarItem, Logo },
  computed: {
    //借助mapGetters 帮助getters中的数据sidebar和routers为计算属性
    ...mapGetters([
      'sidebar', 'routes'
    ]),
    // 路由信息的计算属性
    routes() {
    // 返回所有的路由信息
    console.log("进入layout的components的sidebar里面的index.vue的routes()计算属性")
    console.log("进入路由信息的计算属性")
    console.log("返回所有的路由信息",this.$router.options.routes)
    return this.$router.options.routes
    },
    // 你进入那个路由我就把哪个路由返回给你
    // 通过 meta.activeMenu 属性，指定路由对应的高亮菜单
    //meta.activeMenu 需要提供一个合法的路由，否则将不能生效
    activeMenu() {
    console.log("进入layout的components的sidebar里面的index.vue的activeMenu()计算属性")
    console.log(" 通过 meta.activeMenu 属性，指定路由对应的高亮菜单")
      const route = this.$route
      const { meta, path } = route
      console.log("route为",route)
      console.log("meta为",meta)
      console.log("path为",path)
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        console.log("meta.activeMenu为true",meta.activeMenu)
        return meta.activeMenu
      }
      console.log("meta.activeMenu为false",meta.activeMenu,path)
      return path
    },
    //判断 settings.js 中的配置项是否需要展示 Logo
    showLogo() {
      console.log("进入layout的components的sidebar里面的index.vue的 showLogo()计算属性")
      console.log("判断 settings.js 中的配置项是否需要展示 Logo")
      console.log("sidebarLogo为",this.$store.state.settings.sidebarLogo)
      return this.$store.state.settings.sidebarLogo
    },
    //从 @/styles/variables.scss 中获取 scss 对象，从而获取样式
    variables() {
      console.log("进入layout的components的sidebar里面的index.vue的 variables()计算属性")
      console.log("从 @/styles/variables.scss 中获取 scss 对象，从而获取样式")
      console.log("variables为",variables)
      return variables
    },
    //NavBar 中点击按钮，会修改 Cookie 中的 sidebarStatus，
    //从 vuex 取值时会将 sidebarStatus 转为 Boolean，
    //并判断默认是否需要收缩左侧菜单栏
    isCollapse() {
      console.log("进入layout的components的sidebar里面的index.vue的 isCollapse()计算属性")
      console.log("//NavBar 中点击按钮，会修改 Cookie 中的 sidebarStatus")
      console.log("//从 vuex 取值时会将 sidebarStatus 转为 Boolean，")
      console.log("//并判断默认是否需要收缩左侧菜单栏")
      console.log("this.sidebar.opened为",this.sidebar.opened)
      return !this.sidebar.opened
    },
  }
}
</script>
