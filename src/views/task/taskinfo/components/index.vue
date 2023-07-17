<template>
  <div class="task-container">
    <div class="app-container">
      <!-- 工具栏 -->
      <page-tools :show-before="true" class="tools" >
        <!-- 前面内容 -->
        <template v-slot:before>有  条考勤审批尚未处理</template>
        <template class="butt" >
          <el-button size="mini" :span="6"  type="danger" @click="">导入</el-button>
          <el-button size="mini" :span="6"  type="warning">提醒</el-button>
          <el-button size="mini" :span="6"  type="primary" @click="handleSet">设置</el-button>
          <el-button size="mini" :span="6"  type="default" @click="">历史任务</el-button>
          <el-button size="mini" :span="6"  type="primary" @click="">报表</el-button>
        </template>
      </page-tools>
  </div>
  <!-- <el-card class="hr-block"> 
        <el-form ref="formData" :model="formData" label-width="120px" class="formInfo">
          <el-form-item label="序号:"> -->
            <!-- <el-checkbox-group v-model="formData.deptID">
              <el-checkbox
                v-for="item in departments"
                :key="item.id"
                :label="item.name"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>  -->
          <!-- </el-form-item>
          <el-form-item label="执行站点："> -->
            <!-- <el-radio-group v-model="formData.stateID">  -->
              <!-- <el-radio
                v-for="item in stateData.holidayType"
                :key="item.id"
                :label="item.value"
                :value="item.value"
              >
                {{ item.value }}
              </el-radio> -->
            <!-- </el-radio-group>  -->
          <!-- </el-form-item>
          <el-form-item label="任务状态:"> -->
            <!-- <el-checkbox-group v-model="formData.deptID">
              <el-checkbox
                v-for="item in departments"
                :key="item.id"
                :label="item.name"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>  -->
          <!-- </el-form-item>
          <el-form-item label="任务操作:"> -->
            <!-- <el-checkbox-group v-model="formData.deptID">
              <el-checkbox
                v-for="item in departments"
                :key="item.id"
                :label="item.name"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>  -->
          <!-- </el-form-item> 
         </el-form> 
      </el-card>  -->
  </div>
  <!-- <div v-loading="true" class="dashboard-container">
    <div class="app-container"> -->
      <!-- 工具栏 -->
      <!-- <page-tools :show-before="true"> -->
        <!-- 前面内容 -->
        <!-- <template v-slot:before>有  条考勤审批尚未处理</template>
        <template>
          <el-button size="mini" type="danger" @click="">导入</el-button>
          <el-button size="mini" type="warning">提醒</el-button>
          <el-button size="mini" type="primary" @click="handleSet">设置</el-button>
          <el-button size="mini" type="default" @click="">历史归档</el-button>
          <el-button size="mini" type="primary" @click="">报表</el-button>
        </template>
      </page-tools>
      <el-card class="hr-block"> -->
        <!-- <el-form ref="formData" :model="formData" label-width="120px" class="formInfo"> -->
          <!-- <el-form-item label="部门:"> -->
            <!-- <el-checkbox-group v-model="formData.deptID">
              <el-checkbox
                v-for="item in departments"
                :key="item.id"
                :label="item.name"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group> -->
          <!-- </el-form-item> -->
          <!-- <el-form-item label="考勤状态："> -->
            <!-- <el-radio-group v-model="formData.stateID">
              <el-radio
                v-for="item in stateData.holidayType"
                :key="item.id"
                :label="item.value"
                :value="item.value"
              >
                {{ item.value }}
              </el-radio>
            </el-radio-group> -->
          <!-- </el-form-item> -->
        <!-- </el-form> -->
      <!-- </el-card> -->
      <!-- 考勤数据 -->
      <!-- <el-card class="hr-block"> -->
        <!-- 考勤列表 -->
        <!-- <div style="width:100%;position: relative;overflow-x: auto; overflow-y: hidden;">
          <div style="width: 3000px;">
            <table border="0" align="center" cellpadding="0" cellspacing="0" class="tableInfo">
              <tr>
                <th width="50">序号</th>
                <th width="100">姓名</th>
                <th width="100">工号</th>
                <th width="200">部门</th>
                <th width="100">手机</th>
                <th v-for="(it, ind) in monthOfReport" :key="ind" width="110">{{ attendInfo.month }}/{{ ind + 1 }}</th>
              </tr> -->
              <!-- <tr v-for="(item, index) in list" :key="item.id">
                <td width="50">{{ index }}</td>
                <td width="100">{{ item.username }}</td>
                <td width="100">{{ item.workNumber }}</td>
                <td width="200">{{ item.departmentName }}</td>
                <td width="100">{{ item.mobile }}</td>
                <td
                  v-for="(it,ind) in item.attendanceRecord"
                  :key="ind"
                  width="110"
                  @click="showChangeDialog(item,ind,it)"
                >
                  <span v-if="it.adtStatu===1">√</span>
                  <span v-if="it.adtStatu===2">旷工</span>
                  <span v-if="it.adtStatu===3">迟到</span>
                  <span v-if="it.adtStatu===4">早退</span>
                  <span v-if="it.adtStatu===5">外出</span>
                  <span v-if="it.adtStatu===6">出差</span>
                  <span v-if="it.adtStatu===7">年假</span>
                  <span v-if="it.adtStatu===8">事假</span>
                  <span v-if="it.adtStatu===9">病假</span>
                  <span v-if="it.adtStatu===10">婚假</span>
                  <span v-if="it.adtStatu===11">丧假</span>
                  <span v-if="it.adtStatu===12">产假</span>
                  <span v-if="it.adtStatu===13">奖励产假</span>
                  <span v-if="it.adtStatu===14">陪产假</span>
                  <span v-if="it.adtStatu===15">探亲假</span>
                  <span v-if="it.adtStatu===16">工伤假</span>
                  <span v-if="it.adtStatu===17">调休</span>
                  <span v-if="it.adtStatu===18">产检假</span>
                  <span v-if="it.adtStatu===19">流产假2</span>
                  <span v-if="it.adtStatu===20">长期病假</span>
                  <span v-if="it.adtStatu===21">测试架</span>
                  <span v-if="it.adtStatu===22">补签</span>
                </td>
              </tr> -->
            <!-- </table>
          </div>

        </div>
        <el-dialog
          :visible.sync="centerDialogVisible"
          width="30%"
          center
        > -->
          <!-- <span slot="title" style="color:#fff;">{{ attendInfo.name }} {{ attendInfo.month }}/{{ attendInfo.getDate }}（实际工作日考勤方案）</span>
          <div class="attenInfo">
            <p class="colRed">注：统计考勤时，异常状态优先正常状态</p>
            <p class="check">
              <el-radio-group v-model="modifyData.adtStatu">
                <el-radio
                  v-for="item in stateData.vacationtype"
                  :key="item.id"
                  :label="item.id"
                  :value="item.name"
                >{{ item.name }}</el-radio>
              </el-radio-group></p>
          </div> -->
          <!-- <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="btnOK">确定</el-button>
            <el-button @click="centerDialogVisible = false">取消</el-button>
          </span>
        </el-dialog> -->
        <!-- 分页组件 -->
        <!-- <el-row type="flex" align="middle" justify="center" style="height: 60px">
          <el-pagination
            :page-size="page.pagesize"
            :current-page="page.page"
            layout="prev, pager, next"
            :total="page.total"
            @current-change="pageChange"
          />
        </el-row> -->
      <!-- </el-card>
    </div> -->
    <!-- <el-card> -->
      <!-- 提醒组件 -->
      <!-- <el-dialog
        title="提醒"
        :visible.sync="tipsDialogVisible"
        width="280px"
        center
      >
        <div class="attenInfo">
          <p>系统将通过邮件与短信的形式，对全体员工中存在旷工的考勤进行提醒，该提醒每月仅可发送 1 次。</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSub">我知道了</el-button>
          <el-button @click="centerDialogVisible = false">取消</el-button>
        </span>
      </el-dialog> -->
      <!-- 设置组件 -->
      <!-- <attendance-set ref="set" @handleCloseModal="handleCloseModal" /></el-card></div> -->
    <!-- </div> -->
