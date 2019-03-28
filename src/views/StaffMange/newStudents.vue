<template>
     <!-- 新增弹框 -->
    <el-dialog
    :title="popupTitle"
    :visible.sync="newVisible"
    @close="shutModal"
    width="670px"
    :show-close="false"
    center>
    <div v-if="newName==1" class="newren">   
        <div class="newrenTop">  
            <div>
                <div class="div">
                    <span class="span">姓名</span>
                    <el-input style="width:128px;" placeholder="姓名" v-model="newStaffMessage.newInput1"></el-input>
                </div> 
                <div class="div">
                <span class="span">性别</span>
                <el-select v-model="newStaffMessage.selectValue1" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in select1"
                    :key="index"
                    :label="item.name"                            
                    :value="item.name">
                    </el-option>
                </el-select>
                </div> 
                <div class="div">
                <span class="span">民族</span>
                <el-select v-model="newStaffMessage.selectValue3" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in select3"
                    :key="index"
                    :label="item.name"                            
                    :value="item.name">
                    </el-option>
                </el-select>
                </div> 
                 <div class="div">
                <span class="span">手机号码</span>
                <el-input style="width:128px;"  placeholder="手机号码" v-model="newStaffMessage.newInput4" ></el-input>
                </div> 
            </div>   
            <div class="newrenTop-right">                     
                <div class="div">
                    <span class="span">学号</span>
                    <el-input style="width:128px;" placeholder="学号" v-model="newStaffMessage.newInput2" ></el-input>
                </div> 
                
                <div class="div">
                    <span class="span">政治面貌</span>
                    <el-select v-model="newStaffMessage.selectValue2" placeholder="请选择">
                        <el-option
                        v-for="(item,index) in select2"
                        :key="index"
                        :label="item.name"                            
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div> 
                
                <div class="div">
                    <span class="span">籍贯</span>
                    <el-input style="width:128px;" placeholder="籍贯" v-model="newStaffMessage.newInput3" ></el-input>
                </div> 
            
                <div class="div">
                    <span class="span">身份证号</span>
                    <el-input style="width:128px;" placeholder="身份证号" v-model="newStaffMessage.newInput5" ></el-input>
                </div> 
            </div>
        </div>  
            <!-- :limit="1"   -->
        <div class="logImg">   
            <!-- <p style="margin-bottom:10px;">上传头像</p>          --> 
             <el-upload
            class="avatar-uploader"               
            action="https://jsonplaceholder.typicode.com/posts/"         
            :on-change="handleAvatarSuccess"   
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"   
            :limit="1"  
            :file-list='fileList'
            :on-remove="handleRemove"                     
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>   
            </el-upload> 
        </div>     
            
    <div class="div2">
            <span class="span2">班级信息</span>
                <el-select style="margin-right:10px;" @change="handCollege" v-model="newStaffMessage.selectValue4" placeholder="院系">
                <el-option
                v-for="(item,index) in allcollege"
                :key="index"
                :label="item.college_name"                            
                :value="item.college_name">
                </el-option>
            </el-select>
                <el-select style="margin-right:10px;" @change="handMajorYear" v-model="newStaffMessage.selectValue5" placeholder="专业">
                <el-option
                v-for="(item,index) in select5"
                :key="index"
                :label="item.major_name"                            
                :value="item.major_name">
                </el-option>
            </el-select>
                <el-select style=";margin-right:10px;"  @change="handMajorYear" v-model="newStaffMessage.selectValue6" placeholder="年级">
                <el-option
                v-for="(item,index) in allYear"
                :key="index"
                :label="item.year_name"                            
                :value="item.year_name">
                </el-option>
            </el-select>
                <el-select style=";margin-right:10px;" v-model="newStaffMessage.selectValue7" placeholder="班级">
                <el-option
                v-for="(item,index) in select7"
                :key="index"
                :label="item.class_name"                            
                :value="item.class_id">
                </el-option>
            </el-select>
        </div> 
            <div class="div2">
            <span class="span2">房间信息</span>
                <el-select style=";margin-right:10px;" @change="handArea" v-model="newStaffMessage.selectValue8" placeholder="区域">
                <el-option
                v-for="(item,index) in allarea"
                :key="index"
                :label="item.regionName"                            
                :value="item.regionId">
                </el-option>
            </el-select>
                <el-select style=";margin-right:10px;" @change="handFloor" v-model="newStaffMessage.selectValue9" placeholder="楼栋">
                <el-option
                v-for="(item,index) in select9"
                :key="index"
                :label="item.floorName"                            
                :value="item.floorId">
                </el-option>
            </el-select>
                <el-select style=";margin-right:10px;" @change="handRoomNo" v-model="newStaffMessage.selectValue10" placeholder="房间">
                <el-option
                v-for="(item,index) in select10"
                :key="index"
                :label="item.roomNo"                            
                :value="item.roomId">
                </el-option>
            </el-select>
                <el-select style=";margin-right:10px;" v-model="newStaffMessage.selectValue11" placeholder="床位">
                <el-option
                v-for="(item,index) in select11"
                :key="index"
                :label="item.bedNo"                            
                :value="item.bedId">
                </el-option>
            </el-select>
        </div>
        <div v-if="newName==1" class="div3">
            <div class="div3" style="padding-left:180px;margin-top:35px;">
                <div class="div4">
                    <div class="div5">
                        <div class="div">
                            <span class="span">姓名</span>
                            <el-input style="width:128px;" placeholder="姓名" v-model="newStaffMessage.newInput6"></el-input>
                        </div> 
                        <div class="div">
                            <span class="span">电话</span>
                            <el-input style="width:128px;" placeholder="电话" v-model="newStaffMessage.newInput7"></el-input>
                        </div> 
                    </div>
                    <div class="div5">
                         <div class="div">
                            <span class="span">关系</span>
                            <el-input style="width:128px;" placeholder="关系" v-model="newStaffMessage.newInput8"></el-input>
                        </div> 
                        <div class="div">
                            <span class="span">性别</span>
                            <el-select v-model="newStaffMessage.selectValue12" placeholder="性别">                      
                            <el-option
                            v-for="(item,index) in select1"
                            :key="index"
                            :label="item.name"                            
                            :value="item.name">
                            </el-option>
                            </el-select>
                        </div> 
                          
                    </div>
                </div> 
                <div class="div2">
                    <span class="span2">身份证号</span>
                    <el-input placeholder="身份证号" v-model="newStaffMessage.newInput9"  style="width:360px;"></el-input>
                </div>
            </div>
            <div class="div3" style="padding-left:180px;margin-top:15px;">        
                <div class="div4" style="margin-top:20px;">
                     <div class="div5">
                        <div class="div">
                            <span class="span">姓名</span>
                            <el-input style="width:128px;" placeholder="姓名" v-model="newStaffMessage.newInput10"></el-input>
                        </div> 
                        <div class="div">
                            <span class="span">电话</span>
                            <el-input style="width:128px;" placeholder="电话" v-model="newStaffMessage.newInput11"></el-input>
                        </div> 
                    </div>
                    <div class="div5">
                         <div class="div">
                            <span class="span">关系</span>
                            <el-input style="width:128px;" placeholder="关系" v-model="newStaffMessage.newInput12"></el-input>
                        </div> 
                        <div class="div">
                            <span class="span">性别</span>
                            <el-select v-model="newStaffMessage.selectValue13" placeholder="性别">                      
                            <el-option
                            v-for="(item,index) in select1"
                            :key="index"
                            :label="item.name"                            
                            :value="item.name">
                            </el-option>
                            </el-select>
                        </div> 
                          
                    </div>
                                   
                </div> 
                <div class="div2">
                    <span class="span2">身份证号</span>
                    <el-input placeholder="身份证号" v-model="newStaffMessage.newInput13"  style="width:360px;"></el-input>
                </div>
            </div>
            <div class="logImg2">
                    <div style="margin:20px 0">家长信息1</div>
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleAvatarSuccess2"   
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload2" 
                    :auto-upload="false"   
                    :limit="1"   
                    :file-list='fileList'
                    :on-remove="handleRemove2"                 
                    >
                    <img v-if="imageUr2" :src="imageUr2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>           
                    </el-upload>                
            </div>
            <div class="logImg3">
                    <div style="margin:20px 0">家长信息2</div>
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleAvatarSuccess3"   
                    :before-upload="beforeAvatarUpload3"  
                    :auto-upload="false"   
                    :limit="1"   
                     :file-list='fileList'
                    :on-remove="handleRemove3"                
                    >
                    <img v-if="imageUr3" :src="imageUr3" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>           
                    </el-upload>
            </div>
        </div>  
    </div>   
    <div v-if="newName!=1&&newName!=5" class="newren">
        <div style="width:100%;padding-left:180px;">             
            <div class="div">
                <span class="span">姓名</span>
                <el-input style="width:128px;" placeholder="姓名" v-model="newStaffMessage.newInput1" ></el-input>
            </div> 
            <div class="div" style="margin:0 0 10px 20px;">
                <span class="span">工号</span>
                <el-input style="width:128px;" placeholder="工号" v-model="newStaffMessage.newInput2" ></el-input>
            </div> 
            <div class="div">
                <span class="span">性别</span>
                <el-select v-model="newStaffMessage.selectValue1" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in select1"
                    :key="index"
                    :label="item.name"                            
                    :value="item.name">
                    </el-option>
                </el-select>
            </div> 
            <div v-if="newName==4" class="div" style="margin:0 0 10px 20px;">
                <span class="span">部门</span>
                <el-input style="width:128px;" placeholder="部门" v-model="newStaffMessage.newInput33" ></el-input>
            </div> 
            
            <div v-if="newName==2" class="div" style="margin:0 0 10px 20px;">
                <span class="span">手机号码</span>
                <el-input style="width:128px;" placeholder="手机号码" v-model="newStaffMessage.newInput4" ></el-input>
            </div> 
            <div v-if="newName==3" class="div" style="margin:0 0 10px 20px;">
                <span class="span">学历</span>
                <el-select v-model="newStaffMessage.select33Value" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in select33"
                    :key="index"
                    :label="item.name"                            
                    :value="item.name">
                    </el-option>
                </el-select>
            </div> 
             <div class="div">
                <span class="span">民族</span>
                <el-select v-model="newStaffMessage.selectValue3" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in select3"
                    :key="index"
                    :label="item.name"                            
                    :value="item.name">
                    </el-option>
                </el-select>
            </div> 
           
             <!-- <div class="div" style="margin:0 0 10px 20px;">
                <span class="span">籍贯</span>
                <el-input style="width:128px;" placeholder="籍贯" v-model="newStaffMessage.newInput3" ></el-input>
            </div>  -->
            <div class="div" style="margin:0 0 10px 20px;">
                <span class="span">籍贯</span>
                <el-input style="width:128px;" placeholder="籍贯" v-model="newStaffMessage.newInput3" ></el-input>
            </div> 
            <div v-if="newName==3||newName==4" class="div">
                <span class="span">手机号码</span>
                <el-input style="width:128px;" placeholder="手机号码" v-model="newStaffMessage.newInput4" ></el-input>
            </div> 
            
             <div v-if="newName==3||newName==4" class="div" style="margin:0 0 10px 20px;">
                <span  class="span">政治面貌</span>
                <el-select v-model="newStaffMessage.selectValue2" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in select2"
                    :key="index"
                    :label="item.name"                            
                    :value="item.name">
                    </el-option>
                </el-select>
            </div> 
            <div class="div" style="margin-right:0">
                <span class="span">身份证号</span>
                <el-input style="width:364px;" placeholder="身份证号" v-model="newStaffMessage.newInput5"></el-input>
            </div> 
        </div>
        <div class="logImg">  
            <!-- <p style="margin-bottom:10px;">上传头像</p>                -->
            <el-upload
            class="avatar-uploader"               
            action="https://jsonplaceholder.typicode.com/posts/"         
            :on-change="handleAvatarSuccess"   
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"   
            :limit="1"  
            :file-list='fileList'
            :on-remove="handleRemove"                     
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>   
            </el-upload> 
            <!-- <div class="editImg">
                <img src="/static/img/Bitmap.png" alt="">         
            </div> -->
        </div>  

        <div class="div3" v-if="newName==2">
            <div style="align-items:flex-start;margin-top:20px;">
                <div>管理楼栋</div>
                <ul class="patriarchs" style="margin-top:20px;">
                    <li v-for="(items,indexs) in newStaffMessage.patriarch" :key="indexs">
                        <el-select style="width:120px;" v-model="newStaffMessage.patriarch[indexs].value1" placeholder="区域">
                        <el-option
                        v-for="(item,index) in allarea"
                        :key="index"
                        @click.native="handAllarea(item.regionId,indexs)"
                        :label="item.regionName"                            
                        :value="item.regionId">
                        </el-option>
                        </el-select>  
                        <el-select style="width:120px;margin:0 10px;" v-model="newStaffMessage.patriarch[indexs].value2" placeholder="楼栋">
                            <el-option
                            v-for="(item,index) in newStaffMessage.patriarch[indexs].select9"
                            :key="index"
                            :label="item.floorName"                            
                            :value="item.floorId">
                            </el-option>
                        </el-select> 
                        <el-button v-if="indexs==0" style="background:rgba(226,226,226,1);color:#fff;border:rgba(226,226,226,1)"  @click="addEarea(1)" size="small">添加</el-button>
                        <el-button v-if="indexs!=0"  @click="deletEarea(indexs,1)" size="small">删除</el-button> 
                    </li>
                </ul>                                                    
            </div>
        </div>  
         <div v-if="newName==3">
            <div style=" align-items:flex-start;margin-top:20px;">
                <div class="span2">管理班级</div>
                <ul class="patriarchs" style="margin-top:20px;">
                    <li v-for="(items,indexs) in newStaffMessage.classManagement"  :key="indexs">
                        <el-select style="width:110px;" v-model="newStaffMessage.classManagement[indexs].value1" placeholder="学院">
                        <el-option
                        v-for="(item,index) in allcollege"
                        :key="index"
                        @click.native="handCollege2(item.college_name,indexs)"
                        :label="item.college_name"                            
                        :value="item.college_name">
                        </el-option>
                        </el-select>  
                        <el-select style="width:110px;margin:0 8px;" v-model="newStaffMessage.classManagement[indexs].value2" placeholder="专业">
                            <el-option
                            v-for="(item,index) in newStaffMessage.classManagement[indexs].select5"
                            :key="index"
                                @click.native="handMajorYear2(newStaffMessage.classManagement[indexs],indexs)"
                            :label="item.major_name"                            
                            :value="item.major_name">
                            </el-option>
                        </el-select> 
                        <el-select style="width:110px" v-model="newStaffMessage.classManagement[indexs].value3" placeholder="年级">
                            <el-option
                            v-for="(item,index) in allYear"
                            :key="index"
                            @click.native="handMajorYear2(newStaffMessage.classManagement[indexs],indexs)"
                            :label="item.year_name"                            
                            :value="item.year_name">
                            </el-option>
                        </el-select> 
                        <el-select style="width:110px;margin:0 8px;" v-model="newStaffMessage.classManagement[indexs].value4" placeholder="班级">
                            <el-option
                            v-for="(item,index) in newStaffMessage.classManagement[indexs].select7"
                            :key="index"
                            :label="item.class_name"                            
                            :value="item.class_id">
                            </el-option>
                        </el-select> 
                        <el-button v-if="indexs==0" style="background:rgba(226,226,226,1);color:#fff;border:rgba(226,226,226,1)"  @click="addEarea(2)" size="small">添加</el-button>                        
                        <el-button v-if="indexs!=0"  @click="deletEarea(indexs,2)" size="small">删除</el-button> 
                    </li>
                </ul>                                                    
            </div>
        </div> 
        <div v-if="newName==4">
            <div style="  align-items:flex-start;margin-top:20px;">
                <div>进出楼栋</div>
                <ul class="patriarchs" style="margin-top:20px;">
                    <li v-for="(items,indexs) in newStaffMessage.patriarch" :key="indexs">
                        <el-select style="width:120px;" v-model="newStaffMessage.patriarch[indexs].value1" placeholder="区域">
                        <el-option
                        v-for="(item,index) in allarea"
                        :key="index"
                        @click.native="handAllarea(item.regionId,indexs)"
                        :label="item.regionName"                            
                        :value="item.regionId">
                        </el-option>
                        </el-select>  
                        <el-select style="width:120px;margin:0 10px;" v-model="newStaffMessage.patriarch[indexs].value2" placeholder="楼栋">
                            <el-option
                            v-for="(item,index) in newStaffMessage.patriarch[indexs].select9"
                            :key="index"
                            :label="item.floorName"                            
                            :value="item.floorId">
                            </el-option>
                        </el-select> 
                        <el-button v-if="indexs==0" style="background:rgba(226,226,226,1);color:#fff;border:rgba(226,226,226,1)"  @click="addEarea(1)" size="small">添加</el-button>
                        <el-button v-if="indexs!=0"  @click="deletEarea(indexs,1)" size="small">删除</el-button> 
                    </li>
                </ul>                                                    
            </div>
        </div> 
    </div>  
    <div v-if="newName==5">
        <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handSuccess"       
            :auto-upload="false" 
            list-type="picture-card"
            :limit='3'
            :before-upload="beforeAvatarUpload"
            :file-list='fileList'
            :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        </el-upload>
        <div style="margin-top:15px;color:#606266;font-size:12px;">上传图像只能是jpg/png/jpeg格式，最多只能上传3张图片！</div>
        <div class="div2" style="margin-top:15px;">
            <span style="margin-right:10px">姓名</span>
                <el-input placeholder="姓名" style="width:128px;" v-model="newStaffMessage.blacklistName" ></el-input>
        </div>
            <div class="div2" style="align-items:flex-start;margin-top:20px;">
            <span style="margin-right:10px">备注</span>
                <el-input  
                type="textarea"
                style="width:500px"
                :autosize="{ minRows:4, maxRows: 8}"
                placeholder="请输入备注内容..." v-model="newStaffMessage.blacklistInfo" ></el-input>
        </div>
    </div>   
    <i class="el-icon-close close" @click="$emit('newCall')"></i>           
    <span slot="footer" class="dialog-footer">
        <el-button v-if="popupTitle=='新增'" type="primary" @click="$emit('newSave',newStaffMessage)" size="small">确 定</el-button>
        <el-button v-else type="primary" @click="$emit('editSave',newStaffMessage,fileList)" size="small">确 定</el-button>
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
    props:['newName','newVisible','popupTitle','allcollege','allYear','allarea'],
    data(){
        return{
             fileList:[],
             imageUrl:'',
            imageUr2:'',
            imageUr3:'',
            dialogImageUrl: '',
            dialogVisible: false,  
           
            //学生
            newStaffMessage:{
                // 黑名单
                 blacklistImg:'',
                 pictureBase:[],
                 pictureName:[],
               
                 blacklistName:'',
                 blacklistInfo:'',

                teacherInfoImg:'',//头像地址
                patriarchInfoImg:'',//家长头像
                patriarchInfoImg2:'',//家长2头像
                userInfoId:null,//人的id
                classId:'',//班级id、
                roomId:'',//房间id
                bedId:'',//床位id
               newInput1:'',//姓名
                newInput2:'',//学号 工号
                newInput3:'',//籍贯
                newInput33:'',//部门
                newInput4:'',//手机号码
                newInput5:'', //身份证号  

                newInput6:'',//家长姓名
                newInput7:'',//家长电话
                newInput8:'',//家长关系
                newInput9:'',//家长身份证号

                newInput10:'', //家长2姓名
                newInput11:'',//家长2电话
                newInput12:'',//家长2关系
                newInput13:'',  //家长2身份证                      
                //学生下拉框
                selectValue1:'男',//性别
                selectValue2:'群众',//政治面貌
                selectValue3:'汉',//民族
                selectValue4:'',//学院
                selectValue5:'',//专业
                selectValue6:'',//年级
                selectValue7:null,//班级
                selectValue8:null,//区域
                selectValue9:null,//楼栋
                selectValue10:null,//房间
                selectValue11:null,//床位
                //家长信息
                selectValue12:'',//性别
                selectValue13:'',//性别
                //学历value
                select33Value:'本科生',
                //宿管管理和其他楼栋区域
                patriarch:[
                    {id:1,value1:'',value2:'',select9:[]}
                ],
                //辅导员管理班级
                classManagement:[
                    {id:1,value1:'',value2:'',value3:'',value4:'',select5:[],select7:[]}
                ],     
                fd: null ,//头像信息
                picture_student:'',//学生头像信息
                picture_parent_one:'',
                picture_parent_two:'',
                picture_student_name:'',
                picture_parent_one_name:'',
                picture_parent_two_name:'',
                parentId:0,
                parentId2:0
            },
         
            select1:[
                {value:1,name:'男'},
                {value:2,name:'女'},
            ],
            select2:[
                {value:1,name:'群众'},
                {value:2,name:'共青团员'},
                {value:3,name:'中共党员'},
                {value:4,name:'其他'},
            ],
            select3:[
                {value:2,name:'汉'},
                {value:3,name:'其他'},
            ],
            select33:[//学历
                {value:2,name:'本科生'},
                {value:3,name:'硕士生'},
                 {value:3,name:'博士生'},
            ],        
              //专业
            select5:[
                
            ],
           
              //班级
            select7:[
                
            ],

             //区域
            select8:[
                
            ],
              //楼栋
            select9:[
                
            ],
              //房间
            select10:[
                
            ],
              //床位
            select11:[
               
            ],
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
            this.newStaffMessage={
                blacklistImg:'',
                 pictureBase:[],
                 pictureName:[],
                
                 blacklistName:'',
                 blacklistInfo:'',

                teacherInfoImg:'',//头像地址
                patriarchInfoImg:'',//家长头像
                patriarchInfoImg2:'',//家长2头像
                userInfoId:null,//人的id
                classId:'',//班级id、
                roomId:'',//房间id
                bedId:'',//床位id
               newInput1:'',//姓名
                newInput2:'',//学号 工号
                newInput3:'',//籍贯
                newInput33:'',//部门
                newInput4:'',//手机号码
                newInput5:'', //身份证号  

                newInput6:'',//家长姓名
                newInput7:'',//家长电话
                newInput8:'',//家长关系
                newInput9:'',//家长身份证号

                newInput10:'', //家长2姓名
                newInput11:'',//家长2电话
                newInput12:'',//家长2关系
                newInput13:'',  //家长2身份证                      
                //学生下拉框
                selectValue1:'男',//性别
                selectValue2:'群众',//政治面貌
                selectValue3:'汉',//民族
                selectValue4:'',//学院
                selectValue5:'',//专业
                selectValue6:'',//年级
                selectValue7:null,//班级
                selectValue8:null,//区域
                selectValue9:null,//楼栋
                selectValue10:null,//房间
                selectValue11:null,//床位
                //家长信息
                selectValue12:'',//性别
                selectValue13:'',//性别
                //学历value
                select33Value:'本科生',
                //宿管管理和其他楼栋区域
                patriarch:[
                    {id:1,value1:'',value2:'',select9:[]}
                ],
                //辅导员管理班级
                classManagement:[
                    {id:1,value1:'',value2:'',value3:'',value4:'',select5:[],select7:[]}
                ],     
                fd: null ,//头像信息
                picture_student:'',//学生头像信息
                picture_parent_one:'',
                picture_parent_two:'',
                picture_student_name:'',
                picture_parent_one_name:'',
                picture_parent_two_name:'',
                parentId:0,
                parentId2:0
            },   
            this.imageUrl=''  
            this.imageUr2='' 
            this.imageUr3='' 
            this.fileList=[] 
            
            this.select9=[]      
            this.select10=[]  
            this.select11=[]    
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
        //点击新增管理班级
        newClass(index){
            console.log('点击下拉班级',index)
        },
        //新增辅导员学院下拉事件
        handCollege2(collegeName,index){               
              //查询全部专业        
                queryMajorByTerm({collegeName,MajorName:'',pageNum :0,pageSize :0 }).then(res=>{
                    console.log(`查询专业 ${index} `,res)
                    if(res.status==200&&res.data.code==200){
                        this.newStaffMessage.classManagement[index].select5=res.data.data   
                        this.newStaffMessage.classManagement[index].select7=[]
                        this.newStaffMessage.classManagement[index].value2=''
                        this.newStaffMessage.classManagement[index].value4=''                                
                    }
                })          
        },
        //新增学生学院下拉事件
        handCollege(collegeName){      
              //查询全部专业        
                queryMajorByTerm({collegeName,MajorName:'',pageNum :0,pageSize :0 }).then(res=>{
                    console.log('查询专业',res)
                    if(res.status==200&&res.data.code==200){
                        this.select5=res.data.data 
                        this.newStaffMessage.selectValue5=''      
                        this.newStaffMessage.selectValue7=''                                   
                    }
                })          
        },
        //新增学生专业和年级下拉
        handMajorYear(){
            queryAllCalss({
                collegeName:this.newStaffMessage.selectValue4,
                majorName :this.newStaffMessage.selectValue5,
                yearName :this.newStaffMessage.selectValue6,
                className :'',
                pageNum :0,
                pageSize :0
            }).then(res=>{
                console.log(`全部班级`,res)
                 if(res.status==200&&res.data.code==200){
                    this.select7=res.data.data 
                    this.newStaffMessage.selectValue7=''                                                            
                }
            })
        },
        //新增学生区域下拉
        handArea(){
            floorlist_2({ regionId:this.newStaffMessage.selectValue8}).then(res => {
            console.log("楼栋",res)
             this.newStaffMessage.selectValue9=null
             this.newStaffMessage.selectValue10=null
             this.newStaffMessage.selectValue11=null
            if (res.data.code === 200) {           
              this.select9=res.data.data
            }
          });
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
        //新增学生房间下拉
         handRoomNo(){
            
            bedGetBedNo({roomId :this.newStaffMessage.selectValue10}).then(res=>{
                console.log('所有床位',res)
                this.newStaffMessage.selectValue11=null
                if (res.data.code === 200) {           
                this.select11=res.data.data
                }
            })
        },
        //新增辅导员专业和年级下拉事件
        handMajorYear2(item,index){   
            console.log(item,index)                
            queryAllCalss({
                collegeName:item.value1,
                majorName :item.value2,
                yearName :item.value3,
                className :'',
                pageNum :0,
                pageSize :0
            }).then(res=>{
                console.log(`全部班级 ${index}`,res)
                 if(res.status==200&&res.data.code==200){
                        this.newStaffMessage.classManagement[index].select7=res.data.data
                         this.newStaffMessage.classManagement[index].value4=''                                                        
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
     
        //获取黑名单图片信息
        getblacklistImg(fileList){
            console.log(fileList)
            this.newStaffMessage.pictureBase=[]
            this.newStaffMessage.pictureName=[]
            fileList.forEach(data=>{
                if(data.raw){
                     this.getBase64(data.raw).then(res=>{
                    this.newStaffMessage.pictureBase.push(res)
                    this.newStaffMessage.pictureName.push(data.name)
                    })
                }
               
                
            })
            console.log(this.newStaffMessage.pictureBase,this.newStaffMessage.pictureName)             
        },
        //黑名单图片
        handSuccess(file,fileList){
            console.log('黑名单图库',file,fileList)
            let id=file.name.lastIndexOf('.')
             let type=`${file.name.substring(id+1,file.name.length)}`
                console.log(type)
                this.fileList=fileList
               if(type=='jpg'||type=='png'||type=='jpeg'){
                    
                    this.getblacklistImg(fileList)
                }
                else{
                    this.$message.error('上传头像图片只能是 jpg/png 格式!');
                    this.fileList.pop()
                   
                }
               
          
           
        },
        //删除黑名单图片
         handleRemove(file, fileList) {
            console.log(file, fileList);
           this.fileList=fileList
           this.getblacklistImg(fileList)
        },
        //文件列表上传时的钩子
        handlePictureCardPreview(file) {
            console.log('gouzi',file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
     //新增弹框
     .el-upload-list__item {
         margin: 0;
     }
     .close{
         position: absolute;
         top: 20px;
         right: 20px;
         font-size: 16px;
         cursor: pointer;
     }   
    .newren{
        width: 100%;
        min-height:100px;      
        position: relative; 
        // padding-left: 180px;
        .div{
            min-width:200px;  
            height: 32px; 
            display: flex;
            align-items: center;   
            display: inline-block;     
            margin-bottom: 10px;
            margin-right: 10px;
            .span{
                display: inline-block;
                min-width: 60px;
                text-align: right;
                margin-right: 10px;
            }    
        }     
        .logImg{
            position: absolute;
            left:0px;
            top: 0px;
            display: flex;
            flex-direction: column;
            align-items: center;    
            width: 150px;
            height: 150px;  
            // div{
            //     width: 100px;
            //     height: 100px;
            //     // background: #ccc;
                
            // }
            .editImg{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0px;
                left: 0px;
                z-index: 666;
                img{
                    width: 100%;
                    height: 100%;  
                }
            }
        }
        .newrenTop{
            width:100%;
            padding-left:180px;
            display: flex;
            justify-content: space-between;
            .div{
                margin-right:0px;
            }
            .newrenTop-right{
                
                padding-left: 18px;
            }
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
                text-align: right;
                margin-right: 12px;
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
           margin-top:50px;
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
