<template> 
    <div class="collegeStatistics">
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
                                <el-dropdown-item  :command="{regionName:'全部',regionId:null}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.regionName}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleFloor" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin-left:10px;">
                                {{floorName}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{floorName:'全部',id:null}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in floorList" :key="item.id" :command="item">{{item.floorName}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-date-picker
                        v-model="timeValue"
                        type="year"
                        style="width:100px;margin:0 10px;"
                        :clearable="false" 
                        format="yyyy"  
                        @change="selectYear"    
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
                            <div class="el-dropdown-link" style="color:#333;margin-left:10px;">
                                {{weekName}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:null}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <p v-if="isdownload==0" class="top" style=" font-weight: 600;">异常行为统计</p>
                    <p v-if="isdownload==0" style="cursor: pointer;" @click="checkForms(1)">异常报表</p>
                </div>
                <div id="areaCharts1" style="height:420px;width:100%;"></div>
            </div>
          <div class="collegeChart4" style="margin-left:20px;">
               <div class="collegeChart1-top" :class="{'collegeChart1-top2':isdownload==1}">
                     <div class="collegeChart-p" v-if="isdownload==1">
                        <p class="top" style=" font-weight: 600;">申请处理统计</p>
                        <p style="cursor: pointer;" @click="checkForms(1)">申请统计</p>
                    </div>
                    <div v-if="isdownload==1" class="collegeChart-p2">
                        <div>
                            <el-dropdown @command="handleCommand2" placement="bottom-start">
                                <div class="el-dropdown-link" style="color:#333;">
                                    {{collegeName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </div>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  :command="{regionName:'全部',regionId:null}">全部</el-dropdown-item>
                                    <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.regionName}}</el-dropdown-item>                                                   
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-dropdown @command="handleFloor2" placement="bottom-start">
                                <div class="el-dropdown-link" style="color:#333;margin:0 10px;">
                                    {{floorName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </div>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  :command="{floorName:'全部',id:null}">全部</el-dropdown-item>
                                    <el-dropdown-item v-for="item in floorList2" :key="item.id" :command="item">{{item.floorName}}</el-dropdown-item>                                                   
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-dropdown @command="handleApplyType" placement="bottom-start">
                                <div class="el-dropdown-link" style="color:#333;margin-right:10px;">
                                    {{applyType}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </div>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  :command="{name:'全部',id:null}">全部</el-dropdown-item>
                                    <el-dropdown-item v-for="item in applyTypeList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                                </el-dropdown-menu>
                            </el-dropdown>
                            
                        </div>
                        <p v-if="isdownload==0" class="top" style=" font-weight: 600;">申请处理统计</p>
                        <div class="collegeChart2-right">
                            <el-date-picker
                            v-model="timeValue2"
                            type="year"
                            style="width:100px;"
                            :clearable="false" 
                            format="yyyy" 
                            @change="selectYear2"    
                            placeholder="年">
                            </el-date-picker>
                            <el-dropdown @command="handleMonth2" placement="bottom-start">
                                <div class="el-dropdown-link" style="color:#333;margin-left:10px;">
                                    {{monthName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </div>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="item in monthList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-dropdown @command="handleWeekName2" placement="bottom-start">
                                <div class="el-dropdown-link" style="color:#333;margin:0 10px;">
                                    {{weekName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                                </div>

                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  :command="{name:'全部',id:null}">全部</el-dropdown-item>
                                    <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                                </el-dropdown-menu>
                            </el-dropdown>
                            <p v-if="isdownload==0" style="cursor: pointer;" @click="checkForms(2)">申请统计</p>
                        </div>
                    </div>
                    <div v-if="isdownload==0">
                        <el-dropdown @command="handleCommand2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{collegeName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{regionName:'全部',regionId:null}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in collegeList" :key="item.id" :command="item">{{item.regionName}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                         <el-dropdown @command="handleFloor2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 10px;">
                                {{floorName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item  :command="{floorName:'全部',id:null}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in floorList2" :key="item.id" :command="item">{{item.floorName}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleApplyType" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;">
                                {{applyType}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:null}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in applyTypeList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        
                    </div>
                    <p v-if="isdownload==0" class="top" style=" font-weight: 600;">申请处理统计</p>
                    <div v-if="isdownload==0" class="collegeChart2-right">
                        <el-date-picker
                        v-model="timeValue2"
                        type="year"
                        style="width:100px;"
                        :clearable="false" 
                        format="yyyy" 
                        @change="selectYear2"    
                        placeholder="年">
                        </el-date-picker>
                          <el-dropdown @command="handleMonth2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin-left:10px;">
                                {{monthName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item in monthList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown @command="handleWeekName2" placement="bottom-start">
                            <div class="el-dropdown-link" style="color:#333;margin:0 10px;">
                                {{weekName2}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </div>

                            <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item  :command="{name:'全部',id:null}">全部</el-dropdown-item>
                                <el-dropdown-item v-for="item in weekList" :key="item.id" :command="item">{{item.name}}</el-dropdown-item>                                                   
                            </el-dropdown-menu>
                        </el-dropdown>
                        <p v-if="isdownload==0" style="cursor: pointer;" @click="checkForms(2)">申请统计</p>
                    </div>
                </div>
                <div id="areaCharts2" style="height:420px;width:100%;"></div>
            </div>
            
        </div>   
         <!-- 报表 -->
     <el-dialog
    :title="detailsName"
    :visible.sync="details"
    width="900px"
    center>
    <el-table
    v-if="istable==1"
        :data="tableData"
        height="400"
        style="width: 100%">
        <el-table-column
        prop="shu"
        label="楼栋人数"
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
        label="位置信息">
        </el-table-column>
        <el-table-column
        prop="name"
        label="宿管信息">
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
import { queryCollegeByName} from '../../axios/api.js'
import {arealist_2,floorlist_2} from '../../axios/api1.js'
import 'quill/dist/quill.js';
import {mapState}  from 'vuex'
    const monthData=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    const weekData=['一周','二周','三周','四周','五周',]
    export default {
        name:"Index",
        components:{
        
        },  
        props:[
            'switchValue',
            'isdownload'
        ],    
        data(){
            return{             
                // switchValue:false,
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
                 monthName:'月',
                monthName2:'月',
                weekName:'周',
                weekName2:'周',             
                timeValue:'',
                timeValue2:'',
                timeValue3:'',
                timeValue4:'',
                collegeList:[//college_name
                   
                ],
                floorList:[],
                floorList2:[],
                optionData:['周一','周二','周三','周四','周五','周六','周日'], 
                collegeLineData:[10,5,20,14,10,4,5],
                collegeLineData2:[1,12,15,0,4,0,33],
                collegeLineData3:[4,10,4,10,11,0,14],
                weekList:[
                    {id:1,name:'一周'},
                    {id:2,name:'二周'},
                    {id:3,name:'三周'},
                    {id:4,name:'四周'},
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
                },
                 details:false,
                istable:1,
                detailsName:'',
                tableData:[{name:'计算机学院',shu:12000}],
                tableHader3:[
                    {name:'类型',prop:'name'},
                    {name:'待处理',prop:'name'},
                    {name:'已处理',prop:'name'},
                    {name:'处理率',prop:'name'},
                    {name:'位置信息',prop:'name'},
                     {name:'宿管信息',prop:'name'},
                ],
            }
        },
        created() { 
            console.log('区域')
            arealist_2().then(res=>{
                if(res.data.code==200){
                   this.collegeList=res.data.data 
                   console.log('区域',res)
                }else{
                    this.open('查询区域失败',res.data.msg)
                }
            })
        },    
        watch:{
           switchValue(){
               if(this.switchValue){
                    this.collegeLine()         
                    this.collegeLine2()
               }
           } 
        },   
        mounted(){                 
           
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
              //选择年份
            selectYear(data){
                console.log(data)
               
                this.monthName='月'
                this.weekName='周'              
                this.optionData=monthData.slice(0,this.collegeLineData.length)
                this.collegeLine()
            },
            //选择年份2
            selectYear2(data){
                console.log(data)
                this.monthName2='月'
                this.weekName2='周'
                this.optionData=monthData.slice(0,this.collegeLineData.length)
                this.collegeLine2()
            },
             //选择月份
            handleMonth(data){
                this.monthName=data.name
                this.weekName='周'
                if(data.name=='全部'){
                    this.optionData=monthData.slice(0,this.collegeLineData.length)                  
                }else{
                    this.optionData=weekData
                }
                this.collegeLine()
            },
             //选择月份2
            handleMonth2(data){
                this.monthName2=data.name
                this.weekName2='周'
                  if(data.name=='全部'){
                    this.optionData=monthData.slice(0,this.collegeLineData.length)                  
                }else{
                    this.optionData=weekData  
                }
                 this.collegeLine2()
            },
            //周下拉
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
                if(item.name=='全部'){
                     this.optionData=['一周','二周','三周','四周','五周']
                }else{
                    this.optionData=['周一','周二','周三','周四','周五','周六','周日']
                }
                this.collegeLine2()
            },
             //查看报表
            checkForms(id){
                this.details=true
                this.istable=id
                if(id==1){
                    this.detailsName='2019/12'+'\xa0\xa0\xa0'+'异常报表'
                }
                else if(id==2){
                    this.detailsName='2019/12'+'\xa0\xa0\xa0'+'申请统计'
                }
               
                console.log(id)
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
                        data: this.optionData
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
                             color:"#DADADA",
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
                        data: this.optionData
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
                             .collegeChart-p2{
                                 display: flex;
                                 align-items: center;
                                 justify-content: center;
                             }
                            
                        } 
                        .collegeChart1-top2{
                        flex-direction: column;
                        }         
                    }
                    .collegeChart2-right{
                        display: flex;
                        align-items: center; 
                        min-height: 35px;
                    }
                }
                
            }
       
        

  
</style>






