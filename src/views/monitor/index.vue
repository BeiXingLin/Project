<template>
  <div class="monitor">
      <div class="monitor-top">
      <!-- 工具栏 -->
      <page-tools :show-before="true">
        <template v-slot:before :data="tips">
          站点总数：{{ tips.Num }}个   正常站点数：{{ tips.normalNum }}个   异常站点数： {{ tips.disabledNum }}个
        </template>
      </page-tools>
      
      </div>
      <div class="monitor-container">
        <el-row :gutter="20" style="margin-right: 15px;margin-left: -5px" type="flex" v-loading="loading">
                <el-col v-for="(item, index) in stationlist" :key="index" :span="6">
                  <el-card class="box-card" shadow="always" :body-style="{ padding: '0px' }" :style="setStyle(item.stationstatus)">
                     <div slot="header" class="header">
                      <span class="label" >{{ item.stationname }}</span>
                    </div> 
                    <div style="margin: 15px">
                      <div><div class="card-label">站点编号</div><span>{{item.stationid}}</span></div>
                      <div><div class="card-label">站点状态</div>
                      <template >
                      <span v-if="item.stationstatus ==1">正常</span>
                      <span v-else-if="item.stationstatus == 2">执行中</span>
                      <span v-else-if="item.stationstatus == 3">故障</span>
                      <span v-else>无</span>
                      </template>
                      </div>
                      <div><div class="card-label">任务信息</div><span>{{item.taskinfo}}</span></div>
                      <div><div class="card-label">故障信息</div><span>{{item.warninfo}}</span></div>
                    </div>
                    <div class="footer">
                      <div style="display: flex;align-items: center">
                        <el-button type="text" :style="item.stationstatus === '2'||item.stationstatus === '3'  ? 'cursor: not-allowed': 'color: rgb(34, 125, 251)'" style="color: #18c8bd" >启动</el-button>
                      </div>
                      <div style="display:flex; align-items: center;color: #cccccc">|</div>
                      <div style="display: flex;align-items: center">
                        <el-button type="text" :style="item.stationstatus === '1' ||item.stationstatus === '3' ? 'cursor: not-allowed': 'color: rgb(34, 125, 251)'" style="color: #18c8bd">停止</el-button>
                      </div>
                      <div style="display:flex; align-items: center;color: #cccccc">|</div>
                      <div style="display: flex;align-items: center">
                        <el-button type="text" :style="item.stationstatus === '1' ||item.stationstatus === '3' ? 'cursor: not-allowed' : 'color: rgb(34, 125, 251)'" style="color: #18c8bd">查看详情</el-button>
                      </div>
                      <div style="display:flex; align-items: center;color: #cccccc">|</div>
                      <div style="display: flex;align-items: center">
                        <el-button type="text" :style="item.stationstatus === '1' ||item.stationstatus === '2'? 'cursor: not-allowed' : 'color: rgb(34, 125, 251)'" style="color: #18c8bd">清除报警</el-button>
                      </div>
                    </div> 
                  </el-card>
                </el-col>
        </el-row>
      </div>
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
  </div>
</template>

<script>
import pageTools from './components/page-top.vue'
import { getStationInfo } from '@/api/station'
export default {
  name: '',
  props: {},
  data () {
    return {
      list: [],
      yearMonth: '',
      page: {
        page: 1,
        pageSize: 10,
        total: 22
      },
      selectParams: {},
      tips: {
        Num: "",
        normalNum:  "",
        disabledNum: ""
      },
      loading: false,
      total: null,
      queryParams: {
        page: 1, // 当前页码
        pagesize: 10,
      },
      stationlist:[],
    }
  },
  components: {
    pageTools
  },
  computed: {
    setStyle() {
      return function (stationstatus) {
	        return stationstatus==1 ? 'background-color: #00ff00' : (stationstatus==2 ? 'background-color: #ffff00':'background-color: #ff0000')
      }
    }
    
  },
  mounted: {
    
  },
  watch: {
    
  },
  destroyed(){
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    async getStationInfo() {
      const {total,info ,tips} = await getStationInfo(this.queryParams)
      this.stationlist = info
      this.total = total
      this.tips = tips
    },
    
  },
  created () {
    this.timer = window.setInterval(() => {
        setTimeout(this.getStationInfo(this.queryParams), 0);
      }, 1000);

     
  },
  mounted () {
    
  },
}
</script>

<style scoped>
 .box-card {
    background-color:green;
    .header {
      position: relative;
      .label{
        padding: 0 3px;
        /* background-color: #fdf0da; */
        color:black;
      }
      .header-label {
        padding-left: 10px;
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
  .pagination-container {
      
      height: 60px;
      text-align: center;
  }
  
</style>
