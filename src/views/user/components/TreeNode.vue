<template>
  <div>
    <h1>权限管理</h1>
    <PermissionTree :permissions="treeData" />
  </div>
</template>

<script>
import PermissionTree from './PermissionTree.vue'

export default {
  name: 'App',
  data() {
    return {
      treeData: [
        {
          id: 1,
          name: '用户管理',
          children: [
            {
              id: 2,
              name: '添加用户'
            },
            {
              id: 3,
              name: '编辑用户'
            }
          ]
        },
        {
          id: 4,
          name: '产品管理',
          children: [
            {
              id: 5,
              name: '添加产品'
            },
            {
              id: 6,
              name: '编辑产品'
            }
          ]
        }
      ]
    }
  },
  components: {
    PermissionTree
  }
}
</script>