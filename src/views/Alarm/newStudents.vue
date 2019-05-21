<template>
     <!-- 新增弹框 -->
    <el-dialog
    :title="popupTitle"
    :visible.sync="newVisible"
    @close="shutModal"
    width="560px"
    :show-close="false"
    center>
    <div v-if="newNames(newName)" class="AlarmNew">
        <i class="el-icon-close close" @click="$emit('newCall')"></i>           
        <div class="logImg">
            <div style="background:#ccc;width:130px;height:150px;">
                <img :src="studentInfoMsg.studentInfoImg" alt="">
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
                <span>辅导员手机：</span>
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
           <div class="div div2">
                <span class="span">处理人：</span>
                <span>{{studentInfoMsg.roomMsg}}</span>
            </div>          
            <div v-if="newName==2" class="div div2">
                <span class="span">处理意见：</span>
                <el-input v-model="newInput1" placeholder="请输入内容"></el-input>
            </div>
            <div v-else class="div div2">
                <span class="span">处理意见：</span>
                <span>{{studentInfoMsg.roomMsg}}</span>
            </div>
        </div>
     </div> 
     <div v-else class="AlarmNew" style="flex-direction: column;">
         <i class="el-icon-close close" @click="$emit('newCall')"></i>  
        <div class="div div2">
            <span class="span2" style="margin-right:15px;">处理人</span>
            <span>辅导员-李好-15613154531-1531354113</span>
        </div>  
        
        <div v-if="newName==4" class="div div2" style="align-items:flex-start">
            <span class="span2" style="margin-right:15px;">处理意见</span>
            <el-input v-model="newInput1" placeholder="违纪内容" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </div>  
        <div v-else style="margin-right:15px;" class="div div2">
            <span class="span2">处理意见</span>
            <span>打你一顿</span>
        </div> 
    </div>      
    <span v-if="newNames2(newName)" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$emit('examineNotarize',newInput1)" size="small">确 定</el-button>
        <el-button @click="$emit('newCall')" size="small">取 消</el-button>
    </span>     
    </el-dialog> 
</template>

<script>
import { arealist_2,floorlist_2,roomGetRoomNumber,bedGetBedNo} from '@/axios/api1'
import { 
    addCircle,
    queryCollegeByName,
    queryMajorByTerm,
    queryAllCalss,
    queryByYearName,
    addTeacherInfo,    
} from '@/axios/api'
import bus from '../../js/bus.js'
export default {
    name:'NewStudents',
    props:['newName','newVisible','popupTitle','schedule','studentInfoMsg'],
    data(){
        return{          
             imageUrl:'',
            imageUr2:'',
            dialogImageUrl: '',
            dialogVisible: false,   
            newInput1:'',   
            radio:'1',                
           
        }
    },
    filters:{
           applyLeaveApprovalResults2(name){
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
    created() {
        
    },
    methods: {
       //关闭模态框
       shutModal(){
           console.log('关闭模态框')
           bus.$emit('newCall')
            //学生
             this.newInput1=''  
            this.radio='1'  
       },
       //显示审核意见
        schedules2(val){
           if(val=='调寝完毕'||val=='待调寝'){
               return true
           }
          
       },      
     newNames(id){
         if(id==1||id==2){
             return true
         }
     },
     newNames2(id){
         if(id==2||id==4){
             return true
         }
     }
        
       
       
    },
}
</script>

<style lang="scss">
     //查看
     
    .AlarmNew{
        width: 100%;
        // min-height:80px;      
        display: flex;
        // background: #ccc;
        // flex-direction: column;
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
            min-height: 32px; 
            display: flex;
            line-height: 20px;
            align-items: center;   
            margin-bottom: 10px;
            .span{
                display: inline-block;
                min-width:85px;
                text-align: right;
            }    
        }     
        .div2{
            width: 100%; 
            min-height: 32px; 
            display: flex;
            align-items: center;  
            margin-bottom: 10px;
            // cursor: pointer;
            .span2{
                display: inline-block;
                min-width: 60px;
                text-align:left;
            }
        }
      
    }
     
    
        .div4{
            width: 100%; 
            min-height: 32px;      
            align-items: center;  
            margin-bottom: 10px;        
            // cursor: pointer;
            .span2{
                display: inline-block;
                min-width: 60px;
                text-align: right;
                margin-right: 12px;
                line-height: 20px;
            } 
        }
        .div5{
            width: 100%; 
            min-height: 32px;      
            align-items: center;  
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
        }
        .div3{
           width:100%;
        //    border-top:1px solid #ccc;
            min-height: 150px;
           padding: 10px 0;
           position: relative;
           .logImg2{
              width: 150px;
            height: 150px; 
               position: absolute;
                left:0px;
               top:0px;
                     
           }
           .logImg3{
              width: 150px;
            height: 150px; 
               position: absolute;
               margin-right: 20px;
                left:0px;
               top:200px;
                        
           }        
        }
        .patriarchs{
            li{
                margin-bottom: 10px;
            }  
        }
    .newclass2{
          height:100px;
    }
    .newclass3{
          height:120px;
    }
    .avatar-uploader{
        width:100%;
        height: 100%;
    }
    .avatar-uploader .el-upload {
    width:100%;
    height: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .avatar {
    width:100%;
    height: 100%;
    display: block;
  }
</style>
