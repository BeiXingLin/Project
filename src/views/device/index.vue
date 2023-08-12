<template>
  <div class="devicecontainer">
    <div class="devicepicker">
      <h5>设备名称:</h5>
      &nbsp;
      <el-select v-model="dateValue" clearable placeholder="全部站点" size="medium" style="width: 150px;"  @change="typeSearch()">
      <el-option v-for="item in warningtype" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
      </el-select>
      &nbsp;
      <h5>时间范围:</h5>
      <el-date-picker v-model="valuetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium" @change="submitDateTime()">
      </el-date-picker>
      &nbsp;&nbsp;
      <div  class="pickerbutton">
        <el-button size="mini" type="primary" icon="el-icon-search"   @click="">查询</el-button>
        <el-button size="mini" type="info"  icon="el-icon-refresh"   @click=""> 重置</el-button>
        <el-button size="mini" type="primary" icon="el-icon-share"   @click=""> 导出</el-button>
        <el-button type="info" size="mini" icon="el-icon-refresh-right" >刷新</el-button>
      </div>
    </div>
    <div class="devicetable">
        <el-table :data="list" :header-cell-style="{background:'#ebf1f6'}" :cell-style="{background:'#ebf1f6'}">
          <el-table-column prop="id" label="序号" sortable align="left"   >
              <template slot-scope="{ $index }">
              <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
          <el-table-column prop="name" label="设备名称" width="300px" align="center" />
          <el-table-column prop="container" label="内容" width="1000px"  align="center"/>
          <el-table-column prop="number" label="运行次数" width="240px" align="center"/>
          <el-table-column prop="number" label="最大次数" width="240px" align="center"/>
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
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="AddCommit(newInfo)">确定</el-button>
          <el-button type="primary" size="mini" @click="addDialog = false">取消</el-button>
        </el-col>
      </el-row> 
    </el-dialog>
  </div>
</template>
<script>
import { checkdeviceInfo, getDeviceList ,updateDevice ,delDevice,addDevice} from '@/api/device'
import FileSaver from 'file-saver'
import ImportExcel from './components/import-excel.vue'
export default {
  name: '',
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
      list: [{id:0,name:"阻挡器",container:"抬起",number:50},
      {id:1,name:"堆垛机",container:"行走距离",number:500}], // 存储设备列表数据
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
  },
  methods: {
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
.devicecontainer {
  background-color:#ebf1f6;
  .devicepicker{
      padding: 5px;
      display: flex;
      margin:1px ;
      align-items: center;
    }
  .devicetable {
    flex: 1;
    padding: 20px;
 
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
