<template>
  <div class="Alarm" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>报警管理</h4>
            <div style="flex:1;font-size:14px;">
                <el-tabs style="height:100%;width:100%;"  v-model="activeName" @tab-click="handleClick">                  
                <el-tab-pane label="未归" name="未归" v-if="navjurisdiction(1)">  
                    <div class="collegeNmaeBox">                                
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select1" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">监测时间：</span>
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
                            format="yyyy/MM/dd"
                            :clearable="false"
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
                        <div>
                            <el-button @click="setRecord(1)" size="small" icon="el-icon-setting"></el-button>   
                             <el-button size="small" icon="el-icon-upload2"></el-button>   
                        </div>                  
                    </div>
                </el-tab-pane>
                <el-tab-pane label="晚归" name="晚归" v-if="navjurisdiction(2)">
                    <div class="collegeNmaeBox">
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select2" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">监测时间：</span>
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
                         <div>
                            <el-button @click="setRecord(2)" size="small" icon="el-icon-setting"></el-button>   
                             <el-button  size="small" icon="el-icon-upload2"></el-button>   
                        </div>                           
                    </div>
                                                                
                </el-tab-pane>
                <el-tab-pane label="无记录" name="无记录" v-if="navjurisdiction(3)">
                    <div class="collegeNmaeBox">                                      
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select3" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">监测时间：</span>
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
                            <span class="spanName">无记录天数：</span>
                            <el-input                     
                            v-model="value3"
                            style="width:80px;"
                            type="number"
                            >
                            </el-input>
                             <span style="margin:0 5px;">-</span>
                            <el-input                         
                            v-model="value3"
                            type="number"
                            style="width:80px;"
                           >
                            </el-input>
                            <el-input
                            placeholder="姓名/学号"
                            v-model="value3"
                            style="width:120px;margin:0 10px;"
                           >
                            </el-input>
                            <el-button @click="queryName(3)" size="small">查询</el-button>
                        </div>                    
                        <div>
                            <el-button @click="setRecord(3)" size="small" icon="el-icon-setting"></el-button>   
                             <el-button size="small" icon="el-icon-upload2"></el-button>   
                        </div>                                            
                    </div>   
                </el-tab-pane>
                <el-tab-pane label="连进连出" name="连进连出" v-if="navjurisdiction(4)">
                    <div class="collegeNmaeBox">  
                        
                       <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select3" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">监测时间：</span>
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
                            <span class="spanName">无记录天数：</span>
                            <el-input                     
                            v-model="value3"
                            style="width:80px;"
                            type="number"
                            >
                            </el-input>
                             <span style="margin:0 5px;">-</span>
                            <el-input                         
                            v-model="value3"
                            type="number"
                            style="width:80px;"
                           >
                            </el-input>
                            <el-input
                            placeholder="姓名/学号"
                            v-model="value3"
                            style="width:120px;margin:0 10px;"
                           >
                            </el-input>
                            <el-button @click="queryName(3)" size="small">查询</el-button>                     
                        </div>                    
                         <div>
                            <el-button @click="setRecord(4)" size="small" icon="el-icon-setting"></el-button>   
                             <el-button size="small" icon="el-icon-upload2"></el-button>   
                        </div>    
                                            
                    </div> 
                </el-tab-pane>
                <el-tab-pane label="翻越" name="翻越" v-if="navjurisdiction(5)">
                    <div class="collegeNmaeBox">  
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0">监测时间：</span>
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
                            <el-button style="margin-left:10px;" @click="queryName(5)" size="small">查询</el-button>
                        </div>                    
                         <div>
                            <el-button @click="setRecord(5)" size="small" icon="el-icon-setting"></el-button>   
                             <el-button size="small" icon="el-icon-upload2"></el-button>   
                        </div>                                    
                    </div>
                </el-tab-pane>
                  <el-tab-pane label="尾随" name="尾随" v-if="navjurisdiction(6)">
                    <div class="collegeNmaeBox">  
                        <div class="collegeNmae">
                           <span class="spanName" style="margin-left:0">监测时间：</span>
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
                            <el-button style="margin-left:10px;" @click="queryName(5)" size="small">查询</el-button>
                        </div>                    
                        <div>
                            <el-button @click="setRecord(6)" size="small" icon="el-icon-setting"></el-button>   
                             <el-button  size="small" icon="el-icon-upload2"></el-button>   
                        </div>   
                    </div>
                </el-tab-pane>
                  <el-tab-pane label="黑名单" name="黑名单" v-if="navjurisdiction(7)">
                    <div class="collegeNmaeBox">  
                        <div class="collegeNmae">
                            
                            <span class="spanName" style="margin-left:0;">处理情况：</span>
                             <el-select style="width:120px;" v-model="Select5" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                           
                            <span class="spanName">监测时间：</span>
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
                            
                            <el-button style="margin-left:10px;" @click="queryName(5)" size="small">查询</el-button>
                        </div>                    
                        <div>
                            <el-button @click="setRecord(7)" size="small" icon="el-icon-setting"></el-button>   
                             <el-button size="small" icon="el-icon-upload2"></el-button>   
                        </div>   
                    </div>
                </el-tab-pane>
                  <el-tab-pane label="访客超时" name="访客超时" v-if="navjurisdiction(8)">
                    <div class="collegeNmaeBox">  
                        <div class="collegeNmae">
                             <span class="spanName" style="margin-left:0">监测时间：</span>
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
                            <el-button style="margin-left:10px;" @click="queryName(5)" size="small">查询</el-button>
                        </div>                    
                         <div>
                            <el-button @click="setRecord(8)" size="small" icon="el-icon-setting"></el-button>   
                             <el-button  size="small" icon="el-icon-upload2"></el-button>   
                        </div>   
                    </div>
                </el-tab-pane>
                  <el-tab-pane label="设备异常" name="设备异常" v-if="navjurisdiction(9)">
                    <div class="collegeNmaeBox">  
                        <div class="collegeNmae">
                            <span class="spanName" style="margin-left:0">监测时间：</span>
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
                             <span class="spanName">设备类型：</span>
                             <el-select style="width:120px;" v-model="Select6" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types2"
                                :key="index"
                                :label="item.name"                            
                                :value="item.value">
                                </el-option>
                            </el-select> 
                            <el-button style="margin-left:10px;" @click="queryName(5)" size="small">查询</el-button>
                        </div>                                       
                        <el-button @click="setRecord(9)" size="small" icon="el-icon-setting"></el-button>                                                    
                    </div>
                </el-tab-pane>
            </el-tabs>
            </div>
          
        </div>
        <div class="ClassManage-main">
            <!-- 表格数据 -->
            <table-datas
            :tableData='tableData'
            :dataHeader='dataHeader'
            :activeName='activeName'
            :roleInfoMenu='roleInfoMenu'
            :roleId='roleId'  
            :loading='loading' 
            :deleteId='deleteId'  
            @clickOperate='clickOperate'
            @handleEdit='handleEdit'     
            ></table-datas>
            <!-- 分页 -->
            <paginations     
            @handleCurrentChange='handleCurrentChange'
            :total='total'
            ></paginations>
        </div>
         <!-- 设置推送方式 -->
        <el-dialog
        :title="setName"
        :visible.sync="overdueSet"
        width="475px"
        center>
        <div v-if="activeName!='访客超时'" class="overdueSets">             
           <div v-if="activeName=='未归'">一旦未归，将向指定人员推送消息</div>
           <div v-else-if="activeName=='翻越'">一旦翻越，将向指定人员推送消息</div>
           <div v-else-if="activeName=='尾随'">一旦尾随，将向指定人员推送消息</div>
            <div v-else-if="activeName=='黑名单'">一旦出现，将向指定人员推送消息</div>
            <div v-else-if="activeName=='设备异常'">一旦出现，将向指定人员推送消息</div>
           <div v-else-if="pushTimes">
               <span>连续</span>
               <el-input v-model="pushinput" style="width:80px;margin:0 5px;" type="number"></el-input>
               <span>{{pushNames}}，将向指定人员推送消息</span>
            </div>    
                  
           <div class="pushLists">
               <span class="span">推送方式</span>
                <el-select style="width:300px" v-model="pushType" placeholder="请选择">
                    <el-option
                    v-for="item in pushList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    </el-option>
                </el-select>
           </div>
           <div class="pushLists">
               <span class="span">推送人员</span>
                  <el-select @change="handPushList" style="width:300px" v-model="pushStaff" multiple placeholder="请选择">
                    <el-option
                    v-for="item in pushListType"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    </el-option>
                </el-select>
           </div>         
        </div>  
        <div v-else class="overdueSets">
            <div>
                <span>来访人员通过</span>
                 <el-time-picker
                    style="width:120px;"
                    placeholder="选择时间"
                    v-model="setTime"
                    :picker-options="{
                    selectableRange: '00:00:00 - 23:59:00'
                    }"
                   >
                </el-time-picker>
               
                <span>未离开，将向宿管、学生推送消息</span>
            </div>
             <div class="pushLists">
               <span class="span">推送方式</span>
                <el-select style="width:200px" v-model="pushType" placeholder="请选择">
                    <el-option
                    v-for="item in pushList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    </el-option>
                </el-select>
           </div>
        </div>      
        <span slot="footer" class="dialog-footer">
            <el-button  type="primary" @click="overdueConfirm" size="small">确 定</el-button>
            <el-button @click="overdueSet=false" size="small">取 消</el-button>
        </span>
        </el-dialog> 
        <!-- 查看详情 -->
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
import tableDatas from './tableDatas'
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
 handleApplyVisitor
} from '@/axios/api'

