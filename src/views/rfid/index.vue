<template>
  <div class="task-container">
    <el-card class="box-card">
				<el-row :gutter="20">
					<el-col :span="6">
						选择RFID
						<el-select v-model="project_id" placeholder="RFID号">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
          <el-col :span="2.5">
						<el-button type="primary" icon='el-icon-search' @click='dialogCreate="true"'>连接</el-button>
					</el-col>
					<el-col :span="2.5">
						<el-button type="primary" icon='el-icon-search' @click='dialogCreate="true"'>读取</el-button>
					</el-col>
				</el-row>
				<el-table :data="projectList" style="width: 100%;margin-bottom: 10px;">
					<el-table-column prop="id" label="ID" width="400" sortable>
					</el-table-column>
					<el-table-column prop="name" label="RFID名称 " width="400" align="center">
					</el-table-column>
          <el-table-column prop="name" label="返回值 " width="400" align="center">
					</el-table-column>
				</el-table>
				
			</el-card>
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
</template>

<script>
export default {
  name: '',
  props: {},
  data () {
    return {
      newInterface:{}
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
  
</style>
