<template>
<div>
  <div class="container">
    <div class="app-container">
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary" @click="addDialog=true">添加设备</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column prop="ID" label="序号" sortable />
          <el-table-column prop="devicename" label="设备名称" />
          <el-table-column prop="IPAddress" label="IP地址" width="140px" />
          <el-table-column prop="devicetype" label="设备类型"  />
          <el-table-column prop="protocol" label="通讯协议" />
          <el-table-column prop="status" label="设备状态" >
            <template v-slot="{ row }">
              <span v-if="row.status == 1" >正常</span >
              <span v-else-if="row.status == 2">故障</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="isenable" label="启用/停用" :key="Math.random()" >
            <template v-slot="{row}"> 
              <span v-if="row.isenable == 1">启用</span>
              <span v-else-if="row.isenable == 2">停用</span> 
              <span v-else>无</span>
            </template> 
          </el-table-column>
          <el-table-column label="操作" width="280px">
            <template v-slot="{ row }">
              <el-button size="mini" type="text" @click="btnCheck(row.ID)">查看</el-button>
              <el-button size="mini" type="text" @click="btnUpate(row.ID)">编辑</el-button>
              <el-button size="mini" type="text" @click="btnDel(row.ID)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <!-- 分页 -->
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
    </div>
    <!-- 放置导入组件 -->
    <import-excel :show-excel-dialog.sync="showExcelDialog" @uploadSuccess="getEmployeeList" />
    <!-- 查看弹窗 -->
    <el-dialog :visible.sync="showDialog" title="查看设备信息" center>
      <el-form :model='Info' label-width='80px'>
                    <el-form-item label='序号'>
                        <el-input v-model='Info.ID' disabled></el-input>
                    </el-form-item>
                    <el-form-item label='设备名'>
                        <el-input v-model='Info.devicename' disabled></el-input>
                    </el-form-item>
                    <el-form-item label='IP地址'>
                        <el-input v-model='Info.IPAddress' disabled></el-input>
                    </el-form-item>
                    <el-form-item label='设备类型'>
                        <el-input v-model='Info.devicetype' disabled></el-input>
                    </el-form-item>
                    <el-form-item label='通讯协议'>
                        <el-input v-model='Info.protocol' disabled></el-input>
                    </el-form-item>
                </el-form>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog :visible.sync="showupDialog" title="修改设备信息" center>
      <el-form :model='Info' label-width='80px'>
                    <el-form-item label='序号'>
                        <el-input v-model='Info.ID' disabled></el-input>
                    </el-form-item>
                    <el-form-item label='设备名'>
                        <el-input v-model='Info.devicename' ></el-input>
                    </el-form-item>
                    <el-form-item label='IP地址'>
                        <el-input v-model='Info.IPAddress' ></el-input>
                    </el-form-item>
                    <el-form-item label='设备类型'>
                        <el-input v-model='Info.devicetype' ></el-input>
                    </el-form-item>
                    <el-form-item label='通讯协议'>
                        <el-input v-model='Info.protocol' ></el-input>
                    </el-form-item>
                </el-form>
      <!-- 确定和取消按钮 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="UpCommit(Info)">确定</el-button>
          <el-button type="primary" size="mini" @click="showupDialog = false">取消</el-button>
        </el-col>
      </el-row> 
    </el-dialog>
    <!-- 添加弹窗 -->
    <el-dialog :visible.sync="addDialog" title="添加设备信息" center>
      <el-form :model='newInfo' label-width='80px'>
                    <el-form-item label='序号'>
                        <el-input v-model='newInfo.ID' ></el-input>
                    </el-form-item>
                    <el-form-item label='设备名'>
                        <el-input v-model='newInfo.devicename' ></el-input>
                    </el-form-item>
                    <el-form-item label='IP地址'>
                        <el-input v-model='newInfo.IPAddress' ></el-input>
                    </el-form-item>
                    <el-form-item label='设备类型'>
                        <el-input v-model='newInfo.devicetype' ></el-input>
                    </el-form-item>
                    <el-form-item label='通讯协议'>
                        <el-input v-model='newInfo.protocol' ></el-input>
                    </el-form-item>
                </el-form>
      <!-- 确定和取消按钮 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="AddCommit(newInfo)">确定</el-button>
          <el-button type="primary" size="mini" @click="addDialog = false">取消</el-button>
        </el-col>
      </el-row> 
    </el-dialog>
  </div>
  <router-view></router-view>
