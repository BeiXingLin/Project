<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form ref="deviceForm" :model="deviceInfo" :rules="rules" label-width="220px">
          <!-- ID -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备序号" prop="ID">
                <el-input v-model="userInfo.username" size="mini" class="inputW" />
              </el-form-item>
            </el-col>

          </el-row>
          <!-- 设备名称 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备名称" prop="devicename">
                <!-- 工号是系统生成的  禁用这个组件-->
                <el-input v-model="userInfo.workNumber" disabled size="mini" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!--IP地址  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="IP地址" prop="IPAddress">
                <el-input
                  v-model="userInfo.mobile"
                  :disabled="!!$route.params.id"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备类型" prop="devicetype">
                <!-- 放置及联部门组件 会单独封装-->
                <!-- inputW样式会给到selectTree中 template第一层的组件 -->
                <select-tree v-model="userInfo.departmentId" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="通讯协议" prop="protocol">
                <el-select v-model="userInfo.formOfEmployment" size="mini" class="inputW">
                  <el-option label="正式" :value="1" />
                  <el-option label="非正式" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="设备状态" prop="status">
                <el-date-picker
                  v-model="userInfo.timeOfEntry"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="启用/停用" prop="isenable">
                <el-date-picker
                  v-model="userInfo.correctionTime"
                  size="mini"
                  type="date"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import SelectTree from './components/select-tree.vue'
import ImageUpload from './components/image-upload.vue'
// import { addEmployee, getEmployeeDetail, updateEmployee } from '@/api/employee'
import {checkdeviceInfo, getDeviceList} from '@/api/device'
export default {
  components: { SelectTree, ImageUpload },
  data() {
    return {
      deviceInfo: {
        ID: '', // 设备序号
        devicename: '', // 设备名称
        IPAddress: '', // IP地址
        devicetype: null, // 设备类型
        protocol: null, // 通讯协议
        status: '', // 设备状态
        isenable: '', // 启用/停用
      },
      rules: {
        devicename: [{ required: true, message: '请输入设备名称', trigger: 'blur' }, {
          min: 1, max: 4, message: '设备名称为1-14位'
        }],
        IPAddress: [{ required: true, message: '请输入IP地址', trigger: 'blur' }, {
        //   pattern 正则表达式
          pattern: /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/,
          message: 'IP地址格式不正确',
          trigger: 'blur'
        }],
        devicetype: [{ required: true, message: '请选择设备类型', trigger: 'blur' }],
        protocol: [{ required: true, message: '请选择通讯协议', trigger: 'blur' }],
        status: [{ required: true, message: '请选择设备状态', trigger: 'blur' }],
        isenable: [{ required: true, message: '请选择启用/停用', trigger: 'blur' }, {
          validator: (rule, value, callback) => {
            if (this.userInfo.timeOfEntry) {
              if (new Date(this.userInfo.timeOfEntry) > new Date(value)) {
                callback(new Error('xxxx'))
                return
              }
            }
            callback()
          }
        }]
      }

    }
  },
  created() {
    // 如何获取路由参数的中id
    // if (this.$route.params.id) { this.getEmployeeDetail() }
    console.log("路由参数为",this.$route.path)
    console.log("id为",this.$route.ID)
    this.$route.params.ID && this.getDeviceList()
  },
  methods: {
    async getDeviceList() {
      this.deviceInfo = await checkdeviceInfo(this.$route.params.ID)
    },
    saveData() {
      this.$refs.deviceForm.validate(async isOK => {
        if (isOK) {
          // 编辑模式
          if (this.$route.params.id) {
            // 编辑模式
            // await updateEmployee(this.userInfo)
            this.$message.success('更新员工成功')
          } else {
            // 新增模式
            // 校验通过
            // await addEmployee(this.userInfo)
            this.$message.success('新增员工成功')
          }
          this.$router.push('/employee')
        }
      })
    }
  }
}
</script>

  <style scoped lang="scss">
  .edit-form {
    background: #fff;
    padding: 20px;
    .inputW {
      width: 380px
    }
  }

  </style>

