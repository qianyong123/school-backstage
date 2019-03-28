<template>
  <div class="RoleMange" @click="deleteId=null">
      <div class="header"><h4>角色管理</h4> </div>
      <div class="content">
        <div class="tablesx">
        <el-table
        stripe
        :data="tableData"
        style="width: 100%;"
       >
        <el-table-column
        prop="roleInfoName"
        label="角色名称"
         
        >
        </el-table-column>
        <el-table-column
        prop="roleInfoData"
        label="角色描述"
        >
        </el-table-column>
         <el-table-column 
         label="操作"
         v-if="navjurisdiction()"
         width="100">
      <template slot-scope="scope" style="position: relative;">
        <!-- <el-button
          size="small"
          @click="handleEdit(scope.row)">查看</el-button>
        <el-button
          size="small"
          type="primary"
          v-if="handleDelete2(scope.row)"
          @click="handleDelete(scope.row)">权限管理</el-button>
        <el-button
          size="small"
          v-if="scope.row.roleInfoId==1"
          @click="handleDelete3(scope.row)">权限查看</el-button> -->
            <div>
                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                <div class="operate" v-if="scope.$index==deleteId">
                    <p @click="handleEdit(scope.row)">查看</p>
                    <p v-if="handleDelete2(scope.row)" @click="handleDelete(scope.row)">权限管理</p>  
                    <p  v-if="scope.row.roleInfoId==1" @click="handleDelete3(scope.row)">权限查看</p>                                       
                </div>
            </div>
      </template>
    </el-table-column>
  </el-table>
  </div>
    <!-- 分页 -->
      <!-- <div class="pagex">
        <Paginations> </Paginations>
      </div> -->
          </div> <!--  table -->
            <!-- 弹出框 权限设置 -->
            <el-dialog title="角色权限" width="650px" @close="shutModal" center :visible.sync="dialogFormVisible">
                <div class="bounced">
          <el-form :model="form" style="height:100;width:100%;">
            <el-form-item :label-width="formLabelWidth"  style="border:none;border-bottom:1px solid #F3F3F3;">
                <div class="authority">
                    <el-checkbox v-model="index" style="width:110px;">首页</el-checkbox>
                    <!-- <el-checkbox-group v-model="checkList" @change='check_value($event)'>

                    </el-checkbox-group> -->
                </div>               
            </el-form-item>
            <!-- 归寝管理 -->
             <el-form-item :label-width="formLabelWidth"  style="border:none;">
                 <div class="authority">
                    <el-checkbox v-model="index2" style="width:110px;">归寝管理</el-checkbox>
                    <el-checkbox-group style="width:350px;" v-model="checkList1" @change='check_value_5_2($event)'>
                        <el-checkbox style="width:110px;" label="实时查寝"></el-checkbox>
                        <el-checkbox label="1">操作</el-checkbox>
                    </el-checkbox-group>
                 </div>
                
            </el-form-item>
              <el-form-item :label-width="formLabelWidth" style="border:none;">
                <el-checkbox-group v-model="checkList2" @change='check_value_5_2($event)'>
                <el-checkbox  label="归寝记录" style="visibility:hidden;width:110px;"></el-checkbox>
                <el-checkbox label="归寝记录"></el-checkbox>
                <el-checkbox label="2">操作</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
               <el-form-item :label-width="formLabelWidth" style="border-bottom:1px solid #F3F3F3;" @change='check_value_5_2($event)'>
                <el-checkbox-group v-model="checkList3" >
                <el-checkbox label="归寝记录" style="visibility:hidden;width:110px;"></el-checkbox>
                <el-checkbox label="归寝规则"></el-checkbox>
                <el-checkbox label="3">操作</el-checkbox>
             </el-checkbox-group>
              </el-form-item>
              <!-- 记录查询 -->
             <el-form-item :label-width="formLabelWidth" style="border:none;">
                 <div class="authority">
                    <el-checkbox v-model="index3" style="width:110px;">记录查询</el-checkbox>   
                    <el-checkbox-group v-model="checkList4" @change='check_value_5_2($event)'>
                        <el-checkbox style="width:110px;" label="出入记录"></el-checkbox>
    
                        <el-checkbox label="4">操作</el-checkbox>
                    </el-checkbox-group>                 
                 </div>
                
            </el-form-item>
             <el-form-item :label-width="formLabelWidth" style="border:none;padding-left:110px;">
                <el-checkbox-group v-model="checkList5" @change='check_value_5_2($event)'>
                <!-- <el-checkbox label="记录查询" style="visibility:hidden" ></el-checkbox> -->
                <el-checkbox style="width:110px;" label="访客记录"></el-checkbox>
                <el-checkbox label="5">操作</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
              <el-form-item :label-width="formLabelWidth" style="border:none;padding-left:110px;">
                <el-checkbox-group v-model="checkList6"  @change='check_value_5_2($event)'>
                <!-- <el-checkbox label="记录查询" style="visibility:hidden" ></el-checkbox> -->
                <el-checkbox style="width:110px;" label="报警管理"></el-checkbox>
                 <el-checkbox label="晚归"></el-checkbox>
                <el-checkbox style="width:220px;" label="6-1">操作</el-checkbox> 
                            
                 <el-checkbox style="width:220px;padding-left:110px;" label="未归"></el-checkbox>
                <el-checkbox label="6-2">操作</el-checkbox><br>
                
                 <el-checkbox style="width:220px;padding-left:110px;" label="无记录"></el-checkbox>
                <el-checkbox label="6-3">操作</el-checkbox><br>

               
                 <el-checkbox  style="width:220px;padding-left:110px;" label="连进连出"></el-checkbox>
                <el-checkbox label="6-4">操作</el-checkbox><br>
                
                 <el-checkbox  style="width:220px;padding-left:110px;" label="翻越"></el-checkbox><br>
                <!-- <el-checkbox label="6-5">操作</el-checkbox><br> -->
                 
                 <el-checkbox style="width:220px;padding-left:110px;" label="尾随"></el-checkbox><br>
                <!-- <el-checkbox label="操6-6">操作</el-checkbox><br> -->
                 
                 <el-checkbox style="width:220px;padding-left:110px;" label="黑名单"></el-checkbox>
                <el-checkbox label="6-5">操作</el-checkbox><br>
                  
                 <el-checkbox style="width:220px;padding-left:110px;" label="访客超时"></el-checkbox><br>
                <!-- <el-checkbox label="6-8">操作</el-checkbox><br> -->
                 
                 <el-checkbox style="width:220px;padding-left:110px;" label="设备异常"></el-checkbox><br>
                <!-- <el-checkbox label="6-9">操作</el-checkbox> -->
            </el-checkbox-group>
            </el-form-item>
             
             <el-form-item :label-width="formLabelWidth" style="border:none;padding-left:110px;">
                <el-checkbox-group v-model="checkList7" @change='check_value_5_2($event)'>
                <!-- <el-checkbox label="记录查询" style="visibility:hidden" ></el-checkbox> -->
                <el-checkbox style="width:110px;" label="申请记录" ></el-checkbox>
                <el-checkbox label="7">操作</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
             <el-form-item :label-width="formLabelWidth" style="border-bottom:1px solid #F3F3F3;padding-left:110px;">
                <el-checkbox-group v-model="checkList8" @change='check_value_5_2($event)'>
                <!-- <el-checkbox label="记录查询" style="visibility:hidden" ></el-checkbox> -->
                 <el-checkbox style="width:110px;" label="违纪记录"></el-checkbox>
                <el-checkbox label="8">操作</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
            <!-- 数据中心 -->
             <el-form-item :label-width="formLabelWidth" style="border:none;">
                 <div class="authority">
                    <el-checkbox style="width:110px;" v-model="index4">数据中心</el-checkbox>
                     <el-checkbox-group v-model="checkList9" @change='check_value_5_2($event)'>
                        <el-checkbox style="width:110px;" label="宿舍管理" ></el-checkbox>
                        <el-checkbox label="9">操作</el-checkbox>
                    </el-checkbox-group>
                 </div>
               
            </el-form-item>
             <el-form-item :label-width="formLabelWidth" style="border:none;">
                <el-checkbox-group v-model="checkList10" @change='check_value_5_2($event)'>
                <el-checkbox  label="记录查询" style="visibility:hidden;width:110px;" ></el-checkbox>
                <el-checkbox style="width:110px;" label="班级管理" ></el-checkbox>
                <el-checkbox label="10">操作</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
             <el-form-item :label-width="formLabelWidth" style="border:none;padding-left:110px;">
                <el-checkbox-group v-model="checkList11" @change='check_value_5_2($event)'>
                <!-- <el-checkbox label="记录查询" style="visibility:hidden;width:110px;" ></el-checkbox> -->
                <el-checkbox style="width:110px;" label="人员管理" ></el-checkbox>
                 <el-checkbox label="系统管理员"></el-checkbox>
                <el-checkbox label="11-6">操作</el-checkbox><br>
                
                 <!-- <el-checkbox style="width:220px;padding-left:110px;" label="其他"></el-checkbox>
                <el-checkbox label="11-5">操作</el-checkbox><br>

                 <el-checkbox style="width:220px;padding-left:110px;" label="黑名单库"></el-checkbox>
                <el-checkbox label="11-4">操作</el-checkbox><br> -->

                 <el-checkbox style="width:220px;padding-left:110px;" label="辅导员"></el-checkbox>
                <el-checkbox label="11-3">操作</el-checkbox><br>

                 <el-checkbox style="width:220px;padding-left:110px;" label="宿管"></el-checkbox>
                <el-checkbox label="11-2">操作</el-checkbox><br>

                 <el-checkbox style="width:220px;padding-left:110px;" label="学生"></el-checkbox>
                <el-checkbox label="11-1">操作</el-checkbox>             
            </el-checkbox-group>
            </el-form-item>
          
              <el-form-item :label-width="formLabelWidth" style="border:none;">
                <el-checkbox-group v-model="checkList12" @change='check_value_5_2($event)'>
                <el-checkbox label="记录查询" style="visibility:hidden;width:110px;" ></el-checkbox>
                <el-checkbox label="公告通知" ></el-checkbox>
                <el-checkbox label="12">操作</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
             <el-form-item :label-width="formLabelWidth" style="border:none;padding-left:110px;">
                <el-checkbox-group v-model="checkList13" @change='check_value_5_2($event)'>
                <el-checkbox style="width:110px;" label="设备管理" ></el-checkbox>
                 <el-checkbox label="赤眸"></el-checkbox>
                <el-checkbox label="13-1">操作</el-checkbox><br>

                 <el-checkbox style="width:220px;padding-left:110px;" label="闸机"></el-checkbox>
                <el-checkbox label="13-2">操作</el-checkbox><br>

                 <el-checkbox style="width:220px;padding-left:110px;" label="摄像头"></el-checkbox>
                <el-checkbox label="13-3">操作</el-checkbox><br>

                 <el-checkbox style="width:220px;padding-left:110px;" label="大屏"></el-checkbox>
                <el-checkbox label="13-4">操作</el-checkbox><br>

                 <el-checkbox style="width:220px;padding-left:110px;" label="固件更新"></el-checkbox>
                <el-checkbox label="13-5">操作</el-checkbox>
            </el-checkbox-group>
             </el-form-item> 
           
             <el-form-item :label-width="formLabelWidth" style="border-bottom:2px solid #F3F3F3;">
                <el-checkbox-group v-model="checkList14" @change='check_value_5_2($event)'>
                <el-checkbox label="记录查询" style="visibility:hidden;width:110px;" ></el-checkbox>
                 <el-checkbox label="快递站点"></el-checkbox>
                <el-checkbox label="14">操作</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
            <!-- //系统设置 -->
             <el-form-item :label-width="formLabelWidth" style="border:none;">
                 <div class="authority">
                    <el-checkbox style="width:110px;" v-model="index5">系统设置</el-checkbox>
                     <el-checkbox-group v-model="checkList15" @change='check_value_5_2($event)'>
                        <el-checkbox style="width:110px;" label="角色管理"></el-checkbox>
                        <el-checkbox label="15">操作</el-checkbox>
                    </el-checkbox-group>
                 </div>
                
            </el-form-item>
             <el-form-item :label-width="formLabelWidth" style="border:none;">
                <el-checkbox-group v-model="checkList16" @change='check_value_5_2($event)'>  
                     <el-checkbox label="记录查询" style="visibility:hidden;width:110px;" ></el-checkbox>            
                 <el-checkbox label="账号管理"></el-checkbox>
                <el-checkbox label="16">操作</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
             </el-form>
                </div>
            <div v-if="roleInfoId!=1" slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="updateMenus">确 定</el-button>
            <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
            </div>
            </el-dialog>
            <!-- 弹出框 查看设置 -->
           <el-dialog title="角色信息" :visible.sync="dialogLook" width="500px">
               <div class="chakan">
                <div style="height:30px;margin-bottom:20px;" class="user_description2"><p>角色名</p><p style="margin-left:25px;">{{names}}</p></div>
                <div class="user_description user_description2"><span class="description_1">角色描述</span><span class="description_2"><textarea style="padding:10px;" v-model="names2" rows="10" cols="42"></textarea> </span></div>
             </div>
            <div class="dialog-footer" style="margin-top:20px;">
                <el-button size="small" type="primary" @click="updateRoleInfoDatas">确 定</el-button>
                <el-button size="small" @click="dialogLook = false">取 消</el-button>
            </div>
            </el-dialog>
      </div>
