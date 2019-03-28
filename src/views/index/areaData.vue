<template> 
    <div class="collegeStatistics">
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
                                <el-dropdown-item  :command="{regionName:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.regionName}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleFloor" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin-left:15px;">
                                {{floorName}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{floorName:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in floorList" :key="item.id" :command="item">{{item.floorName}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-date-picker
                        v-model="timeValue"
                        type="month"
                        style="width:100px;margin:0 15px;"
                        :clearable="false" 
                        format="yyyy/MM"    
                        placeholder="年/月">
                        </el-date-picker>
                        <el-dropdown @command="handleWeekName" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{weekName}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <p class="top" style=" font-weight: 600;">异常行为统计</p>
                    <p>异常报表</p>
                </div>
                <div id="areaCharts1" style="height:420px;width:100%;"></div>
            </div>
          <div class="collegeChart4" style="margin-left:20px;">
               <div class="collegeChart1-top">
                    <div>
                        <el-dropdown @command="handleCommand2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{collegeName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{regionName:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.regionName}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                         <el-dropdown @command="handleFloor2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 15px;">
                                {{floorName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{floorName:'全部',id:''}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in floorList2" :key="item.id" :command="item">{{item.floorName}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleApplyType" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
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
                        v-model="timeValue"
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
                        <p>申请统计</p>
                    </div>
                </div>
                <div id="areaCharts2" style="height:420px;width:100%;"></div>
            </div>
            
        </div>      
    </div>   
      
 
</template>

<script>
import { queryCollegeByName} from '../../axios/api.js'
import {arealist_2,floorlist_2} from '../../axios/api1.js'
import 'quill/dist/quill.js';
import {mapState}  from 'vuex'
    export default {
        name:"Index",
        components:{
        
        },      
        data(){
            return{             
                switchValue:false,
                roleInfoMenu:[],
                collegeValue1:300,
                collegeValue2:5,
                collegeValue3:8,
                collegeName:'区域',
                collegeName2:'区域',
                floorName:'楼栋',
                floorName2:'楼栋',
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
                floorList:[],
                floorList2:[],
                weekList:[
                    {id:1,name:'一周'},
                    {id:2,name:'二周'},
                    {id:3,name:'三周'},
                    {id:4,name:'四周'},
                ],
               applyTypeList:[
                    {id:1,name:'调寝'},
                    {id:2,name:'物品出楼'},
                    {id:3,name:'报修'},
                    {id:4,name:'被访'},
                    // {id:5,name:'请假'},
                ],
                editorOption: {
                    // 编辑器的配置
                    // something config college
                    theme: "bubble"
                }
            }
        },
        created() { 
            arealist_2().then(res=>{
                if(res.data.code==200){
                   this.collegeList=res.data.data 
                   console.log('区域',res)
                }else{
                    this.open('查询区域失败',res.data.msg)
                }
            })
        },       
        mounted(){                 
            this.collegeLine()         
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
            //开关切换
            dataType(val){
                console.log(val)
            },
            
            //区域下拉floorName  floorId
            handleCommand(command){
                console.log(command)
                this.collegeName=command.regionName
                floorlist_2({regionId:command.regionId}).then(res=>{
                    if(res.data.code==200&&res.data.data!=null){
                        console.log(res)
                        this.floorList=res.data.data
                    }
                })
            },
             //区域下拉
            handleCommand2(command){
                console.log(command)
                this.collegeName2=command.regionName
                 floorlist_2({regionId:command.regionId}).then(res=>{
                    if(res.data.code==200&&res.data.data!=null){
                        console.log(res)
                        this.floorList2=res.data.data
                    }
                })
            },
            //楼栋下拉
            handleFloor(item){
                this.floorName=item.floorName
            },
             //楼栋下拉
            handleFloor2(item){
                this.floorName2=item.floorName
            },
             //申请类型
            handleApplyType(item){
                this.applyType=item.name
            },
            //周下拉
            handleWeekName(item){
                this.weekName=item.name
            },
              //周下拉
            handleWeekName2(item){
                this.weekName2=item.name
            },
            
            //报警类型
            handleColltype(item){
                console.log(item)
                this.collType=item.name
            },
         
            //异常行为统计图表 折线
            collegeLine(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('areaCharts1'));
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
            },        
             //申请处理统计图表 折线
            collegeLine2(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('areaCharts2'));
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
                        justify-content: space-between;                      
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
                            
                        }        
                    }
                    .collegeChart2-right{
                        display: flex;
                        align-items: center; 
                        min-height: 32px;
                    }
                }
                
            }
       
        

  
</style>






