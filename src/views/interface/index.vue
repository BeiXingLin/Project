<template>
  <div class="task-container">
    <el-card class="box-card">
				<el-row :gutter="20">
					<el-col :span="6">
						选择站点
						<el-select v-model="project_id" placeholder="请选择对应站点">
							<el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="2">
						<!-- 添加接口的按钮 -->
						<el-button type="success" icon='el-icon-plus' @click='dialogCreate="true"'>新建接口</el-button>
					</el-col>
          <el-col :span="2">
						<!-- 删除接口的按钮 -->
						<el-button type="danger" icon='el-icon-edit' @click='dialogEdit="true"'>编辑接口</el-button>
					</el-col>
          <el-col :span="2">
						<!-- 删除接口的按钮 -->
						<el-button type="warning" icon='el-icon-delete' @click='dialogDel="true"'>删除接口</el-button>
					</el-col>
				</el-row>
				<!-- 接口列表页 -->
				<el-table :data="projectList" style="width: 100%;margin-bottom: 10px;">
					<el-table-column prop="id" label="ID" width="80" sortable>
					</el-table-column>
					<el-table-column prop="name" label="接口名" width="100" align="center">
					</el-table-column>
					<el-table-column prop="desc" label="描述信息" width="100" align="center">
					</el-table-column>
					<el-table-column prop="url" label="URL" width="280" align="center">
					</el-table-column>
					<el-table-column prop="type" label="接口类型" width="80" align="center">
					</el-table-column>
					<el-table-column prop="InParams" label="入参" width="280" align="center">
					</el-table-column>
					<el-table-column prop="OutParams" label="出参" width="280" align="center">
					</el-table-column>
					<el-table-column prop="provider" label="提供方" width="80" align="center">
					</el-table-column>
          <el-table-column prop="caller" label="调用方" width="80" align="center">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="proEdit(scope.row)">测试</el-button>
							<el-button size="mini" type="danger" @click="proDelete(scope.row.id)">删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 翻页管理 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="page" :page-sizes="[5, 10, 20, 30]" :page-size="size"
					layout="total, sizes, prev, pager, next, jumper" :total="count">
				</el-pagination>
			</el-card>
      <!-- 编辑接口弹窗 -->
      <!-- <el-dialog title="编辑接口" :visible.sync="dialogEdit">
			<el-form :model="editInterface" :rules="caseRules" ref='updateRef' label-width="80px">
				<el-form-item label="接口名" prop="name">
					<el-input v-model="editProject.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述信息" prop="desc">
					<el-input v-model="editProject.leader" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="URL" prop="url">
					<el-input v-model="editProject.tester" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="接口类型" prop="type">
					<el-input v-model="editProject.programmer" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="入参" prop="InParams">
					<el-input v-model="editProject.publish_app" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="出参" prop="OutParams">
					<el-input type="textarea" v-model="editProject.desc" autocomplete="off"></el-input>
				</el-form-item>
        <el-form-item label="提供方" prop="provider">
					<el-input v-model="editProject.publish_app" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="调用方" prop="caller">
					<el-input type="textarea" v-model="editProject.desc" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEdit = false">取 消</el-button>
				<el-button type="primary" @click="updateInterface">确 定</el-button>
			</div>
		</el-dialog> -->
    <!-- 新建接口弹窗-->
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
    <!-- 删除弹窗 -->
    <!-- <el-dialog :visible.sync="dialogDel"  ref='deleteRef'>
			<template slot='title'>
				<div style="text-align: center;width: 100%;font-size: 24px;">是否删除 ？</div>
			</template>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCreate = false">取 消</el-button>
				<el-button type="primary" @click="delInterface">确定</el-button>
			</div>
		</el-dialog> -->
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
