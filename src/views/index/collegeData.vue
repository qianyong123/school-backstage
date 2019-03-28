<template>
  <div class="collegeData">
    <div class="collegeDetail">
        <div class="collegeDetail-top">
            <div style="display: flex;">
                <span class="span"></span>
                <p class="p">学院概况</p>
            </div>
            
        </div>      
        <div class="collegeDetailData">
            <div class="collegeDetail-div">
                <p>学生/辅导员</p>
                <div class="collegeDetail-box">
                   
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
                 <p>学生/辅导员</p>
                  <div class="collegeDetail-box2">
                  
                    <div class="p3">
                        <span class="span">专业数</span>
                        <span class="amounts">3</span>
                        <span class="redios2"></span> 
                    </div>
                    <div class="p3" style="margin-top:30px;">
                        <span class="span">班级数</span>
                        <span class="amounts">20</span>
                        <span class="redios3"></span>                       
                    </div>                 
                </div>
            </div>
            
        </div>
    </div>
    <div class="collegeStatistics" v-if="!switchValue">
       <div style="display: flex;">
            <span class="span"></span>
            <p class="p" style="margin-bottom:30px;">数据统计</p>
        </div>
        <div class="collegeChart1Box">
            <div class="collegeChart1">
                <div class="collegeChart1-top">
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
                         <el-dropdown @command="handleGrade(1)" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 15px;">
                                {{grade}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>  
                         <el-dropdown @command="handleClasss(1)" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{classs}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>                                       
                    </div>
                    <p class="top" style=" font-weight: 600;">异常行为统计</p>
                     <div class="collegeChart2-right">
                        <el-date-picker
                        v-model="timeValue"
                        type="month"
                        style="width:100px;"
                        :clearable="false" 
                        format="yyyy/MM"    
                        placeholder="年/月">
                        </el-date-picker>
                        <el-dropdown @command="handleWeekName" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 15px;">
                                {{weekName}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <p>异常报表</p>
                    </div>
                </div>
                <div id="collegeCharts1" style="height:420px;width:100%;"></div>
            </div>
            <div class="collegeChart2" style="margin-left:20px;">
                <div class="collegeChart1-top">
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
                         <el-dropdown @command="handleGrade(2)" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 15px;">
                                {{grade}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>  
                         <el-dropdown @command="handleClasss(2)" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{classs}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        
                    </div>
                    <p class="top" style=" font-weight: 600;">违纪次数统计</p>
                    <div class="collegeChart2-right">
                        <el-date-picker
                        v-model="timeValue2"
                        type="month"
                        style="width:100px;"
                        :clearable="false" 
                        format="yyyy/MM"    
                        placeholder="年/月">
                        </el-date-picker>
                        <el-dropdown @command="handleWeekName2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 15px;">
                                {{weekName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <p>违规报表</p>
                    </div>
                </div>
                 <div id="collegeCharts2" style="height:420px;width:100%;"></div>
            </div>
            
        </div>
        <div class="collegeChart1Box">
            <div class="collegeChart3">
                <div class="collegeChart1-top">
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
                         <el-dropdown @command="handleGrade(3)" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 15px;">
                                {{grade}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>  
                         <el-dropdown @command="handleClasss(3)" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{classs}}<i class="el-icon-arrow-down el-icon--right"></i>
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
                       
                    </div>
                    <p class="top" style=" font-weight: 600;">报警处理统计</p>
                     <div class="collegeChart2-right">
                        <el-date-picker
                        v-model="timeValue3"
                        type="month"
                        style="width:100px;"
                        :clearable="false" 
                        format="yyyy/MM"    
                        placeholder="年/月">
                        </el-date-picker>
                        <el-dropdown @command="handleWeekName3" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 15px;">
                                {{weekName3}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <p>报警统计</p>
                    </div>
                </div>
                <div id="collegeCharts3" style="height:420px;width:100%;"></div>
            </div>
            <div class="collegeChart4" style="margin-left:20px;">
               <div class="collegeChart1-top">
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
                        <el-dropdown @command="handleGrade(4)" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 15px;">
                                {{grade}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{college_name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.college_name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>  
                         <el-dropdown @command="handleClasss(4)" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{classs}}<i class="el-icon-arrow-down el-icon--right"></i>
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
                       
                    </div>
                    <p class="top" style=" font-weight: 600;">申请处理统计</p>
                     <div class="collegeChart2-right">
                        <el-date-picker
                        v-model="timeValue4"
                        type="month"
                        style="width:100px;"
                        :clearable="false" 
                        format="yyyy/MM"    
                        placeholder="年/月">
                        </el-date-picker>
                        <el-dropdown @command="handleWeekName4" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 15px;">
                                {{weekName4}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <p>申请统计</p>
                    </div>
                </div>
                <div id="collegeCharts4" style="height:420px;width:100%;"></div>
            </div>
        </div>
    </div> 
     
  </div>
</template>

<script>
import { article,queryMenuById,queryCollegeByName} from '../../axios/api.js'
import areaData from './areaData'
import 'quill/dist/quill.js';
import {mapState}  from 'vuex'
import { setTimeout } from 'timers';
    export default {
        name:"Index",
        components:{
          areaData
        },      
        data(){
            return{
                content: "this is a simple demo", // 编辑器的内容
                msg:'',
                switchValue:false,
                roleInfoMenu:[],
                collegeValue1:300,
                collegeValue2:5,
                collegeValue3:8,
                collegeName:'专业',
                collegeName2:'专业',
                collegeName3:'专业',
                collegeName4:'专业',
                grade:'年级' ,
                grade2:'年级' ,
                grade3:'年级' ,
                grade4:'年级' ,
                classs:'班级',
                classs2:'班级',
                classs3:'班级',
                classs4:'班级',
                collType:' 报警类型',
                applyType:'申请类型',
                weekName:'周',
                weekName2:'周',
                weekName3:'周',
                weekName4:'周',
                timeValue:'',
                timeValue2:'',
                timeValue3:'',
                timeValue4:'',
                collegeList:[//college_name
                   
                ],
                weekList:[
                    {id:1,name:'一周'},
                    {id:2,name:'二周'},
                    {id:3,name:'三周'},
                    {id:4,name:'四周'},
                ],
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
            this.collegeLine()
            this.collegeColumnar()
            this.collegeColumnar2()
            this.collegeLine2()        
        
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
                
                if(val==false){
                    setTimeout(()=>{
                        this.collegeLine()
                        this.collegeColumnar()
                        this.collegeColumnar2()
                        this.collegeLine2()
                    },200)
                   
                }
            },
            //学院下拉
            handleCommand(command){
                console.log(command)
                this.collegeName=command.college_name
            },
             //学院下拉
            handleCommand2(command){
                console.log(command)
                this.collegeName2=command.college_name
            },
             //学院下拉
            handleCommand3(command){
                console.log(command)
                this.collegeName3=command.college_name
            },
             //学院下拉
            handleCommand4(command){
                console.log(command)
                this.collegeName4=command.college_name
            },
            //年级下拉
            handleGrade(id){
                console.log(id)
            },
            //班级下拉
            handleClasss(id){
                console.log(id)
            },
            //周下拉
            handleWeekName(item){
                this.weekName=item.name
            },
              //周下拉
            handleWeekName2(item){
                this.weekName2=item.name
            },
              //周下拉
            handleWeekName3(item){
                this.weekName3=item.name
            },
              //周下拉
            handleWeekName4(item){
                this.weekName4=item.name
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
         
            //异常行为统计图表 折线
            collegeLine(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('collegeCharts1'));              
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
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'未归',
                            type:'line',
                            // stack: '总量',
                            color:"#E2E2E2",
                            // smooth: true,
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'连续2日未归',
                            type:'line',
                            // stack: '总量',
                             color:"#141D2C",
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'连续晚归无记录',
                            type:'line',
                            // stack: '总量',
                             color:"#E6E6E6",
                            data:[150, 232, 201, 154, 190, 330, 700]
                        },                    
                    ]
                }
                 myChart.setOption(option); 
                  myChart.hideLoading()
            },
            //违纪次数柱状
            collegeColumnar(){
                var myChart = this.$echarts.init(document.getElementById('collegeCharts2'));
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
                            data : ['周一','周二','周三','周四','周五','周六','周日']
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
                            data : ['周一','周二','周三','周四','周五','周六','周日']
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
                        data: ['周一','周二','周三','周四','周五','周六','周日']
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
                    flex: 0.25;
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
                        justify-content:center;
                        padding-bottom:30px;
                        .p2{
                            height:100%;
                            // min-width:70px;
                            width: 50%;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            align-items: center;
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
                    flex: 0.25;
                    background:#141D2C;
                    border-radius:15px;
                    padding: 20px;
                    color: #ffffff;
                    margin:0 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                   
                      
                }
                 .collegeDetail-box2{
                        height: 120px;
                        padding-bottom:28px;
                        display: flex;
                        flex-direction: column;
                        justify-content:flex-end;                      
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
                    flex: 0.5;
                    background:rgba(255,255,255,1);
                    border-radius:15px;
                    padding: 20px;
                    display: flex;
                    .collegeDetail-div3_left{
                        width:50%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content:space-between;
                        .span2{
                            min-width:100px;
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
                            height: 35px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center; 
                            margin-bottom:10px;
                            position: relative;
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
                    
                    .collegeChart2-right{
                        display: flex;
                        align-items: center; 
                        min-height: 32px;
                    }      
            }
        }
        
    }
  
</style>






