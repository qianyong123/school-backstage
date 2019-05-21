<template>
  <div class="BreakRecord" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>违纪记录</h4>
           <div class="collegeNmaeBox">
                <div class="collegeNmae2">
                    <span class="spanName" style=" margin-left:0px;">处理情况：</span>     
                    <el-select v-model="Select1"  placeholder="请选择" style="width:120px">                     
                        <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id"
                        ></el-option>
                    </el-select>                          
                    <span class="spanName">时间：</span>     
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        style="width:120px"
                        format="yyyy/MM/dd"
                        :clearable="false"
                        value-format="timestamp"
                        placeholder="年/月/日">
                        </el-date-picker>
                        <span style="margin:0 5px;">-</span>
                        <el-date-picker
                        v-model="value2"
                        type="date"
                        style="width:120px"
                        :clearable="false"
                        format="yyyy/MM/dd"
                        value-format="timestamp"
                        placeholder="年/月/日">
                        </el-date-picker>
                        <el-input style="width:120px;margin-left:10px;" v-model="value3" placeholder="姓名/学号"></el-input>                       
                    <el-button @click="queryName" style="margin-left:10px;" size="small">查询</el-button>    
                </div>
                <div>
                    <el-button size="small" icon="el-icon-plus"  @click="addRecord()"></el-button>  
                    <el-button size="small" icon="el-icon-upload2"  @click="outExcel()"></el-button>   
                </div>
                   
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
                   
                   
                    <el-table-column v-if="navjurisdiction2()" header-align="center" label="操作" width="120">
                        <template slot-scope="scope" style="position: relative;">
                            <div v-if="scope.row.disciplineRecordType==0" @click="disposeState(scope.row)" style="color:#4CABFD; cursor: pointer;text-align:center">立即处理</div> 
                            <div v-else  @click="disposeState(scope.row)" style="color:#4CABFD; cursor: pointer;text-align:center">查看</div> 
                            <div v-if="false">{{scope.row}}</div>                         
                        </template>
                    </el-table-column>
                </el-table>
                
            </div>
            <paginations     
            @handleCurrentChange='handleCurrentChange'
            :total='total'
            ></paginations>
        </div>
        <new-students 
        :newVisible='newVisible'
        :popupTitle='popupTitle'
        :allcollege='allcollege'
        :studentInfoMsg='studentInfoMsg'
        @newCall='newCall'
        @newSave='newSave'
        @newSave2='newSave2'
        @getStudentInfo='getStudentInfo'
        :newName='newName'
        ref="child"
        ></new-students>  
  </div>
</template>

<script>
import Paginations from './Paginations'
import newStudents from './newStudents'
import {formatDate} from '../../js/date.js'
import bus from '../../js/bus.js'
import { arealist_2,floorList} from '@/axios/api1'
import { 
 queryMenuById,
 queryDisciplineRecord,
 addDisciplineRecord,
 updateDisciplineRecord,
BreakRecordDelete,
queryStudentByStudentInfoNo,
disciplineRecordExcel
} from '@/axios/api'
const Students1=[
                              
        ]

