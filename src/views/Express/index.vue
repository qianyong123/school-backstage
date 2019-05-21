<template>
  <div class="Express" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>快递站点</h4>
           <div class="collegeNmaeBox">                          
                <el-button size="small" icon="el-icon-plus"  @click="addRecord()"></el-button>  
                <el-button size="small" icon="el-icon-delete"  @click="deletes"></el-button>              
                   
            </div> 
        </div>
        <div class="ClassManage-main">
            <div class="tableBox">
                <el-table
                    ref="multipleTable"
                    v-loading="loading"               
                     element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    :data="tableData"
                    tooltip-effect="dark"
                    stripe                          
                    height="100%"
                    @selection-change="handleSelectionChange"
                    style="width:100%">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    v-for="(item,index) in dataHeader"
                    :key="index"
                    :prop="item.props"
                    :label="item.name"
                   >                 
                    </el-table-column>
                   
                   
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="80">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="handleEdit(scope.row)">编辑</p>
                                    <p @click="handleDelete(scope.row)">删除</p>                                  
                                </div>
                            </div>                          
                        </template>
                    </el-table-column>
                </el-table>
                
            </div>
            <paginations     
            @handleCurrentChange='handleCurrentChange'
            :total='total'
            ></paginations>
        </div>
        <!-- 新增 -->
       <el-dialog
        :title="popupTitle"
        :visible.sync="newVisible"
        width="350px"
        center>
        <div class="newMsg">
            <div class="div">
                <span class="span">站点名称</span>
                <el-input v-model="value1"></el-input>
            </div>
            <div class="div">
                <span class="span">所在位置</span>
                <el-input v-model="value2"></el-input>
            </div>
            <div class="div">
                <span class="span">联系方式</span>
                <el-input type="number" v-model="value3"></el-input>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button v-if="popupTitle=='新增'" size="small" type="primary" @click="newSave">确定</el-button>
            <el-button v-else size="small" type="primary" @click="newSave2">确定</el-button>
            <el-button size="small" @click="newVisible = false">取消</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import Paginations from './Paginations'
import {formatDate} from '../../js/date.js'
import bus from '../../js/bus.js'
import { arealist_2,floorList} from '@/axios/api1'
import { 
 queryMenuById,
 addExpressSite,
 queryExpressSiteAll,
 deleteExpressSiteById,
 updateExpressSite
} from '@/axios/api'

