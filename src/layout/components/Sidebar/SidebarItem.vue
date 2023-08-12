<template>
  <!-- 判断是否隐藏菜单 -->
  <div v-if="!item.hidden">
    <!-- 是否只有一个子组件 -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object 路由对象
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    //路由路径
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    console.log('进入SidebarItem里面的data()')
    console.log('this.onlyOneChild为',this.onlyOneChild)
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      console.log("过滤之前的showingChildren为",showingChildren)
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          console.log('进入SidebarItem里面的 hasOneShowingChild()方法')
          console.log('parent为',parent)
          console.log('children为',children)
          console.log('item.hidden为',item.hidden)
          console.log('不展示')
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          console.log('item.hidden为',item.hidden)
          console.log('展示')
          console.log('item为',item)
          this.onlyOneChild = item
          return true
        }
      })
      console.log("过滤之后的showingChildren为",showingChildren)
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        console.log('当只有一个子路由时，默认显示子路由')
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        console.log('当没有子路由需要展示时，默认显示父路由')
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      console.log("进入resolvePath",routePath)
      if (isExternal(routePath)) {
        console.log("进入isExternal(routePath)",isExternal(routePath))
        console.log("进入isExternal(routePath)",routePath)
        return routePath
      }
      if (isExternal(this.basePath)) {
        console.log("进入isExternal(this.basePath)",isExternal(this.basePath))
        console.log("进入isExternal(this.basePath)",this.basePath)
        return this.basePath
      }
      console.log("path.resolve(this.basePath, routePath)为",path.resolve(this.basePath, routePath))
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
<style>

.nest-menu{
  background-color:#001529;
}
</style>