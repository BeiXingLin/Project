<template>
  <div class="dashboard">
    <div class="container">
      <!-- 内容 -->
      <div class="left">
        <div class="panel">
          <!-- 个人信息 -->
          <div class="user-info">
            <img v-if="avatar" class="avatar" :src="avatar" alt="">
            <span v-else class="username">{{ name?.charAt(0) }}</span>
            <div class="company-info">
              <div class="title">
                {{$t('dashboard.company')}}
              </div>
              <div class="depart">{{ name }} ｜ {{ company }}-{{ departmentName }}</div>
            </div>
          </div>
        </div>
          </div>
      </div>
    </div>
</template>

<script>
import CountTo from 'vue-count-to'
import { mapGetters } from 'vuex'
import { getDeviceList } from '@/api/device'
import {getUserInfo} from '@/api/user'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      queryParams: {
        page: 1, // 当前页码
        pagesize: 10,
      },
      timer: null,
      list:[]
    }
  },
  // 计算属性
  computed: {
    // 将getters中的四个属性映射到计算属性中- 指向
    ...mapGetters(['avatar', 'name', 'company', 'departmentName']),
    setStyle() {
      return function (roadName) {
	        return roadName==1 ? 'background-color: #00ff00' : (roadName==2 ? 'background-color: #ffff00':'background-color: #ff0000')
  }
 }

  },
  watch: {
    
  },
  destroyed(){
    clearInterval(this.timer);
    this.timer = null;
  },

  created() {
  
  },
  mounted() {
    this.timer = window.setInterval(() => {
        setTimeout(this.getDeviceList(), 0);
      }, 3000);
  },
  methods: {
    async getDeviceList() {
      const {total,info} = await getDeviceList(this.queryParams)
      this.list = info
      this.total = total
    },
    async getUserInfo() {
      const {info} = await getUserInfo()
      this.list = info
      this.total = total
    },
    
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  background: #f5f6f8;
  width: 100%;
  min-height: calc(100vh - 80px);

  .container {
    display: flex;
    .left {
      flex: 1;
      :nth-child(1) {
        margin-top: 0;
      }
    }
  
  .el-row {
      display:flex;
      flex-wrap: wrap;
    align-items: center;
  }
  .el-row  .el-card {
      min-width: 100%;
      height: 100%;
      margin-right: 20px;
      transition: all .5s;
  }
  .el-form-item {
      margin-bottom: 0 !important;
  }
  .pagination-container {
      margin-top: -3px;
      margin-bottom: 30px;
  }
  .box-card {
    // background-color:green;
    .header {
      position: relative;
      .label{
        padding: 0 3px;
        // background-color: #fdf0da;
        color:black;
      }
      .header-label {
        padding-left: 10px;
      }
      .card-header-tag-blue {
        position: absolute;
        width: 68px;
        height: 30px;
        top: -14px;
        right: -15px;
        background-repeat:no-repeat;
        background-image: url("../../assets/common/green.png");
        display: inline-block;
        
      }
      .card-header-tag-green {
        position: absolute;
        width: 68px;
        height: 30px;
        top: -14px;
        right: -15px;
        background-image: url("../../assets/common/blue.png");
        display: inline-block;
        background-repeat:no-repeat;
      }
    }
    .footer {
      font-size: 18px !important;
      background-color: rgb(245, 247, 251);
      display: flex;
      height: 50px;
      justify-content: space-evenly;
    }
    .card-label {
      color: black;
      margin-right: 8px;
      width: 70px;
      display: inline-block;
      margin-bottom: 5px;
    }
  }
    .panel {
      background-color: #fff;

      margin-top: 8px;
      padding: 20px;
      .panel-title {
        font-size: 16px;
        color: #383c4e;
        font-weight: 500;
      }
      // 用户信息样式
      .user-info {
        display: flex;
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background-color: #d9d9d9;
          line-height: 48px;
          text-align: center;
        }
         .username {
           width: 30px;
           height: 30px;
           text-align: center;
           line-height: 30px;
           border-radius: 50%;
           background: #04c9be;
           color: #fff;
           margin-right: 4px;
         }
        .company-info {
          margin-left: 10px;
          height: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            color: #383c4e;
            font-weight: 500;
            font-size: 16px;
            font-family: PingFang SC, PingFang SC-Medium;
            span {
              font-size: 12px;
              background: #f5f6f8;
              text-align: center;
              padding: 2px 8px;
              border-radius: 2px;
              color: #697086;
            }
          }
          .depart {
            font-size: 14px;
            color: #697086;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
