
<template>
  <div class="Inform" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>消息通知</h4>
           
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
                    style="width:100%">
                    <el-table-column                 
                    width="30">
                    <template slot-scope="scope" >
                         <div style=" visibility: hidden;">{{scope.row.name}}</div> 
                    </template>
                    </el-table-column>
                    <el-table-column                            
                    label="类型"
                   >  
                     <template slot-scope="scope">
                            <div>{{scope.row.type}}</div>                          
                        </template>               
                    </el-table-column>
                   
                   <el-table-column                            
                    label="类容"
                   >  
                     <template slot-scope="scope">
                            <div>{{scope.row.name}}</div>                          
                        </template>               
                    </el-table-column>
                    <el-table-column                            
                    label="时间"
                   >  
                     <template slot-scope="scope">
                            <div>{{scope.row.time}}</div>                          
                        </template>               
                    </el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="handleEdit(scope.row)">查看</p>                                                                
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
        
  </div>
</template>

<script>
import Paginations from './Paginations'
import {formatDate} from '../../js/date.js'
import bus from '../../js/bus.js'
import { 
 queryMenuById
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
           value1:'',
           value2:'',
           value3:'',
            value4:'',
           value5:'',        
           
             //状态
            types: [
            {id: '',label: '全部',name:'全部'}, 
            {id: '1',label: '已处理 ',name:'已处理   '}, 
            {id: '2',label: '未处理',name:'未处理'}, 
            ],
                
          
            //编辑弹框
            EditCollegeNmae:'',//编辑班级名
                                 
            value: '',
            multipleSelection: [], //表格多选
            tableData: [                   
                 {type:'报警',name:'类容',time:'2018-12-12 10:20:22',type2:'晚归'},   
                 {type:'申请',name:'类容',time:'2018-12-12 10:20:22',type2:'物品出楼'},   
            ],
            roleInfoMenu:[],
            roleId:null,
            popupTitle:''
        }
    },
        
        mounted() {        
            this.loading=false
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            bus.$on('newCall',this.newCall)
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
              console.log(this.roleInfoMenu)
               let roleId=localStorage.getItem('roleId')  
                this.roleId=roleId
           
        },
        computed:{
           
         
        },
         watch: {
            
         },      
        methods: {
              
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
            //查看
            handleEdit(row){
                console.log(row)           
                if(row.type=='报警'){
                    this.$router.push({
                        name:'Alarm',
                        params:{
                           type:row.type2 
                        }
                    })
                    this.$store.commit('indexs','/Alarm')
                    this.$store.commit('homes',3)
                }
                else if(row.type=='申请'){
                      this.$router.push({
                        name:'ApplyRecord',
                        params:{
                           type:row.type2 
                        }
                    })
                    this.$store.commit('indexs','/ApplyRecord')
                    this.$store.commit('homes',3)
                }
            },
         
          
             //分页弹出框
            handleSizeChange2(val) {
                console.log(`每页 ${val} 条`);
                    this.pageSize=val
                   
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val   
               
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.Inform{
    flex: 1;
    padding:50px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .ClassManage-top{
        min-height:60px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        padding:20px 10px 10px 0px;
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
        margin-bottom: 10px;
        // position: relative;
        .tableBox{
            flex: 1;
            border-radius:15px 15px 0 0;
             overflow: hidden; 
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






