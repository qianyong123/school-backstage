<template>
  <div class="Examine" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>实时查寝</h4>
           <div class="collegeNmaeBox">
               <div class="collegeNmae2">
                    <span class="spanName" style="margin-left:0">区域：</span>
                        <el-select style="width:130px;" v-model="value1" @change="handArea" placeholder="请选择">  
                        <!-- <el-option :label="'全部'" :value="null"> </el-option> -->
                        <el-option
                        v-for="(item,index) in option1"
                        :key="index"
                        :label="item.regionName"                            
                        :value="item.regionId">
                        </el-option>
                    </el-select>
                    <span class="spanName">楼栋：</span>
                        <el-select style="width:130px;margin-right:10px;"  v-model="value2" placeholder="请选择">
                        <!-- <el-option :label="'全部'" :value="null"> </el-option> -->
                        <el-option
                        v-for="(item,index) in option2"
                        :key="index"
                        :label="item.floorName"                            
                        :value="item.floorId">
                        </el-option>
                    </el-select>
                    <el-button size="small">查询</el-button> 
                </div>                          
                <el-button size="small" icon="el-icon-upload2"  @click="deletes"></el-button>                            
            </div> 
        </div>
         <div class="types2">
            <span class="span1"></span>
            <span>在寝室</span>
            <span class="span1 span2"></span>
            <span>不在寝室</span>
        </div>
        <div class="ClassManage-main" 
        v-loading="loading"               
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        >
            <div class="tableBox" v-for="(item,index) in tableData" :key="index">
                <div class="types">
                   
                    <div style="color:#333;">
                       <span>{{item.floor}}层</span> 
                       <span style="margin-left:20px;">房间数：{{item.amount}}</span>
                    </div>
                </div>
                <div class="allUser">
                    <div class="roomBox"  :class="{roomBox2:item.list.length-1==index2}" v-for="(item2,index2) in item.list" :key="index2">
                        <div class="roomName" >{{item2.roomName}}</div>
                        <div class="name" v-for="(item3,index3) in item2.list" :class="{name2:item3.status==1}" @click="queryUser(item3.id)" :key="index3">
                            {{item3.name}}
                        </div>
                    </div>
                </div>
              
                
            </div>
            
        </div>
        <!-- 查看详情 -->
    <el-dialog
        title="学生信息详情"
        :visible.sync="newVisible"
        width="560px"
        >
        <div class="ApplyRecordNew">
            <!-- <i class="el-icon-close close" @click="$emit('newCall')"></i>            -->
            <div class="logImg">
                <div style="background:#ccc;width:130px;height:150px;">
                    <img :src="studentInfoMsg.studentInfoImg" alt="">
                </div>
                <!-- <img src="../../../static/img/t1.png" alt=""> -->
            </div> 
            <div class="userIfoBox">
                <div class="div">
                    <span class="span">姓名：</span>
                    <span>{{studentInfoMsg.studentInfoName}}</span>
                </div>
                <div class="div">
                    <span class="span">学号：</span>
                    <span>{{studentInfoMsg.studentInfoNo}}</span>
                </div>
                <div class="div">
                    <span class="span">性别：</span>
                    <span>{{studentInfoMsg.studentInfoSex}}</span>
                </div>
                <div class="div">
                    <span class="span">手机：</span>
                    <span>{{studentInfoMsg.studentInfoPhone}}</span>
                </div>
                <div class="div">
                    <span class="span">辅导员：</span>
                    <span>{{studentInfoMsg.teacherInfoName}}</span>
                </div>
                <div class="div">
                    <span>辅导员手机：</span>
                    <span>{{studentInfoMsg.teacherInfoPhone}}</span>
                </div>
                <div class="div div2">
                    <span class="span">班级信息：</span>
                    <span class="span2">{{studentInfoMsg.classMsg}}</span>
                </div>
                <div class="div div2">
                    <span class="span">房间信息：</span>
                    <span class="span2">{{studentInfoMsg.roomMsg}}</span>
                </div>
            
            </div>
        </div> 
    </el-dialog> 
  </div>
</template>

