<template>
  <div class="AccessRecord" @click="deleteId=null">
        <div v-show="ischeck" class="ClassManage-top">
            <h4>出入记录</h4>
            <div style="flex:1;font-size:14px;">
                <el-tabs style="height:100%;width:100%;"  v-model="activeName" @tab-click="handleClick">                  
                <el-tab-pane label="出入记录" name="出入记录">  
                    <div class="collegeNmaeBox">                                
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">区域：</span>
                             <el-select style="width:120px;" @change="getFloor" v-model="Select1" placeholder="请选择">
                                 <el-option                                                           
                                :label="'全部'"                            
                                :value="null">
                                </el-option>
                                <el-option                              
                                v-for="(item,index) in arealist"
                                :key="index"
                                :label="item.regionName"                            
                                :value="item.regionId">
                                </el-option>
                            </el-select> 
                           <span class="spanName">楼栋：</span>
                             <el-select style="width:120px;" v-model="Select2" placeholder="请选择">
                                <el-option                                                           
                                :label="'全部'"                            
                                :value="null">
                                </el-option>
                                <el-option                              
                                v-for="(item,index) in floorlist"
                                :key="index"
                                :label="item.floorName"                            
                                :value="item.floorId">
                                </el-option>
                            </el-select> 
                             <span class="spanName">出入标示：</span>
                             <el-select style="width:120px;" v-model="Select3" placeholder="请选择">
                                
                                <el-option                              
                                v-for="(item,index) in type1"
                                :key="index"
                                :label="item.label"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                             <span class="spanName">身份类型：</span>
                             <el-select style="width:120px;" v-model="Select4" placeholder="请选择">
                                
                                <el-option                              
                                v-for="(item,index) in type2"
                                :key="index"
                                :label="item.label"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <span class="spanName">时间：</span>
                            <el-date-picker
                            v-model="timevalue1"
                            type="date"
                            style="width:120px"
                            format="yyyy/MM/dd"
                            :clearable="false"
                            value-format="timestamp"
                            placeholder="年/月/日">
                            </el-date-picker>
                            <span style="margin:0 5px;">-</span>
                            <el-date-picker
                            v-model="timevalue2"
                            type="date"
                            style="width:120px"
                            :clearable="false"
                            format="yyyy/MM/dd"
                            value-format="timestamp"
                            placeholder="年/月/日">
                            </el-date-picker>
                            
                            <el-input
                            placeholder="姓名/学号"
                            v-model="value1"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(1)" size="small">查询</el-button>
                        </div>                    
                        <el-button @click="exportData(1)" size="small" icon="el-icon-download"></el-button>   
                    </div>
                </el-tab-pane>
                <el-tab-pane label="考勤分析" name="考勤分析">
                    <div class="collegeNmaeBox">
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">学院：</span>
                             <el-select style="width:120px;" @change="queryMajor" v-model="Select5" placeholder="请选择">
                                 <el-option                                                           
                                :label="'全部'"                                                                                                       
                                :value="''">
                                </el-option>
                                <el-option                              
                                v-for="(item,index) in classList1"
                                :key="index"
                                :label="item.college_name"                            
                                :value="item.college_id">
                                </el-option>
                            </el-select> 
                              <span class="spanName">专业：</span>
                             <el-select style="width:120px;" v-model="Select6" placeholder="请选择">
                                 <el-option                                                           
                                :label="'全部'"                            
                                :value="''">
                                </el-option>
                                <el-option                              
                                v-for="(item,index) in classList2"
                                :key="index"
                                :label="item.major_name"                            
                                :value="item.major_id">
                                </el-option>
                            </el-select> 
                              <span class="spanName">年级：</span>
                             <el-select style="width:120px;" v-model="Select7" placeholder="请选择">
                                 <el-option                                                           
                                :label="'全部'"                            
                                :value="''">
                                </el-option>
                                <el-option                              
                                v-for="(item,index) in classList3"
                                :key="index"
                                :label="item.year_name"                            
                                :value="item.year_id">
                                </el-option>
                            </el-select> 
                            <el-input
                            placeholder="班级名"
                            v-model="value2"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(2)" size="small">查询</el-button>
                        </div>                    
                        <el-button @click="setRecord(1)" size="small" icon="el-icon-setting"></el-button>                        
                    </div>                                                             
                </el-tab-pane>           
             
                
            </el-tabs>
            </div>        
        </div>
        <div v-show="!ischeck" class="ClassManage-top" style="margin-bottmom:30px;">
           <div @click="returnRecord" style="color:#333;;cursor: pointer;">
               <i style="color:#333;font-weight:600" class="el-icon-arrow-left"></i>
               <span>{{className}}</span>
           </div>
           <div style="padding-bottom:10px;">
            
            <div class="collegeNmaeBox">
                <div class="collegeNmae">
                        <span>时间：</span>
                        <el-date-picker
                        v-model="timevalue3"
                        type="date"
                        style="width:120px"
                        format="yyyy/MM/dd"
                        :clearable="false"
                        value-format="timestamp"
                        placeholder="年/月/日">
                        </el-date-picker>
                        <span style="margin:0 5px;">-</span>
                        <el-date-picker
                        v-model="timevalue4"
                        type="date"
                        style="width:120px"
                        :clearable="false"
                        format="yyyy/MM/dd"
                        value-format="timestamp"
                        placeholder="年/月/日">
                        </el-date-picker>
                        <el-input
                        placeholder="姓名/证件号"
                        v-model="value3"
                        style="width:120px;margin:0 10px;"
                        >
                        </el-input>
                        <el-button @click="queryName(3)" size="small">查询</el-button>
                </div>
                    <el-button @click="exportData(2)" size="small" icon="el-icon-download"></el-button> 
                </div>
                <div class="collegeNmae" style="font-size:14px;margin-top:5px;">
                    <span>
                        该时间段内，人均外出总时长19.6h，人均每日外出时长5.6h。
                    </span>
                    <span style="color:#FF6C79;">
                        外出时长低于平均值25%，6人；低于50%，3人；低于75%，1人
                    </span>
                </div>
            </div>
        </div>
        <div class="ClassManage-main">
            <div class="tableBox">
                <el-table 
                    v-show="activeIndex==0"              
                    v-loading="loading"               
                     element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    :data="tableData"                
                    stripe                         
                    height="100%"                     
                    style="width:100%;">   
                   <el-table-column
                   width="30"
                    >
                    <template style="height:48px;" slot-scope="scope">
                        <div style=" visibility: hidden;">{{scope.$index}}</div>
                    </template>
                   
                    </el-table-column> 
                    <el-table-column        
                   label="照片"
                    >
                    <template slot-scope="scope">
                        <div>
                            <img :src="scope.row.peopleImg" alt="" style="height:50px;width:50px;">
                        </div>                      
                    </template>                  
                    </el-table-column>           
                    <!-- <el-table-column
                    v-for="(item,index) in Students1"
                    :key="index"
                    :prop="item.props"
                    :label="item.name"
                   >                                  
                    </el-table-column>    -->
         
                    <el-table-column        
                    label="姓名"
                    >
                    <template slot-scope="scope">
                        <div>{{scope.row.peopleName}}</div>                  
                    </template>                  
                    </el-table-column> 
                    <el-table-column        
                    label="学号/工号/身份证"
                    >
                    <template slot-scope="scope">
                        <div>{{scope.row.peopleNo}}</div>                  
                    </template>                  
                    </el-table-column>   
                    <el-table-column        
                    label="身份类型"
                    >
                    <template slot-scope="scope">
                        <div>{{(scope.row.roleInfoId) | types}}</div>                  
                    </template>                  
                    </el-table-column>  
                    <el-table-column        
                    label="识别时间"
                    >
                    <template slot-scope="scope">
                        <div>{{scope.row.accessRecordDate}}</div>                  
                    </template>                  
                    </el-table-column> 
                         <el-table-column        
                    label="楼栋信息"
                    >
                    <template slot-scope="scope">
                        <div>{{scope.row.floorMsg}}</div>                  
                    </template>                  
                    </el-table-column> 
                      <el-table-column        
                    label="出入标示"
                    >
                    <template slot-scope="scope">
                        <div>{{(scope.row.accessRecordType) | churu}}</div>                  
                    </template>                  
                    </el-table-column>                        
                </el-table>
                 <el-table  
                    v-show="activeIndex==1"           
                    v-loading="loading"               
                     element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    :data="tableData2"                
                    stripe                         
                    height="100%"  
                    ref="multipleTable"
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"                   
                    style="width:100%;"> 
                     <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>                             
                    <el-table-column
                    v-for="(item,index) in Students2"
                    :key="index"
                    :prop="item.props"
                    :label="item.name"
                   >                 
                    </el-table-column>                 
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="setRecord(2, scope.row)">设置</p>
                                    <p @click="checkAnalyze(scope.row)">考勤查看</p>                                  
                                </div>
                            </div>                          
                        </template>
                    </el-table-column>
                </el-table>
                  <el-table  
                    v-show="activeIndex==2"           
                    v-loading="loading"               
                     element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    :data="tableData3"                
                    stripe                         
                    height="100%"                  
                    tooltip-effect="dark"             
                    style="width:100%;"> 
                    <el-table-column
                   width="30"
                    >
                    <template style="height:48px;" slot-scope="scope">
                        <div style=" visibility: hidden;">{{scope.$index}}</div>
                    </template>
                   
                    </el-table-column>                                                
                    <el-table-column
                    v-for="(item,index) in Students3"
                    :key="index"
                    :prop="item.props"
                    :label="item.name"
                   >                 
                    </el-table-column>  
                     <el-table-column
                    label="外出时长"
                    >
                    <template style="height:48px;" slot-scope="scope">
                        <div class="tableBox-time" :class="{timeColor:scope.row.status==0}">
                            <span>{{scope.$index}}</span>  
                            <span v-if="scope.row.status==0" style="margin:0 2px 3px 10px">↓</span>    
                            <span v-else style="margin:0 2px 3px 10px">↑</span>  
                            <span>25%</span>                
                        </div>
                    </template>
                   
                    </el-table-column>    
                    <el-table-column
                    label="辅导员信息"
                    >
                    <template style="height:48px;" slot-scope="scope">
                        <div>{{scope.$index}}</div>
                    </template>
                   
                    </el-table-column>              
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">                                  
                                    <p @click="checkAnalyze2(scope.row)">考勤分析</p>                                  
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
         <!-- 考勤分析时间设置-->
        <el-dialog
        :title="'考勤分析时间设置'"
        :visible.sync="overdueSet"
        @close="closeOverdueSet"
        width="440px"
        center>
        <div style="min-height:200px">             
            <div>
                <span>分析时间</span>
                  
                     <el-time-picker
                        v-model="timevalue5"
                        style="width:128px;margin-left:5px;"
                        placeholder="开始时间"
                     >
                    </el-time-picker>
                    <span style="margin:0 5px;">-</span>
                     <el-time-picker
                        v-model="timevalue6"
                        style="width:128px"
                        placeholder="结束时间"
                     >
                    </el-time-picker>
                   
            </div>
            
            <el-checkbox-group @change="checkLists" style="margin-top:30px;" v-model="checkList">
                <el-checkbox style="width:90px;margin-bottom:20px;" v-for="item in timeList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
                
            </el-checkbox-group>
           
        </div>        
        <span slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="overdueConfirm" size="small">确 定</el-button>
            <el-button @click="overdueSet=false" size="small">取 消</el-button>
        </span>
        </el-dialog> 
        <!-- 日志 -->
        <el-dialog
        title="考勤分析"
        :visible.sync="VisibleLogin"
        width="430px"
        center>
        <div style="min-height:100px;">
            <div class="VisibleLoginNmae">
                <span style="width:40%">
                    <span class="span">姓名</span>
                    <span>张三</span>
                </span>
                <span>
                    <span class="span">学号</span>
                    <span>0128898666</span>
                </span>
            </div>
             <div class="VisibleLoginNmae">
                <span class="span">时间</span>
                  <el-date-picker
                    v-model="timevalue7"
                    type="date"
                    style="width:120px;"
                    format="yyyy/MM/dd"
                    :clearable="false"
                    value-format="timestamp"
                    placeholder="年/月/日">
                    </el-date-picker>
                    <span style="margin:0 5px;">-</span>
                    <el-date-picker
                    v-model="timevalue8"
                    type="date"
                    style="width:120px;margin-right:10px;"
                    :clearable="false"
                    format="yyyy/MM/dd"
                    value-format="timestamp"
                    placeholder="年/月/日">
                    </el-date-picker>
                    <el-button  type="primary" @click="analyzeTime" size="small">分析</el-button>
            </div>
            <div style="font-size:14px;margin-top:20px;">
                <span>该时间段内，外出总时长</span>
                <span style="color:#E01763">88h，</span>
                <span>班级人均外出时长</span>
                <span style="color:#E01763">66.3h</span>
            </div>
        </div>       
        </el-dialog>
  </div>