</template>

<script>
import Paginations from '@/views/RoleMange/Paginations.vue'
import {queryAllRole,updateMenu,queryMenuById,updateRoleInfoData} from '@/axios/api.js'
const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
    export default {
        name:"RoleMange",
        components:{
        Paginations
        },
        data(){
            return{
                names: '', //查看框 name
                names2:'',
                //多选框
                checkList: [], //首页
                index:false,
                index2:false,
                index3:false,
                index4:false,
                index5:false,
                deleteId:null,
                //  roleInfoMenu:[],
                 //归寝管理
                checkList1:[],
                checkList2:[],
                checkList3:[],
                checkList4:[],
                checkList5:[],
                checkList6:[],
                checkList7:[],
                checkList8:[],
                checkList9:[],
                checkList10:[],
                checkList11:[],
                checkList12:[],
                checkList13:[],
                checkList14:[],
                checkList15:[],
                checkList16:[],
                //记录查询
              
                //数据中心
            
                //系统管理
            
                tableData: [],
                //二级菜单
                roleInfoMenu:[
                   
                ],
                roleId:null,
                //一级菜单
                roleInfoMenuMain:[],
                roleInfoId:0,
                 dialogFormVisible: false, //权限设置
                 dialogLook: false, // 查看
                   form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                    },
                    formLabelWidth: '120px',
            }
        },
        mounted(){
            this.queryAllRoles()
        },
        created(){
              this.roleInfoMenu=this.$store.state.roleInfoMenu
            let roleId=localStorage.getItem('roleId')  
                this.roleId=roleId
                console.log(this.roleInfoMenu)
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
        computed:{
              navjurisdiction(){
                return function(){
                    if(this.roleId==1){
                        return true
                    }
                    else{
                      
                        return this.roleInfoMenu[14].indexOf('15')==-1?false:true
                        // return true
                        
                    }
                    
                }
            },
        },
        methods:{
            //获取所有角色
            queryAllRoles(){
                queryAllRole().then(res=>{
                    console.log('角色',res)
                    if(res.data.code==200){
                        this.tableData=res.data.data
                    }
                })
            },
            //查看角色描述
           handleEdit (val) {
               this.dialogLook =true
               console.log(val)
               this.names =val.roleInfoName
               this.names2 =val.roleInfoData  
               this.roleInfoId=val.roleInfoId           
            },
            //修改角色描述
            updateRoleInfoDatas(){
                updateRoleInfoData({roleInfoData:this.names2,roleInfoId:this.roleInfoId}).then(res=>{
                     this.dialogLook =false
                    if(res.data.code==200){
                        this.$message({type: "success",message: "修改成功",})
                         this.queryAllRoles()
                    }else{
                        this.$message({message: "修改失败",})
                    }
                })
            },
            //保存权限
            updateMenus(){
                updateMenu({
                    roleInfoMenuMain:[this.index?1:2,this.index2?1:2,this.index3?1:2,this.index4?1:2,this.index5?1:2],
                    roleInfoId:this.roleInfoId,
                    roleInfoMenu:[
                        this.checkList1,
                        this.checkList2,
                        this.checkList3,
                        this.checkList4,
                        this.checkList5,
                        this.checkList6,
                        this.checkList7,
                        this.checkList8,
                        this.checkList9,
                        this.checkList10,
                        this.checkList11,
                        this.checkList12,
                        this.checkList13,
                        this.checkList14,
                        this.checkList15,
                        this.checkList16,
                    ],
                }).then(res=>{
                    console.log('编辑权限',res)
                    this.dialogFormVisible =false
                    if(res.data.code==200){
                         this.$message({type: "success",message: "修改成功",})
                    }else{
                         this.$message({message: "修改权限失败",})
                    }
                })
            },
            handleDelete3(val){
                this.dialogFormVisible =true 
               this.roleInfoId=val.roleInfoId
            },
            //点击操作
             clickOperate(scope,row){              
                this.deleteId=scope.$index            
            },
            shutModal(){
                this.index=false
                this.index2=false
                this.index3=false
                this.index4=false
                this.index5=false
                this.checkList1=[]
                this.checkList2=[]
                this.checkList3=[]
                this.checkList4=[]
                this.checkList5=[]
                this.checkList6=[]
                this.checkList7=[]
                this.checkList8=[]
                this.checkList9=[]
                this.checkList10=[]
                this.checkList11=[]
                this.checkList12=[]
                this.checkList13=[]
                this.checkList14=[]
                this.checkList15=[]
                this.checkList16=[]
            },
            //权限管理
             handleDelete (val) {
                console.log(val)
               this.dialogFormVisible =true 
               this.roleInfoId=val.roleInfoId
                
               queryMenuById({roleId:val.roleInfoId}).then(res=>{
                   console.log('获取权限菜单',res)                  
                   if(res.data.code==200&&res.data.data.roleInfoMenuMain!=null&&res.data.data.roleInfoMenu!=null){
                     let roleInfoId=res.data.data.roleInfoMenuMain.split(',')
                     this.index=roleInfoId[0]==1?true:false
                     this.index2=roleInfoId[1]==1?true:false
                     this.index3=roleInfoId[2]==1?true:false
                     this.index4=roleInfoId[3]==1?true:false
                     this.index5=roleInfoId[4]==1?true:false
                     this.checkList1=res.data.data.roleInfoMenu[0]
                     this.checkList2=res.data.data.roleInfoMenu[1]
                     this.checkList3=res.data.data.roleInfoMenu[2]
                     this.checkList4=res.data.data.roleInfoMenu[3]
                     this.checkList5=res.data.data.roleInfoMenu[4]
                     this.checkList6=res.data.data.roleInfoMenu[5]
                     this.checkList7=res.data.data.roleInfoMenu[6]
                     this.checkList8=res.data.data.roleInfoMenu[7]
                     this.checkList9=res.data.data.roleInfoMenu[8]
                     this.checkList10=res.data.data.roleInfoMenu[9]
                     this.checkList11=res.data.data.roleInfoMenu[10]
                     this.checkList12=res.data.data.roleInfoMenu[11]
                     this.checkList13=res.data.data.roleInfoMenu[12]
                     this.checkList14=res.data.data.roleInfoMenu[13]
                     this.checkList15=res.data.data.roleInfoMenu[14]
                     this.checkList16=res.data.data.roleInfoMenu[15]
                   }
               })
            },
            check_value_5_2(val){
                console.log(val)
            },
            handleDelete2(item){
                
                if(item.roleInfoId==5||item.roleInfoId==1){
                    return false
                }
                else if(item.roleInfoId==6){
                    return false
                }
                else{
                    return true
                }
            },
           
           
        },
       
    }