export default {
    name:"ClassManage",
    components:{
        Paginations,
        newStudents,
        tableDatas
    },
    data(){
        return{
            activeName:"未归",
            activeIndex:'0',
            loading:true,
            loading2:false,
            setName:'',//推送top
            pushType:null,//推送方式
            pushStaff:[1,2,3,4],//推送人员
            setTime:null,// 访客时间
            pushinput:null,
            pushNames:'',
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
            Select1:0,
            Select2:0,
            Select3:0,
            Select4:0,
            Select5:0,
            Select6:0,
           
            
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
            // {value:null,name:'全部'}, 
            {value:0,name:'未处理'}, 
            {value:1,name:'已处理'}, 
            
            
            ],
             //设备类型
            types2: [
            // {value:null,name:'全部'}, 
            {value: 0,name:'摄像头'}, 
            {value: 1,name:'赤眸'}, 
             {value:2,name:'闸机'}, 
            {value:3,name:'大屏'},
            
            ],
            types1: [
            {value: '',label: '全部',name:''}, 
            {value: '2',label: '待审核',name:'待审核'}, 
            {value: '3',label: '驳回',name:'驳回'}, 
            {value: '4',label: '待调寝',name:'待调寝'}, 
            {value: '5',label: '调寝完毕',name:'调寝完毕'}, 
            {value: '6',label: '逾期',name:'逾期'}, 
            ],
            //推送方式
            pushList: [
            {value: null, name:'全部'}, 
            {value: 1,name:'短信'}, 
            {value: 2,name:'微信'}, 
            {value: 3,name:'不推送'}, 
            ],
            //推送人员         
            pushListType:[], 
            pushList2: [
                {value: 1,name:'家长'}, 
                {value: 2,name:'学生'}, 
                {value: 3,name:'宿管'}, 
                {value: 4,name:'辅导员'}, 
                {value: 5,name:'院系管理员'}, 
                {value: 6,name:'系统管理员'}, 
            ],                  
             
            pushList3: [
                
                {value: 3,name:'宿管'}, 
                 
                {value: 6,name:'系统管理员'}, 
            ], 
            //所有区域
                allarea: [             
            
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
            tableData: [
                // {studentInfoName:'姓名',
                // props:'studentInfoName',
                // studentInfoNo:'学号',
                // studentInfoSex:'监测时间',
                // teacherMsg:'未归级别',
                // parentMsg:'处理意见',
                // teacherMsg:'处理时间',
                // parentMsg:'处理人',},                    
            ],
            tableData2: [  ],
            roleId:null,
            popupTitle:'',
            userInfoId:1,
            roleInfoMenu:[
               
            ],

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
            }
        },
        mounted() {
          
            // this.dataHeader=Students1
            this.loading=false
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            bus.$on('newCall',this.newCall)
            this.roleId=localStorage.getItem('roleId')
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
             this.userInfoId=localStorage.getItem('userInfoId')  
             let type=this.$route.params.type
            //  if(type){
            //      this.activeName=type
            //  }
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
             navjurisdiction(id){
                return function(id){
                    if(this.roleId==1){
                        return true
                    }
                    else if(this.roleInfoMenu.length<1){
                        return true
                    }
                    else if(id==1){
                       return this.roleInfoMenu[5].indexOf('未归')==-1?false:true
                    }
                   else if(id==2){
                       return this.roleInfoMenu[5].indexOf('晚归')==-1?false:true
                    }
                    else if(id==3){
                       return this.roleInfoMenu[5].indexOf('无记录')==-1?false:true
                    }
                     else if(id==4){
                       return this.roleInfoMenu[5].indexOf('连进连出')==-1?false:true
                    }
                    else if(id==5){
                       return this.roleInfoMenu[5].indexOf('翻越')==-1?false:true
                    }
                    else if(id==5){
                       return this.roleInfoMenu[5].indexOf('尾随')==-1?false:true
                    }
                    else if(id==5){
                       return this.roleInfoMenu[5].indexOf('黑名单')==-1?false:true
                    }
                    else if(id==5){
                       return this.roleInfoMenu[5].indexOf('访客超时')==-1?false:true
                    }
                    else if(id==5){
                       return this.roleInfoMenu[5].indexOf('设备异常')==-1?false:true
                    }
                }
            },
         
        },
         watch: {
             activeIndex(){                     
                this.pageNum=1
                // this.tableData=[]                    
                console.log(this.activeName)
                if(this.activeName=='未归'){
                    // this.dataHeader=Students1
                    this.newName=1
                  
                }
                else if(this.activeName=='翻越'){
                    // this.dataHeader=Students2
                    this.newName=2
                    this.loading=false  
                }
                  else if(this.activeName=='无记录'){
                    // this.dataHeader=Students3
                    this.newName=3
                    this.loading=false 
                }
                  else if(this.activeName=='连进连出'){
                    // this.dataHeader=Students4   
                    this.newName=4  
                }
                else if(this.activeName=='翻越'){
                    // this.dataHeader=Students5
                    this.newName=5
                }
                 else if(this.activeName=='尾随'){
                    // this.dataHeader=Students5
                    this.newName=6
                }
                 else if(this.activeName=='黑名单'){
                    // this.dataHeader=Students6
                    this.newName=7
                }
                 else if(this.activeName=='访问时间'){
                    // this.dataHeader=Students7
                    this.newName=8
                }
                 else if(this.activeName=='设备异常'){
                    // this.dataHeader=Students8
                    this.newName=9
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
            //显示表格图片
            isimg(name){
                if(this.activeName=='翻越'||this.activeName=='尾随'||this.activeName=='黑名单'){
                    return true
                }
                else false
            },
            //显示设置时间类型
            pushTimes(){
                if(this.activeName=='晚归 '||this.activeName=='无记录 '||this.activeName=='连进连出 '){
                    return true
                }
                else false
            },
            //推送人员事件
            handPushList(val){
                console.log(val)
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
            //设置
            setRecord(id){              
                this.pushinput=null
                if(id==1){
                    this.setName='未归推送设置'
                    this.pushType=null
                    this.pushStaff=[1,2,3,4]
                    this.pushListType=this.pushList2
                }
                else if(id==2){
                    this.setName='晚归推送设置'
                    this.pushType=2
                    this.pushStaff=[1,2,3,4]
                    this.pushListType=this.pushList2
                    this.pushNames='日晚归'
                }
                 else if(id==3){
                    this.setName='无记录推送设置'
                    this.pushType=2
                    this.pushStaff=[1,2,3,4]
                    this.pushListType=this.pushList2
                    this.pushNames='日无记录'
                }
                 else if(id==4){
                    this.setName='连进连出推送设置'
                    this.pushType=2
                    this.pushStaff=[3]
                    this.pushListType=this.pushList3
                    this.pushNames='次进/出'
                }
                 else if(id==5){
                    this.setName='翻越推送设置'
                    this.pushType=null
                    this.pushStaff=[3]
                    this.pushListType=this.pushList3
                }
                 else if(id==6){
                    this.setName='尾随推送设置'
                    this.pushType=null
                    this.pushStaff=[3]
                    this.pushListType=this.pushList3
                }
                 else if(id==7){
                    this.setName='黑名单推送设置'
                    this.pushType=null
                    this.pushStaff=[3,6]
                    this.pushListType=this.pushList3
                }
                 else if(id==8){
                    this.setName='访客超时推送设置'
                     this.pushType=2
                    // this.pushStaff=[2]
                    // this.pushListType=this.pushList3
                }
                 else if(id==9){
                    this.setName='设备异常推送设置'
                    this.pushType=null
                    this.pushStaff=[3]
                    this.pushListType=this.pushList3
                }
                
                this.overdueSet=true

            },     
            //请假逾期设置保存
            overdueConfirm(){
                let  numbers=/^[0-9]*$/;
                if(numbers.test(this.setValue1)&&this.setValue1!=''){
                    if(this.activeIndex==0){

                    }
                    else if(this.activeIndex==1){

                    }
                    else if(this.activeIndex==2){

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
            clickOperate(scope){
                console.log(scope)
                this.deleteId=scope.$index
            },
            //处理确认
            examineNotarize(val){
                console.log('处理确认  '+val)
                this.newVisible=false
                if(this.activeName=='未归'){
                }
                else if(this.activeName=='晚归'){
                }
                else if(this.activeName=='无记录'){
                                 
                }
                 else if(this.activeName=='连进连出'){
                }
                  else if(this.activeName=='黑名单'){
                }
            },
            //查询
            queryName(id){            
                if(id==1){               
                    console.log(this.timevalue1,this.timevalue2)
                }
                else if(id==2){
                     console.log(`查询${id}`,)
                }
                else if(id==3){
                     console.log(`查询${id}`,)
                }
                 else if(id==4){
                     console.log(`查询${id}`,)
                }
                  else if(id==5){
                }
            },      
            //取消模态框
            newCall(){
                this.newVisible=false
            },                                    
                  
            //点击查看和处理
            handleEdit(row,id){
                console.log('查看',row)
                if(id==1){
                    if(this.activeName=='黑名单'){
                          this.newName=3   
                    }
                    else this.newName=1                   
                }else{
                    if(this.activeName=='黑名单'){
                          this.newName=4  
                    }
                    else this.newName=2 
                }
                this.newVisible=true
                
                 this.studentInfoMsg=row     
                if(this.activeName=='未归'){
                    this.popupTitle='未归处理详情'                                     
                }
                else if(this.activeName=='晚归'){
                      this.popupTitle='晚归处理详情'        
                }
                else if(this.activeName=='无记录'){
                                 
                   this.popupTitle='无记录处理详情'
                }
                 else if(this.activeName=='连进连出'){
                    this.popupTitle='连进连出处理详情'  
                }
                  else if(this.activeName=='黑名单'){
                    this.popupTitle='黑名单处理详情'
                }
            },                  
            //日志
            adminLog(scope,row){   
                this.newVisible=true
                 this.newName=2           
                 if(this.activeName=='未归'){
                    this.popupTitle='未归处理详情'                                     
                }
                else if(this.activeName=='晚归'){
                      this.popupTitle='晚归处理详情'        
                }
                else if(this.activeName=='无记录'){
                                 
                   this.popupTitle='无记录处理详情'
                }
                 else if(this.activeName=='连进连出'){
                    this.popupTitle='连进连出处理详情'  
                }
                  else if(this.activeName=='黑名单'){
                    this.popupTitle='黑名单处理详情'
                }
            },
             //分页弹出框
            handleSizeChange2(val) {
                console.log(`每页 ${val} 条`);
                    this.pageSize=val
                if(this.activeName=='未归'){
                  
                  
                }
                else if(this.activeName=='翻越'){
                  
                }
                  else if(this.activeName=='无记录'){
                    
                }
                  else if(this.activeName=='连进连出'){
                   
                }
                else if(this.activeName=='翻越'){
                    
                }
                 else if(this.activeName=='尾随'){
                  
                }
                 else if(this.activeName=='黑名单'){
                   
                }
                 else if(this.activeName=='访问时间'){
                    
                }
                 else if(this.activeName=='设备异常'){
                   
                }
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val   
                 if(this.activeName=='未归'){
                  
                  
                }
                else if(this.activeName=='翻越'){
                  
                }
                  else if(this.activeName=='无记录'){
                    
                }
                  else if(this.activeName=='连进连出'){
                   
                }
                else if(this.activeName=='翻越'){
                    
                }
                 else if(this.activeName=='尾随'){
                  
                }
                 else if(this.activeName=='黑名单'){
                   
                }
                 else if(this.activeName=='访问时间'){
                    
                }
                 else if(this.activeName=='设备异常'){
                   
                }
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.Alarm{
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
        // position: relative;
        .tableBox{
            flex: 1;
            overflow: hidden;
            // overflow: hidden;
            border-radius:15px 15px 0 0;
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
   .overdueSets{
       font-size: 14px;
       color:#333;
       .pushLists{
           min-height: 33px;
           width: 100%;
           display: flex;
        //    justify-content: space-between;
           align-items: center;
           margin-top: 15px;
           .span{
               display: inline-block;
               min-width:70px;
           }
       }
   }
  
}
.overdueSets /deep/ .active{
    background: #fff;
}
</style>






