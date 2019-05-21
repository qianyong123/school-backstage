<template>
  <div class="ApplyRecord" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>申请记录</h4>
            <div style="flex:1;font-size:14px;">
                <el-tabs style="height:100%;width:100%;"  v-model="activeName" @tab-click="handleClick">                  
                <el-tab-pane label="调寝" name="调寝">  
                    <div class="collegeNmaeBox">                                
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select1" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item.label"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">申请时间：</span>
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
                        <el-button @click="setRecord" size="small" icon="el-icon-setting"></el-button>   
                    </div>
                </el-tab-pane>
                <el-tab-pane label="物品出楼" name="物品出楼">
                    <div class="collegeNmaeBox">
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select2" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types1"
                                :key="index"
                                :label="item.label"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">预定时间：</span>
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
                            format="yyyy/MM/dd"
                            :clearable="false"
                            value-format="timestamp"
                            placeholder="年/月/日">
                            </el-date-picker>
                            
                            <el-input
                            placeholder="姓名/学号"
                            v-model="value2"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(2)" size="small">查询</el-button>
                        </div>                    
                        <el-button @click="setRecord" size="small" icon="el-icon-setting"></el-button>                        
                    </div>
                                                                
                </el-tab-pane>
                <el-tab-pane label="报修" name="报修">
                    <div class="collegeNmaeBox">                                      
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select3" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types1"
                                :key="index"
                                :label="item.label"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">申请时间：</span>
                            <el-date-picker
                            v-model="timevalue5"
                            type="date"
                            style="width:120px"
                            format="yyyy/MM/dd"
                            :clearable="false"
                            value-format="timestamp"
                            placeholder="年/月/日">
                            </el-date-picker>
                            <span style="margin:0 5px;">-</span>
                            <el-date-picker
                            v-model="timevalue6"
                            type="date"
                            style="width:120px"
                            format="yyyy/MM/dd"
                            :clearable="false"
                            value-format="timestamp"
                            placeholder="年/月/日">
                            </el-date-picker>
                            
                            <el-input
                            placeholder="姓名/学号"
                            v-model="value3"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(3)" size="small">查询</el-button>
                        </div>                    
                        <el-button @click="setRecord" size="small" icon="el-icon-setting"></el-button>  
                                                                       
                    </div>   
                </el-tab-pane>
                <el-tab-pane label="被访" name="被访">
                    <div class="collegeNmaeBox">  
                        
                       <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select4" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types1"
                                :key="index"
                                :label="item.label"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">预定时间：</span>
                            <el-date-picker
                            v-model="timevalue7"
                            type="date"
                            style="width:120px"
                            format="yyyy/MM/dd"
                            :clearable="false"
                            value-format="timestamp"
                            placeholder="年/月/日">
                            </el-date-picker>
                            <span style="margin:0 5px;">-</span>
                            <el-date-picker
                            v-model="timevalue8"
                            type="date"
                            style="width:120px"
                            format="yyyy/MM/dd"
                            :clearable="false"
                            value-format="timestamp"
                            placeholder="年/月/日">
                            </el-date-picker>
                            
                            <el-input
                            placeholder="姓名/学号"
                            v-model="value4"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(4)" size="small">查询</el-button>
                        </div>                    
                        <el-button @click="setRecord" size="small" icon="el-icon-setting"></el-button>  
                                            
                    </div> 
                </el-tab-pane>
                <el-tab-pane label="请假" name="请假">
                    <div class="collegeNmaeBox">  
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select5" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types1"
                                :key="index"
                                :label="item.label"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">申请时间：</span>
                            <el-date-picker
                            v-model="timevalue9"
                            type="date"
                            style="width:120px"
                            format="yyyy/MM/dd"
                            :clearable="false"
                            value-format="timestamp"
                            placeholder="年/月/日">
                            </el-date-picker>
                            <span style="margin:0 5px;">-</span>
                            <el-date-picker
                            v-model="timevalue10"
                            type="date"
                            style="width:120px"
                            :clearable="false"
                            format="yyyy/MM/dd"
                            value-format="timestamp"
                            placeholder="年/月/日">
                            </el-date-picker>
                            
                            <el-input
                            placeholder="姓名/学号"
                            v-model="value5"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(5)" size="small">查询</el-button>
                        </div>                    
                        <el-button @click="setRecord" size="small" icon="el-icon-setting"></el-button>  
                               
                    </div>
                </el-tab-pane>
            </el-tabs>
            </div>
          
        </div>
        <div class="ClassManage-main">
            <div class="tableBox">
                <el-table               
                    v-loading="loading"               
                     element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    :data="tableData"                
                    stripe      
                    tooltip-effect="dark"                   
                    height="100%"                 
                    style="width:100%;">   
                   <el-table-column
                   width="30"
                    >
                    <template slot-scope="scope">
                        <div style=" visibility: hidden;">{{scope.$index}}</div>
                    </template>
                   
                    </el-table-column>           
                    <el-table-column
                    v-for="(item,index) in dataHeader"
                    :key="index"
                    :prop="item.props"
                    :label="item.name"
                   >                 
                    </el-table-column>
                    <el-table-column :label="'处理状态'" width="250">
                        <template slot-scope="scope">
                            <div v-show="activeIndex==0">                               
                                <span :class="{scheduleColor:scope.row.applyChangeBedApprovalResult=='0'}"> {{scope.row.applyChangeBedApprovalResult | applyLeaveApprovalResults2}}</span>
                            </div>  
                            <div v-show="activeIndex==1">                               
                                <span :class="{scheduleColor:scope.row.applyGoodsApprovalResult=='0'}"> {{scope.row.applyGoodsApprovalResult | applyLeaveApprovalResults}}</span>
                            </div>   
                             <div v-show="activeIndex==2">                               
                                <span :class="{scheduleColor:scope.row.applyRepairApprovalResult=='0'}"> {{scope.row.applyRepairApprovalResult | applyLeaveApprovalResults}}</span>
                            </div>   
                             <div v-show="activeIndex==3">                               
                                <span :class="{scheduleColor:scope.row.applyVisitorApprovalResult=='0'}"> {{scope.row.applyVisitorApprovalResult | applyLeaveApprovalResults}}</span>
                            </div>  
                             <div v-show="activeIndex==4">                               
                                <span :class="{scheduleColor:scope.row.applyLeaveApprovalResult=='0'}"> {{scope.row.applyLeaveApprovalResult | applyLeaveApprovalResults}}</span>
                            </div>                    
                        </template>
                    </el-table-column>
                    
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="handleEdit(scope, scope.row)">查看</p>
                                    <p @click="adminLog(scope.$index, scope.row)">处理日志</p>                                  
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
         <!-- 逾期弹框 -->
        <el-dialog
        :title="'逾期设置'"
        :visible.sync="overdueSet"
        width="320px"
        center>
        <div class="overdueSet">             
            超过
            <el-input
            placeholder=""
            type="number"
            v-model="setValue1"
            style="width:80px;margin:0 5px;"         
            >
            </el-input>
            日未处理，则为逾期
        </div>        
        <span slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="overdueConfirm" size="small">确 定</el-button>
            <el-button @click="overdueSet=false" size="small">取 消</el-button>
        </span>
        </el-dialog> 
        <!-- 查看 -->
        <new-students 
        :newVisible='newVisible'
        :popupTitle='popupTitle'
        :allcollege='allcollege' 
        :studentInfoMsg='studentInfoMsg'
        :schedule='schedule'      
        @newCall='newCall'
        @examineNotarize='examineNotarize'    
        :newName='newName'
        ref="child"
        ></new-students>  
        <!-- 日志 -->
        <el-dialog
        title="日志"
        :visible.sync="VisibleLogin"
        width="700px"
        center>
        <el-table               
            v-loading="loading2"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData2"                
            stripe                         
            height="500"                     
            style="width:100%;">   
            <!-- <el-table-column
            width="30"
            >
            <template slot="header" slot-scope="scope">
                <div style=" visibility: hidden;">{{scope.$index}}</div>
            </template>
            
            </el-table-column>            -->
            <el-table-column
            v-for="(item,index) in Students6"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >                 
            </el-table-column>       
        </el-table>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="VisibleLogin = false">取 消</el-button>
            <el-button type="primary" @click="VisibleLogin = false">确 定</el-button>
        </span> -->
        </el-dialog>
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
 queryApplyLeave,
 updateApplyLeave,
 updateOverdue,
 handleApplyLeave,
 queryApplyVisitor,
 updateApplyVisitor,
 updateOverdueForApplyVisitor,
 handleApplyVisitor,
 queryApplyRepair,
 updateApplyRepair,
 updateOverdueForApplyRepair,
 handleApplyRepair,
 queryApplyGoods,
 updateApplyGoods,
 updateOverdueForApplyGoods,
 handleApplyGoods,
 queryApplyChangeBed,
 handleApplyChangeBed,
 updateApplyChangeBed,
 updateOverdueForApplyChangeBed
} from '@/axios/api'
const Students1=[
            {name:'姓名',props:'studentInfoName'},      
            {name:'学号',props:'studentInfoNo'},
            {name:'房间信息',props:'roomMsg'},
            {name:'辅导员信息',props:'teacherInfoMsg'},    
            // {name:'处理状态',props:'parentMsg'},                    
        ]
