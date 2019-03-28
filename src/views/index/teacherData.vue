<template>
  <div class="collegeData">
      <div class="collegeStatistics" style=" min-height:216px;">
         <div class="collegeDetail-top" style="margin-top:0">
            <div style="display: flex;">
                <span class="span"></span>
                <p class="p">待处理申请</p>
            </div>
            <div class="details" @click="skipRecord">去看看</div>
        </div>  
        <div class="collegeDetail">
            <div class="collegeDetailData">
                <div class="collegeDetail-div3 collegeDetail-div4">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/tiaoqin.png" alt="">
                        <span style="font-size:44px;">30</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">调寝申请</div>
                </div>
                 <div class="collegeDetail-div3 collegeDetail-div4">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/qingjia.png" alt="">
                        <span style="font-size:44px;">33</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">请假申请</div>
                </div>  
                <div class="collegeDetail-div3 collegeDetail-div4" style="background: none;"></div>   
                <div class="collegeDetail-div3 collegeDetail-div4" style="margin-right:0;background: none;"></div>            
            </div>
        </div>
    </div>
    <div class="collegeStatistics">
         <div class="collegeDetail-top" style="margin-top:0">
            <div style="display: flex;">
                <span class="span"></span>
                <p class="p">昨日概况</p>
            </div>
            <div class="details" @click="userDetail">详情</div>
        </div>  
        <div class="collegeDetail">
            <div class="collegeDetailData">
                <div class="collegeDetail-div3 collegeDetail-div4">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/weigui.png" alt="">
                        <span style="font-size:44px;">30</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">未归人数</div>
                </div>
                 <div class="collegeDetail-div3 collegeDetail-div4">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/wangui.png" alt="">
                        <span style="font-size:44px;">33</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">晚归人数</div>
                </div>
                <div class="collegeDetail-div3 collegeDetail-div4">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/weiji.png" alt="">
                        <span style="font-size:44px;">26</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">违纪人数</div>
                </div>
                 <div class="collegeDetail-div3 collegeDetail-div4" style="margin-right:0;">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/wujilu.png" alt="">
                        <span style="font-size:44px;">26</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">无记录人数</div>
                </div>
            </div>
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
                         <el-date-picker
                        v-model="timeValue1"
                        type="date"
                        style="margin:0 15px;width:130px;"
                        format="yyyy/MM/dd"
                        :clearable="false"
                        value-format="timestamp"
                        placeholder="年/月/日">
                        </el-date-picker>
                         <el-date-picker
                            v-model="timeValue2"
                            type="date"
                            style="width:130px;"
                            format="yyyy/MM/dd"
                            :clearable="false"
                            value-format="timestamp"
                            placeholder="年/月/日">
                        </el-date-picker>                                                                  
                    </div>
                    <p class="top" style=" font-weight: 600;">考勤分析</p>
                    <p class="details"  @click="abnormityData">异常名单</p>
                </div>
                <div id="collegeCharts2" style="height:420px;width:100%;"></div>
                <div class="collegeChart1-data">人均外出总时长<span>16.8h</span> ， 人均每日外出时长<span>5.6h</span> </div>
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
                         <el-date-picker
                        v-model="timeValue3"
                        type="datetime"
                        style="width:200px;margin:0 15px;"                    
                        :clearable="false"
                        value-format="timestamp"
                         format="yyyy/MM/dd hh:mm"
                        placeholder="年/月/日 时/分">
                        </el-date-picker>
                                            
                    </div>
                    <p class="top" style=" font-weight: 600;">实时归寝人数</p>
                     <p class="details" @click="backData">未归名单</p>               
                </div>
                <div class="divBox">
                    <div id="college" style="height:420px;width:50%;"></div>
                    <div class="div">
                        <div>
                            <span class="spanColor"></span>
                            <span class="div-span">当前人数</span>
                            <span>{{collegeValue1}}</span>
                        </div>
                        <div>
                            <span class="spanColor2"></span>
                            <span class="div-span">总人数</span>
                            <span>{{total}}</span>
                        </div>                     
                        <!-- <div class="div-border"></div> -->
                        
                        <div>当前归寝率为50%</div>
                    </div>
                </div>
            </div>
            
        </div>
    </div> 
     <div class="collegeDetail">
        <div class="collegeDetail-top" style="margin:10px 0;">
            <div style="display: flex;">
                <span class="span"></span>
                <p class="p">班级概况</p>
            </div>
            
        </div>      
        <div class="collegeDetailData">
            <div class="collegeDetail-div">
                <p>土工工程/道路桥梁/13级/1班</p>
                <div class="collegeDetail-box">
                   
                    <div class="p2">
                        <span>3000</span>
                        <span class="span">男生人数</span>
                    </div>
                    <div class="p2">
                        <span>2</span>
                        <span class="span">女生人数</span>                      
                    </div>
                   <div class="p2">
                        <span>2</span>
                        <span class="span">居住寝室数</span>                      
                    </div>
                   
                </div>
            </div>
            <div class="collegeDetail-div2">
                <p>土工工程/道路桥梁/13级/2班</p>
                <div class="collegeDetail-box">
                   
                    <div class="p2">
                        <span>3000</span>
                        <span class="span">男生人数</span>
                    </div>
                    <div class="p2">
                        <span>2</span>
                        <span class="span">女生人数</span>                      
                    </div>
                   <div class="p2">
                        <span>2</span>
                        <span class="span">居住寝室数</span>                      
                    </div>
                   
                </div>
            </div>
            <div class="collegeDetail-div3">
                <p>土工工程/道路桥梁/13级/3班</p>
                <div class="collegeDetail-box">
                   
                    <div class="p2">
                        <span>3000</span>
                        <span class="span">男生人数</span>
                    </div>
                    <div class="p2">
                        <span>2</span>
                        <span class="span">女生人数</span>                      
                    </div>
                   <div class="p2">
                        <span>2</span>
                        <span class="span">居住寝室数</span>                      
                    </div>
                   
                </div>
            </div>
          
           
            
        </div>
    </div>
     <!-- 详情 -->
     <el-dialog
  :title="detailsName"
  :visible.sync="details"
  width="700px"
  center>
    <el-table
        :data="tableData"
        height="350"
        style="width: 100%">
        <el-table-column
        prop="name"
        label="姓名"
        width="100">
        </el-table-column>
        <el-table-column
        prop="data"
        label="工号"
        width="150">
        </el-table-column>
        <el-table-column
        prop="name"
        label="类型"
        width="100">
        </el-table-column>
        <el-table-column
        prop="classMsg"
        label="班级信息">
    </el-table-column>
  </el-table>
