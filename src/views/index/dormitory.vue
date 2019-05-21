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
                        <img src="../../../static/img/wuping.png" alt="">
                        <span style="font-size:44px;">33</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">物品出楼申请</div>
                </div>  
                <div class="collegeDetail-div3 collegeDetail-div4">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/baoxiu.png" alt="">
                        <span style="font-size:44px;">33</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">报修申请</div>
                </div>   
                <div class="collegeDetail-div3 collegeDetail-div4" style="margin-right:0;">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/dengji.png" alt="">
                        <span style="font-size:44px;">33</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">被访申请</div>
                </div>            
            </div>
        </div>
    </div>
    <div class="collegeStatistics">
         <div class="collegeDetail-top" style="margin-top:0">
            <div style="display: flex;">
                <span class="span"></span>
                <p class="p">今日概况</p>
            </div>
            <!-- <div class="details" @click="userDetail">详情</div> -->
        </div>  
        <div class="collegeDetail">
            <div class="collegeDetailData">
                <div class="collegeDetail-div3 collegeDetail-div4">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/baojin.png" alt="">
                        <span style="font-size:44px;">30</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">报警次数</div>
                </div>
                 <div class="collegeDetail-div3 collegeDetail-div4">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/weigui2.png" alt="">
                        <span style="font-size:44px;">33</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">未归人数</div>
                </div>
                <div class="collegeDetail-div3 collegeDetail-div4">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/dengji.png" alt="">
                        <span style="font-size:44px;">26</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">访客人数</div>
                </div>
                 <div class="collegeDetail-div3 collegeDetail-div4" style="margin-right:0;">
                    <div class="collegeDetail-div4_div">
                        <img src="../../../static/img/churu.png" alt="">
                        <span style="font-size:44px;">26</span>
                    </div>
                    <div class="collegeDetail-div4_div" style="color:#888;">出入次数</div>
                </div>
            </div>
        </div>
        
        <div class="collegeChart1Box">
            
            <div class="collegeChart2">
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
                         format="yyyy/MM/dd HH:mm"                      
                        placeholder="年/月/日 时分">
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
            <div class="collegeChart2" style="margin-left:20px; background:none;"></div>
        </div>
    </div> 
     <div class="collegeDetail">
        <div class="collegeDetail-top" style="margin:10px 0;">
            <div style="display: flex;">
                <span class="span"></span>
                <p class="p">楼栋概况</p>
            </div>
            
        </div>      
        <div class="collegeDetailData">
            <div class="collegeDetail-div">
                <p>a区/3栋</p>
                <div class="collegeDetail-box2">
                    <div class="p3">
                        <span class="span">房间数</span> 
                        <span class="amounts">120</span>
                        <span class="redio"></span>                   
                    </div>
                    <div class="p3">
                        <span class="span">床位数(入住/空置)</span>
                        <span class="amounts">541/120</span>
                        <span class="redio"></span> 
                    </div>
                    <div class="p3">
                        <span class="span">学生人数</span>
                        <span class="amounts">400</span>
                        <span class="redio"></span>                       
                    </div>    
                    <div class="p3">
                        <span class="span">宿管人数</span>
                        <span class="amounts">2</span>
                        <span class="redio"></span>                       
                    </div>                
                </div>
            </div>
            <div class="collegeDetail-div2">
                <p>a区/3栋</p>
               <div class="collegeDetail-box2">
                    <div class="p3">
                        <span class="span">房间数</span> 
                        <span class="amounts">120</span>
                        <span class="redios"></span>                   
                    </div>
                    <div class="p3">
                        <span class="span">床位数(入住/空置)</span>
                        <span class="amounts">541/120</span>
                        <span class="redios2"></span> 
                    </div>
                    <div class="p3">
                        <span class="span">学生人数</span>
                        <span class="amounts">400</span>
                        <span class="redios3"></span>                       
                    </div>    
                    <div class="p3">
                        <span class="span">宿管人数</span>
                        <span class="amounts">2</span>
                        <span class="redios4"></span>                       
                    </div>                
                </div>
            </div>
            <div class="collegeDetail-div3">
                <p>a区/3栋</p>
                <div class="collegeDetail-box2">
                    <div class="p3">
                        <span class="span">房间数</span> 
                        <span class="amounts">120</span>
                        <span class="redios"></span>                   
                    </div>
                    <div class="p3">
                        <span class="span">床位数(入住/空置)</span>
                        <span class="amounts">541/120</span>
                        <span class="redios2"></span> 
                    </div>
                    <div class="p3">
                        <span class="span">学生人数</span>
                        <span class="amounts">400</span>
                        <span class="redios3"></span>                       
                    </div>    
                    <div class="p3">
                        <span class="span">宿管人数</span>
                        <span class="amounts">2</span>
                        <span class="redios4"></span>                       
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
        height="400"
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
  </div>
</template>

<script>
import { article,queryMenuById,queryCollegeByName} from '../../axios/api.js'
import {} from '../../axios/api1.js'
import 'quill/dist/quill.js';
import {mapState}  from 'vuex'
import { setTimeout } from 'timers';
    export default {
        name:"Index",
         props:[
            'isdownload'
        ],
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
                collegeName2:'管辖楼栋',
                           
                timeValue1:'',
                timeValue2:'',
                timeValue3:'',
                timeValue4:'',
                collegeList:[//college_name
                   
                ],                          
             
                editorOption: {
                    // 编辑器的配置
                    // something config college
                    theme: "bubble"
                },
                myChart:null,
                loading:null,
                radius:[145,150],//环形图的大小
            }
        },
        created() { 
          
        },       
        mounted(){  
            if(this.isdownload==1){
                this.radius=[120,125]                   
            }   
            this.college()                  
        
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
            handleCommand2(command){
                console.log(command)
                this.collegeName2=command.college_name
            },                 
            //昨日详情点击
            userDetail(){
                console.log('详情')
                this.details=true
                this.detailsName='今日概况'
            },       
            //未归名单点击
            backData(){
                this.details=true
                this.detailsName='2019/12/12 22:12'+'\xa0\xa0\xa0'+'未归名单'
            },
               //学院概况图表
         college(){
                var total = this.total;//最大温度数据单独出来定义，方便环形总数的修改              
                var collegeValue1=this.collegeValue1
                var rate=parseInt((collegeValue1/total)*100)+'%'
                var radius=this.radius
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
                        radius,
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
       
           .details{
                    cursor: pointer;
                    &:hover{
                        // color: rgba(229,0,98,1);
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
                        height: 140px;
                        padding-bottom:10px;
                        display: flex;
                        flex-direction: column;
                        justify-content:space-between;                      
                    }
                 .p3{
                    height: 20px;
                    display: flex;                          
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                    position: relative;
                    padding-left: 15px;
                    .amounts{
                        display: inline-block;
                        min-width: 100px;
                    }
                    .redio,.redios,.redios2,.redios3,.redios4{
                        width:8px;
                        height:8px;
                        position: absolute;
                        border-radius: 50%;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        margin: auto;
                    }
                     .redio{                              
                        background:#fff;
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
                      .redios4{                            
                        background:#888;
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
            .collegeChart1,.collegeChart2,{
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






