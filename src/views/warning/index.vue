<template>
  <div class="dataPicker">
    <div  class="picker">
      <el-select v-model="dateValue" clearable placeholder="全部时间" size="medium" style="margin: 0 30px 20px 0" @change="timeSearch()">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
      </el-select>
      <!-- <time-change></time-change> -->
      <el-date-picker v-model="valuetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium" @change="submitDateTime()" style="margin-right:30px">
      </el-date-picker>
      <el-select v-model="dateValue" clearable placeholder="全部类型" size="medium" style="margin: 0 30px 20px 0" @change="typeSearch()">
      <el-option v-for="item in warningtype" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
      </el-select>
      <div  class="but">
        <el-button size="medium" :span="6" type="success" icon="el-icon-search" round  @click=""> 搜索</el-button>
        <el-button size="medium" :span="6" type="danger"  icon="el-icon-delete" round  @click=""> 清空</el-button>
        <el-button size="medium" :span="6" type="success" icon="el-icon-share" round  @click=""> 导出</el-button>
    </div>
    </div>
    
    <div class="warningtable">
      <el-table >
          <el-table-column  label="序号" sortable />
          <el-table-column  label="故障站名" />
          <!-- <el-table-column  label="故障种类"  /> -->
          <el-table-column  label="故障信息"  />
          <el-table-column  label="故障时间" />
          
            <!-- <template v-slot="{ row }">
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
            </template> -->
          <!-- </el-table-column> -->

        </el-table> 
        <!-- 分页 -->
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination layout="total,prev, pager, next" :total="22" :current-page="1"  @current-change="" /> 
            <!-- layout="total,prev, pager, next"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage" -->
         
        </el-row> 
      </div>
  </div>
  
</template>

<script>
export default {
  name: '',
  props: {},
  data () {
    return {
      dateValue: "1", // 时间选择状态
            valuetime: [],
            options: [{
                value: '1',
                label: '全部时间'
            }, {
                value: '2',
                label: '最近一个月'
            }, {
                value: '3',
                label: '最近半年'
            }, {
                value: '4',
                label: '最近一年'
            }],
            warningtype: [{
                value: '1',
                label: '全部'
            }, {
                value: '2',
                label: '故障'
            }, {
                value: '3',
                label: '警告'
            }],
            // 获取列表查询参数对象
            queryInfo: {
                current: 1,
                size: 9,
                status: ['NOT_START', 'ANSWER_IN_PROGRESS', 'DATA_UNDER_REVIEW', 'REPORT']
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
    timeSearch() {
            console.log('22')
            switch (this.dateValue) {
                case "1":
                    // 开始时间
                    this.queryInfo.releaseDateFloor = ''
                    // 结束时间
                    this.queryInfo.releaseDateCeil = ''
                    break;
                case "2":
                    var m = new Date();
                    m.setMonth(m.getMonth() - 1);
                    this.queryInfo.releaseDateCeil = timeFormat(new Date())
                    this.queryInfo.releaseDateFloor = timeFormat(m)
                    break;
                case "3":
                    var m = new Date();
                    m.setMonth(m.getMonth() - 6);
                    this.queryInfo.releaseDateCeil = timeFormat(new Date())
                    this.queryInfo.releaseDateFloor = timeFormat(m)
                    break;
                case "4":
                    var y = new Date();
                    y.setFullYear(y.getFullYear() - 1);
                    this.queryInfo.releaseDateCeil = timeFormat(new Date())
                    this.queryInfo.releaseDateFloor = timeFormat(y)
                    break;
            }
            // 调用加载数据的函数
            this.getScreenList(this.queryInfo)
        },
        //时间选择器 搜索
        submitDateTime() {
            // console.log(this.valuetime, "valuetime")
            if (this.valuetime) {
                this.queryInfo.releaseDateFloor = timeFormat(this.valuetime[0])
                this.queryInfo.releaseDateCeil = timeFormat(this.valuetime[1])
                this.getScreenList(this.queryInfo)
                // console.log(Object.prototype.toString.call(this.queryInfo.releaseDateCeil), "类型类型")

            } else if (this.valuetime == null) {
                this.queryInfo.releaseDateFloor = ''
                this.queryInfo.releaseDateCeil = ''
                this.getScreenList(this.queryInfo)

            }
        },
    
  },
  created () {
    
  },
  mounted () {
    
  },
}
</script>

<style lang="scss" scoped>
  .dataPicker{
    padding: 30px;
    margin:10px ;
    .picker{
      padding: 30px;
      display: flex;
      margin:10px ;
    }
   
  }
</style>