</div>
</template>
<script>
import { checkdeviceInfo, getDeviceList ,updateDevice ,delDevice,addDevice} from '@/api/device'
import FileSaver from 'file-saver'
import ImportExcel from './components/import-excel.vue'
export default {
  name: 'deviceinfo',
  components: {
    ImportExcel
  },
  data() {
    return {
      queryParams: {
        page: 1, // 当前页码
        pagesize: 10,
      },
      total: 0, // 记录设备的总数
      list: [], // 存储设备列表数据
      showExcelDialog: false, // 控制excel的弹层显示和隐藏
      showDialog: false, // 用来控制查看弹层的显示
      showupDialog: false, // 用来控制修改弹层的显示
      addDialog:false,
      Info: [], // 接收设备信息列表
      newInfo: [], // 用来双向绑定数据的
      currentUserId: null, // 用来记录当前点击的用户id
      ccc:""
    }
  },
  created() {
    console.log("进入生命周期函数created()")
    console.log("route为",this.$route)
    console.log("router为",this.$router)
    this.getDeviceList()
  },
  methods: {
    // 获取设备列表的方法
    async getDeviceList() {
      console.log("进入getDeviceList方法")
      const {total,info} = await getDeviceList(this.queryParams)
      console.log("打印设备列表信息",{info})
      console.log("打印记录条数",{total})
      console.log(info[0])
      this.list = info
      console.log("list",this.list)
      this.total = total
      console.log("rows",this.total)
    },
    // 切换页码
    changePage(newPage) {
      this.queryParams.page = newPage // 赋值新页码
      this.getDeviceList() // 查询数据
    },
    /** *
     * 导出的excel
     *
     * **/
    async  exportEmployee() {
      const result = await exportEmployee() // 导出所有的员工接口
      // console.log(result) // 使用一个npm包 直接将blob文件下载到本地 file-saver
      // FileSaver.saveAs(blob对象,文件名称)
      FileSaver.saveAs(result, '信息表.xlsx') // 下载文件
    },
    // 删除设备方法
    async btnDel(ID) {
      console.log("传入的ID为:",ID)
      const cc =await delDevice(ID)
      console.log(cc)
      this.$message.success('删除设备成功')
      window.location.reload() //windows自刷新
    },
    // 点击修改按钮弹出层
    async btnUpate(ID) {
      console.log("传入的ID为",ID)
      const info=await checkdeviceInfo(ID)
      this.Info = info
      this.showupDialog = true // 调整顺序
      await getDeviceList(this.queryParams)
    },
    // 修改弹框的确定按钮
    async  UpCommit(Info) {
      console.log(this.Info)
      const info = await updateDevice(this.Info)
      console.log(info)
      this.$message.success('修改设备信息成功')
      window.location.reload() //windows自刷新
      this.showupDialog = false
    },
    // 点击查看按钮
    async  btnCheck(ID) {
      console.log("传入的ID为",ID)
      const info=await checkdeviceInfo(ID)
      this.Info = info
      console.log("Info，设备信息列表",this.Info)
      this.currentUserId = ID
      console.log("currentUserId",this.currentUserId)
      // this.newInfo = info
      this.showDialog = true 
    },
    // 添加设备按钮
    async AddCommit(newInfo){
      console.log("传入的newInfo为",newInfo)
      console.log("传入的name为",this.newInfo.devicename)
      // this.ccc=JSON.stringify(this.newInfo)
      // console.log("传入的ccc为",this.ccc)
      const info =await addDevice(this.newInfo)
      console.log(info)
      this.$message.success('添加设备信息成功')
      // window.location.reload() //windows自刷新
      this.addDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
  }
}

</style>
