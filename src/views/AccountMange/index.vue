<template>
  <div class="AccountMange" @click="deleteId=null">
    <div class="header">
      <h4>账号管理</h4>
      <div class="collegeNmaeBox">
        <el-button size="small" icon="el-icon-plus" @click="dialogAdds()"></el-button>
        <el-button style="margin:0 10px;" size="small" icon="el-icon-delete"  @click="toggleSelection()"></el-button>
        <span class="spanName">角色：</span>     
          <el-select v-model="value_6" placeholder="请选择" style="width:150px">
             <el-option          
              :label="'全部'"
              :value="0"
            ></el-option>
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>    
          <el-input v-model="input_search" style="width:150px;margin:0 10px;" placeholder="账号"></el-input>           
          <el-button size="small" @click="search">查询</el-button>    
      </div>
      
    </div>
    <div class="content">
      <div class="tablesx">
        <el-table
          ref="multipleTable"
          stripe
          height="100%"
          :data="tableData"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="item in accountList"
            :key="item.name"
            :prop="item.props"
            :label="item.name"
          ></el-table-column>
          <el-table-column v-if="navjurisdiction()"  label="操作" width="100">
            <template slot-scope="scope" v-if="hideCaozuo(scope.row)" style="position: relative;">
          
               <div>
                    <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                    <div class="operate" v-if="scope.$index==deleteId">
                        <p v-if="isEdit==1" @click="handleEdit(scope.row)">编辑</p>
                        <p @click="handleDelete(scope.row)">删除</p>                                  
                    </div>
                </div>  
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
     <!-- 分页 -->
    <div class="pagexs">
         <div class="pagination_1">
          <el-pagination
      @size-change="handleSizeChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="10"
      layout="sizes,total"
      :total="total">
    </el-pagination>
    </div>
    <div class="pagination_2">
      <el-pagination
      background
       @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="prev, pager, next,jumper,slot"
      :total="total">
      <span style="margin-left:1%;"> <el-button style="border:1px solid #dcdfe6">确认</el-button></span>
    </el-pagination>
    </div>
     </div>
      <!-- <div></div> -->
    </div>
    <!--  table -->
    <!-- 新增弹框 -->
    <el-dialog :title="edit_5?'新增':'修改'" center @close="shutModal"  :visible.sync="dialogAdd" width="400px">
      <div class="addUser">
        <div v-if="edit_5">
          <span>角色</span>
          <el-select v-model="value" placeholder="请选择" 
          style="width:180px" @change="indexSelect">
            <el-option
              v-for="item in options_2"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div v-else>
           <span>角色</span>
           <span style="width:100px;">{{userName}}</span>
        </div>
        <div style="margin-top:15px;">
          <span>账号</span> 
            <el-input v-model="input_user" style="width:180px" placeholder="请输入内容"></el-input>
          </div>
          <div style="margin-top:15px;">
          <span>密码</span> 
            <el-input v-model="input_pwd" style="width:180px" placeholder="请输入内容"></el-input>
          </div>
           <div v-if="!edit_5" style="margin-top:15px;">
              <span style="color:#ccc;font-size:12px;width:100%;">密码传空，原密码不做修改！</span> 
          </div>
          <!-- 管辖范围 显示隐藏 -->
          <div v-if="addControl==1">
          <div style="height:250px;overflow: auto;">
              <div style="margin-top:30px;">管辖范围</div>
              <div style="margin-top:15px;" v-for="(item,index) in collegeControl" :key="index"> 
                  <el-select v-model="collegeControl[index].value" placeholder="学院" style="width:152px">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.college_name"
                    :value="item.college_id"
                  ></el-option>
                </el-select>
                <el-button size="small" style="background:rgba(226,226,226,1);color:#fff;border:1px solid rgba(226,226,226,1);margin-left:10px;" @click="adds_1">添加</el-button>
                <el-button v-if="index!=0" size="small" @click="add_detele_1(index)">删除</el-button>
              </div>             
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" v-if="edit_5" type="primary" @click="addUserIfo">确 定</el-button>
        <el-button size="small" v-else type="primary" @click="addUserIfo">确定</el-button>
        <el-button size="small" @click="dialogAdd = false">取 消</el-button>
      </div>
       </el-dialog>
    <!-- //编辑 -->
    <!-- 辅导员 -->
<!-- 宿管 -->
  </div>
