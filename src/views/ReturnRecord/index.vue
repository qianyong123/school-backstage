<template>
  <div class="RetunRecord" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>归寝记录</h4>
           <div class="collegeNmaeBox">                          
                <div class="collegeNmae2">
                    <div style="margin-bottom:10px;">
                        <span class="spanName" style="margin-left:0;">区域：</span>
                        <el-select style="width:120px;margin-right:10px;" @change="handArea" v-model="Select1" placeholder="请选择">   
                            <el-option :label="'全部'" :value="null"></el-option>                     
                            <el-option
                            v-for="(item,index) in option1"
                            :key="index"
                            :label="item.regionName"                            
                            :value="item.regionId">
                            </el-option>
                        </el-select>
                    </div>
                     <div style="margin-bottom:10px;">
                          <span class="spanName">楼栋：</span>
                            <el-select style="width:120px;margin-right:10px;"  v-model="Select2" placeholder="请选择">
                                  <el-option :label="'全部'" :value="null"></el-option>  
                                <el-option
                                v-for="(item,index) in option2"
                                :key="index"
                                :label="item.floorName"                            
                                :value="item.floorId">
                                </el-option>
                            </el-select>
                     </div>
                    <div style="margin-bottom:10px;">
                        <span class="spanName">院系：</span>
                        <el-select style="width:120px;margin-right:10px;" @change="handCollege" v-model="Select3" placeholder="请选择">
                            <el-option :label="'全部'" :value="null"></el-option>  
                            <el-option
                            v-for="(item,index) in option3"
                            :key="index"                          
                            :label="item.college_name"                            
                            :value="item.college_id">
                            </el-option>
                        </el-select>
                    </div>
                      <div style="margin-bottom:10px;">
                            <span class="spanName">专业：</span>
                            <el-select style="width:120px;margin-right:10px;" @change="handMajorYear" v-model="Select4" placeholder="请选择">
                                <el-option :label="'全部'" :value="null" ></el-option>  
                                <el-option
                                v-for="(item,index) in option4"
                                :key="index"                          
                                :label="item.major_name"                            
                                :value="item.major_id">
                                </el-option>
                            </el-select>
                      </div>
                   <div style="margin-bottom:10px;">
                        <span class="spanName">年级：</span>
                        <el-select style="width:120px;margin-right:10px;" @change="handMajorYear"  v-model="Select5" placeholder="请选择">
                            <el-option :label="'全部'" :value="null" ></el-option>  
                            <el-option
                            v-for="(item,index) in option5"
                            :key="index"                        
                            :label="item.year_name"                            
                            :value="item.year_id">
                            </el-option>
                        </el-select>
                   </div>
                    <div style="margin-bottom:10px;">
                         <span class="spanName">班级：</span>
                        <el-select style="width:120px;margin-right:10px;"  v-model="Select6" placeholder="请选择">
                              <el-option :label="'全部'" :value="null"></el-option>  
                            <el-option
                            v-for="(item,index) in option6"
                            :key="index"
                            :label="item.class_name"                            
                            :value="item.class_id">
                            </el-option>
                        </el-select>
                    </div>
                    <div  style="margin-bottom:10px;">
                        <span class="spanName">时间：</span>     
                        <el-date-picker
                        v-model="queryTime1"
                        type="date"
                        style="width:120px"
                        format="yyyy/MM/dd"
                        :clearable="false"
                        value-format="timestamp"
                        placeholder="年/月/日">
                        </el-date-picker>
                        <span style="margin:0 5px;">-</span>
                        <el-date-picker
                        v-model="queryTime2"
                        type="date"
                        style="width:120px;margin-right:10px;"
                        format="yyyy/MM/dd"
                        :clearable="false"
                        value-format="timestamp"
                        placeholder="年/月/日">
                        </el-date-picker>
                    </div>
                    <div style="margin-bottom:10px;margin-right:10px;">
                         <span class="spanName">归寝状态：</span>
                        <el-select style="width:120px;"  v-model="value1" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in types"
                            :key="index"
                            :label="item.name"                            
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    
                   
                    <el-input style="width:120px;margin:0 10px 10px 0;" v-model="value2" placeholder="姓名/学号"></el-input>                       
                    <el-button size="small" @click="queryName" style="margin-bottom:10px;margin-right:10px;">查询</el-button> 
                    <el-button v-if="isdownload==1" size="small" style="margin-left:0px;margin-bottom:10px;" icon="el-icon-download"  @click="handleExport"></el-button>
                </div>   
                <div v-if="isdownload==0" style="margin-bottom:10px;">
                    <el-button size="small" icon="el-icon-download"  @click="handleExport"></el-button>                                
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
                    prop="name"
                    label="姓名"
                   >    
                        <template slot-scope="scope" style="position: relative;">
                            <div>{{scope.row.studentInfoName}}</div>                    
                        </template>         
                    </el-table-column>
                   <el-table-column                 
                    prop="name"
                    label="学号"
                   >    
                        <template slot-scope="scope" style="position: relative;">
                            <div>{{scope.row.studentInfoNo}}</div>                    
                        </template>         
                    </el-table-column>
                   <el-table-column                 
                    prop="name"
                    label="时间"
                   >    
                        <template slot-scope="scope" style="position: relative;">
                            <div>{{scope.row.dormRecorTime}}</div>                    
                        </template>         
                    </el-table-column>
                    <el-table-column                 
                    prop="name"
                    label="归寝状态"
                   >    
                        <template slot-scope="scope" style="position: relative;">
                            <div :class="{statusColor:scope.row.dormRecorType==0,statusColor2:scope.row.dormRecorType==1,statusColor3:scope.row.dormRecorType==2}">{{scope.row.dormRecorType | status2}}</div>                    
                        </template>         
                    </el-table-column>
                     <el-table-column                 
                    prop="name"
                    label="房间信息"
                   >    
                        <template slot-scope="scope" style="position: relative;">
                            <div>{{scope.row.roomMsg}}</div>                    
                        </template>         
                    </el-table-column>
                     <el-table-column                 
                    prop="name"
                    label="班级信息"
                   >    
                        <template slot-scope="scope" style="position: relative;">
                            <div>{{scope.row.classMsg}}</div>                    
                        </template>         
                    </el-table-column>
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="120">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="handleEdit(scope.row)">人员信息</p>
                                    <p @click="handleAnalyze(scope.row)">归寝分析</p>                                  
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
          <!-- 查看详情 -->
    <el-dialog
        title="信息详情"
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
                    <span class="span">辅导员手机：</span>
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
    <!-- 归寝分析 -->
     <el-dialog
        title="归寝分析"
        :visible.sync="newVisible2"
        width="480px"
        center
        >
        <div class="ApplyRecordNew">
           
            <div class="userIfoBox">
                <div class="div">
                    <span class="span3">姓名</span>
                    <span>{{studentInfoMsg.studentInfoName}}</span>
                </div>
                <div class="div">
                    <span class="span3">学号</span>
                    <span>{{studentInfoMsg.studentInfoNo}}</span>
                </div>
                <div class="div" style="width:100%">
                    <span class="span3">时间</span>
                     <el-date-picker
                        v-model="time1"
                        type="date"
                        style="width:140px;"
                        format="yyyy/MM/dd"
                        :clearable="false"
                        value-format="timestamp"
                        placeholder="年/月/日">
                        </el-date-picker>
                        <span style="margin:0 5px;">-</span>
                        <el-date-picker
                        v-model="time2"
                        type="date"
                         style="width:140px;"
                        format="yyyy/MM/dd"
                        :clearable="false"
                        value-format="timestamp"
                        placeholder="年/月/日">
                        </el-date-picker>
                        <el-button size="small" style="margin-left:10px;" type="primary" @click="setRecord">分析</el-button>
                </div>
                <div style="margin-top:20px;">
                    <span>该时间段类，未归次数<span style="color:#E01763">{{amount1}}</span>，晚归次数<span style="color:#E01763">{{amount2}}</span>，请假次数<span style="color:#E01763">{{amount3}}</span></span>
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
 queryMenuById,
 queryCollegeByName,
 queryMajorByTerm,
 queryByYearName,
 queryAllCalss,
 queryDormRecord,
 dormRecordAnalysis,
 queryMajorById,
 queryClassById,
 dormRecordExcel
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
            total:0,
            isdownload:0,
            id:'student',
            pageSize:10,
            pageNum:1,
            allcollege:false,
            deleteId:null,//表格操作
            newVisible:false,//新增弹框
            newVisible2:false,
            setVisible:false,//设置弹框   
            fileList:[],//导入   
            studentInfoMsg:{},       
            //查询            
            value1:null,
            value2:'',   
            queryTime1:'',
            queryTime2:'',     
            time1:'',
            time2:'',     
            Select1:null,
            Select2:null,
            Select3_1:null,
            Select4_1:null,
            Select5_1:null,

            Select3:null,
            Select4:null,
            Select5:null,
            Select6:null,

            amount1:0,
            amount2:0,
            amount3:0,
             //状态
            types: [
            {id: null,name:'全部'}, 
            {id:3,name:'正常'}, 
            {id:0,name:'晚归'}, 
            {id: 1,name:'未归'}, 
            {id: 2,name:'请假'}, 
            ],
                
            option1:[],
            option2:[],
            option3:[],
            option4:[],
            option5:[],
            option6:[],
            //编辑弹框
            EditCollegeNmae:'',//编辑班级名                        
            value: '',
            multipleSelection: [], //表格多选
            tableData: [                   
                //  {name:'姓名',status:'0',userIfNo:'10233625'},    
                //   {name:'姓名',status:'1',userIfNo:'10233625'},  
                //   {name:'姓名',status:'2',userIfNo:'10233625'},  
                //   {name:'姓名',status:'3',userIfNo:'10233625'},  
            ],
            roleInfoMenu:[],
            roleId:null,
            popupTitle:'',
            studentInfoId:0
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
            },
            status2(id){
                if(id==3){
                    return '正常'
                }
                else if(id==0){
                    return '晚归'
                }
                 else if(id==1){
                    return '未归'
                }
                 else if(id==2){
                    return '请假'
                }
            }
        },
        mounted() {        
            this.loading=false
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            bus.$on('newCall',this.newCall)
            let widths=document.documentElement.clientWidth
            if(widths<2020){
                this.isdownload=1
            }
            console.log(widths)
            this.arealist()
            this.queryCollegeByNames()
            this.queryByYearNames2()
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
              console.log(this.roleInfoMenu)
              this.queryDormRecords()
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
                    else{
                        return this.roleInfoMenu[1].indexOf('2')==-1?false:true
                    }
                    
                }
            }
        },
         watch: {
            
         },      
        methods: {
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
            handleExport(){
                if(this.multipleSelection.length<1){
                    this.$message('请选择你要导出的数据！')
                }else{
                    let multipleSelection=[]                 
                    let studentInfoId=[]  
                    this. multipleSelection.forEach(data=>{
                        multipleSelection.push(data.studentInfoId)
                    })
                    studentInfoId=multipleSelection.filter((data,index)=>{
                        return multipleSelection.indexOf(data)==index?true:false
                    })
                     dormRecordExcel({studentInfoId}).then(res=>{
                             if(res.status==200&&res.data!=null){
                                this.blobs(res.data,'导出归寝记录.xls')
                            }else{
                                 this.$message('导出失败' +res.data.msg)
                            }
                        })
                    console.log(studentInfoId)
                }              
                
                
            },  
           //全部区域
            arealist(){
                arealist_2().then(res=>{
                     if(res.status==200&&res.data.code==200){
                        this.option1=res.data.data               
                    }
                })
            },
            //全部学院

            queryCollegeByNames(){
                queryCollegeByName({collegeName:'', pageNum:0,pageSize:0}).then(res=>{
                if(res.status==200&&res.data.code==200){
                        this.option3=res.data.data               
                    }
                })
            },
            //查询全部年级
             queryByYearNames2(){     
                queryByYearName({YearName :'', pageNum :0,pageSize :0}).then(res=>{
                    if(res.status==200&&res.data.code==200){
                        this.option5=res.data.data.list
                        
                    }
                })
            },
            //区域下拉
            handArea(){
                floorlist_2({ regionId:this.Select1}).then(res => {
                    this.Select2=null
                    if (res.data.code === 200) {           
                    this.option2=res.data.data
                    }else{
                        this.$message('查询楼栋失败' +res.data.msg)
                    }
                })
            },
            //学院下拉事件
            handCollege(collegeId ){      
                // this.Select3=collegeName.college_id
                queryMajorById({
                    collegeId,MajorName:'',pageNum :0,pageSize :0 
                }).then(res=>{
                    this.option4=[]
                    this.Select6=null        
                    this.Select4=null  
                    console.log('专业',res)
                      if(res.status==200&&res.data.code==200){
                            this.option4=res.data.data.list
                                                                   
                    }else{
                        this.$message('查询专业失败' +res.data.msg)
                    }
                })                       
            },
             //专业和年级下拉
            handMajorYear(){
                this.option6=[]
                 this.Select6=null   
                queryClassById({
                    collegeId:this.Select3,
                    majorId :this.Select4,
                    yearId :this.Select5,
                    className :'',
                    pageNum :0,
                    pageSize :0
                }).then(res=>{
                    console.log(res)
                    if(res.data.code==200&&res.data.data!=null){                      
                        this.option6=res.data.data
                        this.Select6=null                                                          
                    }else{
                        this.$message('查询班级失败' +res.data.msg)
                    }
                })
         },
        
         //记录查询
         queryDormRecords(){
             this.loading=true
             queryDormRecord({
                 regionId:this.Select1,
                 floorId:this.Select2,
                 collegeId:this.Select3,
                 majorId:this.Select4,
                 yearId:this.Select5,
                 classId:this.Select6,
                 dormRecorTime_satrt:this.queryTime1,
                 dormRecorTime_end:this.queryTime2,
                 dormRecorType:this.value1,
                 studentInfoNameOrNo:this.value2,
                 pageNum :this.pageNum,
                 pageSize:this.pageSize
             }).then(res=>{
                    console.log('记录',res)
                    this.loading=false
                 if(res.data.code==200&&res.data.data.list!=null){
                     this.tableData=res.data.data.list
                     this.total=res.data.data.total
                 }else{
                        this.$message('查询记录失败' +res.data.msg)
                    }
             })
         },
            //保存分析
            setRecord(){
              dormRecordAnalysis({
                studentInfoId:this.studentInfoId,
                dormRecorTime_satrt:this.time1,
                dormRecorTime_end:this.time2
              }).then(res=>{
                  console.log('分析',res)
                  if(res.data.code==200&&res.data.data!=''){
                      let amount=res.data.data.split(',')
                      this.amount1=amount[0]
                      this.amount2=amount[1]
                      this.amount3=amount[2]
                  }
              })
          
            console.log(this.time1,this.time2)
            }, 
             
              //点击操作
            clickOperate(scope,row){
                console.log(scope,row)
                this.deleteId=scope.$index
            },                                        
            
            //人员详情
            handleEdit(row){
                 console.log(row)
                 this.studentInfoMsg=row
                 this.newVisible=true
            },
            //归寝分析
            handleAnalyze(row){
                console.log(row)
                this.amount1=0
                this.amount2=0
                this.amount3=0
                this.time1=''
                this.time2=''
                this.studentInfoMsg=row
                this.studentInfoId=row.studentInfoId
                this.newVisible2=true
            },
            //查询
            queryName(){            
                this.queryDormRecords()
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
                   this.queryDormRecords()
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val  
                this.queryDormRecords() 
               
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.RetunRecord{
    flex: 1;
    padding:50px 20px 20px 20px;
    display: flex;
    flex-direction: column;
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
          justify-content: space-between;
        //   padding: 5px 0;
          flex-wrap: wrap;
         
        .collegeNmae2{       
            display: flex;
            min-height:32px;
           align-items: center;
             flex-wrap: wrap;             
        }
        .spanName{
            color: $haedColor;
            font-size: 14px;
            // margin-left: 10px;
      }
    }
       
    }
    .ClassManage-main{
        flex: 1;
        background:rgba(255,255,255,1);
        border-radius:15px;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        // position: relative;
        .tableBox{
            flex: 1;
            overflow: auto; 
            border-radius:15px 15px 0 0; 
             .statusColor{
                 color: #FB9AA3;
             }
             .statusColor2{
                 color: #E0226A;
             }
             .statusColor3{
                 color: #4CABFD;
             }
            th{
                color: $color;
            }  
            td{
            color: $haedColor;
            }
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
            min-height: 32px; 
            display: flex;
            // line-height:32px;
            align-items: center;   
            margin-bottom: 10px;
            .span{
                display: inline-block;
                min-width:85px;
                line-height: 20px;
                text-align: right;
                // margin-right: 10px;
            }  
             .span3{
                 min-width:45px;
                 text-align: left;
                 margin: 0;
             }  
        }     
        .div2{
            width: 100%; 
            min-height: 32px; 
            display: flex;
            align-items:center;  
            margin-bottom:10px;
            // margin-top: 6px;
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
   
}
 
</style>