export default {
    name:"ClassManage",
    components:{
        Paginations,
        newStudents
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
            Select1:null,         
           value1:'',
           value2:'',
           value3:'',                    
             //状态
            types: [
            {id:null,label: '全部',name:'全部'}, 
            {id:1,label: '已处理 ',name:'已处理   '}, 
            {id:0,label: '未处理',name:'未处理'}, 
            ],
                
          
            //编辑弹框
            EditCollegeNmae:'',//编辑班级名

            dataHeader:[
                 {name:'姓名',props:'studentInfoName'},      
                {name:'学号',props:'studentInfoNo'},
                {name:'标题',props:'disciplineRecordTitle'},
                {name:'处理意见',props:'disciplineRecordInfo'},    
                {name:'处理时间',props:'disciplineRecordApprovalTime'}, 
                {name:'处理人',props:'handleUserInfoName'}, 
            ],//表格头部                         
            value: '',
            multipleSelection: [], //表格多选
            tableData: [                   
            ],
            roleInfoMenu:[],
            roleId:null,
            popupTitle:'',
            userInfoId:null,
            studentInfoId:null,
            disciplineRecordId:null
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
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            bus.$on('newCall',this.newCall)
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu          
            this.userInfoId=localStorage.getItem('userInfoId')
            // this.queryDisciplineRecords()
              console.log(this.roleInfoMenu)
               let roleId=localStorage.getItem('roleId')  
                this.roleId=roleId
            this.queryDisciplineRecords()
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
                        return this.roleInfoMenu[7].indexOf('8')==-1?false:true
                    }
                    
                }
            }
        },
         watch: {
            
         },      
        methods: {
            //导入成功或失败
            handleAvatarSuccess(file){
                console.log(file)
                 let fd = new FormData();
                fd.append('file',file.raw);//传文件
                this.fileList=[]
                if(this.activeName=='调寝'){
                    
                
                }
                else if(this.activeName=='物品出楼'){
                  
                }
                else if(this.activeName=='报修'){
                }
                 else if(this.activeName=='被访'){
                }
                 else if(this.activeName=='请假'){
                }
                
            }, 
            open(msg){
                this.$message(msg)
            }, 
            open2(msg){
                 this.$message({
                    message:msg,
                    type: 'success'
                });
            }, 
            //查询
            queryDisciplineRecords(){
                this.loading=true
                queryDisciplineRecord({
                    disciplineType:this.Select1,
                    disciplineRecordSubmintTime_Start:this.value1,
                    disciplineRecordSubmintTime_end:this.value2,
                    nameOrNo:this.value3,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }).then(res=>{
                     this.loading=false
                    if(res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total
                    }else{
                        this.open('查询失败 '+res.data.msg)
                    }
                })
            },                        
            blobs(data,msg){
                const content = data
                const blob = new Blob([content])
                const fileName =msg
                if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
                } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
                }
            },
            //导出
            outExcel(){
                if(this.multipleSelection.length<1){
                    this.open('请选择要导出的数据')
                }
                else{               
                     disciplineRecordExcel({jsonObject:this.multipleSelection}).then(res=>{
                             if(res.status==200&&res.data!=null){
                                this.blobs(res.data,'违纪记录.xls')
                            }else{
                                this.open('导出失败',res.data.msg)
                            }
                        })
                }
                
            },
            //新增
            addRecord(){
              this.newName=1
              this.newVisible=true
              this.popupTitle='提交违纪'
              this.studentInfoMsg={}

            }, 
              
        //获取学生信息
        getStudentInfo(val){
            console.log(val)
            queryStudentByStudentInfoNo({studentInfoNo:val}).then(res=>{
                console.log('学生信息',res)
                if(res.data.code==200&&res.data.data!=null){
                    this.studentInfoMsg=res.data.data
                    this.studentInfoId=res.data.data.studentInfoId
                }else{
                    this.open('查询学生信息失败 ',res.data.msg)
                }
            })
        }  ,
            //新增保存
            newSave(val){
                console.log(val)
               if(this.studentInfoId==null||this.userInfoId==null||val.newInput2==''||val.newInput3==''){
                   this.open('新增信息或学生信息不能为空')
                   console.log(this.studentInfoId,this.userInfoId)
                   return
               }
                addDisciplineRecord({
                    studentInfoId:this.studentInfoId,
                    sbmintUserInfoId:Number(this.userInfoId),
                    disciplineRecordTitle:val.newInput2,
                    disciplineRecordContent:val.newInput3
                }).then(res=>{
                     if(res.data.code==200){
                            this.open2('新增成功')
                             this.queryDisciplineRecords()  
                    }else{
                        this.open('新增失败 '+res.data.msg)
                    }
                })
                 this.newVisible=false
            },    
             //处理保存
            newSave2(val){
                console.log(val)
               if(val.newInput4==''){
                   this.open('处理意见不能为空')
                   return
               }
                updateDisciplineRecord({
                    studentInfoId:this.studentInfoId,
                    disciplineRecordId:this.disciplineRecordId,
                    disciplineRecordInfo:val.newInput4,
                    handleUserInfoId:Number(this.userInfoId),             
                }).then(res=>{
                     if(res.data.code==200){
                            this.open2('处理成功')
                            this.queryDisciplineRecords()  
                    }else{
                        this.open('处理失败 '+res.data.msg)
                    }
                })
                 this.newVisible=false
            },                                         
            //点击立即处理
            disposeState(val){
                 this.newName=2
                 this.newVisible=true
                  this.popupTitle='违纪查看'
                  this.studentInfoMsg=val
                  this.disciplineRecordId=val.disciplineRecordId
                  this.studentInfoId=val.studentInfoId
                console.log(val)
            },
            //查询
            queryName(){     
                this.queryDisciplineRecords()       
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
               this.queryDisciplineRecords()  
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val   
               this.queryDisciplineRecords()   
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.BreakRecord{
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
        justify-content: space-between;
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
            overflow: hidden;
            border-radius:15px 15px 0 0;  
            th{
                color: $color;
            }  
            td{
            color: $haedColor;
            }
        }
        .operate{
            position:absolute;
            left:-17px;
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






