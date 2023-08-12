<template>
  <div class="FaultSatistics">
    <div class="faultpick">
      <h5>站点名</h5>&nbsp;&nbsp;
    <el-select v-model="condition1" placeholder="站点名" size="small">
      <el-option v-for="value in condition1Options" :key="value" :value="value" :label="value"></el-option>
    </el-select>
    &nbsp;&nbsp;
    <h5>时间</h5>&nbsp;&nbsp;
    <el-date-picker  v-model="value2" type="datetimerange"  align="right" size="small"  start-placeholder="开始日期"  end-placeholder="结束日期"  :default-time="['12:00:00', '08:00:00']">
    </el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="success" icon="el-icon-search" native-type="submit" size="small">查询</el-button>
      <el-button type="info" icon="el-icon-refresh"  @click="resetForm" size="small">重置</el-button>
      <el-button type="primary" icon="el-icon-share" native-type="submit" size="small">统计</el-button>
    </div>
    <div class="faulttable">
    <el-table :data="filteredData" style="width: 100%" :header-cell-style="{background:'#ebf1f6'}" :cell-style="{background:'#ebf1f6'}" border align="center">
      <el-table-column label="序号" prop="ID" align="center"></el-table-column>
      <el-table-column label="故障名" prop="name" width="1000px" align="center"></el-table-column>
      <el-table-column label="次数" prop="number" align="center"></el-table-column>
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
export default {
  data() {
    return {
      queryParams: {
                page: 1, // 当前页码
                pagesize: 10,
            },
            total: 0,
      // 模拟的数据
      filteredData: [
        { ID: 1, name: '轿厢上超差', number: 7 },
        // 添加其他数据
      ]
    };
  },
  computed: {
    filteredData() {
      let filteredData = this.data;
      if (this.query.name) {
        filteredData = filteredData.filter(item => item.name.includes(this.query.name));
      }
      if (this.query.age !== null) {
        filteredData = filteredData.filter(item => item.age === this.query.age);
      }
      if (this.query.gender) {
        filteredData = filteredData.filter(item => item.gender === this.query.gender);
      }
      // 添加其他查询条件的过滤逻辑

      return filteredData;
    }
  },
  methods: {
    submitForm() {
      // 提交表单，触发查询
    },
    resetForm() {
      // 重置表单
      this.query.name = '';
      this.query.age = null;
      this.query.gender = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.FaultSatistics{
  background-color:#ebf1f6;
    .faultpick{
          padding: 5px;
          display: flex;
          margin:10px ;
          align-items: center;
    }
    .faulttable{
      display: flex;
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