</template>

<script>
import {
  queryUserManage,
  queryCollegeByName,
  addUserManage,
  deleteUserManage,
  updateUserManage
  } from '@/axios/api.js'
const item = {
  date: "2016-05-02",
  name: "王小虎",
  address: "上海市普陀区金沙江路 1518 弄"
};
export default {
  name: "RoleMange",
  components: {
  },
  data() {
    return {
      roleInfoId: null, //tab 表转换
      jurisdictional: true,  //管辖范围 显示隐藏
      tableId: [],
      names:'', // 下拉框是否禁用
      input_search: '',
      input_user: '',
      input_pwd:'',
      add_1:false,
      add_2:false,
      add_3:false,
      add_4:false,
      edit_1:false,
      edit_2:false,
      edit_3:false,
      edit_4:false,
      edit_5:true,
      dialogAdd: false,
      dialogEdit:false,
      dialogDormEdit:false,
      isEdit:1,
      addControl:1,//管辖范围显示
      input: "",
      userName:'',
      accountList: [
        { name: "角色", props: "roleInfoName" },
        { name: "账号", props: "userInfoName"},
        { name: "管辖范围", props: "manageRange" },
        { name: "对应人员", props: "userName" }
      ],
      // tableList: [],
      multipleSelection: [],
      tableData: [],
      dialogFormVisible: false, //权限设置
      dialogLook: false, // 查看
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options_2:[
        {label:'院系管理员',id:2,}, 
       {
        label:'系统管理员',
        id:1,
       },],
       options1:[
         {label:'系统管理员',id:1,}, 
         {label:'院系管理员',id:2,}, 
         {label:'辅导员',id:3,},
         {label:'宿管',id:4,}, 
       ],//全部角色
       collegeControl:[ {name:'',value:null,}],
      options2:[],//
      value:2,
      value_1: "",
      value_2: "",
      value_3: "",
      value_4: "",
      value_5: "",
      value_6:0,
      formLabelWidth: "120px",
      currentPage2: 1,
      pageNum:1,  //页码
      pageSize:10, //页数量
      total:0,
      roleInfoId:null,
      deleteId:null,
      collegeId:null,
      userInfoId:null,
      roleInfoMenu:[],
      roleId:null
    };
  },
   mounted () {
   this.list()
 },
 computed:{
      navjurisdiction(){
          return function(){
              if(this.roleId==1){
                  return true
              }
              else{
                  return this.roleInfoMenu[15].indexOf('16')==-1?false:true
              }
             
          }
      },
 },
 created(){

    queryCollegeByName({collegeName:'', pageNum:0,pageSize:0}).then(res=>{
      console.log('全部学院',res)
      if(res.status==200&&res.data.code==200){
              this.options2=res.data.data               
          }
      })
      this.roleInfoMenu=this.$store.state.roleInfoMenu
         let roleId=localStorage.getItem('roleId')  
            this.roleId=roleId
            if(this.roleInfoMenu.length<1){  
              if(roleId==1){
                       return
                   }                       
                queryMenuById({roleId}).then(res=>{     
                    console.log('权限菜单',res)                   
                    if(res.data.code==200&&res.data.data.roleInfoMenuMain!=null){                   
                            this.roleInfoMenu=res.data.data.roleInfoMenu==null?[]:res.data.data.roleInfoMenu
                            this.$store.commit('roleInfoMenus',res.data.data.roleInfoMenu)                                                    
                    }else{
                        this.$router.push('/hideIndex')
                    }
                })
                              
        }
 },
  methods: {
    // 分页
    //页数量
      handleSizeChange(val) {
        this.pageSize =val
        this.list()

      },
      // 页码
      handleCurrentChange(val) {
           this.pageNum =val
           this.list()
        },
        //tab列表请求
      list(){
        queryUserManage({
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            roleInfoName:this.value_6,
            userInfoName:this.input_search,
            })
            .then(res=>{
              if(res.status==200 && res.data.code==200){
                      console.log('账号列表',res)
                      this.total =res.data.data.total
                      this.tableData = res.data.data.list                    
                }
            })
      },
      //隐藏宿管和辅导员的操作
      hideCaozuo(row){
        // console.log(row)
        if(row.roleInfoId==3||row.roleInfoId==4){
          return false
        }else{
          return true
        }
      },
    //   多选表格删除userInfoName
     toggleSelection() {
       let phone=[],
            roleInfoId=[];
       if(this.multipleSelection.length<1){
          this.$message({message:'请选择你要删除的数据！'}); 
       }else{
         this.multipleSelection.forEach(data=>{
           phone.push(data.userInfoName)
           roleInfoId.push(data.roleInfoId)
         })
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
      
              deleteUserManage({
                  phone:phone.join(','),
                  roleInfoId :roleInfoId.join(',')
                  }).then(res=>{
    
                  if(res.status==200&&res.data.code==200){
                      this.list()                                                                         
                      this.$message({type: 'success',message: '删除成功!'});
                  }else{
                      this.$message({                                           
                          message: '删除失败'+res.data.msg
                      });
                  }
              })
              
          }) 
       }

      },
       //单个删除
    handleDelete(val){
      console.log(val)
       this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
             deleteUserManage({phone:val.userInfoName,roleInfoId:val.roleInfoId}).then(res=>{
               if(res.data.code===200){
                 this.$message({message:'删除成功',type:'success'}); 
                 this.list()
               }else{
                 this.$message({message:'删除失败 '+res.data.msg}); 
               }
             })
          }) 
    },
      //模态框消失
      shutModal(){
          this.input_user=''
          this.input_pwd=''
          this.collegeControl=[ {name:'',value:null,}]
         this.addControl=1 
         this.value=2 
      },
      //新增账号
      addUserIfo(){
        let userInfoName=/^\w{6,16}$/
        let phone=/^1[3456789]\d{9}$/
        if(!phone.test(this.input_user)){
          this.$message({message:'账号请输入11位手机号码'});         
        }
        
        else{
           if(this.value==1||this.roleInfoId==1){
             if(this.edit_5){
                if(!userInfoName.test(this.input_pwd)){
                  this.$message({message:'密码请输入6~16位字母、数字'}); 
                  return
                }
                this.addUserManages()
             }else{
               if(this.input_pwd!=''){
                    if(!userInfoName.test(this.input_pwd)){
                      this.$message({message:'密码请输入6~16位字母、数字'}); 
                      return
                    }else{
                      this.updateUserManages()
                    }
                }else{
                  this.updateUserManages()
                }
               console.log('编辑')
             }
          }else{
            if(this.collegeControl[0].value==null){
                 this.$message({message:'请选择管辖范围！'}); 
            }else{
              if(this.edit_5){
                if(!userInfoName.test(this.input_pwd)){
                  this.$message({message:'密码请输入6~16位字母、数字'}); 
                  return
                }
                this.addUserManages()
              }else{
                 if(this.input_pwd!=''){
                    if(!userInfoName.test(this.input_pwd)){
                      this.$message({message:'密码请输入6~16位字母、数字'}); 
                      return
                    }else{
                      this.updateUserManages()
                    }
                }else{
                  this.updateUserManages()
                }
                console.log('编辑')
              }
            }
          }
        }
     
      },
      //编辑保存
      updateUserManages(){
          let manageRange=[]
          this.collegeControl.forEach(data=>{
            if(data.value!=null){
              manageRange.push(data.value)
            }
        })
          this.dialogAdd=false
        
          updateUserManage({
          manageRange:this.value==1?'':manageRange.join(','),
          userInfoName:this.input_user,
          userName:this.input_pwd,
          userInfoId:this.userInfoId
        }).then(res=>{
          if(res.data.code==200){
               this.$message({message:'修改成功',type:'success'}); 
               this.list()
          }else{
            this.$message({message:'修改失败'+res.data.msg}); 
          }
        })
      },
      //新增账号接口
      addUserManages(){
         let manageRange=[]
          this.collegeControl.forEach(data=>{
            if(data.value!=null){
              manageRange.push(data.value)
            }
        })

          addUserManage({
          manageRange:this.value==1?'':manageRange.join(','),
          userInfoName:this.input_user,
          userName:this.input_pwd,
        }).then(res=>{
          console.log('新增账号',res)
          this.dialogAdd=false
          if(res.data.code==200){
               this.$message({message:'新增成功',type:'success'}); 
               this.list()
          }else{
            this.$message({message:'新增失败'+res.data.msg}); 
          }
        })
      },
    //选中的表格数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    //点击操作
     clickOperate(scope,row){
          console.log(scope,row)
          this.deleteId=scope.$index
          if(row.roleInfoId==3||row.roleInfoId==4){
            this.isEdit=2
          }else{
            this.isEdit=1
          }
      },
    // 弹出框 添加
    adds_1(){
        this.collegeControl.push({name:'',value:null})
    },
    add_detele_1(index) {
        this.collegeControl.splice(index,1)
    },
     //编辑collegeControl
    handleEdit(val){
      this.edit_5 =false
       this.dialogAdd =true
       this.roleInfoId=val.roleInfoId
       this.addControl=val.roleInfoId==1?2:1
       console.log(val)
        this.userName=val.roleInfoName
        this.input_user=val.userInfoName
        this.userInfoId=val.userInfoId
        if(val.roleInfoId==2){
          this.collegeControl=[]
          this.collegeId=val.collegeId
          this.userInfoId=val.userInfoId
          let collegeId=val.collegeId.split(',')
          collegeId.forEach((data)=>{
             this.collegeControl.push({name:'',value:Number(data)})
          })
          
        }

        // this.input_pwd=val
    },

    //弹出 下拉框的值
    indexSelect(val){
       console.log(val)
       if(val == '1'){
        this.addControl = 2
       } else{
        this.addControl =1
       }
     },
    indexSelect_1(val){
       console.log(val)
    },
    indexSelect_2(val){
       console.log(val)
    },
    indexSelect_3(val){
       console.log(val)
    },
    indexSelect_4(val){
       console.log(val)
    },
    //角色选择
    indexSelect_6(val){
         console.log(val)
     this.options.map(item=>{
      console.log(item.label)
        if(val == item.label){
          this.roleInfoId= item.value
        }
       return item
     })
     console.log(this.roleInfoId)
    },
    //查询
    search(){
      console.log(this.roleInfoId)
      this.list()
    },
    //新增
    dialogAdds( ){
    this.edit_5 =true
      this.names = ''
    this.dialogAdd =true
    },
   
  }
};
</script>
<style lang="scss" scoped>
@import "../../stylecss/commonStyle.scss";
.AccountMange {
  flex: 1;
  padding: 50px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  .header {
    min-height:120px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    padding:20px 10px 10px 0px;
    h4{
        color: $haedColor;
        border-left: 2px solid $bcgColor;
        padding-left: 10px;
    }
  }
  .collegeNmaeBox{
          display: flex;
          width: 100%;
          min-height:35px;
          align-items: center;
          padding: 5px 0;
         
        .collegeNmae2{
            margin-right: 10px;
            display: flex;
        }
        .spanName{
            color: $haedColor;
            font-size: 14px;
      }
    }
       
  .content {
    width:100%;
    flex: 1;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    .tablesx {
      flex: 1;
      overflow: auto;
      border-radius:15px 15px 0 0;
    }
   .operate{
        position:absolute;
        left:-20px;
        top: 0px;
        width:100%;
        min-height:60px;
        background: #fff;
        border-radius: 4px;
        z-index:9999;
        border: 1px solid #FAFAFA;
        cursor: pointer;
        p{
            line-height: 30px;
            text-align: center;               
            &:hover{
                background: $bcgColor;
                color: #fff;
            }
        }
    }
  }
}
//  .el-form-item__content {
//   margin-left: 0 !important;
// }
// .el-checkbox + .el-checkbox {
//   margin-left: 30px;
//   width: 110px;
// }
.bounced {
  height: 400px;
  overflow-y: auto;
  text-align: left;
}
.chakan {
  width: 150px;
  text-align: left;
  .user_description {
    position: relative;
    width: 360px;
    overflow: hidden;
    .description_1 {
      width: 120px;
      position: absolute;
      left: 0;
      top: 0;
    }
    .description_2 {
      margin-left: 60px;
    }
  }
}
// 弹框 新增
.addUser{
    text-align: left;
    width:100%;
    min-height: 250px;
    
 span{
     display: inline-block;
     width:60px;
     text-align: left;
 }
}
 .edit{
  display: flex;
  justify-content: flex-start;
  align-items: center;
   flex-wrap: wrap;
   span{
     display:inline-block; 
     width: 60px;
   }
    .edit_1{
    margin-bottom: 2%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

}
 .pagexs{
     z-index: 55;
     width: 100%;
    display: flex;
    align-items: center;
}
.pagination_2{
    margin: 0 auto;
}
</style>