</script>
<style lang="scss" scoped>
@import "@/stylecss/commonStyle.scss";
    .RoleMange{
        flex: 1;
        padding:50px 20px 20px 20px;
        display: flex;
        flex-direction: column;
        .authority{
            display: flex;
        }
        .header{
                width: 100%;
                height: 50px;
                display: flex;
                align-items: center;                                            
                h4{
                    color: $haedColor;
                    border-left: 2px solid $bcgColor;
                    padding-left: 10px;
                }
            }
            .content{
                height: 100%;
                display: flex;
                flex-direction: column;
                width: 100%;
                // padding-bottom: 50px;
                border-radius: 10px;
                background: #FFFFFF;
                position: relative;
                overflow: hidden;
                .tablesx{
                    flex: 1;
                    padding:0 20px;
                    border-radius:15px 15px 0 0;
                    overflow-y: auto;
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
   
    .el-checkbox+.el-checkbox{
            margin-left: 30px;
            width: 110px;
    }
    .bounced{
            height:600px;
            overflow-y: auto;
            text-align: left;
        }
    .chakan{
        width:100%;
        text-align: left;
        .user_description{
            position: relative;
            width: 360px;
            overflow: hidden;
          .description_1{
              display: inline-block;
              width: 120px;
              position: absolute;
              left: 0;
              top: 0;
          }
          .description_2{
              padding-left:70px;
          }
        }
        .user_description2{
            display: flex;
            align-items: center;
            width: 100%;
        }
    }
</style>






