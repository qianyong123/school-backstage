<template>
  <div class="collegeData">
    <div class="collegeDetail">
        <div class="collegeDetail-top">
            <div style="display: flex;">
                <span class="span"></span>
                <p class="p">学院概况</p>
            </div>
            <div>
               <el-switch
                style="display:block;"
                v-model="switchValue"
                active-color="#ff4949"
                inactive-color="#ff4949"            
                active-text="区域"
                class="switchColor"
                :class="{switchColor2:switchValue}"
                @change="dataType"
                inactive-text="院系">
                </el-switch>
            </div>
        </div>      
        <div class="collegeDetailData">
            <div class="collegeDetail-div">          
                <div class="collegeDetail-div1">
                    <p>学生/辅导员/宿管</p>
                    <div class="collegeDetail-box">
                        <div class="p2">
                            <span>12</span>
                            <span class="span">宿管人数</span>                    
                        </div>
                        <div class="p2">
                            <span>3000</span>
                            <span class="span">学生人数</span>
                        </div>
                        <div class="p2">
                            <span>2</span>
                            <span class="span">辅导员人数</span>                      
                        </div>
                    
                    </div>
                </div>
                <div class="collegeDetail-div2"> 
                    <p>学生/辅导员/宿管</p>
                    <div class="collegeDetail-box2">
                        <div class="p3">
                            <span class="span">学院数</span> 
                            <span class="amounts">12</span>
                            <span class="redios"></span>                   
                        </div>
                        <div class="p3">
                            <span class="span">专业数</span>
                            <span class="amounts">3</span>
                            <span class="redios2"></span> 
                        </div>
                        <div class="p3">
                            <span class="span">班级数</span>
                            <span class="amounts">20</span>
                            <span class="redios3"></span>                       
                        </div>                 
                    </div>
                </div>
            </div>
            <div class="collegeDetail-div3">
                <div class="collegeDetail-div3_left">
                    <p style=" font-weight: 600;">楼栋/房间/床位</p>
                    <div class="collegeDetail-box2">
                        <div class="p3">
                            <span class="span">床位数（已使用/总数）</span> 
                            <span class="span2">
                                <span>12211/</span>
                                <span style="color:#ccc;">42211</span>
                            </span>
                            <span class="redios"></span>                   
                        </div>
                        <div class="p3">
                            <span class="span">房间数</span>
                            <span class="span2">30</span>
                            <span class="redios2"></span> 
                        </div>
                        <div class="p3">
                            <span class="span">楼栋数</span>
                            <span class="span2">20</span>
                            <span class="redios3"></span>                       
                        </div>                 
                    </div>
                </div>
                <div class="collegeDetail-div3_reight">
                    <div id="college" style="width:160px;height:160px;"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="collegeStatistics" v-show="!switchValue">
       <div style="display: flex;">
            <span class="span"></span>
            <p class="p" style="margin-bottom:30px;">数据统计</p>
        </div>
        <div class="collegeChart1Box">
            <div class="collegeChart1">
                <div class="collegeChart1-top" :class="{'collegeChart1-top2':isdownload==1}">
                    <div class="collegeChart-p" v-if="isdownload==1">
                        <p class="top" style=" font-weight: 600;">异常行为统计</p>
                        <p style="cursor: pointer;" @click="checkForms(1)">异常报表</p>
                    </div>
                    <div>
                        <el-dropdown @command="handleCommand" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{collegeName}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-date-picker
                        v-model="timeValue"
                        type="year"
                        style="width:100px;margin:0 15px;"
                        :clearable="false" 
                        format="yyyy" 
                        @change="selectYear"   
                         value-format="timestamp"
                        placeholder="年">
                        </el-date-picker>
                        
                        <el-dropdown @command="handleMonth" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{monthName}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in monthList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleWeekName" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin-left:15px;">
                                {{weekName}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <!-- <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item> -->
                                <el-dropdown-item :disabled="disableds" v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>                
                     <p v-if="isdownload==0" class="top" style=" font-weight: 600;">异常行为统计</p>
                    <p v-if="isdownload==0" style="cursor: pointer;" @click="checkForms(1)">异常报表</p>
                  
                
                </div>
                <div id="collegeCharts1" style="height:420px;width:100%;"></div>
            </div>
            <div class="collegeChart2" style="margin-left:20px;">
                <div class="collegeChart1-top" :class="{'collegeChart1-top2':isdownload==1}">
                     <div class="collegeChart-p" v-if="isdownload==1">
                        <p  class="top" style=" font-weight: 600;">违纪次数统计</p>
                        <p  style="cursor: pointer;" @click="checkForms(2)">违规报表</p>
                    </div>
                    <div>
                        <el-dropdown @command="handleCommand2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{collegeName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-date-picker
                        v-model="timeValue2"
                        type="year"
                        style="width:100px;margin:0 15px;"
                        :clearable="false" 
                        format="yyyy"  
                        @change="selectYear2" 
                         value-format="timestamp"  
                        placeholder="年">
                        </el-date-picker>
                          <el-dropdown @command="handleMonth2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{monthName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in monthList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleWeekName2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin-left:15px;">
                                {{weekName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <!-- <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item> -->
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <p v-if="isdownload==0" class="top" style=" font-weight: 600;">违纪次数统计</p>
                    <p v-if="isdownload==0" style="cursor: pointer;" @click="checkForms(2)">违规报表</p>
                </div>
                 <div id="collegeCharts2" style="height:420px;width:100%;"></div>
            </div>
            
        </div>
        <div class="collegeChart1Box">
            <div class="collegeChart3">
                <div class="collegeChart1-top" :class="{'collegeChart1-top2':isdownload==1}">
                     <div class="collegeChart-p" v-if="isdownload==1">
                        <p class="top" style=" font-weight: 600;">报警处理统计</p>
                        <p  style="cursor: pointer;" @click="checkForms(3)">报警统计</p>
                    </div>
                    <div>
                        <el-dropdown @command="handleCommand3" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{collegeName3}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                         <el-dropdown @command="handleColltype" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin-left:15px;">
                                {{collType}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in colltypeList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-date-picker
                        v-model="timeValue3"
                        type="year"
                        style="width:100px;margin:0 15px;"
                        :clearable="false" 
                        format="yyyy" 
                        @change="selectYear3" 
                         value-format="timestamp"     
                        placeholder="年">
                        </el-date-picker>
                        <el-dropdown @command="handleMonth3" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{monthName3}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in monthList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleWeekName3" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin-left:15px;">
                                {{weekName3}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <!-- <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item> -->
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <p v-if="isdownload==0" class="top" style=" font-weight: 600;">报警处理统计</p>
                    <p v-if="isdownload==0" style="cursor: pointer;" @click="checkForms(3)">报警统计</p>
                </div>
                <div id="collegeCharts3" style="height:420px;width:100%;"></div>
            </div>
            <div class="collegeChart4" style="margin-left:20px;">
               <div class="collegeChart1-top" :class="{'collegeChart1-top2':isdownload==1}">
                    <div class="collegeChart-p" v-if="isdownload==1">
                        <p  class="top" style=" font-weight: 600;">申请处理统计</p>
                        <p  style="cursor: pointer;" @click="checkForms(4)">申请统计</p>
                    </div>
                    <div>
                        <el-dropdown @command="handleCommand4" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{collegeName4}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleApplyType" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin-left:15px;">
                                {{applyType}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in applyTypeList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-date-picker
                        v-model="timeValue4"
                        type="year"
                        style="width:100px;margin:0 15px;"
                        :clearable="false" 
                        format="yyyy"  
                        @change="selectYear4" 
                         value-format="timestamp"    
                        placeholder="年">
                        </el-date-picker>
                        <el-dropdown @command="handleMonth4" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{monthName4}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in monthList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleWeekName4" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin-left:15px;">
                                {{weekName4}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <!-- <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item> -->
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <p v-if="isdownload==0" class="top" style=" font-weight: 600;">申请处理统计</p>
                    <p v-if="isdownload==0" style="cursor: pointer;" @click="checkForms(4)">申请统计</p>
                </div>
                <div id="collegeCharts4" style="height:420px;width:100%;"></div>
            </div>
        </div>
    </div> 
    <div style="width:100%;">
        <area-data v-show="switchValue" :switchValue='switchValue' :isdownload='isdownload'></area-data> 
    </div>  
    <!-- 报表 -->
     <el-dialog
  :title="detailsName"
  :visible.sync="details"
  width="800px"
  center>
    <el-table
    v-if="istable==1"
        :data="tableData"
        height="400"
        style="width: 100%">
        <el-table-column
        prop="shu"
        label="学院人数"
        width="100"
        >
        </el-table-column>
        <el-table-column
        prop="data"
        label="未归"
        >
        </el-table-column>
        <el-table-column
        prop="name"
        label="连续*日以上无记录"
        >
        </el-table-column>
        <el-table-column
        prop="classMsg"
        label="连续*日以上晚归">
        </el-table-column>
        <el-table-column
        prop="name"
        label="学院名">
        </el-table-column>
    </el-table>
      <el-table
      v-else-if="istable==2"
        :data="tableData"
        height="400"
        style="width: 100%">
        <el-table-column
        prop="shu"
        width="100"
        label="学院人数"
        >
        </el-table-column>
        <el-table-column
        prop="data"
        label="违纪次数"
        >
        </el-table-column>
        <el-table-column
        prop="name"
        label="已处理"
        >
        </el-table-column>
        <el-table-column
        prop="classMsg"
        label="待处理">
        </el-table-column>
        <el-table-column
        prop="name"
        label="学院名">
        </el-table-column>
    </el-table>
     <el-table
        v-else
        :data="tableData"
        height="400"
        style="width: 100%">
        <el-table-column
        v-for="(item,index) in tableHader3"
        :key="index"
        :prop="item.prop"
        :label="item.name"
        >
        </el-table-column>
       
    </el-table>
</el-dialog>
  </div>
</template>

<script>
import { article,queryMenuById,queryCollegeByName} from '../../axios/api.js'
import areaData from './areaData'
import 'quill/dist/quill.js';
import {mapState}  from 'vuex'
import { setTimeout } from 'timers';
  
   
    const monthData=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    
    const weekData=['一周','二周','三周','四周','五周']
    export default {
        name:"Index",
        props:[
            'isdownload'
        ],
        components:{
          areaData
        },      
        data(){
            return{
                content: "this is a simple demo", // 编辑器的内容
                msg:'',
                switchValue:false,
                roleInfoMenu:[],
                //报表
                detailsName:'',
                details:false,
                tableData:[{name:'计算机学院',shu:12000}],
                istable:1,
                tableHader3:[
                    {name:'类型',prop:'name'},
                    {name:'待处理',prop:'name'},
                    {name:'已处理',prop:'name'},
                    {name:'处理率',prop:'name'},
                    {name:'学院名',prop:'name'},
                ],
                collegeValue1:300,
                collegeValue2:10,
                collegeValue3:20,
                collegeName:'学院',
                collegeName2:'学院',
                collegeName3:'学院',
                collegeName4:'学院',
                collType:' 报警类型',
                applyType:'申请类型',
                monthName:'月',
                monthName2:'月',
                monthName3:'月',
                monthName4:'月',
                weekName:'周',
                weekName2:'周',
                weekName3:'周',
                weekName4:'周',
                timeValue:'',
                timeValue2:'',
                timeValue3:'',
                timeValue4:'',
                monthTime:null,

                optionData:['周一','周二','周三','周四','周五','周六','周日'], 
                // optionData2:['周一','周二','周三','周四','周五','周六','周日'],                
                // optionData3:['周一','周二','周三','周四','周五','周六','周日'], 
                // optionData4:['周一','周二','周三','周四','周五','周六','周日'],                
                collegeList:[//college_name
                   
                ],
                collegeLineData:[10,5,20,14,10,4,5],
                collegeLineData2:[1,12,15,0,4,0,33],
                collegeLineData3:[4,10,4,10,11,0,14],
                weekList:[
                    {id:null,name:'全部'},
                    {id:1,name:'一周'},
                    {id:2,name:'二周'},
                    {id:3,name:'三周'},
                    {id:4,name:'四周'},
                    {id:5,name:'五周'},
                ],
                monthList:[
                    {id:null,name:'全部'},
                    {id:1,name:'一月'},
                    {id:2,name:'二月'},
                    {id:3,name:'三月'},
                    {id:4,name:'四月'},
                    {id:5,name:'五月'},
                    {id:6,name:'六月'},
                    {id:7,name:'七月'},
                    {id:8,name:'八月'},
                    {id:9,name:'九月'},
                    {id:10,name:'十月'},
                    {id:11,name:'十一月'},
                    {id:12,name:'十二月'},
                ],
                // monthData:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],              
                colltypeList:[
                    {id:1,name:'未归'},
                    {id:2,name:'晚归'},
                    {id:3,name:'无记录'},
                    {id:4,name:'连进连出'},
                    {id:5,name:'翻越'},
                    {id:6,name:'尾随'},
                    {id:7,name:'黑名单'},
                    {id:8,name:'访客超时'},
                    {id:9,name:'设备异常'},
                ],
                applyTypeList:[
                    {id:1,name:'调寝'},
                    // {id:2,name:'物品出楼'},
                    // {id:3,name:'报修'},
                    // {id:4,name:'被访'},
                    {id:5,name:'请假'},
                ],
                editorOption: {
                    // 编辑器的配置
                    // something config college
                    theme: "bubble"
                },
                myChart:null,
                loading:null
            }
        },
        created() { 
            queryCollegeByName({collegeName:'', pageNum:0,pageSize:0}).then(res=>{
                if(res.data.code==200){
                    this.collegeList=res.data.data
                }
            })
        },       
        mounted(){          
            this.college()
            this.collegeLine()
            this.collegeColumnar()
            this.collegeColumnar2()
            this.collegeLine2()        
        
        },
        filters:{
           
        },
        computed:{
              disableds(){
                if(this.monthName=='全部'||this.monthName=='月'){
                    return true
                }
                else false
            },
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
           
            lodings(){
               let loading= this.$loading({
                    lock: true,
                    text: "保存中...",
                    spinner: "el-icon-loading",
                    background: "rgba(255, 255, 255, 0.8)"
                });
                loading.close()
            },
            //开关切换
            dataType(val){
                console.log(val)
                
                // if(val==false){
                //     setTimeout(()=>{
                //         this.collegeLine()
                //         this.collegeColumnar()
                //         this.collegeColumnar2()
                //         this.collegeLine2()
                //     },200)
                   
                // }
            },
            //学院下拉
            handleCommand(command){
                console.log(command)
                this.collegeName=command.college_name
            },
             //学院下拉2
            handleCommand2(command){
                console.log(command)
                this.collegeName2=command.college_name
            },
             //学院下拉3
            handleCommand3(command){
                console.log(command)
                this.collegeName3=command.college_name
            },
             //学院下拉4
            handleCommand4(command){
                console.log(command)
                this.collegeName4=command.college_name
            },
            //选择年份
            selectYear(data){
                console.log(data)
               let monthList=monthData.slice(0,this.collegeLineData.length)
                this.monthName='月'
                this.weekName='周'              
                this.optionData=monthList
                this.collegeLine()
            },
            //选择年份2
            selectYear2(data){
                console.log(data)
                this.monthName2='月'
                this.weekName2='周'
            },
            //选择年份3
            selectYear3(data){
                console.log(data)
                this.monthName3='月'
                this.weekName3='周'
            },
            //选择年份4
            selectYear4(data){
                console.log(data)
                this.monthName4='月'
                this.weekName4='周'
            },
            //选择月份
            handleMonth(data){
                this.monthName=data.name
                this.weekName='周'
                let monthList=monthData.slice(0,this.collegeLineData.length)
                if(data.name=='全部'){
                    this.optionData=monthList                 
                }else{
                    this.optionData=weekData
                }
                console.log(this.optionData,monthData)
                this.collegeLine(this.optionData)
            },
             //选择月份2
            handleMonth2(data){
                this.monthName2=data.name
                this.weekName2='周'
            },
             //选择月份3
            handleMonth3(data){
                this.monthName3=data.name
                this.weekName3='周'
            },
             //选择月份4
            handleMonth4(data){
                this.monthName4=data.name
                this.weekName4='周'
            },
            //周下拉1
            handleWeekName(item){
                this.weekName=item.name
                if(item.name=='全部'){
                     this.optionData=['一周','二周','三周','四周','五周']
                }else{
                    this.optionData=['周一','周二','周三','周四','周五','周六','周日']
                }
                this.collegeLine()
            },
              //周下拉2
            handleWeekName2(item){
                this.weekName2=item.name
                // this.collegeColumnar()
            },
              //周下拉3
            handleWeekName3(item){
                this.weekName3=item.name
                // this.collegeColumnar2()
            },
              //周下拉4
            handleWeekName4(item){
                this.weekName4=item.name
                // this.collegeLine2()
            },
            //申请类型
            handleApplyType(item){
                this.applyType=item.name
            },
            //报警类型
            handleColltype(item){
                console.log(item)
                this.collType=item.name
            },
            //查看报表
            checkForms(id){
                this.details=true
                this.istable=id
                if(id==1){
                    this.detailsName='2019/12'+'\xa0\xa0\xa0'+'异常报表'
                }
                else if(id==2){
                    this.detailsName='2019/12'+'\xa0\xa0\xa0'+'违规报表'
                }
                else if(id==3){
                    this.detailsName='2019/12'+'\xa0\xa0\xa0'+'报警统计'
                }
                else if(id==4){
                    this.detailsName='2019/12'+'\xa0\xa0\xa0'+'申请统计'
                }
                console.log(id)
            },
           //学院概况图表
         college(){
                var total = 500;//最大温度数据单独出来定义，方便环形总数的修改
                var total2 = 10;//最大温度数据单独出来定义，方便环形总数的修改
                var total3 = 20;//最大温度数据单独出来定义，方便环形总数的修改
                var collegeValue1=this.collegeValue1
                var collegeValue2=this.collegeValue2
                var collegeValue3=this.collegeValue3
                console.log(collegeValue1,collegeValue2,collegeValue3)
                var  myChart =this.$echarts.init(document.getElementById('college'))
                var placeHolderStyle={
                    normal: {
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        }
                    }
                }
               var option = {
                //     title : {
                //         text: '室内温度',//主标题
                //         subtext: '26℃',//副标题
                //         textStyle: {//主标题样式
                //         color: '#fff',
                //         fontWeight: 'bold',
                //         fontSize:14
                //         },
                //         subtextStyle: {//副标题样式
                //         color: '#fff',
                //         fontSize:14,
                //         fontWeight: 'bold',
                //         color: '#0f0'
                //         },
                //         left:'center',
                //         top: 'middle'
                //     },
                    tooltip: {
                    show: true,
                        trigger: 'item',//提示框触发类型，item数据项图形触发，主要应用于无类目轴的图表（散点图、饼形图等）
                        formatter: function(params, ticket, callback) {//第一个参数数据集、第二个参数是异步回调标志、第三个参数是异步回调
                            return params.seriesName + ": " + params.value;//系列名称：数据值
                        }
                    },
                    color:['#E50062','#AB57D2','#00DFAB'],//调色盘颜色列表，默认情况下图例和饼形环图颜色使用
                    legend: {
                        top: "0",
                        left: "0",
                        itemHeight:10,//图例的高度

                     itemGap:5,//图例之间的间距        

                    // data: ['室外温度', '室内温度设定点', '室内温度'],//图例的数据数组
                           textStyle: {
                            color: '#fff'
                        },
                        selectedMode: true,//图例选择模式
                        orient: "vertical"//图例布局方式
                    },
                    series: [
                    {
                        name: '床位数',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [70, 74],
                        itemStyle: placeHolderStyle,
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data: [{
                            value:collegeValue1,
                            itemStyle: {
                                normal: {
                                    color: '#E50062'
                                }
                            }
                            }, 
                            {
                            value: total-collegeValue1,
                            itemStyle: {
                                normal: {
                    //                 color: 'transparent'
                                        color: '#E7E7E7'
                                }
                            }
                           }]
                    }, 
                    {
                        name: '房间数',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [61, 65],
                        itemStyle: placeHolderStyle,
                        data: [{
                        value:collegeValue2,
                        itemStyle: {
                            normal: {
                                color: '#AB57D2'
                            }
                        }
                        }, 
                        {
                        value:0,
                        itemStyle: {
                            normal: {
                                color: '#E7E7E7'
                            }
                        }
                    }]
                    }, 
                    {
                        name: '楼栋数',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [51,56],
                        itemStyle: placeHolderStyle,
                        data: [{
                        value:collegeValue3,
                        itemStyle: {
                            normal: {
                                color: '#00DFAB'
                            }
                        }
                        }, 
                        {
                        value:0,
                        itemStyle: {
                            normal: {
                                color: '#E7E7E7'
                            }
                        }
                    }]
                    }]
                } 
                myChart.setOption(option);         
            },
            //异常行为统计图表 折线
            collegeLine(){
                // 基于准备好的dom，初始化echarts实例
                const myChart = this.$echarts.init(document.getElementById('collegeCharts1'));              
                myChart.showLoading({
                    text: '数据正在努力加载...',
                    textStyle: { fontSize : 30 , color: '#444' },
                    effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
                }); 

               let option = {
                    // title: {
                    //     text: '折线图堆叠'
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                        orient: 'horizontal',
                        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）                    
                        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                        y:'bottom',
                        data:['未归','连续2日未归','连续晚归无记录']
                    },
                    // 给echarts图设置背景色
                    // backgroundColor: '#FBFBFB', 
                    grid: {
                        left: '10',
                        top:'20',
                        right: '20',
                        bottom: 40,
                        containLabel: true
                    },
                    toolbox: {
                        // feature: {
                        //     saveAsImage: {}
                        // }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:this.optionData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'未归',
                            type:'line',
                            // stack: '总量',
                            color:"#F3F3F3",
                            // smooth: true,
                            data:this.collegeLineData
                        },
                        {
                            name:'连续2日未归',
                            type:'line',
                            // stack: '总量',
                             color:"#141D2C",
                            data:this.collegeLineData2
                        },
                        {
                            name:'连续晚归无记录',
                            type:'line',
                            // stack: '总量',
                             color:"#DADADA",
                            data:this.collegeLineData3
                        },                    
                    ]
                }
                 myChart.setOption(option); 
                  myChart.hideLoading()
            },
            //违纪次数柱状
            collegeColumnar(){
                let myChart = this.$echarts.init(document.getElementById('collegeCharts2'));
                let optionData=this.optionData
                let itemStyle = {
                    //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                    // emphasis: {
                    //     barBorderRadius: 30
                    // },
        
                    normal: {
                        //柱形图圆角，初始化效果
                        barBorderRadius:[10, 10, 0, 0],
                        label: {
                            show: false,//是否展示
                            textStyle: {
                                fontWeight:'bolder',
                                fontSize : '12',
                                fontFamily : '微软雅黑',
                            }
                        }
                    }
                   }
                let option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                         y:'bottom',
                        data:['总次数','处理次数','未处理次数']
                    },
                    grid: {
                        left: '10',
                        right: '20',
                        top:'20',
                        bottom: 40,
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data :this.optionData
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        
                       
                        {
                            name:'未处理次数',
                            type:'bar',
                            stack: '总量',
                            color:'#F52F5D',
                            barWidth :10,
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },                   
                    
                         {
                            name:'处理次数',
                            type:'bar',
                            stack: '总量',
                            color:'#D7D7D7',
                            barWidth : 10,
                            data:[120, 132, 101, 134, 90, 220, 210]
                        },
                          {
                            name:'总次数',
                            type:'bar',
                            stack: '总量',
                            color:'#EEEEEE',
                            barWidth : 10,
                            data:[320, 332, 301, 334, 390, 330, 320],
                            itemStyle:itemStyle,
                        },
                    ]
                };
                myChart.setOption(option); 
            },
             //报警处理柱状
            collegeColumnar2(){
                var myChart = this.$echarts.init(document.getElementById('collegeCharts3'));
                   var itemStyle = {
                        //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                        // emphasis: {
                        //     barBorderRadius: 30
                        // },
            
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[10, 10, 0, 0],
                            label: {
                                show: false,//是否展示
                                textStyle: {
                                    fontWeight:'bolder',
                                    fontSize : '12',
                                    fontFamily : '微软雅黑',
                                }
                            }
                        }
                   }
                let option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                         y:'bottom',
                        data:['总次数','处理次数','未处理次数']
                    },
                    grid: {
                        left: '10',
                        right: '20',
                        top:'20',
                        bottom: 40,
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data :this.optionData
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        
                         {
                            name:'总次数',
                            type:'bar',
                            color:'#EEEEEE',
                            barWidth : 10,
                            
                            itemStyle:itemStyle,
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                         {
                            name:'处理次数',
                            type:'bar',
                            color:'#D7D7D7',
                            barWidth : 10,
                            itemStyle:itemStyle,
                            data:[120, 132, 101, 134, 90, 220, 210]
                        },
                        {
                            name:'未处理次数',
                            type:'bar',
                            color:'#141D2C',
                            itemStyle:itemStyle,
                            barWidth :10,
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },                   
                    
                        
                        
                    ]
                };
                myChart.setOption(option); 
            },
             //申请处理统计图表 折线
            collegeLine2(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('collegeCharts4'));
               let option = {
                    // title: {
                    //     text: '折线图堆叠'
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                        orient: 'horizontal',
                        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）                    
                        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                        y:'bottom',
                        data:['总次数','处理次数','未处理次数']
                    },
                    // 给echarts图设置背景色
                    // backgroundColor: '#FBFBFB', 
                    grid: {
                        left: '10',
                        top:'20',
                        right: '20',
                        bottom: 40,
                        containLabel: true
                    },
                    toolbox: {
                        // feature: {
                        //     saveAsImage: {}
                        // }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:this.optionData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'总次数',
                            type:'line',
                            // stack: '总量',
                            color:"#EEEEEE",
                            smooth: true,
                            data:[40, 80, 20, 14, 90, 230, 10]
                        },
                        {
                            name:'处理次数',
                            type:'line',
                            // stack: '总量',
                             color:"#D7D7D7",
                             smooth: true,
                            data:[40, 1, 10, 77, 5, 40, 10]
                        },
                        {
                            name:'未处理次数',
                            type:'line',
                            // stack: '总量',
                             color:"#FB473C",
                             smooth: true,
                            data:[4, 10, 20, 30, 10, 77, 10]
                        },                    
                    ]
                }
                 myChart.setOption(option); 
            },
        }
    }
