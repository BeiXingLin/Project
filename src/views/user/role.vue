<template>
  <div class="app-container">
    <div class="rolepick" >
    <h5>是否管理员</h5>&nbsp;&nbsp;
    <el-select v-model="selectRole" placeholder="请选择是否管理员" size="small">
      <el-option v-for="item in defaultrole" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
    &nbsp;&nbsp;
    <h5>状态</h5>&nbsp;&nbsp;
    <el-select v-model="selectStatus" placeholder="请选择状态" size="small">
      <el-option v-for="item in defaultstatus" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
    &nbsp;&nbsp;
    <el-button type="success" icon="el-icon-search" @click="searchUserBtn" size="small" >查找</el-button>
    <el-button type="info" icon="el-icon-refresh" @click="clearUserBtn" size="small">重置</el-button>
  </div>
  <div class="roletable">
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" :header-cell-style="{background:'#ebf1f6'}" :cell-style="{background:'#ebf1f6'}" >
      <el-table-column align="center" :label="$t('station.ID')" >
          <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
          </template>
          </el-table-column>
      <el-table-column align="center" label="用户名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否管理员" width="220">
        <template v-slot="{row}"> 
        <span v-if="row.Name == admin" class="cell-center">是</span>
        <span v-else  class="cell-center">否</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="220">
        <template v-slot="{row}"> 
        <span v-if="row.Name == admin" class="cell-center">有效</span>
        <span v-else  class="cell-center">无效</span>
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">权限管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage"
            @size-change="handleSizeChange"
            class="pagination-footer"
          />
    </el-row>
    <el-drawer :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'" :before-close="handleClose" align=center style="font-style:20px;font-style: italic;font-weight:bold">
      <el-form :model="role" label-width="60px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="role.name" placeholder="用户名" style="width: 400px;height: 20px;"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="用户权限标识"
            style="width: 400px"
          />
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            ref="tree"
            :data="data"
            node-key="id"
            show-checkbox
            check-strictly
            :default-checked-keys="defaultCheckedKeys"
            :default-unchecked-keys="defaultUncheckedKeys"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import path from 'path'
import i18n from '@/lang'
// import { deepClone } from '@/utils'
// import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'

const defaultRole = {
  key: 'admin',
  name: 'admin',
  description: '超级管理员',
  routes: []
}

export default {
  data() {
    return {
      queryParams: {
        page: 1, // 当前页码
        pagesize: 10,
      },
      total: 0, // 记录设备的总数
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [{"key":"admin","name":"admin","description":"超级管理员"}],
      dialogVisible: false,
      dialogType: 'new',
      // checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultrole:[
        {label:'超级管理员',value:'0'},
        {label:'管理员',value:'1'},
        {label:'用户',value:'2'}
      ],
      defaultstatus:[
      {label:'禁用',value:'0'},
      {label:'启用',value:'1'},
    ],
      selectRole:'',
      selectStatus:'',
      data: [
        {
          id: 1,
          label: i18n.t('menu.dashboard'),
          checked:true
        }, 
        {
          id: 2,
          label: i18n.t('menu.Monitor'),
          checked:true
        },
        {
          id: 3,
          label: i18n.t('menu.dailycheck'),
          checked:true,
          children: [{
            id: 4,
            label: i18n.t('menu.maintenance'),
            checked:true
          }, {
            id: 5,
            label: i18n.t('menu.currentlog'),
            checked:true
          }]
        },
        {
          id: 6,
          label: i18n.t('menu.Fault'),
          checked:true,
          children: [{
            id: 7,
            label: i18n.t('menu.FaultQuery'),
            checked:true
          }, {
            id: 8,
            label: i18n.t('menu.FaultStatistics'),
            checked:true
          }]
        },
        {
          id: 9,
          label: i18n.t('menu.device'),
          checked:true,
          children: [{
            id: 10,
            label: i18n.t('menu.deviceQuery'),
            checked:true
          }, {
            id: 11,
            label: i18n.t('menu.deviceService'),
            checked:true
          }]
        },
        {
          id: 12,
          label: i18n.t('menu.rfid'),
          checked:true
        }, 
        {
          id: 13,
          label: i18n.t('menu.manual'),
          checked:true,
          children: [{
            id: 14,
            label: i18n.t('menu.equipmentOperation'),
            checked:true
          }]
        },{
          id: 15,
          label: i18n.t('menu.user'),
          checked:true,
          children: [{
            id: 16,
            label: i18n.t('menu.Usermanagement'),
            checked:true
          },
          {
            id: 17,
            label: i18n.t('menu.Permission'),
            checked:true
          }]
        },
        {
          id: 18,
          label: i18n.t('menu.interface'),
          checked:true,
          children: [{
            id: 19,
            label: i18n.t('menu.AWMS'),
            checked:true
          },
          {
            id: 20,
            label: i18n.t('menu.PLC'),
            checked:true
          }]
        },
      ],
      defaultCheckedKeys:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background-color:#ebf1f6;
  .rolepick{
    padding: 5px;
  display: flex;
  margin:10px ;
  align-items: center;
}
  .roletable {
    flex: 1;
    padding: 20px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
  .pagination-footer{
        position: absolute;
        text-align: center;
        background-color:#ebf1f6;
        left: 0;
        bottom: 0;
        width: 100%;
      }
 
}
</style>
