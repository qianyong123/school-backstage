<template>
  <div class="ReturRule" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>归寝规则</h4>
           <div class="collegeNmaeBox">                          
                <div class="collegeNmae2">
                    <span class="spanName" style="margin-left:0">区域：</span>
                        <el-select style="width:130px;" v-model="value1" placeholder="请选择">  
                        <el-option                     
                        :label="'全部'"                            
                        :value="null">
                        </el-option>                      
                        <el-option
                        v-for="(item,index) in option1"
                        :key="index"
                        :label="item.regionName"                            
                        :value="item.regionId">
                        </el-option>
                    </el-select>
                    <span class="spanName">性别：</span>
                        <el-select style="width:130px;"  v-model="value2" placeholder="请选择">                     
                        <el-option
                        v-for="(item,index) in option2"
                        :key="index"
                        :label="item.name "                            
                        :value="item.id ">
                        </el-option>
                    </el-select>
                     <el-input style="width:120px;margin:0 10px;" v-model="value3" placeholder="楼栋名"></el-input> 
                    <el-button @click="queryName" size="small">查询</el-button> 
                </div>   
                <el-button size="small" icon="el-icon-setting"  @click="setRecord"></el-button>              
                   
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
                    v-for="(item,index) in dataHeader"
                    :key="index"
                    :prop="item.props"
                    :label="item.name"
                   >                 
                    </el-table-column>
                   
                   
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="80">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="handleEdit(scope.row)">设置</p>                                                              
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
         <!-- 设置 -->
       <el-dialog
        title="归寝规则设置"
        :visible.sync="newVisible"
        width="400px"
        center>
        <div class="setTimes">
            <div class="div">
                <span class="span">晚归时间</span>
                 <el-time-picker
                    v-model="time1"
                    :format="'HH:mm:ss'"
                    placeholder="时间点">
                </el-time-picker>
            </div>
            <div class="div">
                <span class="span"></span>
                 <el-radio v-model="radio" label="0">当日</el-radio>
                <el-radio v-model="radio" label="1">次日</el-radio>
            </div>
            <div class="div">
                <span class="span">未归时间</span>
                 <el-time-picker
                    v-model="time2"
                    :picker-options="{
                    selectableRange: '00:00:00 - 23:59:59'
                    }"
                    placeholder="时间点">
                </el-time-picker>
            </div>
            <div class="div">
                <span class="span"></span>
                 <el-radio v-model="radio2" label="0">当日</el-radio>
                <el-radio v-model="radio2" label="1">次日</el-radio>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="setSave">确 定</el-button>
            <el-button size="small" @click="newVisible = false">取 消</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import Paginations from './Paginations'
