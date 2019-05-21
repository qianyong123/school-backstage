<template>
     <!-- 新增弹框 -->
    <el-dialog
    :title="popupTitle"
    :visible.sync="newVisible"
    @close="shutModal"
    width="560px"
    :show-close="false"
    center>
    <div class="ApplyRecordNew">
        <i class="el-icon-close close" @click="$emit('newCall')"></i>           
        <div class="logImg">
            <div style="width:130px;height:150px;">
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
           
        </div>
     </div>     
     <div class="ApplyRecordNew">
        <div class="logImg">
            <div v-if="newName==4" style="width:130px;height:150px;">
                <img :src="studentInfoMsg.applyVisitorVisitImg" alt="">
            </div>
            <!-- <img src="../../../static/img/t1.png" alt=""> applyVisitorVisitImg-->
        </div> 
        <div class="userIfoBox2">
        
            <div v-if="newName==1" class="userIfoBox">    
                <div class="div div2">
                    <span class="span">调寝理由：</span>
                    <span>{{studentInfoMsg.applyChangeBedInfo}}</span>
                </div>
                <div class="div div2">
                    <span class="span">审核进度：</span>
                    <span style="color:#E01763">{{schedule|applyLeaveApprovalResults}}</span>
                </div>
                <div v-if="schedule=='2'" class="div div2">
                    <span class="span">驳回原因：</span>
                    <span style="color:#E01763">{{studentInfoMsg.ApplyChangeBedApprovalInfo}}</span>
                </div>
                <div v-if="schedules2(schedule)" class="div div2">
                    <span class="span">审核备注：</span>
                    <span style="color:#E01763">{{studentInfoMsg.applyChangeBedApprovalInfo}}</span>
                </div>
                 <div v-if="schedule=='1'" class="div div2 divstart">
                    <span class="span">处理进度：</span>
                    <el-input v-model="newInput1" placeholder="请输入内容"></el-input>
                </div>
                <div v-if="schedule=='1'" class="div div2">
                    <span class="span"></span>
                    <div>
                        <el-radio v-model="radio" label="1">调寝完成</el-radio>
                        <el-radio v-model="radio" label="2">驳回</el-radio>
                    </div>
                </div>
            </div>
            <div v-if="newName==2" class="userIfoBox">    
                <div class="div">
                    <span class="span">物品类型：</span>
                    <span>{{studentInfoMsg.applyGoodsType}}</span>
                </div>
                <div class="div">
                    <span class="span">物品备注：</span>
                    <span>{{studentInfoMsg.applyGoodsInfo}}</span>
                </div>
                <div class="div">
                    <span class="span">出楼时间：</span>
                    <span>{{studentInfoMsg.applyGoodsOutTime}}</span>
                </div>
                <div class="div">
                    <span class="span">审核进度：</span>
                    <span style="color:#E01763">{{schedule|applyLeaveApprovalResults2}}</span>
                </div>
                <div v-if="schedule=='2'" class="div div2">
                    <span class="span">驳回原因：</span>
                    <span style="color:#E01763">{{studentInfoMsg.applyGoodsApprovalInfo}}</span>
                </div>
                
            </div>
            <div v-if="newName==3" class="userIfoBox">    
                <div class="div div2">
                    <span class="span">报修标题：</span>
                    <span>{{studentInfoMsg.applyRepairType}}</span>
                </div>
                <div class="div div2">
                    <span class="span">报修类容：</span>
                    <span>{{studentInfoMsg.applyRepairInfo}}</span>
                </div>        
                <div class="div">
                    <span class="span">审核进度：</span>
                    <span style="color:#E01763">{{schedule|applyLeaveApprovalResults2}}</span>
                </div>
                <div v-if="schedule=='2'" class="div div2">
                    <span class="span">驳回原因：</span>
                    <span style="color:#E01763">{{studentInfoMsg.applyRepairApprovalInfo}}</span>
                </div>
            </div>
            <div v-if="newName==4" class="userIfoBox">    
                <div class="div div2">
                    <span class="span">来访事由：</span>
                    <span>{{studentInfoMsg.applyVisitorInfo}}</span>
                </div>
                <div class="div">
                    <span class="span">来访人员：</span>
                    <span>{{studentInfoMsg.applyVisitorVisitName}}</span>
                </div>    
                <div class="div">
                    <span class="span">关系：</span>
                    <span>{{studentInfoMsg.applyVisitorType}}</span>
                </div>   
                <div class="div">
                    <span class="span">预约时间：</span>
                    <span>{{studentInfoMsg.applyVisitorTime}}</span>
                </div>    
                <div class="div div2">
                    <span class="span">审核进度：</span>
                    <span style="color:#E01763">{{schedule|applyLeaveApprovalResults2}}</span>
                </div> 
                <div v-if="schedule=='2'" class="div div2">
                    <span class="span">驳回原因：</span>
                    <span style="color:#E01763">{{studentInfoMsg.applyVisitorApprovalInfo}}</span>
                </div>            
            </div>
            <div v-if="newName==5" class="userIfoBox">    
                <div class="div div2">
                    <span class="span">请假事由：</span>
                    <span>{{studentInfoMsg.applyLeaveInfo}}</span>
                </div>
                <div class="div div2">
                    <span class="span">请假类型：</span>
                    <span>{{studentInfoMsg.applyLeaveType}}</span>
                </div>    
                <div class="div div2">
                    <span class="span">请假时间：</span>
                    <span>
                        <span>{{studentInfoMsg.applyLeaveStartTime}}</span> 一                
                        <span>{{studentInfoMsg.applyLeaveEndTime}}</span>
                    </span>
                </div>      
                <div class="div div2">
                    <span class="span">审核进度：</span>
                    <span style="color:#E01763">{{schedule|applyLeaveApprovalResults2}}</span>
                </div>
                <div v-if="schedule=='2'" class="div div2">
                    <span class="span">驳回原因：</span>
                    <span style="color:#E01763">{{studentInfoMsg.applyLeaveApprovalInfo}}</span>
                </div>
            </div>
             <div v-if="schedule=='0'" class="div div2 divstart">
                <span class="span">审核意见：</span>
                <el-input v-model="newInput1" placeholder="请输入内容"></el-input>
            </div>
            <div v-if="schedule=='0'" class="div div2">
                <span class="span"></span>
                <div>
                    <el-radio v-model="radio" label="1">同意</el-radio>
                    <el-radio v-model="radio" label="2">驳回</el-radio>
                </div>
            </div>
        </div>
    </div>   
    <span v-if="isfirm(schedule)" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="$emit('examineNotarize',newInput1,radio)" size="small">确 定</el-button>
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
            },
               applyLeaveApprovalResults(name){
                if(name==0){
                    return '待审核'
                }
                else if(name==1){
                    return '待调寝'
                }
                else if(name==2){
                    return '驳回'
                }
                else if(name==3){
                    return '逾期'
                }
                else if(name==4){
                    return '调寝完成'
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
           if(val=='1'||val=='4'){
               return true
           }
          
       },
       //显示确认
       isfirm(val){
           if(val=='0'){
               return true
           }
           else if(val=='1'&&this.newName==1){
               return true
           }
       },
        //添加宿舍管理区域
        addEarea(id){
            console.log('添加管理区域')
            if(id==2){
                this.newStaffMessage.classManagement.push({id:1,value1:'',value2:'',value3:'',value4:'',select5:[],select7:[]})               
            }
            else{
                 this.newStaffMessage.patriarch.push( {id:1,value1:'',value2:'',select9:[]})
            }
            //  else if(id==3){
            //      this.newStaffMessage.exitBuilding.push( {id:1,value1:'',value2:''})
            // }
        }, 
        //删除宿舍管理区域 
        deletEarea(index,id){
            if(id==1){
                this.newStaffMessage.patriarch.splice(index,1)
            }
            else if(id==2){
                this.newStaffMessage.classManagement.splice(index,1)
            }
             else if(id==3){
                this.newStaffMessage.exitBuilding.splice(index,1)
            }
        },   
     
        //新增学生楼栋下拉
        handFloor(){
            roomGetRoomNumber({floorId:this.newStaffMessage.selectValue9,roomTier:null}).then(res=>{
                console.log('所有房间',res)
                this.newStaffMessage.selectValue10=null
                this.newStaffMessage.selectValue11=null
                if (res.data.code === 200) {           
                this.select10=res.data.data
                }
            })
        },
       
        
        //新增宿管区域下拉
        handAllarea(id,index){
            floorlist_2({ regionId:id }).then(res => {
            console.log("楼栋",res)
             this.newStaffMessage.patriarch[index].value2=''  
            if (res.data.code === 200) {           
              this.newStaffMessage.patriarch[index].select9=res.data.data
            }
          });
        },
         handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            console.log('黑名单图库',file)
            this.dialogVisible = true;
        },
        handSuccess(file){
              console.log('黑名单图库',file)
        },
        //删除图片
         handleRemove(file, fileList) {
            console.log(file, fileList);
            this.imageUrl=''
            this.newStaffMessage.fd=null
        },
        
         handleRemove2(file, fileList) {
            console.log(file, fileList);
            this.imageUr2=''
        },
        handleRemove3(file, fileList) {
            console.log(file, fileList);
            this.imageUr3=''
        },
         getBase64(file) {
        return new Promise(function(resolve, reject) {
            let reader = new FileReader();
            let imgResult = "";
            reader.readAsDataURL(file);
            reader.onload = function() {
            imgResult = reader.result;
            };
            reader.onerror = function(error) {
            reject(error);
            };
            reader.onloadend = function() {
            resolve(imgResult);
            };
        });
        },
        //上传成功
        handleAvatarSuccess(res1, file) {
            console.log('succss',file)
            this.imageUrl = URL.createObjectURL(file[0].raw);
             if(this.newName==1){
                let fd = new FormData();           
                this.getBase64(file[0].raw).then(res => {                 
                    fd.append('file',res);//传文件
                    this.newStaffMessage.picture_student=res
                    if(this.popupTitle=='新增'){                   
                        this.newStaffMessage.picture_student_name=file[0].raw.name
                    }else{
                        if(this.newStaffMessage.teacherInfoImg===''||this.newStaffMessage.teacherInfoImg==null){
                            this.newStaffMessage.picture_student_name=file[0].raw.name
                            console.log('图11',this.newStaffMessage.picture_student_name)                           
                        }else{
                            let id=this.newStaffMessage.teacherInfoImg.lastIndexOf('/')
                            this.newStaffMessage.picture_student_name= this.newStaffMessage.teacherInfoImg.substring(id + 1, this.newStaffMessage.teacherInfoImg .length);
                            console.log('图12',this.newStaffMessage.picture_student_name)
                        }
                    }
                });
            }else{
                 let fd = new FormData();
                fd.append('file',file[0].raw);//传文件
                this.newStaffMessage.fd=fd
            }
           
            this.fileList=[]
        },
         handleAvatarSuccess2(res2, file) {
            this.imageUr2 = URL.createObjectURL(file[0].raw);         
                let fd = new FormData();
                this.getBase64(file[0].raw).then(res => {                  
                    fd.append('file',res);//传文件
                    this.newStaffMessage.picture_parent_one=res
                     if(this.popupTitle=='新增'){                     
                        this.newStaffMessage.picture_parent_one_name=file[0].raw.name
                    }else{
                        if(this.newStaffMessage.patriarchInfoImg===''||this.newStaffMessage.patriarchInfoImg===null){
                            this.newStaffMessage.picture_parent_one_name=file[0].raw.name     
                            console.log('图21',this.newStaffMessage.patriarchInfoImg,this.newStaffMessage.picture_parent_one_name)                      
                        }else{
                            let id=this.newStaffMessage.patriarchInfoImg.lastIndexOf('/')
                           this.newStaffMessage. picture_parent_one_name= this.newStaffMessage.patriarchInfoImg.substring(id + 1, this.newStaffMessage.patriarchInfoImg .length);
                            console.log('图22',this.newStaffMessage.patriarchInfoImg,this.newStaffMessage.picture_parent_one_name)
                        }
                    }
                });
                // fd.append('file',file[0].raw);//传文件
                // this.newStaffMessage.picture_parent_one=fd
            this.fileList=[]
        },
         handleAvatarSuccess3(res2, file) {
            this.imageUr3= URL.createObjectURL(file[0].raw);     
            console.log(file) 
            let fd = new FormData();
             this.getBase64(file[0].raw).then(res => {           
                fd.append('file',res);//传文件
                this.newStaffMessage.picture_parent_two=res
                 if(this.popupTitle=='新增'){                 
                        this.newStaffMessage.picture_parent_two_name=file[0].raw.name
                    }else{
                        if(this.newStaffMessage.patriarchInfoImg2===''||this.newStaffMessage.patriarchInfoImg2===null){
                            this.newStaffMessage.picture_parent_two_name=file[0].raw.name   
                            console.log('图31',this.newStaffMessage.picture_parent_two_name)
                        }else{
                             let id=this.newStaffMessage.patriarchInfoImg2.lastIndexOf('/')
                            this.newStaffMessage.picture_parent_two_name= this.newStaffMessage.patriarchInfoImg2.substring(id + 1, this.newStaffMessage.patriarchInfoImg2.length);
                            console.log('图32',this.newStaffMessage.patriarchInfoImg2,this.newStaffMessage.picture_parent_two_name)
                        }
                    }
            });
            // fd.append('file',file[0].raw);//传文件
            // this.newStaffMessage.picture_parent_two=fd          
            this.fileList=[]
        },
        //上传前的拦截
         beforeAvatarUpload(file) {
             console.log('file',file)        
        const isJPG = file.type === 'image/jpeg'|| file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isLt1M;
      },
        beforeAvatarUpload2(file) {
             console.log('file',file)
        const isJPG = file.type === 'image/jpeg'|| file.type === 'image/png';   
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isLt1M;
      },
         beforeAvatarUpload3(file) {
             console.log('file',file)
        const isJPG = file.type === 'image/jpeg'|| file.type === 'image/png';
    
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isLt1M;
      }
    },
}
</script>

<style lang="scss">
     //查看
     
    .ApplyRecordNew{
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
            margin-top: 6px;
            align-content: flex-start;
            justify-content: space-between;
        }
         .userIfoBox2{           
            flex: 1;  
            // margin-top: 6px; 
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
            min-height: 10px; 
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
            min-height: 10px; 
            display: flex;
            align-items: flex-start;  
            margin-bottom: 20px;
            // cursor: pointer;
            .span2{
                display: inline-block;
                min-width: 60px;
                text-align: right;
                margin-right: 12px;
            }
        }
         .divstart{
         align-items: center;
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
