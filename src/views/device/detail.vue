<template>
  <div class="dashboard-container">
    1231
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

