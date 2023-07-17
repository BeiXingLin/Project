<template>
  <div  class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <template v-slot:before>
          今日{{ tips.dateRange }}：正常任务： {{ tips.socialSecurityCount }}条  异常任务： {{ tips.providentFundCount }}条
        </template>
        <template >
            <el-button size="mini" type="danger" @click="">查找</el-button>
            <el-button size="mini" type="primary" @click="">导出</el-button>
        </template>
      </page-tools>
      <!-- 筛选组件 -->
      <!-- <task-tools :show-before="true"></task-tools> -->
      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column type="taskid" width="50" label="序号" />
          <el-table-column prop="stationname" label="条码/任务号" width="180"  align="center"/>
          <el-table-column prop="startdatetime" label="开始时间" />
          <el-table-column prop="enddatetime" label="结束时间" />
          <el-table-column prop="taskstatus" label="任务状态" width="180" align="center"/>
          <el-table-column label="操作">
            <template v-slot:default="obj">
              <el-button type="text" size="mini" @click="$router.push(`/social_securitys/detail/${obj.row.id}`)">查看详情</el-button>
              <el-button type="text" size="mini" @click="$router.push(`/social_securitys/detail/${obj.row.id}`)">强制完成</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" align="middle" justify="center" style="height: 60px">
          <el-pagination
            :total="page.total"
            :current-page="page.page"
            :page-size="page.pageSize"
            layout="prev, pager, next"
            @current-change="pageChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
// import { getSettings } from '@/api/social'
// import { getEmployeeList } from '@/api/salary'
import SocialTool from './components/social-tool'
import TaskTool from './components/task-tools'
import pageTools from './components/page-tools.vue'

export default {
  name: 'SocialTableIndex',
  components: { SocialTool, pageTools },
  data() {
    return {
      list: [],
      yearMonth: '',
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      selectParams: {},
      tips: {},
      loading: true
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-bod-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 1px solid #ebeef5;
}

</style>