<script>
import Paginations from './Paginations'
import {formatDate} from '../../js/date.js'
import bus from '../../js/bus.js'
import { arealist_2,floorlist_2} from '@/axios/api1'
import { 
 queryMenuById
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
            loading:true,
            newName:'',
            popupTitle:'学生信息详情',
            total:0,
            id:'student',
            pageSize:10,
            pageNum:1,
            allcollege:false,
            deleteId:null,//表格操作
            newVisible:false,//弹框
            setVisible:false,//设置弹框   
            fileList:[],//导入   
            studentInfoMsg:{},       
            //查询    
           value1:null,
           value2:null,
             //状态
            types: [
            {id: '',label: '全部',name:'全部'}, 
            {id: '1',label: '已处理 ',name:'已处理   '}, 
            {id: '2',label: '未处理',name:'未处理'}, 
            ],
              
            option1:[],
             option2:[],
            //编辑弹框
            EditCollegeNmae:'',//编辑班级名

            dataHeader:[],//表格头部                         
            value: '',
            multipleSelection: [], //表格多选
            tableData: [                   
               {
                   floor:'一',
                   amount:22,
                   list:[
                       {
                           roomName:'101',
                           list:[
                               {name:'李达滚',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                        {
                           roomName:'102',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                          {
                           roomName:'102',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                          {
                           roomName:'102',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                          {
                           roomName:'102',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                          {
                           roomName:'102',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                          {
                           roomName:'102',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                          {
                           roomName:'102',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                          {
                           roomName:'102',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                      
                   
                       
                   ]
                } ,  
                    {
                   floor:'二',
                   amount:22,
                   list:[
                       {
                           roomName:'201',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        },
                         {
                           roomName:'202',
                           list:[
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:0},
                               {name:'李达',id:1,status:1},
                               {name:'李达',id:1,status:1},
                           ]
                        }
                   ]
                } ,  
            ],
            roleInfoMenu:[],
            roleId:null,
            popupTitle:''
        }
    },
        filters:{
            manageClass(name){
                let names=''
                // console.log(name)
                if(name.length>8){
                    names=name.slice(0,8)+'...'
                }
                else{
                    names=name
                }
                return names
            }
        },
        mounted() {        
            this.loading=false
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            bus.$on('newCall',this.newCall)
             arealist_2().then(res=>{
                    console.log('全部区域',res)
                     if(res.status==200&&res.data.code==200){
                        this.option1=res.data.data               
                    }
                })
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
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
                        return this.roleInfoMenu[0].indexOf('1')==-1?false:true
                    }
                    
                }
            }
        },
         watch: {
            
         },      
        methods: {
            //导出
            handleAvatarSuccess(file){
                console.log(file)
                 let fd = new FormData();
                fd.append('file',file.raw);//传文件
                this.fileList=[]
              
                
            },  
           //区域下拉
            handArea(id){
                floorlist_2({ regionId:id}).then(res => {                    
                if (res.data.code === 200) {           
                this.option2=res.data.data
                    this.value2=null  
                    
                }
            })
            },               
            //多删除
            deletes(){

            },
            //查看学生信息
            queryUser(id){
                console.log(id)
                this.studentInfoMsg={}
                this.newVisible=true
            },
            //设置
            setRecord(){
              this.newName=1
              this.newVisible=true
            }, 
            //新增保存
            newSave(){

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
            //编辑保存
            handleEdit(row){
                 console.log(row)
            },
            //删除单个
            handleDelete(row){
                console.log(row)
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
                   
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val   
               
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';
 .Examine /deep/ .el-table{
     border-radius: 15px;
    
 }
 .Examine /deep/ .el-table--scrollable-x .el-table__body-wrapper{
        // overflow: hidden;
 }
.Examine{
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
        padding:20px 0px 10px 0px;
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
          justify-content:space-between;
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
    //在寝状态
    .types{
        height:50px;
        display: flex;
        align-items: center;
        text-align:left;
        font-size: 14px;
        color: #888;
        padding:0 15px;
        justify-content: space-between;
        // border-bottom:1px solid rgba(237,237,237,1);  
         
       
    }
     .types2{  
            height:50px;
            width: 100%;
            display: flex;
            align-items: center; 
             .span1{
            display: inline-block;
            width: 14px;
            height: 14px;
            background: #4CABFD;
            margin-right:5px;
            }
            .span2{
                background: #FF6C79;
                margin-left:30px;
            }
        }
     //查看
    .ApplyRecordNew{
        width: 100%;
        // min-height:80px;      
        display: flex;
        // background: #ccc;
        // flex-direction: column;
        justify-content: space-between;
         .close{
         position: absolute;
         top: 20px;
         right: 20px;
         font-size: 16px;
         cursor: pointer;
     }  
        .userIfoBox{
            display: flex;
            flex: 1;
            // padding-left: 20px;
            flex-wrap: wrap;
            align-content: flex-start;
            justify-content: space-between;
            margin-top: 6px;
        }
         .userIfoBox2{           
            flex: 1;   
            // padding-left: 20px;             
        }
         .logImg{
            display: flex;
            flex-direction: column;
            align-items: center;    
            width: 130px;
            height:100%;  
             margin-right: 20px;
           img{
              width: 130px;
                height: 150px;   
           }
        
        }
        .div{
            width: 50%; 
            min-height: 10px; 
            display: flex;
            line-height: 20px;
            align-items: flex-start;   
            margin-bottom: 20px;
            .span{
                display: inline-block;
                min-width:85px;
                text-align: right;
                // margin-right: 20px;
            }    
        }     
        .div2{
            width: 100%; 
            min-height: 10px; 
            display: flex;
            align-items:flex-start;  
            margin-bottom: 20px;
            // cursor: pointer;
            .span2{
                display: inline-block;
                min-width: 60px;
                text-align:left;
                line-height: 20px;
                // margin-right: 12px;
            }
        }
      
    }

    .ClassManage-main{
        flex: 1;
          
        overflow:auto;  
      
      
        .tableBox{
            width:100%;
            background:rgba(255,255,255,1);
            min-height: 100px;
            border: 1px solid #fff;
            border-radius:15px;  
            margin-bottom: 20px;
            color: #333;
          
       
            .allUser{
                display: flex;
                // display:inline-block;
                flex-wrap: wrap;
                // min-width: 100px;
                // min-height: 100px;
                white-space: nowrap;  
                .roomBox{
                    width: 100px;
                    min-height:60px;
                    text-align: center;
                    font-size: 14px;
                }
                .roomName{      
                    width: 100%;         
                    border-top:1px solid rgba(237,237,237,1);
                    border-bottom:1px solid rgba(237,237,237,1);
                    height: 50px;
                    line-height: 50px;                  
                }
                 .name{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    padding:0 5px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color:#4CABFD; 
                    cursor: pointer;
                    }
                   
                .name2{
                       color: #FF6C79;
                    }
                .roomBox2{
                    // flex: 1;
                    // .roomName{
                    //     text-align: left;
                    //     padding-left:30px;
                    // }
                    // .name{
                    //     text-align: left; 
                    //      padding-left:30px;
                    // }
                }
            }
           

            th{
                color: $color;
                text-align: center;
            }  
            td{
            color: $haedColor;
                text-align: center;

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
   
}
 
</style>






