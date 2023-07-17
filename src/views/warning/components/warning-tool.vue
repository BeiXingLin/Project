<template>
  <div class="cont-top-box">
    <el-form label-width="100px">
      <el-form-item label="报警站点:">
        <el-checkbox-group v-model="departmentChecks" style="display:inline-block">
          <el-checkbox v-for="item in stationList" :key="item" :label="item" @change="checkChange">{{ item}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="时间:">
        <el-date-picker v-model="valuetime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="medium" @change="submitDateTime()" style="margin-right:30px">
      </el-date-picker>
      </el-form-item>
      <el-form-item label="操作:">
        <el-button size="mini" type="primary" @click="" icon="el-icon-search">查找</el-button>
        <el-button size="mini" type="warning" @click="" icon="el-icon-brush">清除</el-button>
        <!-- <el-button size="mini" type="primary" @click="">导出</el-button> -->
      </el-form-item>
     </el-form> 
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'

export default {
  name: 'WarninglTool',
  data() {
    return {
      tips: {},
      keyword: '',
      stationList: ['1号堆垛机','1号提升机','2号堆垛机','2号提升机','3号堆垛机',],
      departmentChecks: [],
      socialSecurityChecks: [],
      providentFundChecks: [],
      cityList: ['北京', '上海', '深圳', '天津', '重庆', '珠海', '广州', '西安'],
      departmentList: []
    }
  },
  // created: function() {
  //   this.getCityList()
  //   this.getDepartment()
  // },
  methods: {
    // 获取城市
    // async getCityList() {
    //   // this.cityList = []
    // },
    // // 获取组织架构
    // async getDepartment() {
    //   this.departmentList = await getDepartment()
    // },
    // checkChange() {
    //   const selectParams = {
    //     'departmentChecks': this.departmentChecks,
    //     'socialSecurityChecks': this.socialSecurityChecks,
    //     'providentFundChecks': this.providentFundChecks
    //   }
    //   this.$parent.changeSelectParams && this.$parent.changeSelectParams(selectParams)
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-top-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 10px;
}

</style>