export default {
    name:"ClassManage",
    components:{
        Paginations,
    },
    data(){
        return{
            activeName:"调寝",
            activeIndex:'',
            loading:false,
            newName:'',
            total:0,
            id:'student',
            pageSize:10,
            pageNum:1,
            allcollege:false,
            deleteId:null,//表格操作
            newVisible:false,//新增弹框
            setVisible:false,//设置弹框   
            fileList:[],//导入   
            studentInfoMsg:{},       
            //查询
            Select1:'',         
           value1:'',
           value2:'',
           value3:'',                                
            dataHeader:[
                 {name:'站点名称',props:'expressSiteName'},      
                {name:'站点位置',props:'expressSitePosition'},
                {name:'联系方式',props:'expressSitePhone'},
            ],//表格头部                         
            value: '',
            multipleSelection: [], //表格多选
            tableData: [                   
                   
            ],
            roleInfoMenu:[],
            roleId:null,
            popupTitle:'',
            expressSiteId:0
        }
    },
        filters:{
           
        },
        mounted() {        
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })          
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
            this.queryExpressSiteAlls()
              console.log(this.roleInfoMenu)
               let roleId=localStorage.getItem('roleId')  
                this.roleId=roleId
               if(this.roleInfoMenu.length<1){ 
                   if(roleId==1){
                       return
                   }                        
                    queryMenuById({roleId}).then(res=>{     
                        console.log('权限菜单')                   
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
           
            navjurisdiction2(){
                return function(){
                    if(this.roleId==1){
                        return true
                    }
                     else if(this.roleInfoMenu.length<1){
                        return true
                    }
                    else{
                        return this.roleInfoMenu[13].indexOf('14')==-1?false:true
                    }
                    
                }
            }
        },
         watch: {
            
         },      
        methods: {
                              
            //多删除
            deletes(){
                if(this.multipleSelection.length<1){
                     this.$message({
                            message: '请选择需要删除的信息!'
                        });
                }else{
                    let expressSiteId=[]
                    this.multipleSelection.forEach(data=>{
                        expressSiteId.push(data.expressSiteId)
                    })
                    console.log(expressSiteId)
                   this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',           
                    }).then(() => {
                         deleteExpressSiteById({expressSiteId:expressSiteId.join(',')}).then(res=>{
                              if(res.data.code==200){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                                this.queryExpressSiteAlls()
                                }else{
                                    this.$message({
                                        message: '删除失败 '+res.data.msg
                                    });
                                }
                            })
                    }) 
                }
            },
            //查询站点
            queryExpressSiteAlls(){
                this.loading=true
                queryExpressSiteAll({pageSize:this.pageSize,pageNum:this.pageNum}).then(res=>{
                     this.loading=false
                     if(res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total
                    }else{
                        this.$message({
                            message: '查询失败 '+res.data.msg
                        });
                    }
                })
            },
            //新增
            addRecord(){         
              this.newVisible=true
              this.popupTitle='新增'
              this.value1=''
              this.value2=''
              this.value3=''
            }, 
            //新增保存
            newSave(){
                let phone=/^1[3456789]\d{9}$/;
                if(this.value1==''){
                    this.$message({
                            message:'请输入站点名称'
                        });  
                }
                else if(this.value3!=''&&!phone.test(this.value3)){
                    this.$message({
                            message:'请输入11位手机号码'
                        });
                        return 
                }
                addExpressSite({
                    expressSiteName:this.value1,
                    expressSitePhone:this.value3,
                    expressSitePosition:this.value2
                }).then(res=>{
                    if(res.data.code==200){
                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        });
                        this.queryExpressSiteAlls()
                    }else{
                        this.$message({
                            message: '新增失败 '+res.data.msg
                        });
                    }
                })
                this.newVisible=false
            },    
              //点击操作
            clickOperate(scope,row){
                console.log(scope,row)
                this.deleteId=scope.$index
            },                                        
            //点击立即处理
            disposeState(val){
                 this.newName=2
                 this.newVisible=true
                console.log(val)
            },
            //编辑
            handleEdit(row){
                console.log(row)
                this.newVisible=true
                this.popupTitle='修改'
                this.value1=row.expressSiteName
                this.value3=row.expressSitePhone
                this.value2=row.expressSitePosition
                this.expressSiteId=row.expressSiteId
            },
            //编辑保存
            newSave2(){              
                let phone=/^1[3456789]\d{9}$/;
                if(this.value1==''){
                    this.$message({
                            message:'请输入站点名称'
                        });  
                }
                else if(this.value3!=''&&!phone.test(this.value3)){
                    this.$message({
                            message:'请输入11位手机号码'
                        });
                        return 
                }
                updateExpressSite({
                    expressSiteId:this.expressSiteId,
                    expressSiteName:this.value1,
                    expressSitePhone:this.value3,
                    expressSitePosition:this.value2
                }).then(res=>{
                    if(res.data.code==200){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.queryExpressSiteAlls()
                    }else{
                        this.$message({
                            message: '修改失败 '+res.data.msg
                        });
                    }
                })
                this.newVisible=false
            },
            //删除单个
            handleDelete(row){
                console.log(row)
                 this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',           
                    }).then(() => {
                        deleteExpressSiteById({expressSiteId:row.expressSiteId }).then(res=>{
                              if(res.data.code==200){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                });
                                this.queryExpressSiteAlls()
                                }else{
                                    this.$message({
                                        message: '删除失败 '+res.data.msg
                                    });
                                }
                            })
                        
                    })
            },
            //查询
            queryName(){            
                console.log(this.Select1,this.value1,this.value2,this.value3,)
            },        
            //取消模态框
            newCall(){
                this.newVisible=false
            },   
          
            //选中的表格数据
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },              
             //分页弹出框
            handleSizeChange2(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize=val
                 this.queryExpressSiteAlls()
                   
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val  
                 this.queryExpressSiteAlls() 
               
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.Express{
    flex: 1;
    padding:50px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .ClassManage-top{
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
            margin-bottom: 10px;
        }
        .collegeNmaeBox{
          display: flex;
           min-height:32px;
          width: 100%;
          padding: 5px 0;
         
        .collegeNmae2{       
            display: flex;
            min-height:32px;
           align-items: center;
        }
        .spanName{
            color: $haedColor;
            font-size: 14px;
            margin-left: 10px;
      }
    }
       
    }
    .ClassManage-main{
        flex: 1;
        background:rgba(255,255,255,1);
        border-radius:15px;
        display: flex;
        flex-direction: column;
        // position: relative;
        .tableBox{
            flex: 1;
            border-radius:15px 15px 0 0;
             overflow: hidden; 
            th{
                color: $color;
            }  
            td{
            color: $haedColor;
            }
        }
        .operate{
            position:absolute;
            left:-15px;
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
    // 弹框 新增
  .newMsg{
      text-align: left;
      width:100%;
      min-height:100px;
      font-size: 14px;
      color: #333;
      .span{
              display: inline-block;
              min-width:56px;
              text-align:right;
              margin-right: 15px;
          }
      .div{
        width: 100%;
        min-height: 32px;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        
      }
    
  }
}
 
</style>






