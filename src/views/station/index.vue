<template>
    <div class="container">
    <div class="stationpick" >
       <pageTools :show-before="true">
        <template v-slot:before :data="tips" >
          {{$t('dashboard.AllStations')}}{{tips.Num}}个   {{$t('dashboard.NormalStations')}}{{tips.normalNum}}个   {{$t('dashboard.IssueStations')}}{{ tips.disabledNum }} 个
        </template>
       </pageTools>
    </div>
    <div class="app-container">
          <div id="anybutton">
              <el-button @click="btnAnyStart(multipleSelection)" type="danger" icon="el-icon-video-play" size="small" >{{$t('station.Start') }}</el-button> 
              <el-button @click="btnAnyStop(multipleSelection)" type="warning" icon="el-icon-video-pause" size="small" >{{$t('station.Stop') }}</el-button> 
          </div>
          <el-table :header-cell-style="{background:'#ebf1f6'}" :cell-style="{background:'#ebf1f6'}" ref="multipleTable" :data="list"  tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange" border class="anytable">
            <el-table-column type="selection"></el-table-column>
            <el-table-column :label="$t('station.ID')"  align="center">
              <template slot-scope="{ $index }">
              <span>{{ $index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Name" :label="$t('station.Name')" align="center" />
            <el-table-column prop="Vaild" :label="$t('station.VaildStatus')" align="center">
              <template  v-slot="{ row }">
                <el-tag v-if="row.Vaild == true">{{$t('station.Vaild')}}</el-tag >
                <el-tag v-else>{{$t('station.InVaild') }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="AutoReset" :label="$t('station.ResetStatus')" :key="Math.random()" align="center" >
              <template v-slot="{row}"> 
                <el-tag v-if="row.AutoReset == false">{{$t('station.OutAutoReset')}}</el-tag>
                <el-tag v-else >{{$t('station.AutoReset') }}</el-tag>
              </template> 
            </el-table-column>
            <el-table-column label="状态" align="center" >
              <template  v-slot="{ row }">
                <el-tag v-if="row.Vaild == true" style="background-color: greenyellow;">正常</el-tag >
                <el-tag v-else style="background-color: red;">异常</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="$t('station.Operation')" width="280px"  align="center">
              <template v-slot="{ row }">
                <el-button size="mini" type="info" @click="btnCheck(row.id)" :disabled="isButtonEnabled">{{$t('station.Detail') }}</el-button>
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
      <el-dialog :visible.sync="detailDialog" title="设备详情" :width="dialogWidth" :height="dialogHeight">
                <el-table ref="table" :data="tableData" :max-height="tableHeight"  border >
                      <el-table-column  prop="Id" label="站点ID" >
                      </el-table-column> 
                      <el-table-column  prop="TaskName" label="任务名" >
                      </el-table-column> 
                      <el-table-column  prop="TaskCode" label="任务号" >
                      </el-table-column> 
                      <el-table-column  prop="ScriptName" label="脚本名称" >
                      </el-table-column> 
                      <el-table-column  prop="UpperLimit" label="最大值" >
                      </el-table-column> 
                      <el-table-column  prop="LowerLimit" label="最小值" >
                      </el-table-column> 
                      <el-table-column  prop="Unit" label="单位" >
                      </el-table-column> 
                      <el-table-column  prop="Delay" label="延时" >
                      </el-table-column> 
                      <el-table-column  prop="strResultValue" label="实测值" >
                      </el-table-column> 
                      <el-table-column  prop="TimeStamp" label="时间戳" >
                      </el-table-column> 
                      <el-table-column  prop="nExecuteTimer" label="完成时间" >
                      </el-table-column> 
                </el-table>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="10">
          <el-button type="text" size="mini" @click="detailDialog = false" >确定</el-button>
          <el-button type="text" size="mini" @click="detailDialog = false" >取消</el-button>
        </el-col>
      </el-row> 
    </el-dialog>
    </div>
  </template>


  <script>
  import {ControlStationStart,ControlStationStop,GetStationList,GetTaskMsg,GetStationStatus} from '@/api/station'
  import pageTools from './components/page-top.vue'
  export default {
    name: 'SystemController',
    components: {
      pageTools
    },
    data() {
      return {
        tips: {
        Num: 6,
        normalNum: 6,
        disabledNum: 0
      },
        intervalId:null,
        Sid:'',
        Sname:'',
        statusData:[],
        listid:[],
        listname:[],
        queryParams: {
          page: 1, // 当前页码
          pagesize: 3,
        },
        stationid:"",
        stationName:"",
        total: 0, 
        list: [],
        tableData:[],
        currentUserId: null, //用来记录当前点击的用户id
        multipleSelection:[] ,//用来记录已选择的行
        detailDialog:false,
        dialogWidth: '800px', // 自定义el-dialog的宽度
        dialogHeight: '600px', // 自定义el-dialog的高度
        tableHeight: '400px',
        isButtonEnabled: true
      }
    },
    created(){
      this.dataRefreh();
    },
    mounted() {
        this.GetStationList()
        this.handleButton()
        this.GetStationStatus("0")
    },
    destroyed(){
      this.clear();
    },
    methods: {
        //数据刷新函数
        dataRefreh() {
        // 计时器正在进行中，退出函数
        if (this.intervalId != null) {
          return;
        }
        // 计时器为空，操作
        this.intervalId = setInterval(() => {
          console.log("刷新" + new Date());
          this.GetStationList(); //加载接口函数
        }, 3000);
      }, 
      // 停止定时器
      clear() {
        clearInterval(this.intervalId); //清除计时器
        this.intervalId = null; //设置为null
      },
      //获取站点
      async GetStationList() {
        const Data = await GetStationList()
        this.total=Object.keys(Data).length
        this.list = Data
      },
      async GetStationStatus(params) {
        const Data = await GetStationStatus(params)
        this.statusData = Data
      },
      statusFormatter(row) {
      // 自定义状态列的渲染方法
      const status = row.status;
      const statusData = this.statusData.find(item => item.id === status);

      return statusData ? statusData.label : status;
      },
      async handleButton() {
      const Data =await GetStationStatus("0")
      console.log("进入handleButton",Data)
      if (Data==4) {
        console.log("Code为4")
        this.isButtonEnabled=false
      } else {
        console.log("Code不为4")
        this.isButtonEnabled=true
      }
      },
      changePage(newPage) {
        this.queryParams.page = newPage 
        this.GetStationList() 
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查看详情
      async  btnCheck(ID) {
        console.log("查看详情传入的ID为",ID)
        const Data=await GetTaskMsg(ID)
        const testItem = Data.TaskInfo.TestItem
        const strResultValue =Data.strResultValue
        const TimeStamp = Data.TimeStamp
        const bResult =Data.bResult
        const nExecuteTimer = Data.nExecuteTimer
        const tableData = [
        {
          Id:testItem.StationId,
          TaskName: testItem.TaskName,
          TaskCode: testItem.TaskCode,
          ScriptName:testItem.ScriptName,
          UpperLimit:testItem.UpperLimit,
          LowerLimit:testItem.LowerLimit,
          Unit:testItem.Unit,
          Delay:testItem.Delay,
          RepeatCounter:testItem.RepeatCounter,
          Jump:testItem.Jump,
          JumpRepeatCount:testItem.JumpRepeatCount,
          Param1:testItem.Param1,
          Param2:testItem.Param2,
          Param3:testItem.Param3,
          Param4:testItem.Param4,
          strResultValue:strResultValue,
          TimeStamp:TimeStamp,
          bResult:bResult,
          nExecuteTimer:nExecuteTimer,
        }
      ];
        this.tableData=tableData
        this.detailDialog = true
        console.log(this.tableData)
       
      },
      //启动按钮事件
      async  btnAnyStart(multipleSelection) {
        const selectedIds = new Set()
        const selectedNames =new Set()
        console.log("multipleSelection为", multipleSelection)
        if(multipleSelection.length == 1 )
        this.$confirm(`此操作将启动${multipleSelection[0].Name}号站点, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.startAction(multipleSelection[0].id,multipleSelection[0].Name);
        }).catch(() => {
          this.cancelStart(multipleSelection[0].Name);        
        });
        else if(multipleSelection.length > 1){
            multipleSelection.forEach(item => selectedIds.add(item.id));
            const uniqueIds = Array.from(selectedIds); // Convert set to array
            multipleSelection.forEach(item => selectedNames.add(item.Name));
            const uniqueNames = Array.from(selectedNames); // Convert set to array
            console.log(uniqueIds)
            console.log(uniqueNames)
            this.AnyStart(uniqueIds,uniqueNames)
        }
        else{
          this.$message({type: 'warning',message: `请选中要启动的站点`})
        }
      },
      //多选启动确认弹框
      AnyStart(params1,params2) {
        console.log(this.params1)
        if(params1!=='undefied')
        this.$confirm(`此操作将启动${params2}站点, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.startAction(params1,params2);
        }).catch(() => {
          this.cancelStart(params2);        
        });
        else{
          this.$message({type: 'warning',message: `请选中要启动的站点`})
        }
      },
      //调用启动接口
      async startAction(params1,params2) {
        try{
        const Data=await ControlStationStart(params1)
        if(Data){
          this.$message({type: 'success',message: `已成功启动${params2}`})
        }else
        {
        this.$message({type: 'warning',message: `启动${params2}失败`})
        }
        }
        catch(error){
          this.$message({type: 'warning',message: `访问ControlStation报错:${error}`})
        }
      },
      //取消启动按钮事件
      cancelStart(params2) {
        this.$message({type: 'info',message: `已取消启动${params2}`})
      },
      //停止按钮事件
      async  btnAnyStop(multipleSelection) {
        console.log("multipleSelection为", multipleSelection)
        if(multipleSelection.length == 1 )
        this.$confirm(`此操作将停止${multipleSelection[0].Name}号站点, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.executeStop(multipleSelection[0].id,multipleSelection[0].Name);
        }).catch(() => {
          this.cancelStart(multipleSelection[0].Name);        
        });
        else if(multipleSelection.length > 1){
          multipleSelection.forEach(item => selectedIds.add(item.id));
            const uniqueIds = Array.from(selectedIds); // Convert set to array
            multipleSelection.forEach(item => selectedNames.add(item.Name));
            const uniqueNames = Array.from(selectedNames); // Convert set to array
            console.log(uniqueIds)
            console.log(uniqueNames)
            this.AnyStop(uniqueIds,uniqueNames)
        }
        else{
          this.$message({type: 'warning',message: `请选中要停止的站点`})
        }
      },
      //多选停止确认弹框
      AnyStop(params1,params2) {
        this.$confirm(`此操作将停止${params2}号站点, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.executeStop(params1,params2);
        }).catch(() => {
          this.cancelStop(params2);        
        });
      },
      //调用停止站点接口
      async executeStop(params1,params2) {
        try{
        const Data=await ControlStationStop(params1)
        if(Data){
          this.$message({type: 'success',message: `${params2}已成功停止`})
        }else
        {
        this.$message({type: 'warning',message: `${params2}停止失败`})
        }
        } catch(error){
          this.$message({type: 'warning',message: `访问ControlStation报错:${error}`})
        }
      },
      //取消停止按钮事件
      cancelStop(params2) {
      this.$message({type: 'info',message: `已取消停止${params2}`})
      },
      
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .container{
    background-color: #ebf1f6;
    .stationpick{
      left: 0; 
    }
    .app-container{
      background-color: #ebf1f6;
    #anybutton{
      margin-top: 10px;
      margin-right: 10px;
      text-align: right;;
    }
    .anytable{
      margin-top: 20px;
    }
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
  