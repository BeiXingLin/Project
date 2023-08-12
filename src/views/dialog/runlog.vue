<template>
  <div class="container">
    <div class="logpicker">
      <h5>查询站点:</h5>
      <el-select v-model="dateValue" clearable placeholder="全部站点" size="medium" style="width: 150px;"  @change="typeSearch()">
      <el-option v-for="item in warningtype" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
      </el-select>
      &nbsp;&nbsp;
      <h5>时间范围:</h5>
      <el-date-picker v-model="valuetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium" @change="submitDateTime()">
      </el-date-picker>
      &nbsp;&nbsp;
      <h5>类型:</h5>
      <el-select v-model="dateValue" clearable placeholder="全部类型" size="medium" style="width: 150px;" @change="typeSearch()">
      <el-option v-for="item in warningtype" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
      </el-select>
      &nbsp;&nbsp;
      <el-button size="mini" type="primary" icon="el-icon-search"   @click="">查询</el-button>
      <el-button size="mini" type="info"  icon="el-icon-refresh"   @click=""> 重置</el-button>
      <el-button size="mini" type="primary" icon="el-icon-share"   @click="exportExcel"> 导出</el-button>
      <el-button type="info" size="mini" icon="el-icon-refresh-right" @click="AnalysisLog()" >统计</el-button>
    </div>
    <div class="dialogtable">
        <el-table :data="tableData"  :row-class-name="tableRowClassName" border :header-cell-style="{background:'#ebf1f6'}" :cell-style="{background:'#ebf1f6'}">
          <el-table-column :label="$t('station.ID')"  align="center">
              <template slot-scope="{ $index }">
              <span>{{ $index + 1 }}</span>
              </template>
          </el-table-column>
          <el-table-column prop="name" label="工位名称" width="300" align="center"></el-table-column>
          <el-table-column prop="type" label="日志类型"  width="240" align="center"> </el-table-column>
          <el-table-column prop="decription" label="描述" width="320" align="center"></el-table-column>
          <el-table-column prop="time" label="时间" width="300" align="center"> </el-table-column>
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
</div>
</template>

<script>
import * as XLSX from 'xlsx'
  export default {
    components: { },
    data() {
      return {
        tableData: [{'name':'堆垛机1','type':'堆垛机1','decription':'decription','time':'堆垛机1'}],
        queryParams: {
                page: 1, // 当前页码
                pagesize: 10,
            },
            total: 0,
      }
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      AnalysisLog(){
        this.$router.push('/dialog/zhexiantu');
      },
      //导出el-table中的数据为Excel文件
      exportExcel() {
      const excelData = this.getExcelData(); // 获取要导出的表格数据
      console.log(excelData)
      const worksheet = XLSX.utils.json_to_sheet(excelData); // 将数据转化为worksheet对象
      const workbook = XLSX.utils.book_new(); // 创建一个新的workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // 将worksheet添加到workbook
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); // 将workbook转化为Excel的二进制数据
      this.saveAsExcelFile(excelBuffer, '运行日志.xlsx'); // 将二进制数据保存为Excel文件
    },
    getExcelData(){
      return this.tableData.map(item => ({
        工位名称: item.name,
        日志类型: item.type,
        描述: item.decription,
        时间: item.time,
      }));
    },
    saveAsExcelFile(buffer, fileName) {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(url);
    },
    }
  }
</script>

<style>
.container{
  background-color:#ebf1f6;
  .logpicker{
    display: flex;
    align-items: center;
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