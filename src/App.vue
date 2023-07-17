<template>
  <div id="app">
    <!-- 定义路由的占位符 -->
    <router-view />
  </div>
</template>

<script>
console.log("把App.vue组件暴露出来")
export default {
  name: 'App'
}
</script>
<!-- 进度条的颜色 -->
<style>
#nprogress .bar {
 
 background: blue !important;    

}
</style>
