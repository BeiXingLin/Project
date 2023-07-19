<template>
    <div class="container">
      <h1 class="title">{{$t('station.StationInfo') }}</h1>
      <div class="app-container">
        <div class="right">
          <el-table  ref="multipleTable" :data="list"  tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="stationid" label="ID" sortable />
            <el-table-column prop="stationname" :label="$t('station.Name')" width="140px"/>
            <el-table-column prop="devicestatus" :label="$t('station.Status')" >
              <template v-slot="{ row }">
                <span v-if="row.devicestatus == 1" >{{$t('station.Normal')}}</span >
                <span v-else-if="row.devicestatus == 2">{{$t('station.Fault')}}</span>
                <span v-else>{{$t('station.Nul') }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="stationstatus" :label="$t('station.IsEnabled')" :key="Math.random()" >
              <template v-slot="{row}"> 
                <span v-if="row.stationstatus == 1">{{$t('station.Normal')}}</span>
                <span v-else-if="row.stationstatus == 2">{{$t('station.Fault')}}</span> 
                <span v-else>{{$t('station.Null') }}</span>
              </template> 
            </el-table-column>
            <el-table-column :label="$t('station.Operation')" width="280px">
              <template v-slot="{ row }">
                <el-button size="mini" type="text" @click="btnCheck(row.ID)">{{$t('station.Start') }}</el-button>
                <el-button size="mini" type="text" @click="btnUpate(row.ID)">{{$t('station.Stop') }}</el-button>
                <el-button size="mini" type="text" @click="btnUpate(row.ID)">{{$t('station.Detail') }}</el-button>
                <el-button size="mini" type="text" @click="btnDel(row.ID)">{{$t('station.Delete') }}</el-button>
              </template>
            </el-table-column>
  
          </el-table>
          <div style="margin-top: 20px">
              <!-- <el-button @click="toggleSelection([tableData[0], tableData[1]])">全选</el-button> -->
              <el-button @click="toggleSelection()" type="success">{{$t('station.deselect') }}</el-button>
              <el-button @click="" type="danger">{{$t('station.Start') }}</el-button> 
              <el-button @click="" type="warning">{{$t('station.Stop') }}</el-button> 
          </div>
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
    </div>
  </template>
  <script>
  import { getStationInfo} from '@/api/station'
  
 
  export default {
    name: 'deviceinfo',
    components: {
      
    },
    data() {
      return {
        queryParams: {
          page: 1, // 当前页码
          pagesize: 10,
        },
        total: 0, 
        list: [], 
        currentUserId: null, // 用来记录当前点击的用户id
        multipleSelection:[] //用来记录已选择的行
      }
    },
    created() {
        this.getStationInfo()
    },
    methods: {
      // 获取设备列表的方法
      async getStationInfo() {
        const {total,info} = await getStationInfo(this.queryParams)
        this.list = info
        this.total = total
      },
      // 切换页码
      changePage(newPage) {
        this.queryParams.page = newPage // 赋值新页码
        this.getDeviceList() // 查询数据
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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

  .title{
    text-align: center;
  }
  
  </style>
  