</script>

<style lang="scss" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
    .switchColor /deep/ .is-active{
        color: #ff4949;
        
    } 
    .switchColor{
        height:30px;
    }
    .switchColor /deep/ .el-switch__core{
        width:80px!important;    
        height:30px;
        border-radius: 15px;
        &::after{
            width: 22px;
            height: 22px;
            top:3px;
        }
    }
   .switchColor2 /deep/ .el-switch__core{
       &::after{
               margin-left: -25px;
       }
   }
  .switchColor /deep/ .el-switch__label {
    position: absolute;
   display: none;
    color: #fff;
  }
 /*打开时文字位置设置*/
  .switchColor /deep/ .el-switch__label--right {
    z-index:10;
   right:35px;
   margin-top:-24px;
 }
 /*关闭时文字位置设置*/
 .switchColor /deep/ .el-switch__label--left {
   z-index: 1;
   left:35px;
    margin-top:5px;
 }
 /*显示文字*/
 .switchColor /deep/ .el-switch__label.is-active {
   display: block;
 }
 .switchColor /deep/.el-switch .el-switch__core,
 .el-switch .el-switch__label {
   width: 60px !important;
 }
    .collegeData{
        width: 100%;
        height: 100%;
         .collegeDetail-top,.collegeStatistics{
                .p{
                height: 32px;        
                font-size: 32px;         
                padding-left:20px;
                font-weight: 500;
                
            }
            .span{
                display: inline-block;
                width:0;
                height: 32px;
                border-left: 4px solid #E01763;
            }
        }
        .collegeDetail{
            width: 100%;        
            .collegeDetail-top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 45px;
                
            }
            
            .collegeDetailData{
                height: 216px;
                width: 100%;
                margin:30px 0;
                display: flex;
                p{
                    font-size: 16px;
                }
                .collegeDetail-div{
                    width: 50%;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;

                }
                .collegeDetail-div1{
                    flex: 0.5;
                    margin-right: 20px;
                    background:linear-gradient(229deg,rgba(253,79,48,1) 0%,rgba(242,33,114,1) 100%);
                    border-radius:15px;
                    padding: 20px;
                    color: #ffffff;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .collegeDetail-box{
                        width:100%;
                        height: 100px;
                        display: flex;
                        justify-content: space-between;
                        padding-bottom:30px;
                        .p2{
                            height:100%;
                            width:70px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            font-size: 24px;
                            text-align: center;
                            .span{
                                font-size:14px;
                                text-align: center;
                            }
                        } 
                    }
                                  
                    
                }
                .collegeDetail-div2{
                    flex: 0.5;
                    background:#141D2C;
                    border-radius:15px;
                    padding: 20px;
                    color: #ffffff;
                    // margin:0 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                   
                      
                }
                 .collegeDetail-box2{
                        height: 120px;
                        padding-bottom:28px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;                      
                    }
                    .amounts{
                        display: inline-block;
                        min-width: 100px;
                    }
                 .p3{
                    height: 20px;
                    display: flex;                          
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    position: relative;
                    padding-left: 15px;
                    .redios,.redios2,.redios3{
                        width:8px;
                        height:8px;
                        position: absolute;
                        border-radius: 50%;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        margin: auto;
                    }
                    .redios{                              
                        background:rgba(229,0,98,1);
                    }
                    .redios2{                              
                        background:rgba(171,87,210,1);
                    }
                    .redios3{                            
                        background:rgba(0,223,171,1);
                    }
                }
                .collegeDetail-div3{
                    height: 100%;
                    width: 50%;
                    background:rgba(255,255,255,1);
                    border-radius:15px;
                    padding: 20px;
                    display: flex;
                    margin-left: 20px;
                    .collegeDetail-div3_left{
                        width:50%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content:space-between;
                        .span2{
                            min-width:90px;
                            text-align: left;
                        }
                    }
                    .collegeDetail-div3_reight{
                        width:50%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;                     
                    }
                    
                    p{
                        color: #333;
                    }
                }
            }        
        }
        .collegeStatistics{
                width:100%;
                min-height:500px;
                // display: flex;
                padding-top: 10px;
                
            }
        .collegeChart1Box{
            display: flex;   
            width: 100%;   
            // font-weight: 600;
            .collegeChart1,.collegeChart2,.collegeChart3,.collegeChart4{
                min-height: 472px;
                width:50%;   
                background:#fff;
                border-radius: 15px;   
                padding: 20px;  
                margin-bottom: 20px;    
                .collegeChart1-top{
                    width: 100%;
                    min-height: 35px;
                    display: flex;
                    
                    justify-content: space-between;
                    align-items: center; 
                    margin-bottom:10px;
                    position: relative;
                    .collegeChart-p{
                        display: flex;
                        margin-bottom: 15px;
                        p:nth-child(1){
                            margin-right: 15px;
                        }
                    }
                    // .top{
                    //     position: absolute;  
                    //     width: 100px;                 
                    //     top: 0;
                    //     left: 0;
                    //     bottom: 0;
                    //     right: 0;
                    //     margin: auto;
                    //     // text-align: center;
                    //     line-height: 35px;
                    // }
                } 
                .collegeChart1-top2{
                     flex-direction: column;
                }       
            }
        }
        
    }
  
</style>






