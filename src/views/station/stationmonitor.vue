<template>
  <div class="monitor-container">
      <div class="monitor-top">
      <el-row :gutter="20">
      <el-col :span="6">
        <div>
          <el-statistic title="总数">
            <template slot="formatter"> 6 </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="正常个数">
            <template slot="formatter"> 6 </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-statistic title="故障个数">
            <template slot="formatter"> 0 </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
      </div>
      <div class="monitor-layout">
        <el-row :gutter="20" style="margin-right: 15px;margin-left: 15px" type="flex" v-loading="loading">
                <el-col v-for="(item, index) in list" :key="index" :span="6">
                  <el-card class="box-card" shadow="always" :body-style="{ padding: '0px' }" :style="setStyle(item.Valid)">
                     <div slot="header" class="header">
                      <span class="label" >{{ item.Name }}</span>
                    </div> 
                    <div style="margin: 15px">
                      <div class="card-label">{{$t('dashboard.ID')}} {{item.id}}</div>
                      <br/>
                      <div class="card-label">{{$t('dashboard.StationStatus')}}
                      <template >
                      <span v-if="item.Vaild ==true">{{$t('dashboard.Nor')}}</span>
                      <span v-else-if="item.Valid == false">{{$t('dashboard.Fau')}}</span>
                      <span v-else>{{$t('dashboard.Null')}}</span>
                      </template>
                      </div>
                      <br/>
                      <div class="card-label">{{$t('dashboard.TaskCode')}}</div>
                      <br/>
                      <div class="card-label">{{$t('dashboard.strResult')}}</div>
                      <br/>
                      <div class="card-label">{{$t('dashboard.Result')}}</div>
                    </div> 
                  </el-card>
                </el-col>
        </el-row>
      </div>
      <!-- <div  class="pagination-container">
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
                <el-pagination
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    :current-page="queryParams.page"
                    :page-size="queryParams.pagesize"
                    @current-change="changePage"
                    @size-change="handleSizeChange"
                    class="pagination-footer"
                />
              </el-row>
      </div> -->
    </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
import pageTools from './components/page-top.vue'
import {GetStationList} from '@/api/station'
export default {
  name: 'SystemMonitor',
  components: {
    CountTo,
    pageTools
  },
  data() {
    return {
      queryParams: {
        page: 5, 
        pagesize: 10,
      },
      timer: null,
      list:[],
      tips: {
        Num: 6,
        normalNum: 6,
        disabledNum: 0
      },
    }
  },
  computed: {
    ...mapGetters(['name']),
    setStyle() {
      return function (Valid) {
	        return Valid==true ? 'background-color: #00ff00' : (Valid==false ? 'background-color: #00ff00':'background-color: #00ff00')
  }
 }

  },
  watch: {
    
  },
  destroyed(){
  },

  created() {
    this.timer = window.setInterval(() => {
        setTimeout(this.GetStationList, 0);
      }, 30000);
  },
  mounted() {
    this.GetStationList()
  },
  methods: {
    async GetStationList() {
        const Data = await GetStationList()
        this.total=Object.keys(Data).length
        this.list = Data
      },
  }
}
</script>

<style scoped lang="scss">
.monitor-container {
  background-color:#ebf1f6;
  width: 100%;
  min-height: calc(100vh - 80px);
  min-height: 100vh; /* 确保内容填充整个视口 */
  .monitor-top{
    background:  #ebf1f6;
    margin-top: 30px;
    margin-bottom: 60px;
  }
  .monitor-layout{
    background-color:#ebf1f6;
  }
  .pagination-container {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px; /* 根据需要进行调整 */
      background-color:#ebf1f6;
      .pagination-footer{
        text-align: center;
        background-color:#ebf1f6;
        margin-right: 40%;
      }
  }
  .box-card {
    .header {
      position: relative;
      .label{
        padding: 0 3px;
        
        color:black;
      }
    }
    .card-label {
      color: black;
      margin-right: 8px;
      width: 120px;
      display: inline-block;
      margin-bottom: 5px;
    }
  }  
      }

</style>
