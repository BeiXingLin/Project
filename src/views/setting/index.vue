<template>
  <div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入用户名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增用户
				</el-button>
			</div>
			<el-table :data="tableData.data" v-loading="tableData.loading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="userName" label="账户名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="brief" label="用户昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="role" label="关联角色" show-overflow-tooltip></el-table-column>
				<el-table-column prop="password" label="密码" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="用户状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="用户描述" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary" @click="onOpenEditUser('edit', scope.row)"
							>修改</el-button
						>
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
    <div  class="pagination-container">
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
                <el-pagination
                    layout="total,prev, pager, next"
                    :total="total"
                    :current-page="queryParams.page"
                    :page-size="queryParams.pagesize"
                    @current-change="changePage"
                />
              </el-row>
      </div>
		<!-- <UserDialog ref="userDialogRef" @refresh="getTableData()" /> -->
	</div>
</template>

<script>
export default {
  name: '',
  props: {},
  data () {
    return {
      tableData: {
		data: [],
		total: 0,
		loading: false,
		param: {
			pageNum: 1,
			pageSize: 10,
		},
	},
  total: 22,
      queryParams: {
        page: 1, // 当前页码
        pagesize: 10,
      },
    }
  },
  components: {
    
  },
  computed: {
    
  },
  mounted: {
    
  },
  watch: {
    
  },
  methods: {
    
  },
  created () {
    
  },
  mounted () {
    
  },
}
</script>

<style scoped>
  
</style>
