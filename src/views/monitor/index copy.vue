<template>
  <div class="dashboard">
    <div class="container">
      <!-- 内容 -->
      <div class="left">
        <!-- <pageTools >
        <template >
          今日{{ tips.dateRange }}：正常任务： {{ tips.socialSecurityCount }}条  异常任务： {{ tips.providentFundCount }}条
        </template>
      </pageTools> -->
        <div class="station-info">
              <el-row :gutter="20" style="margin-right: 15px;margin-left: -5px" type="flex" v-loading="loading">
                <el-col v-for="(item, index) in stationlist" :key="index" :span="6">
                  <el-card class="box-card" shadow="always" :body-style="{ padding: '0px' }" :style="setStyle(item.roadName)">
                     <div slot="header" class="header">
                      <span class="label" >{{ item.name }}</span>
                    </div> 
                    <div style="margin: 15px">
                      <div><div class="card-label">站点编号</div><span>{{item.stationid}}</span></div>
                      <!-- <div><div class="card-label">站点状态</div><span>{{item.status}}</span></div> -->
                      <div><div class="card-label">站点状态</div>
                      <template >
                      <span v-if="item.status ==1">正常</span>
                      <span v-else-if="item.status == 2">执行中</span>
                      <span v-else-if="item.status == 3">故障</span>
                      <span v-else>无</span>
                      </template>
                      </div>
                      <div><div class="card-label">任务信息</div><span>{{item.info}}</span></div>
                      <div><div class="card-label">故障信息</div><span>{{item.warn}}</span></div>
                    </div>
                    <div class="footer">
                      <div style="display: flex;align-items: center">
                        <el-button type="text" :style="item.status === '1' || item.status === '2' ? 'color: #18c8bd' : 'color: rgb(34, 125, 251)'" style="color: #18c8bd">启动</el-button>
                        <!-- <el-button type="text" style="color: #18c8bd;" v-show="item.status === '1' || item.status === '2'">回看</el-button> -->
                      </div>
                      <div style="display:flex; align-items: center;color: #cccccc">|</div>
                      <div style="display: flex;align-items: center">
                        <el-button type="text" :style="item.status === '2' ? 'color: #18c8bd' : 'color: rgb(34, 125, 251)'" style="color: #18c8bd">停止</el-button>
                        <!-- <el-button type="text" style="color: #18c8bd;" v-show="item.status === '2'">回看</el-button> -->
                      </div>
                      <div style="display:flex; align-items: center;color: #cccccc">|</div>
                      <div style="display: flex;align-items: center">
                        <el-button type="text" :style="item.status === '2' ? 'color: #18c8bd' : 'color: rgb(34, 125, 251)'" style="color: #18c8bd">查看详情</el-button>
                        <!-- <el-button type="text" style="color: #18c8bd;" v-show="item.status === '2'">回看</el-button> -->
                      </div>
                      <div style="display:flex; align-items: center;color: #cccccc">|</div>
                      <div style="display: flex;align-items: center">
                        <el-button type="text" :style="item.status === '2' ? 'color: #18c8bd' : 'color: rgb(34, 125, 251)'" style="color: #18c8bd">清除报警</el-button>
                        <!-- <el-button type="text" style="color: #18c8bd;" v-show="item.status === '2'">回看</el-button> -->
                      </div>
                    </div> 
                  </el-card>
                </el-col>
              </el-row>
              <!-- <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination
            layout="total,prev, pager, next"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage"
          />
        </el-row> -->
      </div>
          </div>
      </div>
    </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