</template>

<script>
// import { getAttendancesList } from '@/api/attendance'
// import AttendanceSet from './components/attendance-set'
// import { getDepartment } from '@/api/department'
// import pageTools from './components/page-tools.vue'
export default {
//   name: 'Attendances',
//   components: { AttendanceSet, pageTools },
  data() {
    return {
      formData: {
        page: 1,
        pagesize: 10,
        keyword: this.keyword,
        deptID: [], // 性别
        stateID: ''
      },
    }
  }
}

</script>

<style scoped lang="scss">
      .butt{
        padding: 100px;
        display: flex;
        margin:50px ;
        border-bottom:500px none ;
        border-top: 500px none;
        border-left: 500px none;
        border-right: 500px none
      }
      // .app-container{
      //   .task-container{
      //         padding: 100px;
      //         display: flex;
      //         margin:50px ;
      //         border-bottom:500px none ;
      //         border-top: 500px none;
      //         border-left: 500px none;
      //         border-right: 500px none;
          
          
      //   }
      // }

      // .hr-block{
      //   // height: 50px;
      //   border-top: 100px;
      //   // border-right: 0 none;
      //   border-bottom: 500px none;
      // }

//   .tableInfo {
//     line-height: 36px;
//     border: solid 1px #ebeef5;
//     border-right: 0 none;
//     border-bottom: 0 none;
//     tr {
//       th {
//         height: 50px;
//         text-align: center;
//         border-right: solid 1px #ebeef5;
//         border-bottom: solid 1px #ebeef5;
//         border-bottom: 2px solid #e8e8e8;
//         background: #fafafa;
//         min-width:  100px;
//       }
//       td {
//         height: 36px;
//         text-align: center;
//         border-right: solid 1px #ebeef5;
//         border-bottom: solid 1px #ebeef5;
//       }
//     }
//   }

// .attenInfo {
//   p {
//     &.check {
//       padding: 20px 0 0;
//     }
//     .el-radio {
//         display: inline-block;
//         width: 60px;
//         padding: 5px 0;

//     }
//   }
// }
</style>