</template>

<script>
import Paginations from './Paginations'
import {formatDate} from '../../js/date.js'
import bus from '../../js/bus.js'
import {arealist_2,floorlist_2} from '@/axios/api1'
import { 
 queryMenuById,
 queryCollegeByName,
 queryMajorByTerm,
 queryByYearName,
 queryAccessRecord,
 queryMajorById
} from '@/axios/api'


export default {
    name:"ClassManage",
    components:{
        Paginations,
    },
    data(){
        return{
            activeName:"出入记录",
            activeIndex:'0',
            loading:true,
            loading2:false,
            ischeck:true,
            className:'学院-专业-年级-班级',
            newName:'1',
            checkList:[],
            timeList:[
                {id:1,name:'周一'},
                {id:2,name:'周二'},
                {id:3,name:'周三'},
                {id:4,name:'周四'},
                {id:5,name:'周五'},
                {id:6,name:'周六'},
                {id:7,name:'周日'},
            ],
            total:0,
            id:'student',
            pageSize:10,
            pageNum:1,
            allcollege:false,
            schedule:'',//审核进度
            overdueSet:false,//逾期模态框
            deleteId:null,//表格操作
            newVisible:false,//新增弹框
            setVisible:false,//设置弹框   
            VisibleLogin:false,//日志
            fileList:[],//导入   
            applyLeaveApprovalResult:'',//处理状态
            studentInfoMsg:{},//学生信息  
            applyLeaveId:null,    
            //查询
            Select1:null,
            Select2:null,
            Select3:null,
            Select4:null,
            Select5:'',
            Select6:'',
            Select7:'',
           
            
           timevalue1:'',
           timevalue2:'',
           timevalue3:'',
           timevalue4:'',
           timevalue5:'',
           timevalue6:'',
           timevalue7:'',
           timevalue8:'',
           timevalue9:'',
           timevalue10:'',
           value1:'',
           value2:'',
           value3:'',
            value4:'',
           value5:'',
          
            setValue1:'',
        Students1:[
            {name:'姓名',props:'peopleName'},      
            {name:'学号/工号/身份证',props:'peopleNo'},
            {name:'身份类型',props:'roleInfoId'},    
            {name:'识别时间',props:'accessRecordDate'},       
            {name:'楼栋信息',props:'floorMsg'},    
            {name:'出入标示',props:'accessRecordType'},                
        ],
        Students3:[
           {name:'姓名',props:'studentInfoName'},      
            {name:'学号',props:'studentInfoNo'},
            {name:'时间',props:'studentInfoSex'},
            // {name:'外出时长',props:'teacherMsg'},    
            // {name:'辅导员信息',props:'parentMsg'},  
            
        ],
            Students2:[
           {name:'班级名',props:'studentInfoName'},      
            {name:'所在年级',props:'studentInfoNo'},
            {name:'所属专业',props:'studentInfoSex'},
            {name:'所属学院',props:'teacherMsg'},    
            {name:'考勤时间',props:'parentMsg'},  
            // {name:'处理状态',props:'parentMsg'},  
        ],
            //出入标示
             type1: [
            {value:null,label: '全部',name:null}, 
            {value:1,label: '出',name:'出'}, 
            {value:2,label: '入',name:'入'}, 
            {value:0,label: '未通过',name:'未通过'}, 
            
            ],
             //身份类型
            type2: [
            {value:null,label: '全部',name:null}, 
            {value:5,label: '学生',name:'学生'}, 
            {value:4,label: '宿管',name:'宿管'}, 
            {value:3,label: '辅导员',name:'辅导员'}, 
            {value:0,label: '其他',name:'其他'}, 
            ],
            
           
            //所有区域
            arealist: [             
            
            ],
            //所以楼栋
            floorlist:[],
           Students6:[
                {name:'步骤',props:'step'},      
                {name:'姓名',props:'name'},
                {name:'角色',props:'role'},
                {name:'时间',props:'tateTime'},    
            ],
            //编辑弹框
            EditCollegeNmae:'',//编辑班级名

            dataHeader:[],//表格头部                         
            value: '',
            multipleSelection: [], //表格多选
            tableData: [                                        
               {studentInfoName:'步骤',props:'step'},      
            ],    
            tableData2: [                                        
                {studentInfoName:'步骤',props:'step'},      
                
            ],    
             tableData3: [                                        
                {studentInfoName:'步骤',props:'step',status:0,},      
                {studentInfoName:'步骤',props:'step',status:1,},      
            ],    
            roleInfoMenu:[],
            classList1:[],
            classList2:[],
            classList3:[],
            roleId:null,
            popupTitle:'',
            roleId:1,
            setTime:0
        }
    },
        filters:{
           types(id){
                  if(id==5){
                        return '学生'
                    }
                    else if(id==4){
                        return '宿管'
                    }
                    else if(id==3){
                        return '辅导员'
                    }
                    else if(id==6){
                        return '家长'
                    }

                   
           },
            churu(id){
                 if(id==1){
                    return '出'
                }
                else if(id==2){
                     return '入'
                }
                else if(id==0){
                        return '未通过'
                }
            }
        },
        mounted() {        
           
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            this.roleId=localStorage.getItem('roleId')
            //区域
            arealist_2().then(res=>{
                
                if(res.data.code==200&&res.data.data!=null){
                    this.arealist=res.data.data
                   
                }
            })
            //学院
            queryCollegeByName({pageSize:0,pageNum:0,collegeName:''}).then(res=>{
                    if(res.data.code==200){
                        this.classList1=res.data.data
                        
                    }
                }),
             //查询全部年级      
                queryByYearName({YearName :'', pageNum :0,pageSize :0}).then(res=>{               
                    if(res.status==200&&res.data.code==200){
                        this.classList3=res.data.data.list
                        
                    }
                })
             
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
              console.log(this.roleInfoMenu)
                this.queryAccessRecords()
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
                        return this.roleInfoMenu[3].indexOf('4')==-1?false:true
                    }
                   
                }
            }
        },
         watch: {
             activeIndex(){                     
                this.pageNum=1
                this.tableData=[]
                this.loading=true     
                this.$refs.multipleTable.clearSelection();
                if(this.activeIndex=='0'){                   
                    this.newName=1
                    this.queryAccessRecords()
                }
                else if(this.activeIndex=='1'){
                    this.newName=2
                    this.loading=false
                }
                else if(this.activeIndex=='2'){
                    this.newName=2
                    this.loading=false
                }
                
             }
         },      
        methods: {
            open2(msg) {
                this.$message({
                message:msg,
                type: 'success'
                });
            },
            open(msg) {
                this.$message(msg);
            },
            //查询楼栋
            getFloor(val){
                floorlist_2({regionId:val==''?null:val}).then(res=>{
                    if(res.data.code==200&&res.data.data!=null){
                        this.floorlist=res.data.data
                    }
                })
            },
            //学院下拉事件
            queryMajor(collegeId){
                    this.classList2=[]
                    this.Select6=''
                     queryMajorById({
                    collegeId,MajorName:'',pageNum :0,pageSize :0 
                }).then(res=>{                   
                    console.log('专业',res)
                      if(res.status==200&&res.data.code==200){
                            this.classList2=res.data.data.list
                                                                   
                    }else{
                        this.$message('查询专业失败' +res.data.msg)
                    }
                })             
            },
           //查询出入记录
           queryAccessRecords(){
               queryAccessRecord({
                   pageNum:this.pageNum,
                   pageSize:this.pageSize,             
                   accessRecordDate_start:this.timevalue1,
                   accessRecordDate_end:this.timevalue2,
                   nameOrNo:this.value1,
                   accessRecordType:this.Select3,
                   roleInfoId:this.Select4,
                   regionId:this.Select1,
                   floorId:this.Select2
               }).then(res=>{
                   console.log('出入记录',res)  
                    this.loading=false                     
                   if(res.data.code==200&&res.data.data!=null){
                         this.tableData=res.data.data.list                   
                        this.total=res.data.data.total
                   }else{
                        this.loading=false
                       this.open('查询失败'+res.data.msg)
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
           exportData(id){
               console.log(id)
                // dormRecordExcel().then(res=>{
                //         if(res.status==200&&res.data!=null){
                //         this.blobs(res.data,'导出归寝记录.xls')
                //     }else{
                //             this.$message('导出失败' +res.data.msg)
                //     }
                // })
           },
           //查看考勤
           checkAnalyze(row){
               console.log(row)
               this.ischeck=false
               this.activeIndex=2
           },
           //查看考勤分析
           checkAnalyze2(row){
               this.VisibleLogin=true
               console.log(row)
           },
           //查询考勤分析
           analyzeTime(){
               console.log('分析',this.timevalue7,this.timevalue8)
           },
           //返回考勤记录
           returnRecord(){
               this.activeIndex=1
               this.ischeck=true
           },
            //选中星期
            checkLists(val){
                console.log(val)
            },
            //点击设置考勤时间
            setRecord(id,row){              
                if(id==1){
                    if(this.multipleSelection.length<1){
                        this.open('请选择需要设置的数据！')
                        return
                    }else{
                        this.overdueSet=true 
                        console.log(id)
                        this.setTime=1
                    }
                   
                } 
                else if(id==2){
                this.overdueSet=true 
                    this.setTime=2
                    console.log(id,row)
                }            
            },     
            //选中表格数据
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            //考勤时间设置保存
            overdueConfirm(){          
                this.overdueSet=false
                if(this.setTime==1){
                    console.log('set1')
                }
                else{
                      console.log('set2')
                }
                console.log(formatDate(this.timevalue5,'hh:mm'),formatDate(this.timevalue6,'hh:mm'),this.checkList)
            },  
            //关闭考勤模态框  
            closeOverdueSet(){
                this.timevalue5=''
                this.timevalue6=''
                this.checkList=[]
            },
            //切换top
            handleClick(tab, event) {
                console.log(tab);                            
                this.activeName=tab.label
                this.activeIndex=tab.index                          
                
            },
            //点击操作
            clickOperate(scope,row){
                console.log(scope,row)
                this.deleteId=scope.$index
            },
            //查询
            queryName(id){            
                if(id==1){
                    this.queryAccessRecords()                 

                }
                else if(id==2){
                    
                }
                 else if(id==3){
                    
                }
               
            },                                                                                           
             //分页弹出框
            handleSizeChange2(val) {
                console.log(`每页 ${val} 条`);
                    this.pageSize=val
                    if(this.activeIndex=='0'){
                         this.queryAccessRecords() 
                    }
                    else if(this.activeIndex=='1'){
                    }
                    else if(this.activeIndex=='2'){
                    }
                   
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val   
                if(this.activeIndex=='0'){
                     this.queryAccessRecords() 
                }
                else if(this.activeIndex=='1'){
                }
                else if(this.activeIndex=='2'){
                    }
               
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.AccessRecord{
    flex: 1;
    padding:50px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    .ClassManage-top{
        min-height:150px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        padding-top:20px;
        // visibility: hidden;
        h4{
            color: $haedColor;
            border-left: 2px solid $bcgColor;
            padding-left: 10px;
            margin-bottom: 10px;
        }
        .collegeNmaeBox{
            display: flex;
            width: 100%;
            min-height:32px;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
        }
        .collegeNmae{
            display: flex;
            min-height:32px;
            align-items: center;
            color: #333;
            
        }
        .collegeNmae2{
            margin-right: 10px;
            display: flex;
        }
        .spanName{
            color: $haedColor;
            margin-left: 10px;
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
            // overflow: hidden;
           .scheduleColor{
               color: #E01763;
           }  
            tr{
                padding:0 20px!important;
            }  
            th{
                color: $color;
            } 

            td{
            color: $haedColor;
            }
            .tableBox-time{
                display: flex;
                align-items: center;
               
            }
            .timeColor{
                color: #FF6C79;
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
    .VisibleLoginNmae{
        width: 100%;
        .span{
           
            min-width:40px;
        }
        span{
             display: inline-block;
        }
        margin-bottom:15px;
    }
   
}

</style>