const Students2=[
           {name:'姓名',props:'studentInfoName'},      
            {name:'学号',props:'studentInfoNo'},
            {name:'房间信息',props:'roomMsg'},
            {name:'预定出楼时间',props:'applyGoodsOutTime'},    
            {name:'物品类型',props:'applyGoodsType'},  
            // {name:'处理状态',props:'parentMsg'},  
        ]
const Students3=[
             {name:'姓名',props:'studentInfoName'},      
            {name:'学号',props:'studentInfoNo'},
            {name:'房间信息',props:'roomMsg'},
            {name:'报修标题',props:'applyRepairType'},    
            // {name:'处理状态',props:'parentMsg'},  
        ]
const Students4=[
        {name:'姓名',props:'studentInfoName'},      
        {name:'学号',props:'studentInfoNo'},
        {name:'房间信息',props:'roomMsg'},
        {name:'预定访问时间',props:'applyVisitorTime'},    
        // {name:'处理状态',props:'parentMsg'}, applyVisitorTime
    ]
    const Students5=[
        {name:'姓名',props:'studentInfoName'},      
        {name:'学号',props:'studentInfoNo'},
        {name:'班级信息',props:'classMsg'},
        {name:'请假事由',props:'applyLeaveInfo'},    
        // {name:'处理状态',props:'parentMsg'}, 
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
            activeIndex:'0',
            loading:true,
             loading2:false,
            newName:'1',
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
            Select1:'',
            Select2:'',
            Select3:'',
            Select4:'',
            Select5:'',
           
            
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
            //类型
            types: [
            {value: '',label: '全部',name:''}, 
            {value: '0',label: '待审核',name:'待审核'}, 
            {value: '1',label: '待调寝',name:'待调寝'}, 
            {value: '2',label: '驳回',name:'驳回'}, 
            {value: '3',label: '逾期',name:'逾期'}, 
            {value: '4',label: '调寝完毕',name:'调寝完毕'}, 
            ],
             types1: [
            {value: '',label: '全部',name:''}, 
            {value: '0',label: '待审核',name:'待审核'}, 
            {value: '2',label: '驳回',name:'驳回'}, 
            {value: '1',label: '审核通过',name:'审核通过'}, 
            {value: '3',label: '逾期',name:'逾期'}, 
            ],
             //状态
            types2: [
            {value: '',label: '全部',name:''}, 
            {value: '2',label: '在线',name:'在线'}, 
            {value: '3',label: '离线',name:'离线'}, 
            ],
             //保修期
            types3: [
            {value: '',label: '全部',name:''}, 
            {value: '2',label: '在保',name:'在保'}, 
            {value: '3',label: '过保',name:'过保'}, 
            {value: '4',label: '即将过保',name:'即将过保'}, 

            ],        
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
            tableData: [],
            tableData2: [                  
                                
               
            ],
            roleInfoMenu:[],
            roleId:null,
            popupTitle:'',
            roleId:1,
            userInfoId:1,
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
            applyLeaveApprovalResults(name){          
            
                if(name==0){
                    return '待审核'
                }
                else if(name==1){
                    return '审核通过'
                }
                else if(name==2){
                    return '驳回'
                }
                else if(name==3){
                    return '逾期'
                }
            },
            applyLeaveApprovalResults2(name){          
            
                if(name==0){
                    return '待审核'
                }
                else if(name==1){
                    return '待调寝'
                }
                else if(name==2){
                    return '驳回'
                }
                else if(name==3){
                    return '逾期'
                }
                else if(name==4){
                    return '调寝完成'
                }
            }
        },
        mounted() {
            this.queryApplyChangeBeds()
            this.dataHeader=Students1
            this.loading=false
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            bus.$on('newCall',this.newCall)
            this.roleId=localStorage.getItem('roleId')
            this.userInfoId=localStorage.getItem('userInfoId')  
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
            let type=this.$route.params.type
              console.log(this.roleInfoMenu,type)
               let roleId=localStorage.getItem('roleId')  
                this.roleId=roleId
               if(this.roleInfoMenu.length<1){  
                   if(roleId==1){
                       return
                   }                       
                    queryMenuById({roleId}).then(res=>{     
                        console.log('权限菜单',)                   
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
                         return this.roleInfoMenu[6].indexOf('7')==-1?false:true
                    }
                    
                }
            }
        },
         watch: {
             activeIndex(){                     
                this.pageNum=1
                this.tableData=[]
                this.loading=true     
                 this.total=0       
                console.log(this.activeName)
                if(this.activeName=='调寝'){
                    this.dataHeader=Students1
                    this.newName=1
                   this.queryApplyChangeBeds()
                }
                else if(this.activeName=='物品出楼'){
                    this.dataHeader=Students2
                    this.newName=2
                    this.queryApplyGoodss()
                }
                  else if(this.activeName=='报修'){
                    this.dataHeader=Students3
                    this.newName=3
                    this.queryApplyRepairs()
                }
                  else if(this.activeName=='被访'){
                    this.dataHeader=Students4   
                    this.newName=4  
                    this.queryApplyVisitors()       
                }
                  else if(this.activeName=='请假'){
                    this.dataHeader=Students5
                    this.newName=5
                    this.queryApplyLeaves()
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
             //查询调寝
           queryApplyChangeBeds(){
               this.loading=true 
               queryApplyChangeBed({
                   pageNum:this.pageNum,
                   pageSize:this.pageSize,
                   ApplyChangeBedApprovalResult :this.Select1,
                   ApplyChangeBedPutTime_start  :this.timevalue1,
                   ApplyChangeBedPutTime_end  :this.timevalue2,
                   studentNameOrNo:this.value1
               }).then(res=>{
                   console.log('调寝',res)
                    this.loading=false 
                   if(res.data.code==200){
                       this.tableData=res.data.data.list
                        this.total=res.data.data.total
                   }else{
                       this.open('查询失败'+res.data.msg)
                   }
               })
           },
            //查询物品出楼
           queryApplyGoodss(){
               this.loading=true 
               queryApplyGoods({
                   pageNum:this.pageNum,
                   pageSize:this.pageSize,
                   applyGoodsApprovalResult:this.Select2,
                   applyGoodsOutTime_start :this.timevalue3,
                   applyGoodsOutTime_end :this.timevalue4,
                   studentNameOrNo :this.value2
               }).then(res=>{
                   console.log('物品出楼',res)
                    this.loading=false 
                   if(res.data.code==200){
                       this.tableData=res.data.data.list
                        this.total=res.data.data.total
                   }else{
                       this.open('查询失败'+res.data.msg)
                   }
               })
           },
           //查询请假
           queryApplyLeaves(){
               this.loading=true 
               queryApplyLeave({
                   pageNum:this.pageNum,
                   pageSize:this.pageSize,
                   applyLeaveApprovalResult:this.Select5,
                   applyLeaveStartTime_start:this.timevalue9,
                   applyLeaveStartTime_end:this.timevalue10,
                   studentNameOrNo:this.value5
               }).then(res=>{
                   console.log('请假',res)
                    this.loading=false 
                   if(res.data.code==200){
                       this.tableData=res.data.data.list
                        this.total=res.data.data.total
                   }else{
                       this.open('查询失败'+res.data.msg)
                   }
               })
           },
           //查询被访
           queryApplyVisitors(){
               queryApplyVisitor({
                   pageNum:this.pageNum,
                   pageSize:this.pageSize,
                   applyVisitorApprovalResult :this.Select4,
                   applyVisitorTime_start :this.timevalue7,
                   applyVisitorTime_end :this.timevalue8,
                   studentNameOrNo:this.value4
               }).then(res=>{
                   console.log('被访',res)
                    this.loading=false 
                   if(res.data.code==200){
                       this.tableData=res.data.data.list
                        this.total=res.data.data.total
                   }else{
                       this.open('查询失败'+res.data.msg)
                   }
               })
           },
             //查询报修
           queryApplyRepairs(){
               queryApplyRepair({
                   pageNum:this.pageNum,
                   pageSize:this.pageSize,
                   applyRepairApprovalResult  :this.Select3,
                   applyRepairPutTime_start  :this.timevalue5,
                   applyRepairPutTime_end  :this.timevalue6,
                   studentNameOrNo:this.value3
               }).then(res=>{
                   console.log('报修',res)
                    this.loading=false 
                   if(res.data.code==200){
                       this.tableData=res.data.data.list
                        this.total=res.data.data.total
                   }else{
                       this.open('查询失败'+res.data.msg)
                   }
               })
           },
            //设置
            setRecord(){
                this.setValue1=''
                this.overdueSet=true
               
            },     
            //请假逾期设置保存
            overdueConfirm(){
                let  numbers=/^[0-9]*$/;
                if(numbers.test(this.setValue1)&&this.setValue1!=''){
                    if(this.activeIndex==0){
                        updateOverdueForApplyChangeBed({verdueoType:this.setValue1}).then(res=>{
                        this.overdueSet=false
                            if(res.data.code==200){
                                this.open2('设置成功')
                                this.queryApplyChangeBeds()
                            }else{
                                this.open('设置失败 '+res.data.msg)
                            }
                        })
                    }
                    else if(this.activeIndex==1){
                         updateOverdueForApplyGoods({verdueoType:this.setValue1}).then(res=>{
                        this.overdueSet=false
                            if(res.data.code==200){
                                this.open2('设置成功')
                                this.queryApplyGoodss()
                            }else{
                                this.open('设置失败 '+res.data.msg)
                            }
                        })
                    }
                    else if(this.activeIndex==2){
                         updateOverdueForApplyRepair({verdueoType:this.setValue1}).then(res=>{
                        this.overdueSet=false
                            if(res.data.code==200){
                                this.open2('设置成功')
                                this.queryApplyRepairs()
                            }else{
                                this.open('设置失败 '+res.data.msg)
                            }
                        })
                    }
                    else if(this.activeIndex==3){
                        updateOverdueForApplyVisitor({verdueoType:this.setValue1}).then(res=>{
                        this.overdueSet=false
                            if(res.data.code==200){
                                this.open2('设置成功')
                                this.queryApplyVisitors()
                            }else{
                                this.open('设置失败 '+res.data.msg)
                            }
                        })
                    }
                    else if(this.activeIndex==4){
                        updateOverdue({verdueoType:this.setValue1}).then(res=>{
                        this.overdueSet=false
                            if(res.data.code==200){
                                this.open2('设置成功')
                                this.queryApplyLeaves()
                            }else{
                                this.open('设置失败 '+res.data.msg)
                            }
                        })
                     }
                   
                }else{
                     this.open('请输入数字！ ')
                }
                console.log(this.setValue1)
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
            //审批确认
            examineNotarize(val,redio){
                console.log('审批确认  '+val,redio)
                if(this.activeIndex=='0'){
                    let redio2=redio
                    if(redio2==1&&this.schedule==1){
                        redio2=4
                    }
                     updateApplyChangeBed({
                        applyChangeBedId :this.studentInfoMsg.applyChangeBedId   ,
                        housemasterInfoId:this.userInfoId,
                        ApplyChangeBedApprovalResult:redio2,
                        ApplyChangeBedApprovalInfo :val
                        }).then(res=>{                     
                            this.newVisible=false
                            if(res.data.code==200){
                                this.queryApplyChangeBeds()
                                this.open2('审核成功')
                            }else{
                            this.open('审核失败'+res.data.msg) 
                            }
                        }) 
                }
                else if(this.activeIndex=='1'){
                     updateApplyGoods({
                        applyGoodsId   :this.studentInfoMsg.applyGoodsId   ,
                        housemasterInfoId:this.userInfoId,
                        applyGoodsApprovalResult:redio,
                        applyGoodsApprovalInfo:val
                        }).then(res=>{                     
                            this.newVisible=false
                            if(res.data.code==200){
                                this.queryApplyGoodss()
                                this.open2('审核成功')
                            }else{
                            this.open('审核失败'+res.data.msg) 
                            }
                        })  
                }
                else if(this.activeIndex=='2'){
                      updateApplyRepair({
                        applyRepairId  :this.studentInfoMsg.applyRepairId  ,
                        housemasterInfoId:this.userInfoId,
                        applyVisitorApprovalResult:redio,
                        applyRepairApprovalInfo:val
                        }).then(res=>{                     
                            this.newVisible=false
                            if(res.data.code==200){
                                this.queryApplyRepairs()
                                this.open2('审核成功')
                            }else{
                            this.open('审核失败'+res.data.msg) 
                            }
                        })            
                }
                 else if(this.activeIndex=='3'){
                    updateApplyVisitor({
                        applyVisitorId :this.studentInfoMsg.applyVisitorId ,
                        housemasterInfoId :this.userInfoId,
                        applyVisitorApprovalResult :redio,
                        applyVisitorApprovalInfo:val
                        }).then(res=>{                     
                            this.newVisible=false
                            if(res.data.code==200){
                                this.queryApplyVisitors()
                                this.open2('审核成功')
                            }else{
                            this.open('审核失败'+res.data.msg) 
                            }
                        }) 
                }
                else if(this.activeIndex=='4'){
                    updateApplyLeave({
                        applyLeaveId:this.studentInfoMsg.applyLeaveId,
                        teacherInfoId:this.userInfoId,
                        applyLeaveApprovalResult:redio,
                        applyLeaveApprovalInfo:val
                    }).then(res=>{                     
                        this.newVisible=false
                        if(res.data.code==200){
                            this.queryApplyLeaves()
                            this.open2('审核成功')
                        }else{
                           this.open('审核失败'+res.data.msg) 
                        }
                    })                            
                }
            },
            //查询
            queryName(id){            
                if(id==1){               
                    this.queryApplyChangeBeds()
                }
                else if(id==2){
                     console.log(`查询${id}`,)
                     this.queryApplyGoodss()
                }
                else if(id==3){
                     console.log(`查询${id}`,)
                     this.queryApplyRepairs()
                }
                 else if(id==4){
                     console.log(`查询${id}`,)
                     this.queryApplyVisitors()
                }
                  else if(id==5){
                     this.queryApplyLeaves()
                }
            },      
            //取消模态框
            newCall(){
                this.newVisible=false
            },                                    
                  
            //点击查看
            handleEdit(scope,row){
                console.log('查看',row)
                this.newVisible=true
                 this.studentInfoMsg=row     
                if(this.activeIndex=='0'){
                    this.popupTitle='调寝申请'  
                    this.schedule=row.applyChangeBedApprovalResult                                    
                }
                else if(this.activeIndex=='1'){
                    this.popupTitle='物品出楼申请'   
                    this.schedule=row.applyGoodsApprovalResult              
                }
                else if(this.activeIndex=='2'){
                    this.schedule=row.applyRepairApprovalResult              
                   this.popupTitle='报修申请'
                }
                 else if(this.activeIndex=='3'){
                    this.popupTitle='被访申请'  
                    this.schedule=row.applyVisitorApprovalResult  
                }
                  else if(this.activeIndex=='4'){
                    this.popupTitle='请假申请'
                    this.schedule=row.applyLeaveApprovalResult                             
                }
            },                  
            //日志
            adminLog(scope,row){   
                this.VisibleLogin=true  
                            
                if(this.activeIndex=='0'){                 
                   handleApplyChangeBed({
                         applyChangeBedId:row.applyChangeBedId   
                        }).then(res=>{
                            if(res.data.code==200){
                                this.tableData2=res.data.data
                            }else{
                                this.open('查询日志失败'+res.data.msg)
                         }
                     })
                }
                else if(this.activeIndex=='1'){
                     handleApplyGoods({
                         applyGoodsId :row.applyGoodsId  
                        }).then(res=>{
                            if(res.data.code==200){
                                this.tableData2=res.data.data
                            }else{
                                this.open('查询日志失败'+res.data.msg)
                         }
                     })
                }
                else if(this.activeIndex=='2'){
                    handleApplyRepair({
                         applyRepairId:row.applyRepairId 
                     }).then(res=>{
                         if(res.data.code==200){
                             this.tableData2=res.data.data
                         }else{
                             this.open('查询日志失败'+res.data.msg)
                         }
                     })
                   
                }
                 else if(this.activeIndex=='3'){
                      handleApplyVisitor({
                         applyVisitorId :row.applyVisitorId
                     }).then(res=>{
                         if(res.data.code==200){
                             this.tableData2=res.data.data
                         }else{
                             this.open('查询日志失败'+res.data.msg)
                         }
                     })
                }
                 else if(this.activeIndex=='4'){
                     handleApplyLeave({
                         applyLeaveId:row.applyLeaveId
                     }).then(res=>{
                         if(res.data.code==200){
                             this.tableData2=res.data.data
                         }else{
                             this.open('查询日志失败'+res.data.msg)
                         }
                     })
                }
            },
             //分页弹出框
            handleSizeChange2(val) {
                console.log(`每页 ${val} 条`);
                    this.pageSize=val
                    if(this.activeIndex=='0'){
                        this.queryApplyChangeBeds()
                    }
                    else if(this.activeIndex=='1'){
                        this.queryApplyGoodss()
                    }
                    
                    else if(this.activeIndex=='2'){
                     this.queryApplyRepairs()
                    }
                    else if(this.activeIndex=='3'){
                        this.queryApplyVisitors()
                    }
                    else if(this.activeIndex=='4'){
                        this.queryApplyLeaves()
                    }
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val   
                if(this.activeIndex=='0'){
                    this.queryApplyChangeBeds()
                }
                else if(this.activeIndex=='1'){
                    this.queryApplyGoodss()
                }
                else if(this.activeIndex=='2'){
                     this.queryApplyRepairs()
                }
                 else if(this.activeIndex=='3'){
                    this.queryApplyVisitors()
                }
                 else if(this.activeIndex=='4'){
                     this.queryApplyLeaves()
                }
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';
.ApplyRecord{
    flex: 1;
    padding:50px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
   
    .ClassManage-top{
        min-height:150px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        padding-top:20px;
        // flex-wrap: wrap;
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
        overflow: hidden;        
        .tableBox{
            flex: 1;         
            border-radius:15px 15px 0 0;
            overflow: hidden; 
           .scheduleColor{
               color: #E01763;
           }  
            // tr{
            //     padding:0 20px!important;
            // }  
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
   
}

</style>