import { getDeviceList } from '@/api/device'
import {getUserInfo} from '@/api/user'
import pageTools from './components/page-top.vue'
export default {
  components: {
   SocialTool, pageTools,CountTo
  },
  data() {
    return {
      queryParams: {
        page: 1, // 当前页码
        pagesize: 10,
      },
      timer: null,
      stationlist:[{"name":"1号堆垛机","stationid":"1","status":"2","roadName":"2","stationstatus":"运行","info":"执行搬运任务","warn":"无故障"},
                  {"name":"1号提升机","stationid":"2","status":"2","roadName":"2","stationstatus":"运行","info":"到达取货层","warn":"无故障"},
                  {"name":"2号堆垛机","stationid":"3","status":"1","roadName":"1","stationstatus":"运行","info":"空闲","warn":"无故障"},
                  {"name":"2号提升机","stationid":"4","status":"2","roadName":"2","stationstatus":"运行","info":"执行卸货任务","warn":"无故障"},
                  {"name":"3号堆垛机","stationid":"5","status":"3","roadName":"3","stationstatus":"停止","info":"执行取货任务","warn":"当前为取货任务，但货叉上有货"}],
      list:[]
    }
  },
  // 计算属性
  computed: {
    // 将getters中的四个属性映射到计算属性中- 指向
    ...mapGetters(['avatar', 'name', 'company', 'departmentName']),
    setStyle() {
      return function (roadName) {
	        return roadName==1 ? 'background-color: #00ff00' : (roadName==2 ? 'background-color: #ffff00':'background-color: #ff0000')
  }
 }

  },
  watch: {
    
  },
  destroyed(){
    clearInterval(this.timer);
    this.timer = null;
  },

  created() {
    // window.setInterval(() => {
    // setTimeout(fun, 0)
    //   }, 30000)
    
    this.timer = window.setInterval(() => {
        setTimeout(this.getDeviceList(), 0);
      }, 3000);

    
  },
  mounted() {
    // window.setInterval(() => {
    
    // setTimeout(fun, 0)}, 1)
    
  },
  methods: {
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
    async getUserInfo() {
      console.log("进入getUserInfo方法")
      const {info} = await getUserInfo()
      console.log("打印设备列表信息",{info})
      console.log("打印记录条数",{total})
      console.log(info[0])
      this.list = info
      console.log("list",this.list)
      this.total = total
      console.log("rows",this.total)
    },
    
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  background: #f5f6f8;
  width: 100%;
  min-height: calc(100vh - 80px);

  .container {
    display: flex;
    .left {
      flex: 1;
      :nth-child(1) {
        margin-top: 0;
      }
    }
  
  .el-row {
      display:flex;
      flex-wrap: wrap;
    align-items: center;
  }
  .el-row  .el-card {
      min-width: 100%;
      height: 100%;
      margin-right: 20px;
      transition: all .5s;
  }
  .el-form-item {
      margin-bottom: 0 !important;
  }
  .pagination-container {
      margin-top: -3px;
      margin-bottom: 30px;
  }
  .box-card {
    // background-color:green;
    .header {
      position: relative;
      .label{
        padding: 0 3px;
        // background-color: #fdf0da;
        color:black;
      }
      .header-label {
        padding-left: 10px;
      }
      .card-header-tag-blue {
        position: absolute;
        width: 68px;
        height: 30px;
        top: -14px;
        right: -15px;
        background-repeat:no-repeat;
        background-image: url("../../assets/common/green.png");
        display: inline-block;
        
      }
      .card-header-tag-green {
        position: absolute;
        width: 68px;
        height: 30px;
        top: -14px;
        right: -15px;
        background-image: url("../../assets/common/blue.png");
        display: inline-block;
        background-repeat:no-repeat;
      }
    }
    .footer {
      font-size: 18px !important;
      background-color: rgb(245, 247, 251);
      display: flex;
      height: 50px;
      justify-content: space-evenly;
    }
    .card-label {
      color: black;
      margin-right: 8px;
      width: 70px;
      display: inline-block;
      margin-bottom: 5px;
    }
  }
    .panel {
      background-color: #fff;

      margin-top: 8px;
      padding: 20px;
      .panel-title {
        font-size: 16px;
        color: #383c4e;
        font-weight: 500;
      }
      // 用户信息样式
      .user-info {
        display: flex;
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: #d9d9d9;
          line-height: 48px;
          text-align: center;
        }
         .username {
           width: 30px;
           height: 30px;
           text-align: center;
           line-height: 30px;
           border-radius: 50%;
           background: #04c9be;
           color: #fff;
           margin-right: 4px;
         }
        .company-info {
          margin-left: 10px;
          height: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            color: #383c4e;
            font-weight: 500;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium;
            span {
              font-size: 12px;
              background: #f5f6f8;
              text-align: center;
              padding: 2px 8px;
              border-radius: 2px;
              color: #697086;
            }
          }
          .depart {
            font-size: 14px;
            color: #697086;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
