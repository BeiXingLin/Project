<template>
  <div class="login-container">
    <img src="../../assets/common/loginin.jpg" style="width: 100%;" />
      <h1><span class="header">瑞佑AWCS系统</span></h1>
      <el-card  class="login-card" >
        <h2 align="center" style="color: skyblue;">用户登录</h2>
        <el-form ref="form" :model="loginForm" :rules="loginRules"  class="login-form">
          <el-form-item :rules="loginRules.User" >
            <el-input class="user-input" v-model="loginForm.User" :placeholder="$t('login.usernameplaceholder')" />
          </el-form-item>
          <el-form-item  :rules="loginRules.PassWord" >
            <el-input class="password-input" v-model="loginForm.PassWord" show-password :placeholder="$t('login.passwordplaceholder')" />
          </el-form-item>
          <el-form-item >
            <el-button style="width: 90px;"  type="success" icon="el-icon-thumb"  @click="login" class="loginbutton">{{ $t('login.button') }}</el-button>
            <el-button style="width: 90px;"  type="success"  icon="el-icon-refresh" @click="resetForm" class="resetbutton">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <h4><span class="languange">{{ $t('login.currentLanguage') }}: {{ $i18n.locale === 'zh' ? $t('login.zh') : $t('login.en') }}</span></h4>
      <h4><span class="footer">Copyright © 2022-2023 安徽瑞佑 版权所有</span></h4>
  </div>
</template>
<script>
import { Notification } from 'element-ui'
export default {
  name: 'Login',
  data() {
    return {
      currentLanguage:'' ,
      loginForm: {
        User: '',
        PassWord: ''
      },
      loginRules: {
        User: [{
          required: true,
          message: this.$t('login.usernameplaceholder'),
          trigger: 'blur'
        }, {
          pattern: /^[A-Za-z]+$/,
          message: this.$t('login.usernamecheck'),
          trigger: 'blur'

        }],
        PassWord: [{
          required: true,
          message: this.$t('login.passwordplaceholder'),
          trigger: 'blur'
        }, {
          min: 5,
          max: 16,
          message: this.$t('login.passwordcheck'),
          trigger: 'blur'
        }],
      }
    }
  },
  watch: {
  },
  created () {
    this.currentLanguage = this.$i18n.locale
  },
  methods: {
    login() {
      if (!this.loginForm.User || !this.loginForm.PassWord) {
        console.log("传入用户名/密码为空",this.loginForm);
        Notification.warning({
          title: 'warning',
          message: '用户名/密码不能为空'
        })
        return; // 如果用户名或密码为空，则不进行后续操作
      }
      this.$refs.form.validate(async(isOK) => {
        if (isOK) {
          console.log("传入用户名/密码为",this.loginForm)
          await this.$store.dispatch('user/login', this.loginForm)
          Notification.success({
          title: 'success',
          message: '用户登录成功'
        })
          this.$router.push('/')
        }
      })
    },
    resetForm(){
      console.log('清除前',this.loginForm)
      this.loginForm={
        User: '',
        PassWord: ''
      }
      console.log('清除后',this.loginForm)
    }

  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .header{
    position: absolute;
    top: 20%;
    left: 80%;
    transform: translate(-50%, -50%);
    text-align:center;
    color:black;
  }
  .login-card{
    position: absolute;
    top: 45%;
    left: 80%;
    transform: translate(-50%, -50%);
    width: 400px; 
    background-color:#ebf1f6 ;
    .user-input .el-input__inner ,
    .password-input .el-input__inner{
      background-color:#ebf1f6 ;
    }
    .loginbutton{
      margin-left: 85px;
      text-align: center;
    }
    .resetbutton{
      margin-right: 15px;
      text-align: center;
    }
  }
  .languange{
    position: absolute;
    top: 70%;
    left: 80%;
    transform: translate(-50%, -50%);
    text-align:center;
    
  }
  .footer{
    position: absolute;
    top: 75%;
    left: 80%;
    transform: translate(-50%, -50%);
    text-align:center;
  
  }
}

</style>
