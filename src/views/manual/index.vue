<template>
  <div class="task-container">
    <el-card class="box-card">
				<el-row :gutter="20">
					<el-col :span="6">
						设备名称
						<el-select v-model="project_id" placeholder="设备名">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
          <el-col :span="2.5">
						<el-button type="primary" icon='el-icon-search' @click='dialogCreate="true"'>连接</el-button>
					</el-col>
        </el-row>
        <br/>
          <el-row :gutter="20">
					<el-col :span="6">
						任务类型
						<el-select v-model="project_id" placeholder="任务类型">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
          
          <el-col :span="6">
						取货层：
						<el-select v-model="project_id" placeholder="取货层">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
          
          <el-col :span="6">
						取货列：
						<el-select v-model="project_id" placeholder="取货列">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
          <el-col :span="6">
						取货排：
						<el-select v-model="project_id" placeholder="取货排">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
          <br/>
          <el-col :span="6">
						卸货层：
						<el-select v-model="project_id" placeholder="卸货层">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
          <el-col :span="6">
						卸货列：
						<el-select v-model="project_id" placeholder="卸货列">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
         
          <el-col :span="6">
						卸货排：
						<el-select v-model="project_id" placeholder="卸货排">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
          <br/>
          <el-col :span="2.5">
						<el-button type="primary" icon='el-icon-search' @click='dialogCreate="true"'>执行</el-button>
					</el-col>
				</el-row>
			</el-card>
    <div>
      <el-card> 
        <el-form  label-width="80px" size='mini' >
				<el-form-item label="设备名称">
					<el-input v-model="dynamicValue" disabled></el-input>
				</el-form-item>
				<el-form-item label="状态" >
					<el-input v-model="dynamicValue" disabled></el-input>
				</el-form-item>
        <el-form-item label="任务类型">
					<el-input v-model="dynamicValue" disabled></el-input>
				</el-form-item>
				<el-form-item label="货叉位置">
					<el-input v-model="dynamicValue" disabled></el-input>
				</el-form-item>
				<el-form-item label="货叉占位" >
					<el-input v-model="dynamicValue" disabled></el-input>
				</el-form-item>
				<el-form-item label="取货坐标" >
					<el-input v-model="dynamicValue" disabled></el-input>
				</el-form-item>
				<el-form-item label="卸货坐标" >
					<el-input v-model="dynamicValue" disabled></el-input>
				</el-form-item>
        <el-form-item label="货叉左右库位">
					<el-input v-model="dynamicValue" disabled></el-input>
				</el-form-item>
			</el-form>
      </el-card>
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
