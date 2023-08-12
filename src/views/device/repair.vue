<template>
  <div class="repair">
    <div class="repairpicker">
      <h5>设备名称:</h5>
      &nbsp;
      <el-select v-model="dateValue" clearable placeholder="全部设备" size="medium" style="width: 150px;"  @change="typeSearch()">
      <el-option v-for="item in warningtype" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
      </el-select>
      &nbsp;&nbsp;
        <el-button size="mini" type="primary" icon="el-icon-search"   @click="">查询</el-button>
        <el-button size="mini" type="info"  icon="el-icon-refresh"   @click=""> 重置</el-button>
        <el-button type="info" size="mini" icon="el-icon-refresh-right" >刷新</el-button>
    </div>
    <div class="repairtable">
    <el-table :data="tableData" style="width: 100%"  :header-cell-style="{background:'#ebf1f6'}" :cell-style="{background:'#ebf1f6'}">
        <el-table-column prop="id" label="序号" width="180" align="center">
          <template slot-scope="{ $index }">
          <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop='name' label="设备名称" align="center"></el-table-column>
        <el-table-column prop='num' label="次数" align="center"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button @click="showDrawer = true" size="small" type="success">编辑</el-button>
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
    <el-drawer ref="drawer" :visible.sync="showDrawer" title="设备保养" :before-close="handleClose" align=center style="font-style:20px;font-style: italic;font-weight:bold">
          <el-form :model='tableData' label-width='70px'>
                        <el-form-item label='序号'>
                            <el-input v-model='tableData.id' style="width: 400px;"></el-input>
                        </el-form-item>
                        <el-form-item label='设备名'>
                            <el-input v-model='tableData.name' style="width: 400px;"></el-input>
                        </el-form-item>
                        <el-form-item label='次数'>
                            <el-input v-model='tableData.num' style="width: 400px;"></el-input>
                        </el-form-item>
          </el-form>
          <div class="drawerbutton">
          <el-button type="success" @click="$refs.drawer.closeDrawer()" style="width: 200px;">提交</el-button>
          <el-button type="success" @click="cancelForm" style="width: 200px;">取 消</el-button>
          </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  data () {
    return {
      tableData:[{id:0,name:"阻挡器",num:50}],
      showDrawer:false,
      queryParams: {
        page: 1, // 当前页码
        pagesize: 10,
      },
      total: 0, // 记录设备的总数
    }
  },
  components: {
    
  },
  computed: {
  
  },
  mounted() {
   
  },
  watch: {
    
  },
  methods: {
    cancelForm(){
      this.showDrawer=false
    },
    handleClose(done) {
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
  },
  created () {
    
  },
  mounted () {
    
  },
}
</script>

<style scoped>
.repair{
  background-color:#ebf1f6;
  .repairpicker{
      padding: 5px;
      display: flex;
      margin-left:10px ;
      align-items: center;
    }
  .repairtable{
      margin-top: 50px;
  }
  .pagination-footer{
        position: absolute;
        text-align: center;
        background-color:#ebf1f6;
        left: 0;
        bottom: 0;
        width: 100%;
      }
    .drawerbutton{
      margin-top: 500px;
    }
  }
</style>