</el-dialog>

    <!-- 异常名单 -->
      <el-dialog
  :title="abnormityName"
  :visible.sync="abnormityTime"
  width="820px"
  center>
    <el-table
        :data="tableData"
        height="350"
        style="width: 100%">
         <el-table-column
        prop="time"
        label="时间"
        width="100">
        </el-table-column>
        <el-table-column
        prop="name"
        label="姓名"
        width="100">
        </el-table-column>
        <el-table-column
        prop="data"
        label="工号"
        width="150">
        </el-table-column>
        <el-table-column
        prop="name"
        label="外出时长（h）"
        width="120">
         <template slot-scope="scope" style="position: relative;">
            <div class="abnormityTimes">
                <span>{{scope.row.time2}}</span>
                <!-- <img style="margin:0 5px;" src="../../../static/img/jiantou.png" alt=""> -->
                <span style="margin:0 5px 3px 5px;">↓</span>
                <span>{{scope.row.time3}}</span>
            </div>                    
        </template> 
        </el-table-column>
        <el-table-column
        prop="classMsg"
        label="班级信息">
    </el-table-column>
  </el-table>
</el-dialog>
  </div>
</template>

<script>
import { article,queryMenuById,queryCollegeByName} from '../../axios/api.js'
import 'quill/dist/quill.js';
import {mapState}  from 'vuex'
import { setTimeout } from 'timers';
    export default {
        name:"Index",
        components:{
         
        },      
        data(){
            return{
                content: "this is a simple demo", // 编辑器的内容
                msg:'',
                switchValue:false,
                details:false,
                abnormityTime:false,
                abnormityName:'',
                detailsName:'',
                roleInfoMenu:[],
                tableData:[{name:'李四',data:1022225622,classMsg:'超神学院-LOL-2019级-LOL3班',time:'2011/08/23',time2:'1.8',time3:'50%'}],//详情
                collegeValue1:250,
                collegeValue2:5,
                collegeValue3:8,
                total:500,
                collegeName:'管辖班级',
                collegeName2:'管辖班级',
               
                collType:' 报警类型',
                applyType:'申请类型',
                timeValue1:'',
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
            this.college()      
            // this.collegeLine()
            this.collegeColumnar()
            // this.collegeColumnar2()
            // this.collegeLine2()        
        
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
            skipRecord(){
                this.$router.push('/ApplyRecord')
               this.$store.commit('indexs','/ApplyRecord')
                this.$store.commit('homes',3)
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
        
            //申请类型
            handleApplyType(item){
                this.applyType=item.name
            },
            //报警类型
            handleColltype(item){
                console.log(item)
                this.collType=item.name
            },
            //昨日详情点击
            userDetail(){
                console.log('详情')
                this.details=true
                this.detailsName='昨日概况'
            },
            //异常名单点击
            abnormityData(){
                this.abnormityTime=true
                let data='2019/12/12'
                this.abnormityName=`${data}~${data} 考勤异常名单`
            },
            //未归名单点击
            backData(){
                this.details=true
                this.detailsName='2019/12/12 22:12'+' '+'未归名单'
            },
               //学院概况图表
         college(){
                var total = this.total;//最大温度数据单独出来定义，方便环形总数的修改              
                var collegeValue1=this.collegeValue1
                var rate=parseInt((collegeValue1/total)*100)+'%'
                console.log(collegeValue1)
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
                    title : {
                        text:rate,//主标题
                        subtext: '归寝率',//副标题
                        textStyle: {//主标题样式
                        color: '#E01763',
                        fontWeight: 'bold',
                        fontSize:36
                        },
                        subtextStyle: {//副标题样式
                        color: '#fff',
                        fontSize:18,
                        fontWeight: 'bold',
                        color: '#888888'
                        },
                        left:'center',
                        top: 'middle'
                    },
                    tooltip: {
                    show: false,//是否显示提示框
                        trigger: 'item',//提示框触发类型，item数据项图形触发，主要应用于无类目轴的图表（散点图、饼形图等）
                        formatter: function(params, ticket, callback) {//第一个参数数据集、第二个参数是异步回调标志、第三个参数是异步回调
                            return params.seriesName + ": " + params.value;//系列名称：数据值
                        }
                    },
                    color:['#E01763',],//调色盘颜色列表，默认情况下图例和饼形环图颜色使用
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
                        name: '归寝率',
                        type: 'pie',
                        clockWise: true, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [145, 150],
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
                                    color: '#E01763'
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
                  
                ]
                } 
                myChart.setOption(option);         
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
                    //    title : {
                    //         y:'bottom',
                    //         text: '人均外出总时长 16.8h， 人均每日外出时长 5.6h',
                    //         x:'center'
                    //         // subtext: '纯属虚构'
                    //     },
                         tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    // 
                    
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
                            data : ['低于平均值25%','低于平均值50%','低于平均值75%',]
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        
                       
                        {
                            name:'人数',
                            type:'bar',
                            // stack: '总量',
                            color:'#141D2C',
                            barWidth :10,
                            itemStyle: itemStyle,
                            data:[220, 182, 191,]
                        },                   
                    
                        //  {
                        //     name:'处理次数',
                        //     type:'bar',
                        //     // stack: '总量',
                        //     color:'#D7D7D7',
                        //     barWidth : 10,
                        //     data:[120, 132, 101, 134, 90, 220, 210]
                        // },
                        //   {
                        //     name:'总次数',
                        //     type:'bar',
                        //     // stack: '总量',
                        //     color:'#EEEEEE',
                        //     barWidth : 10,
                        //     data:[320, 332, 301, 334, 390, 330, 320],
                        //     itemStyle:itemStyle,
                        // },
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
        .abnormityTimes{
            color: #FF6C79;
            height: 20px;
            width: 100%;
            display: flex;
            align-items: center;
        }
           .details{
                    cursor: pointer;
                    &:hover{
                        color: rgba(229,0,98,1);
                    }
                }
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
             .collegeDetail-top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 45px;
                margin: 30px 0;
             
            }
        }
        .collegeDetail{
            width: 100%;        
                    
            .collegeDetailData{
                height: 216px;
                width: 100%;
                margin:20px 0;
                display: flex;
                flex-wrap: wrap;
                
                // align-content:space-between;
                p{
                    font-size: 16px;
                }
                .collegeDetail-div,.collegeDetail-div2,.collegeDetail-div3{
                    width: 407px;
                    height: 216px;
                    background:linear-gradient(229deg,rgba(253,79,48,1) 0%,rgba(242,33,114,1) 100%);
                    border-radius:15px;
                    padding: 20px;
                    color: #ffffff;
                    display: flex;
                    margin-right: 20px;
                    margin-bottom: 20px;
                    flex-direction: column;
                    justify-content: space-between;
                    .collegeDetail-box{
                        width:100%;
                        height: 100px;
                        display: flex;
                        justify-content:space-between;
                        padding-bottom:30px;
                        .p2{
                            height:100%;
                            min-width:70px;
                            // width: 50%;
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
                   
                    background:#141D2C;                  
                      
                }
                .collegeDetail-div3{
                  
                    background:rgba(255,255,255,1);
                    color: #333;
                   
                }
                .collegeDetail-div4{
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    font-size: 16px;
                    .collegeDetail-div4_div{
                        height: 50px;
                        min-width: 100px;
                        display: flex;
                        align-items: center;
                        position: relative;
                        padding-left:40px;
                        margin-right: 30%;
                         img{
                            position:absolute;
                            top:7px;
                            left: 0;
                        }
                    }
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
                    .collegeChart1-data{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 14px;
                        span{
                            display: inline-block;
                            font-weight: 600;
                            margin-left: 5px;
                        }
                    }   
                    .divBox{
                        width: 100%;
                        display: flex;
                        justify-content:space-between;
                        align-items: center;
                        font-size: 14px;
                        .div{
                            width: 50%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            .div-border{
                                    width:40px;
                                    height:2px;
                                    background:rgba(216,216,216,1);
                                    margin:20px 0;
                                    align-items: flex-start;
                                }
                            div{
                                height: 50px;
                                display: flex;
                                align-items: center;
                                .spanColor{
                                    display: inline-block;
                                    width:8px;
                                    height:8px;
                                    background:rgba(224,23,99,1);
                                    border-radius: 50%;
                                }
                                .div-span{
                                    width: 100px;
                                    text-align: left;
                                    margin-left: 5px;
                                }
                              
                                .spanColor2{
                                    display: inline-block;
                                    width:8px;
                                    height:8px;
                                    background:#E7E7E7;
                                    border-radius: 50%;
                                }
                            }
                        }
                    }  
            }
        }
        
    }
  
</style>






