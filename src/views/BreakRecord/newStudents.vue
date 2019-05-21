<template>
     <!-- 新增弹框 -->
    <el-dialog
    :title="popupTitle"
    :visible.sync="newVisible"
    @close="shutModal"
    width="560px"
    :show-close="false"
    center>
    <div v-if="newName==1" class="break break2">
        <div class="div div2">
            <span class="span2">学号</span>
            <el-input @blur="$emit('getStudentInfo',value.newInput1)" style="width:200px" v-model="value.newInput1" placeholder="学号"></el-input>
        </div>  
         <div class="div div2">
            <span class="span2">标题</span>
            <el-input style="width:200px" v-model="value.newInput2" placeholder="标题"></el-input>
        </div>  
        <div class="div div2" style="align-items:flex-start">
            <span class="span2">违纪内容</span>
            <el-input v-model="value.newInput3" placeholder="违纪内容" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </div>  
         <i class="el-icon-close close" @click="$emit('newCall')"></i>  
    </div>
    <div class="break">
        <i class="el-icon-close close" @click="$emit('newCall')"></i>           
        <div class="logImg">
            <div style="width:130px;height:150px;">
                <img style="width:130px;height:150px;" :src="studentInfoMsg.studentInfoImg==null?'':studentInfoMsg.studentInfoImg" alt="">
            </div>
            <!-- <img src="../../../static/img/t1.png" alt=""> -->
        </div> 
        <div class="userIfoBox">
            <div class="div">
                <span class="span">姓名：</span>
                <span>{{studentInfoMsg.studentInfoName}}</span>
            </div>
            <div class="div">
                <span class="span">学号：</span>
                <span>{{studentInfoMsg.studentInfoNo}}</span>
            </div>
            <div class="div">
                <span class="span">性别：</span>
                <span>{{studentInfoMsg.studentInfoSex}}</span>
            </div>
            <div class="div">
                <span class="span">手机：</span>
                <span>{{studentInfoMsg.studentInfoPhone}}</span>
            </div>
            <div class="div">
                <span class="span">辅导员：</span>
                <span>{{studentInfoMsg.teacherInfoName}}</span>
            </div>
            <div class="div">
                <span class="span">辅导员手机：</span>
                <span>{{studentInfoMsg.teacherInfoPhone}}</span>
            </div>
            <div class="div div2">
                <span class="span">班级信息：</span>
                <span>{{studentInfoMsg.classMsg}}</span>
            </div>
            <div class="div div2">
                <span class="span">房间信息：</span>
                <span>{{studentInfoMsg.roomMsg}}</span>
            </div>
           
        </div>
     </div>     
     <div v-if="newName==2"  class="break" style="border-top: 1px solid #EDEDED;padding-top:20px;margin-top:10px;">    
        <div class="userIfoBox2">       
            <div class="userIfoBox">   
                <div class="div2">
                    <div class="div div3" style="margin:0">
                        <span class="span4">提交人：</span>
                        <span>{{studentInfoMsg.sbmintRoleInfoName}}</span>
                    </div>           
                    <div class="div div3" style="margin:0">
                        <span class="span4">角色：</span>
                        <span>{{studentInfoMsg.sbmintRoleInfo}}</span>
                    </div>
                    <div class="div div3" style="margin:0">
                        <span class="span4" style="width:77px">联系方式：</span>
                        <span>{{studentInfoMsg.sbmintUserInfoPhone}}</span>
                    </div>  
                </div> 
                  
                <div class="div div2">
                    <span class="span4">提交时间：</span>
                    <span>{{studentInfoMsg.disciplineRecordSubmintTime}}</span>
                </div>   
                 <div class="div div2">
                    <span class="span4">标题：</span>
                    <span>{{studentInfoMsg.disciplineRecordTitle}}</span>
                </div>   
                <div class="div div2">
                    <span class="span4">违纪内容：</span>
                    <span>{{studentInfoMsg.disciplineRecordContent}}</span>
                </div>   
                <div class="div div2">
                    <span class="span4">处理人：</span>
                    <span>{{studentInfoMsg.handleUserInfoMsg}}</span>
                </div>   
                <div v-if="studentInfoMsg.disciplineRecordType==0" class="div div2" style="align-items:center;">
                    <span class="span4">处理意见：</span>
                    <el-input v-model="value.newInput4" style="width:435px;" placeholder="请输入内容"></el-input>
                </div> 
                <div v-else class="div div2">
                    <span class="span4">处理意见：</span>
                    <span>{{studentInfoMsg.disciplineRecordInfo}}</span>
                </div>
            </div>         
        </div>
    </div>   
    <span v-if="studentInfoMsg.disciplineRecordType!=1" slot="footer" class="dialog-footer">
        <el-button v-if="popupTitle=='提交违纪'" type="primary" @click="$emit('newSave',value)" size="small">确定</el-button>
        <el-button v-else type="primary" @click="$emit('newSave2',value)" size="small">确定</el-button>
        <el-button @click="$emit('newCall')" size="small">取消</el-button>
    </span>
    </el-dialog> 
