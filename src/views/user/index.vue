<template>
  <div class="User">
    <div class="userpick" >
    <h5>用户标识</h5>&nbsp;&nbsp;
    <el-select v-model="selectRole" placeholder="请选择用户标识" size="small">
      <el-option v-for="item in defaultrole" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
    &nbsp;&nbsp;
    <h5>状态</h5>&nbsp;&nbsp;
    <el-select v-model="selectStatus" placeholder="请选择状态" size="small">
      <el-option v-for="item in defaultstatus" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
    &nbsp;&nbsp;
    <el-button type="success" icon="el-icon-search" @click="searchUserBtn" size="small" >查找</el-button>
    <el-button type="info" icon="el-icon-refresh" @click="clearUserBtn" size="small">重置</el-button>
    <el-button type="primary" icon="el-icon-refresh" @click="AddUserBtn" size="small">新建用户</el-button>
  </div>
  <div class="usertable">
    <el-table :data="userlist"  border :header-cell-style="{background:'#ebf1f6'}" :cell-style="{background:'#ebf1f6'}" >
      <el-table-column :label="$t('station.ID')" header-align="center" >
        <template slot-scope="{ $index }">
        <span class="cell-center">{{ $index + 1 }}</span>
        </template>
      </el-table-column>
    <el-table-column prop="Name" :label= "$t('user.Name')"  header-align="center">
      <template v-slot="{row}">
        <span class="cell-center">{{ row.Name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="PassWord" :label="$t('user.Password')"  header-align="center" >
      <template slot-scope="scope">
      <span class="cell-center">{{ hidePassword(scope.row.PassWord) }}</span>
     </template></el-table-column>
    <el-table-column prop="Name" :label="$t('user.Role')"  header-align="center"  >
      <template v-slot="{row}"> 
        <span v-if="row.Name == 'admin'" class="cell-center">超级管理员</span>
        <span v-else  class="cell-center">普通用户</span>
        </template>
    </el-table-column>
    <el-table-column prop="Name" label="状态"  header-align="center">
      <template v-slot="{row}"> 
        <span v-if="row.Name == 'admin'" class="cell-center">启用</span>
        <span v-else >普通用户</span>
        </template>
    </el-table-column>
    <el-table-column fixed="right" :label="$t('user.Operation')"  header-align="center"  >
      <template v-slot="{row}">
        <el-button @click="EditUser(row.Name)" type="primary" size="small" >{{ $t('user.edit')}}</el-button>
        <el-button @click="DelUserBtn(row.Name)" type="danger" size="small" >{{ $t('user.del')}}</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
  <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pagesize"
            @current-change="changePage"
            @size-change="handleSizeChange"
            class="pagination-footer"
          />
    </el-row>
    <el-drawer  ref="drawer" :visible.sync="editUser" title="编辑用户" :before-close="handleClose" align=center style="font-style:20px;font-style: italic;font-weight:bold">
        <el-form :model='editUser' ref="editUserForm" label-width='70px'>
              <el-form-item label="用户名" v-for="(item, index) in list" :key="index">
                <el-input v-model='item.Name' style="width: 400px;"></el-input>
              </el-form-item> 
              <el-form-item label="密码" v-for="(item, index) in list" :key="index">
                <el-input v-model='item.PassWord' style="width: 400px;"></el-input>
              </el-form-item> 
              <el-form-item  label="状态" v-for="(item, index) in list" :key="index">
                <el-input v-model='item.Name' style="width: 400px;"></el-input>
              </el-form-item> 
        </el-form>
        <div class="drawerbutton">
        <el-button type="success"  @click="editUser = false" >确定</el-button>
        <el-button type="warning"  @click="editUser = false" >取消</el-button>
        </div>
    </el-drawer>
    <el-drawer ref="drawer" :visible.sync="addUser" title="新建用户" :before-close="handleClose" align=center style="font-style:20px;font-style: italic;font-weight:bold" >
      <el-form  ref="addUserForm" :model="newUser" label-width='70px'>
        <el-form-item label="用户名" prop="User">
          <el-input v-model="newUser.User" style="width: 400px;" ></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="PassWord">
          <el-input v-model="newUser.PassWord" type="password" style="width: 400px;"></el-input>
        </el-form-item>
      </el-form>
      <div class="drawerbutton">
      <el-button  type="success" @click="addUser=false">取消</el-button>
      <el-button type="success"  @click="AddUser">确定</el-button>
      </div>
    </el-drawer>
  </div>
  
</template>

<script>
import { getUserInfo ,addUser,deleteUser } from '@/api/user';
export default {
  name: '',
  props: {},
  data () {
    return {
      queryParams: {
        page: 1, // 当前页码
        pagesize: 10,
      },
      total: 0, // 记录设备的总数
      userlist:[],
      editUser:false,
      addUser:false,
      newUser:{
        User:'',
        PassWord:''
      },
      defaultrole:[
        {label:'超级管理员',value:'0'},
        {label:'管理员',value:'1'},
        {label:'用户',value:'2'}
      ],
      defaultstatus:[
      {label:'禁用',value:'0'},
      {label:'启用',value:'1'},
    ],
    selectRole:'',
    selectStatus:''
    }
  },
  components: {
    
  },
  computed: {
    
  },
  mounted() {
    
  },
  watch: {
    
  },
  methods: {
    async getUserInfo(){
      try{
      const Data = await getUserInfo()
      this.userlist=Data
      }
      catch(error){
          this.$message({type: 'warning',message: `访问GetUerInfo报错:${error}`})
        }
    },
    searchUserBtn(){
      console.log(this.selectRole)
      console.log(this.selectStatus)
      if(this.selectRole==''&&this.selectStatus==''){
        this.$message({type: 'info',message: `用户标识和状态均未选择:${this.selectRole},${this.selectStatus}`})
        this.getUserInfo()
      }else if(this.selectStatus==''){
        this.$message({type: 'info',message: `已选择用户标识:${this.selectRole},${this.selectStatus}`})
      }else{
        this.$message({type: 'info',message: `已选择状态:${this.selectStatus},${this.selectRole}`})
      }
      
    },
    async clearUserBtn(){
      this.selectRole=''
      this.selectStatus=''
    },
    AddUserBtn(){
      this.addUser=true
    },
    hidePassword(password) {
    // 将密码隐藏，例如用 * 替换
    return password.replace(/./g, '*');
    },
    async EditUser(){
    try{
      const Data = await getUserInfo()
      this.list =Data
      this.editUser=true
    }
    catch(error){
          this.$message({type: 'warning',message: `访问EditUser报错:${error}`})
        }
    },
    DelUserBtn(params){
      console.log(params)
        if(params!=='undefied')
        this.$confirm(`此操作将删除${params}用户, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delAction(params);
        }).catch(() => {
          this.cancelStart(params);        
        });
        else{
          this.$message({type: 'warning',message: `请选中要删除的用户`})
        }
    },
    async delAction(params){
      try{
        const Data=await deleteUser(params)
        if(Data==null){
          this.$message({type: 'success',message: `已成功删除${this.newUser.User}用户`})
        }else
        {
        this.$message({type: 'warning',message: `删除${this.newUser.User}用户失败`})
        }
        }
        catch(error){
          this.$message({type: 'warning',message: `访问DeleteUserInfo报错:${error}`})
        }
    },
    cancelStart(params) {
        this.$message({type: 'info',message: `已取消删除${params}用户`})
      },
    async AddUser(){
      try{
        const Data=await addUser(this.newUser)
        if(Data==null){
          this.$message({type: 'success',message: `已成功添加${this.newUser.User}用户`})
        }else
        {
        this.$message({type: 'warning',message: `添加${this.newUser.User}用户失败`})
        }
        }
        catch(error){
          this.$message({type: 'warning',message: `访问AddNewUserInfo报错:${error}`})
        }
    }
  },
  created () {
    
  },
}
</script>

<style lang="scss" scoped>
.User{
  background-color:#ebf1f6;
  .userpick{
  padding: 5px;
  display: flex;
  margin:10px ;
  align-items: center;
}
.usertable{
    flex: 1;
    padding: 20px;
}
.cell-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.pagination-footer{
        position: absolute;
        text-align: center;
        background-color:#ebf1f6;
        left: 0;
        bottom: 0;
        width: 100%;
      }
.drawerbutton{
      margin-top: 500px;
    }
}
</style>
