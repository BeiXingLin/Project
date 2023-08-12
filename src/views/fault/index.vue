<template>
  <div class="faultcontainer">
    <div class="faultpick">
    <h5>站点名</h5>&nbsp;&nbsp;
    <el-select v-model="condition1" placeholder="站点名" size="small">
      <el-option v-for="value in condition1Options" :key="value" :value="value" :label="value"></el-option>
    </el-select>
    &nbsp;&nbsp;
    <h5>时间</h5>&nbsp;&nbsp;
    <el-date-picker  v-model="value2" type="datetimerange"  align="right" size="small"  start-placeholder="开始日期"  end-placeholder="结束日期"  :default-time="['12:00:00', '08:00:00']">
    </el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
    <el-button type="success" icon="el-icon-search" @click="filterItems" size="small" >查找</el-button>
    <el-button type="info" icon="el-icon-refresh" @click="filterItems" size="small">重置</el-button>
    <el-button type="primary" icon="el-icon-share" @click="filterItems" size="small">导出</el-button>
    </div>
    <div class="faulttable">
    <el-table :data="filteredItems" border  :header-cell-style="{background:'#ebf1f6'}" :cell-style="{background:'#ebf1f6'}" align="center">
      <el-table-column prop="name" label="序号" align="center"></el-table-column>
      <el-table-column prop="condition1" label="工位名称" width="100px" align="center"></el-table-column>
      <el-table-column prop="condition2" label="故障描述" width="900px" align="center"></el-table-column>
      <el-table-column prop="condition3" label="故障时间" width="200px" align="center"></el-table-column>
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
      condition1: '',
      condition2: '',
      condition1Options: ['选项1', '选项2', '选项3'],
      condition2Options: ['选项A', '选项B', '选项C'],
      items: [
        { name: '苹果', condition1: '选项1', condition2: '选项A' },
        { name: '香蕉', condition1: '选项2', condition2: '选项B' },
        { name: '橙子', condition1: '选项1', condition2: '选项C' },
        { name: '葡萄', condition1: '选项3', condition2: '选项A' }
      ],
      filteredItems: []
    }
  },
  methods: {
    filterItems() {
      this.filteredItems = this.items.filter(item => {
        return (
          (this.condition1 === '' || item.condition1 === this.condition1) &&
          (this.condition2 === '' || item.condition2 === this.condition2)
        )
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.faultcontainer{
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