</template>

<script>
import { arealist_2,floorlist_2,roomGetRoomNumber,bedGetBedNo} from '@/axios/api1'
import { 
   queryStudentByStudentInfoNo 
     
} from '@/axios/api'
import bus from '../../js/bus.js'
export default {
    name:'NewStudents',
    props:['newName','newVisible','popupTitle','studentInfoMsg'],
    data(){
        return{          
            imageUrl:'',
            imageUr2:'',
            dialogImageUrl: '',
            dialogVisible: false,              
            value:{
                newInput1:null,   
                newInput2:'',   
                newInput3:'',   
                newInput4:'', 
            },               
        
        }
    },
    filters:{
           
    },
    created() {
        
    },
    methods: {
       //关闭模态框
       shutModal(){
           console.log('关闭模态框')
           bus.$emit('newCall')             
           this.value={
                newInput1:null,   
                newInput2:'',   
                newInput3:'',   
                newInput4:'',             
            } 
       },
       //显示审核意见
        schedules2(val){
           if(val=='调寝完毕'||val=='待调寝'){
               return true
           }
          
       },
                  
      
    },
}
</script>

<style lang="scss">
     //查看
     
    .break{
        width: 100%;
        min-height:100px;      
        display: flex;
        // background: #ccc;
        justify-content: space-between;
         .close{
         position: absolute;
         top: 20px;
         right: 20px;
         font-size: 16px;
         cursor: pointer;
     }  
        .userIfoBox{
            display: flex;
            flex: 1;
            // padding-left: 20px;
            flex-wrap: wrap;
            align-content: flex-start;
            margin-top: 10px;
            justify-content: space-between;
        }
         .userIfoBox2{           
            flex: 1;   
            // padding-left: 20px;             
        }
         .logImg{
            display: flex;
            flex-direction: column;
            align-items: center;    
            width: 130px;
            height:100%;  
             margin-right: 20px;
           img{
              width: 130px;
                height: 150px;   
           }
        
        }
        .div{
            width: 50%; 
            min-height:10px; 
            display: flex;
            line-height: 20px;
            align-items: flex-start;            
            margin-bottom: 20px;
            .span{
                display: inline-block;
                min-width:85px;
                text-align: right;
            }    
        }     
        .div2{
            width: 100%; 
            display: flex;
            min-height:10px; 
            align-items: flex-start;  
            margin-bottom: 20px;  
            // justify-content: space-between;
            .div3{
                min-width: 120px;
                .span3{
                display: inline-block;
                width:65px;
                text-align:left;
            } 
            }       
        }
         .span4{
                display:block;
                width:70px;
                text-align: right;
            }  
   
    }
     .break2{
         flex-direction: column;
         padding-bottom:15px;
        //  background: #ccc;
         border-bottom: 1px solid #EDEDED;
         margin-bottom: 20px;
          .span2{
                display: inline-block;
                min-width:57px;
                text-align: right;
                margin-right:20px;
            } 
            

     }
    
     
       
           
</style>
