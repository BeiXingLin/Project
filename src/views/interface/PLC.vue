<template>
  <div>
  <div class="PLC-container">
    <el-card class="box-card">
      <el-button size="middle" type="primary" @click="proEdit(scope.row)">{{ $t('interface.AddPLC')}}</el-button>
			<el-button size="middle" type="danger" @click="proDelete(scope.row.id)">{{$t('interface.DelPLC')}}</el-button>
			<el-table :data="projectList" style="width: 100%;margin-bottom: 10px;">
					<el-table-column prop="id" label="ID" width="80" sortable>
					</el-table-column>
					<el-table-column prop="PLCname" :label="$t('interface.PLCname')" width="100" align="center">
					</el-table-column>
					<el-table-column prop="PLCType" :label="$t('interface.PLCType')" width="100" align="center">
					</el-table-column>
					<el-table-column prop="protocol" :label="$t('interface.protocol')" width="100" align="center">
					</el-table-column>
					<el-table-column prop="operation" :label="$t('interface.operation')" width="80" align="center">
            <template v-slot="{ row }">
              <el-button size="mini" type="text" @click="btnStart(row.id,row.Name)" :disabled="isButtonEnabled">{{$t('station.Start') }}</el-button>
              <el-button size="mini" type="text" @click="btnStop(row.id,row.Name)" :disabled="isButtonEnabled">{{$t('station.Stop') }}</el-button>
              <el-button size="mini" type="text" @click="btnCheck(row.id)" :disabled="isButtonEnabled">{{$t('station.Detail') }}</el-button>
              </template>
          </el-table-column>
					<el-table-column prop="PLCstatus" :label="$t('interface.PLCstatus')" width="100" align="center">
					</el-table-column>
					<el-table-column prop="remark" :label="$t('interface.remark')" width="100" align="center">
					</el-table-column>
			</el-table>
      <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      ></el-pagination>
    </div>
    </el-card>  
        <div v-if="show">
		    <el-card class="right-card">
        <el-table :data="projectList" border>
					<el-table-column prop="DBlable" :label="$t('interface.DBlable')" width="50" >
					</el-table-column>
					<el-table-column prop="DBNo" :label="$t('interface.DBNo')" width="80" align="center">
					</el-table-column>
					<el-table-column prop="Datatype" :label="$t('interface.Datatype')" width="50" align="center">
					</el-table-column>
					<el-table-column prop="Dataoffset" :label="$t('interface.protocol')" width="50" align="center">
					</el-table-column>
					<el-table-column prop="method" :label="$t('interface.method')" width="50" align="center">
          </el-table-column>
					<el-table-column prop="Length" :label="$t('interface.Length')" width="50" align="center">
					</el-table-column>
          <el-table-column prop="Bit" :label="$t('interface.Bit')" width="50" align="center">
					</el-table-column>
					<el-table-column prop="Remark" :label="$t('interface.Remark')" width="50" align="center">
					</el-table-column>
			  </el-table>
        </el-card>
      </div>
      <div v-else>
        <p class="detail"></p>
      </div>
    
    <el-dialog :visible.sync="dialogCreate" >
			<template slot='title'>
				<div style="text-align: center;width: 100%;font-size: 24px;">新建接口</div>
			</template>
			<el-form  label-width="80px" size='mini' >
				<el-form-item label="接口名称">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="描述信息" >
					<el-input ></el-input>
				</el-form-item>
				<el-form-item label="URL">
					<el-input ></el-input>
				</el-form-item>
				<el-form-item label="入参" >
					<el-input ></el-input>
				</el-form-item>
				<el-form-item label="出参" >
					<el-input ></el-input>
				</el-form-item>
				<el-form-item label="提供方" >
					<el-input ></el-input>
				</el-form-item>
        <el-form-item label="调用方">
					<el-input ></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="">取 消</el-button>
				<el-button type="primary" @click="">提 交</el-button>
			</div>
		</el-dialog>
  </div>
</div>
</template>

<script>
export default {
  name: '',
  props: {},
  data () {
    return {
      newInterface:{},
      isButtonEnabled:false,
      show:false
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
    
  },
  created () {
    
  },
  mounted () {
    
  },
}
</script>

<style scoped>
  .PLC-container{
    
    align-items: stretch; /* 使box-card和其他内容的高度相同 */
  }
  .box-card  {
  width: 800px;
  height: 100vh;
  float: left; /* 将box-card浮动到左侧 */
  margin: 0; /*设置右边距，调整与页面边缘之间的距离 */
  flex: 1
  }
  .right-card{
    height: 100vh;
    float:right;
    width: 500px;
  }
  .right-panel {
    float: right;
    margin: 0;
  }
  .pagination-container{
    height: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail{
    text-align: center;
  }
</style>
