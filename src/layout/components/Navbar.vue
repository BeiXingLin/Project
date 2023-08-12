<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click" >
        <div class="avatar-wrapper">
          <span class="name">当前用户为：{{ name }}</span>&nbsp;&nbsp;
          <i class="el-icon-user-solid" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown" >
          <router-link to="/">
            <el-dropdown-item >
              <i class="el-icon-s-home"></i>
              {{$t('navbar.dashboard')}}
            </el-dropdown-item>
          </router-link>
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>
              <i class="el-icon-edit"></i>
              {{$t('navbar.updatepass')}}</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="logout">
            <i class="el-icon-close"></i>
            {{$t('navbar.logout')}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <LanguageSelect  class="language-select"/>
    <el-dialog width="500px" :title="$t('updatepassword.title')" :visible.sync="showDialog" @close="btnCancel" align="center">
      <el-form ref="passForm"  :model="passForm" :rules="rules" >
        <el-form-item :label="$t('updatepassword.oldPass')" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item :label="$t('updatepassword.newPass')" prop="newPassword">
          <el-input v-model="passForm.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item :label="$t('updatepassword.confirmPass')" prop="confirmPassword">
          <el-input v-model="passForm.confirmPassword" show-password size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="success" @click="btnOK">{{$t('updatepassword.confirm')}}</el-button>
          <el-button size="medium" type="success" @click="btnCancel">{{$t('updatepassword.cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import LanguageSelect from '@/layout/components/selectLang'
import Hamburger from '@/components/Hamburger'
import { updatePassword } from '@/api/user'
import { Notification } from 'element-ui'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    LanguageSelect
  },
  data() {
    return {
      showDialog: false, // 控制弹层的显示和隐藏
      passForm: {
        oldPassword: '', // 旧密码
        newPassword: '', // 新密码
        confirmPassword: '' // 确认密码字段
      },
      rules: {
        oldPassword: [{ required: true, message: this.$t('updatepassword.oldPasscheck'), trigger: 'blur' }], // 旧密码
        newPassword: [{ required: true, message: this.$t('updatepassword.newPasscheck'), trigger: 'blur' }, {
          trigger: 'blur',
          min: 6,
          max: 16,
          message: this.$t('updatepassword.newPasslength')
        }], // 新密码
        confirmPassword: [{ required: true, message: this.$t('updatepassword.confirmPasscheck'), trigger: 'blur' }, {
          trigger: 'blur',
          validator: (rule, value, callback) => {
            // value
            if (this.passForm.newPassword === value) {
              callback()
            } else {
              callback(new Error(this.$t('updatepassword.confirmPasslength')))
            }
          }
        }] // 确认密码字段
      }
    }
  },
  computed: {
    // 引入头像和用户名称
    ...mapGetters([
      'sidebar',
      'name'
    ])
  },
  methods: {
    updatePassword() {
      // 弹出层
      this.showDialog = true // 显示弹层
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // 调用退出登录的action
      await this.$store.dispatch('user/logout')
      Notification.success({ 
        title: 'success',message: "退出登录成功"
      })
      this.$router.push('/login')
    },
    // 确定
    btnOK() {
      this.$refs.passForm.validate(async isOK => {
        if (isOK) {
          // 调用接口
          console.log(this.passForm)
          await updatePassword(this.passForm)
          this.$message.success(this.$t('updatepassword.changeok'))
          this.btnCancel()
        }
      })
    },
    // 取消
    btnCancel() {
      this.$refs.passForm.resetFields() // 重置表单
      // 关闭弹层
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background:#ebf1f6;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .language-select{
    float: right;
    height: 100%;
    line-height: 60px;
    margin-right: 50px;
    font-size: 18px;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .el-icon-s-home .el-icon-edit .el-icon-close {
      font-size: 20px;
    }
    

    .avatar-container  {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .name {
          margin-right: 10px;
          font-size: 16px;
        }
        .el-icon-user-solid {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