import {formatDate} from '../../js/date.js'
import bus from '../../js/bus.js'
import { arealist_2,floorList} from '@/axios/api1'
import { 
 queryMenuById,
 updateDormRule,
 queryDormRule
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
            time1:'',
            time2:'',
            radio:'0',
            radio2:'0',
            total:0,
            id:'student',
            pageSize:10,
            pageNum:1,
            allcollege:false,
            deleteId:null,//表格操作
            newVisible:false,//新增弹框
            setVisible:false,//设置弹框   
            fileList:[],//导入   
            studentInfoMsg:{},       
            //查询
            Select1:'',         
            value1:null,
            value2:null,
            value3:'',                    
             //状态
            types: [
            {id: '',label: '全部',name:'全部'}, 
            {id: '1',label: '已处理 ',name:'已处理   '}, 
            {id: '2',label: '未处理',name:'未处理'}, 
            ],
                
          option1:[],
          option2:[
            {id: null,name:'全部'}, 
            {id:0,name:' 男 '}, 
            {id:1,name:'女'},
          ],
            //编辑弹框
            EditCollegeNmae:'',//编辑班级名

            dataHeader:[
                {name:'楼栋名',props:'floorName'},      
                {name:'晚归时间',props:'lateReturnTime'},
                {name:'未归时间',props:'notReturnTime'},
                {name:'宿管',props:'housemasterInfoName'},      
                {name:'性别',props:'floorSex'},
                {name:'所属区域',props:'regionName'},
            ],//表格头部                         
            value: '',
            multipleSelection: [], //表格多选
            tableData: [                   
                //  {studentInfoName:'姓名',props:'studentInfoName'},     
            ],
            roleInfoMenu:[],
            roleId:null,
            popupTitle:'',
            batchSet:1,
            dormRuleId:null,
            floorId:null
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
            }
        },
        mounted() {        
            this.loading=false
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            bus.$on('newCall',this.newCall)
            arealist_2().then(res=>{
                if(res.data.code==200&&res.data.data!=null){
                    this.option1=res.data.data
                }   
            })
            this.time1=new Date("2014-07-10 22:00")
             this.time2=new Date("2014-07-10 23:00")
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
            this.queryDormRules()
              console.log(this.roleInfoMenu)
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
                     else if(this.roleInfoMenu.length<1){
                        return true
                    }
                    else{
                        return this.roleInfoMenu[2].indexOf('3')==-1?false:true
                    }
                    
                }
            }
        },
         watch: {
            
         },      
        methods: {
            //导入成功或失败
            handleAvatarSuccess(file){
                console.log(file)
                 let fd = new FormData();
                fd.append('file',file.raw);//传文件
                this.fileList=[]
              
                
            },    
            //查询归寝规则
            queryDormRules(){
                this.loading=true
                queryDormRule({
                    regionId:this.value1,
                    floorSex:this.value2,
                    floorName:this.value3,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }).then(res=>{
                this.loading=false
                    console.log('归寝规则',res)
                     if(res.data.code==200&&res.data.data.list!=null){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total
                }  
                })
            },                 
            //多删除
            deletes(){

            },
            //设置批量
            setRecord(){          
              if(this.multipleSelection.length<1){
                  this.$message('请选择需要设置的楼栋！');
              }else{
                this.newVisible=true
                this.batchSet=1
                this.radio='0'
                this.radio2='0'
                this.time1=new Date("2014-07-10 22:00")
                this.time2=new Date("2014-07-10 23:00")
              }
            }, 
             //设置单个
            handleEdit(row){
                 console.log(row)
                let lateReturnTime2=null
                let notReturnTime=null
                let radio='0',
                    radio2='0',
                    time2=null,
                    time=null;
                 if(row.lateReturnTime!=null){
                     lateReturnTime2=row.lateReturnTime.split(' ')
                    radio=lateReturnTime2[0]=='当日'?'0':'1'
                    time=new Date("2014-07-10 "+lateReturnTime2[1])
                 }
                  if(row.notReturnTime!=null){
                     notReturnTime=row.notReturnTime.split(' ')
                    radio2=notReturnTime[0]=='当日'?'0':'1'
                    time2=new Date("2014-07-10 "+notReturnTime[1])
                 }
                console.log('radio',radio)
                 this.newVisible=true
                  this.batchSet=2
                  this.dormRuleId =row.dormRuleId
                  this.floorId=row.floorId
                   this.radio=radio
                    this.radio2=radio2
                  
                  this.time1=time
                  this.time2=time2
            },
            //设置保存
            setSave(){
                let list=[]
                var startTime=formatDate(this.time1,'hh:mm'),
                    startTime2=formatDate(this.time2,'hh:mm');
                if(this.time1==null||this.time2==null){
                     this.$message('设置时间不能为空！');
                     return
                }
                else if(this.batchSet==1){
                    this.multipleSelection.forEach(data=>{
                        list.push({ dormRuleId:data.dormRuleId,
                                    dormRuleTypeLate:this.radio,
                                    dormRuleTypeNot:this.radio2,
                                    floorId:data.floorId,
                                    lateReturnTime:startTime,
                                    notReturnTime:startTime2})
                    })
                }else{
                   list.push({ dormRuleId:this.dormRuleId,
                                dormRuleTypeLate:this.radio,
                                dormRuleTypeNot:this.radio2,
                                floorId:this.floorId,
                                lateReturnTime:startTime,
                                notReturnTime:startTime2}) 
                }
                updateDormRule({dormRule:list}).then(res=>{
                    if(res.data.code==200){
                        this.$message({message: '设置成功',type: 'success'});
                        this.queryDormRules()  
                        this.newVisible=false
                    }else{
                          this.$message('设置失败' +res.data.msg);
                    }
                })
                var stringTime = "2014-07-10 10:21:12";               
                
                console.log(this.time1,this.radio)
                // console.log(startTime)
                // console.log(new Date("2014-07-10 "+startTime))
            },    
              //点击操作
            clickOperate(scope,row){
                console.log(scope,row)
                this.deleteId=scope.$index
            },                                        
            //点击立即处理
            disposeState(val){
                 this.newName=2
                 this.newVisible=true
                console.log(val)
            },
           
            //删除单个
            handleDelete(row){
                console.log(row)
            },
            //查询
            queryName(){ 
                this.queryDormRules()           
                console.log(this.Select1,this.value1,this.value2,this.value3,)
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
                    this.queryDormRules()
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val   
                this.queryDormRules()
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.ReturRule{
    flex: 1;
    padding:50px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
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
          padding: 5px 0;
          justify-content: space-between;
         
        .collegeNmae2{       
            display: flex;
            min-height:32px;
           align-items: center;
        }
        .spanName{
            color: $haedColor;
            font-size: 14px;
            margin-left: 10px;
      }
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
            border-radius:15px 15px 0 0; 
            // th,td{
            //     text-align: center;
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
            left:-15px;
            top: 0px;
            bottom: 0;
            right: 0;
            margin:auto;
            width:100%;
            height:30px;
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
   .setTimes{
       .div{
           display: flex;
           width: 100%;
           height: 33px;
           align-items: center;
           margin-bottom: 10px;
           .span{
               display: inline-block;
               width: 80px;
           }
       }
   }
}
 
</style>






