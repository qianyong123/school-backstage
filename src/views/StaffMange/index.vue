<template>
  <div class="staffManage" @click="deleteId=null"  v-loading.fullscreen.lock="fullscreenLoading">
        <div class="ClassManage-top">
            <h4>人员管理</h4>
            <div style="flex:1;font-size:14px;">
                <el-tabs style="height:100%;width:100%;"  v-model="activeName" @tab-click="handleClick">                  
                <el-tab-pane v-if="navjurisdiction(1)" label="学生" name="学生">  
                    <div class="collegeNmaeBox">                                
                        <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(1)"></el-button>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(1)"></el-button>
                                 <el-upload
                                class="upload-demo"
                                style="margin-left:10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="1"
                                :auto-upload='false'
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" icon="el-icon-download"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                            </div>
                            <span class="spanName">性别:</span>
                             <el-select style="width:130px;margin:0 10px;" v-model="StudentsGender1" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in gender"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select>  
                            <el-input
                            placeholder="姓名/学号"
                            v-model="StudentsName1"
                            style="width:130px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="StudentsData(1)" size="small">查询</el-button>
                        </div>                    
                        <el-button @click="outExcelStudents" size="small" icon="el-icon-upload2"></el-button>   
                        <!-- <input type="file" :id="id" name="image" class="getImgUrl_file" @change="preview($event)">                    -->
                    </div>
                </el-tab-pane>
                <el-tab-pane v-if="navjurisdiction(2)" label="宿管" name="宿管">
                    <div class="collegeNmaeBox">
                        
                        <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(2)"></el-button>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(2)"></el-button>
                                   <el-upload
                                class="upload-demo"
                                style="margin-left:10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="1"
                                :auto-upload='false'
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                 <el-button size="small" icon="el-icon-download"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                            </div> 
                            <span class="spanName">区域:</span>
                             <el-select style="width:130px;margin:0 10px;" @change="handcollege2" v-model="area" placeholder="请选择">
                                 <el-option                                   
                                :label="'全部'"                            
                                :value="0">
                                </el-option>
                                <el-option
                                v-for="(item,index) in allarea"
                                :key="index"
                                :label="item.regionName"                            
                                :value="item.regionId">
                                </el-option>
                            </el-select>
                            <span class="spanName">性别:</span>
                             <el-select style="width:130px;margin:0 10px;"  v-model="StudentsGender2" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in gender"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select>
                            <el-input
                            placeholder="姓名/工号"
                            v-model="StudentsName2"
                            style="width:130px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="StudentsData(2)" size="small">查询</el-button>
                        </div> 
                        <el-button size="small" @click="outExcelStudents" icon="el-icon-upload2"></el-button>                       
                    </div>
                                                                
                </el-tab-pane>
                <el-tab-pane v-if="navjurisdiction(3)" label="辅导员" name="辅导员">
                    <div class="collegeNmaeBox">                                      
                      <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(3)"></el-button>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(3)"></el-button>
                                  <el-upload
                                class="upload-demo"
                                style="margin-left:10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="1"
                                :auto-upload='false'
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                 <el-button size="small" icon="el-icon-download"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                            </div>   
                            <span class="spanName">院系:</span>
                             <el-select style="width:130px;margin:0 10px;" @change="handcollege" v-model="college" placeholder="请选择">
                                <el-option                                   
                                :label="'全部'"                            
                                :value="''">
                                </el-option>
                                <el-option
                                v-for="(item,index) in allcollege"
                                :key="index"
                                :label="item.college_name"                            
                                :value="item.college_name">
                                </el-option>
                            </el-select>
                            <span class="spanName">专业:</span>
                             <el-select style="width:130px;margin:0 10px;" v-model="major" placeholder="请选择">
                                <el-option                                   
                                :label="'全部'"                            
                                :value="''">
                                </el-option>
                                <el-option
                                v-for="(item,index) in allMajor"
                                :key="index"
                                :label="item.major_name"                            
                                :value="item.major_name">
                                </el-option>
                            </el-select>
                            <el-input
                            placeholder="姓名/工号"
                            v-model="StudentsName3"
                            style="width:130px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="StudentsData(3)" size="small">查询</el-button>
                        </div>             
                        <el-button size="small" @click="outExcelStudents" icon="el-icon-upload2"></el-button>                                               
                    </div>   
                </el-tab-pane>
                <el-tab-pane label="其他" name="其他">
                    <div class="collegeNmaeBox">  
                        <div class="collegeNmae">
                             <div class="collegeNmae2">                    
                                <el-button size="small" icon="el-icon-plus" @click="newly(4)"></el-button>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(4)"></el-button>
                                  <el-upload
                                class="upload-demo"
                                style="margin-left:10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="1"
                                :auto-upload='false'
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                 <el-button size="small" icon="el-icon-download"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                            </div> 
                            <span class="spanName">性别:</span>
                             <el-select style="width:130px;margin:0 10px;" v-model="StudentsGender3" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in gender"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select>                                                                                         
                            <el-input
                            placeholder="姓名/工号"
                            v-model="StudentsName4"
                            style="width:130px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="StudentsData(4)" size="small">查询</el-button>
                        </div>
                       
                        <el-button @click="outExcelStudents" size="small" icon="el-icon-upload2"></el-button>                       
                    </div> 
                </el-tab-pane>
                <el-tab-pane label="黑名单库" name="黑名单库">
                    <div class="collegeNmaeBox">  
                      <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(5)"></el-button>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(5)"></el-button>
                                <el-upload
                                class="upload-demo"
                                style="margin-left:10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="1"
                                :auto-upload='false'
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                 <el-button size="small" icon="el-icon-download"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                            </div>
                            <el-input
                            placeholder="姓名"
                            v-model="StudentsName5"
                            style="width:130px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="StudentsData(5)" size="small">查询</el-button>
                        </div>
                     
                        <el-button @click="outExcelStudents" size="small" icon="el-icon-upload2"></el-button>                       
                    </div>
                </el-tab-pane>
            </el-tabs>
            </div>
          
        </div>
        <div class="ClassManage-main">
            <div class="tableBox" v-if="isTable"  >
                <el-table                                
                    ref="multipleTable"
                    v-loading="loading"               
                     element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    :data="tableData"
                    tooltip-effect="dark"
                    stripe
                    @cell-mouse-enter="mouseTable"                 
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
                                    <p @click="handleEdit(scope, scope.row)">编辑</p>
                                    <p @click="handleDelete(scope.$index, scope.row)">删除</p>                                  
                                </div>
                            </div>                          
                        </template>
                    </el-table-column>
                </el-table>              
            </div>
             <div class="tableBox" v-else-if="activeName=='辅导员'"  >
                <el-table                                
                    ref="multipleTable"
                    v-loading="loading"               
                     element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    :data="tableData"
                    tooltip-effect="dark"
                    stripe
                    @cell-mouse-enter="mouseTable"                 
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
                    
                    <el-table-column
                    v-if="activeName=='辅导员'&&dataHeader.length>1"   
                    label="管理班级"         
                    >
                        <template slot-scope="scope">
                            <el-tooltip placement="top-start" effect="light">
                                <div 
                                slot="content" 
                                v-for="(item,index) in (scope.row.manageClass)==''?'':(scope.row.manageClass).split(',')"
                                :key="index"
                                >
                                    {{item}}                    
                                </div>
                                 
                                <div style="cursor: pointer;">{{scope.row.manageClass.length>10?scope.row.manageClass.slice(0,10)+'...':scope.row.manageClass}}</div>
                            </el-tooltip>
                           
                        </template>
                    </el-table-column>                  
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="80">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="handleEdit(scope, scope.row)">编辑</p>
                                    <p @click="handleDelete(scope.$index, scope.row)">删除</p>                                  
                                </div>
                            </div>                          
                        </template>
                    </el-table-column>
                </el-table>              
            </div>
            <div class="tableBox" v-else-if="activeName=='宿管'"  >
                <el-table                                
                    ref="multipleTable"
                    v-loading="loading"               
                     element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    :data="tableData"
                    tooltip-effect="dark"
                    stripe
                    @cell-mouse-enter="mouseTable"                 
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
                    
                    <el-table-column                 
                    label="管理楼栋"         
                    >
                        <template slot-scope="scope">
                            <el-tooltip placement="top-start" effect="light">
                                <div 
                                slot="content"                              
                                v-for="(item,index) in (scope.row.manageFloor)==''?'':(scope.row.manageFloor).split(',')"
                                :key="index"
                                >
                                    {{item}}                    
                                </div>
                                 
                                <div style="cursor: pointer;">{{scope.row.manageFloor.length>10?scope.row.manageFloor.slice(0,10)+'...':scope.row.manageFloor}}</div>
                            </el-tooltip>
                           
                        </template>
                    </el-table-column>                 
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="80">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="handleEdit(scope, scope.row)">编辑</p>
                                    <p @click="handleDelete(scope.$index, scope.row)">删除</p>                                  
                                </div>
                            </div>                          
                        </template>
                    </el-table-column>
                </el-table>              
            </div>
            <div class="tableBox"  v-else-if="activeName=='黑名单库'">
                <el-table               
                    ref="multipleTable"
                    v-loading="loading"               
                     element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(255, 255, 255, 0.8)"
                    :data="tableData"
                    tooltip-effect="dark"
                    stripe
                    @cell-mouse-enter="mouseTable"                 
                    height="100%"
                    @selection-change="handleSelectionChange"
                    style="width:100%">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column                 
                    label="照片"         
                    >
                        <template slot-scope="scope">                        
                           <div class="imgBox">
                               <img class="img" :src="(scope.row.blacklistImg) | blacklistsImg" alt="">
                           </div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="姓名"         
                    >
                        <template slot-scope="scope">                        
                           <div>
                               {{scope.row.blacklistName}}
                           </div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="备注"         
                    >
                        <template slot-scope="scope">                        
                           <div>
                               {{scope.row.blacklistInfo}}
                           </div>
                        </template>
                    </el-table-column>
                  
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="80">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="handleEdit(scope, scope.row)">编辑</p>
                                    <p @click="handleDelete(scope.$index, scope.row)">删除</p>                                  
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
        <new-students 
        :newVisible='newVisible'
        :popupTitle='popupTitle'
        :allcollege='allcollege'
        :allYear='allYear'
        :allarea='allarea'
        @newCall='newCall'
        :newName='newName'
        @newSave='newSave'
        @editSave="editSave"
        ref="child"
        ></new-students>  
  </div>
</template>

<script>
import Paginations from './Paginations'
import newStudents from './newStudents'
import {formatDate} from '../../js/date.js'
import bus from '../../js/bus.js'
import { arealist_2,floorList} from '@/axios/api1'
import { 
    queryCollegeByName,
    queryMajorByTerm,
    queryAllCalss,
    queryByYearName,
    addTeacherInfo,
    addCircle,
    queryTeacherInfoByTerm,
    deleteTeacher,
    updateTeacherInfo,
    addHousemasterInfo,
    queryHousemasterInfoByTerm,
    deleteHousemasterInfo,
    updateHousemasterInfo,
    addStudentInfo,
    queryStudent,
    deleteStudentInfo,
    updateStudentInfo,
    queryParent,
    saveExcelAllStudent,
    outExcelStudent,
    HousemasterInfooutExcel,
    HousemasterInfsaveExcelAll,
    saveExcelAllStudentTest,
    queryMenuById,
    TeacherInfoOutExcel,
    HousemasaveExcelAllTest,
    TeacherInfoSaveExcelAll,
    TeacherInfoOutExcel1Test,
    deleteOtherPeople,
    queryOtherPeople,
    addOtherPeople,
    updateOtherPeople,
    insertBlacklist,
    queryBlacklist,
    deleteBlacklist,
    updateBlacklist,
    outExcelOtherPeople,
    saveExcelOtherPeopleTest,
    saveExcelOtherPeople,
    outExcelBlacklist,
    saveExcelBlacklist,
   
} from '@/axios/api'
import { parse } from 'semver';
import { setTimeout } from 'timers';
const Students1=[
            {name:'姓名',props:'studentInfoName'},      
            {name:'学号',props:'studentInfoNo'},
            {name:'性别',props:'studentInfoSex'},
            {name:'辅导员信息',props:'teacherMsg'},    
            {name:'家长信息',props:'parentMsg'},
            {name:'房间信息',props:'roomMsg'},
            {name:'班级信息',props:'classMsg'},          
        ]
const Students2=[
            {name:'姓名',props:'housemasterInfoName'},      
            {name:'工号',props:'housemasterInfoNo'},
            {name:'性别',props:'housemasterInfoSex'},
            {name:'手机号码',props:'housemasterInfoPhone'}, 
            // {name:'管理楼栋',props:'manageFloor'},              
        ]
const Students3=[
            {name:'姓名',props:'teacherInfoName'},      
            {name:'工号',props:'teacherInfoNo'},
            {name:'性别',props:'teacherInfoSex'},
            {name:'手机号码',props:'teacherInfoPhone'}, 
            // {name:'管理班级',props:'manageClass'}, 
        ]
const Students4=[
        {name:'姓名',props:'otherPeopleInfoName'},      
        {name:'工号',props:'otherPeopleInfoNo'},
        {name:'性别',props:'otherPeopleInfoSex'},
        {name:'手机号码',props:'otherPeopleInfoPhone'},  
    ]
    const Students5=[
        {name:'照片',props:'blacklistImg'},      
        {name:'姓名',props:'blacklistName'},
        {name:'备注',props:'blacklistInfo'},
    ]
export default {
    name:"ClassManage",
    components:{
        Paginations,
        newStudents
    },
    data(){
        return{
            activeName:"学生",
            activeIndex:'',
            loading:false,
            fullscreenLoading:false,
            newName:'',
            total:0,
            id:'student',
            pageSize:10,
            pageNum:1,
            deleteId:null,//表格操作
            newVisible:false,//新增弹框
            setVisible:false,//设置弹框   
            fileList:[],//导入          
            //查询
            StudentsGender1:'',//学生性别
            StudentsName1:'',//学生姓名
            area:0,//宿管区域
            StudentsGender2:'',
            StudentsName2:'',
            college:'',//辅导员院系
            major:'',//专业
            StudentsName3:'',
            StudentsGender3:'',//其他性别
            StudentsName4:'',//其他姓名
            StudentsName5:'',//黑名单姓名

            collegeValue2:'',//学院下拉框
            majorValue:'',//专业下拉框
            classValue:'',//年级下拉框
            referName1:'',//学院名
            referName2:'',//专业名
            referName3:'',//年级名
            referName4:'',//班级名
            //下拉框
            //性别
            gender: [
            {value: '',label: '全部',name:''}, 
            {value: '2',label: '男',name:'男'}, 
            {value: '3',label: '女',name:'女'}, 
            ],
            //所有专业
                allMajor: [             
            
            ],
            //所有区域
                allarea: [             
            
            ],
            //所有院系
            allcollege: [            
                
            ],
            //所有年级
            allYear:[],
            popupTitle:'',//弹出框标题
            //弹框新增属性
            newCollegeNmae:'',//学院名              
            newClassAmount:'',//班级数
            newCollegeValue:'',
            newCollegeValue2:'',
            newGradeValue:'',
            //编辑弹框
            EditCollegeNmae:'',//编辑班级名

            dataHeader:[],//表格头部                         
            value: '',
            multipleSelection: [], //表格多选
            tableData: [                   
            
            ],
            roleInfoMenu:[],
            roleId:null,
        }
    },
        filters:{
            manageClass2(name){
                let names=''
                console.log(name)
                if(name.length>8){
                    names=name.slice(0,8)+'...'
                }
                else{
                    names=name
                }
                return names
            },
              blacklistsImg(row){
                // console.log(row)
                let img=null
                if(row!=''&&row!=null){
                    // console.log('img',row)
                 img=row.split(',')
                 return `${img[0]}`
                }else{
                    return ''
                }
            }
        },
        mounted() {
          
            this.dataHeader=Students1
            this.loading=false
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            bus.$on('newCall',this.newCall)
             this.queryCollegeByNames()
            this.queryByYearNames2()
            this.arealist()
            // this.fullscreenLoading=true
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
            this.queryStudents()
              console.log(this.roleInfoMenu)
               let roleId=localStorage.getItem('roleId')  
                this.roleId=roleId
               if(this.roleInfoMenu.length<1){    
                    if(roleId==1){
                       return
                   }                     
                    queryMenuById({roleId}).then(res=>{     
                        console.log('权限菜单',res)                   
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
            navjurisdiction(id){
                return function(id){
                    if(this.roleId==1){
                        return true
                    }
                     else if(this.roleInfoMenu.length<1){
                        return true
                    }
                    else if(id==1){
                       return this.roleInfoMenu[10].indexOf('学生')==-1?false:true
                    }
                   else if(id==2){
                       return this.roleInfoMenu[10].indexOf('宿管')==-1?false:true
                    }
                    else if(id==3){
                       return this.roleInfoMenu[10].indexOf('辅导员')==-1?false:true
                    }
                }
            },
            navjurisdiction2(){
                return function(){
                    if(this.roleId==1){
                        return true
                    }
                     else if(this.roleInfoMenu.length<1){
                        return true
                    }
                    else if(this.activeName=='学生'){
                        return this.roleInfoMenu[10].indexOf('11-1')==-1?false:true
                    }
                    else if(this.activeName=='宿管'){
                        return this.roleInfoMenu[10].indexOf('11-2')==-1?false:true
                    }
                     else if(this.activeName=='辅导员'){
                        return this.roleInfoMenu[10].indexOf('11-3')==-1?false:true
                    }
                     else if(this.activeName=='其他'){
                         return true
                        // return this.roleInfoMenu[10].indexOf('11-4')==-1?false:true
                    }
                     else if(this.activeName=='黑名单库'){
                         return true
                        // return this.roleInfoMenu[10].indexOf('11-5')==-1?false:true
                    }
                }
            },
            isTable(){
                if(this.activeName=='学生'||this.activeName=='其他'){
                    return true
                }
                else false
            }
        },
      
         watch: {
             activeIndex(){
                this.multipleSelection=[]
                this.$refs.multipleTable.clearSelection()
                this.pageNum=1
                this.tableData=[]            
                console.log(this.activeName)
               
             }
         },      
        methods: {
      
            //导入成功或失败
            handleAvatarSuccess(file){
                console.log(file)
                 let fd = new FormData();
                fd.append('file',file.raw);//传文件
                this.fileList=[]
                if(this.activeName=='学生'){
                    saveExcelAllStudentTest(fd).then(res=>{
                        if(res.data.code==200&&res.data.data==''){
                               saveExcelAllStudent(fd).then(res2=>{
                                if(res2.data.code==200){
                                    this.$message({message:'导入成功',type:'success'}); 
                                    this.queryStudents()
                                }else{
                                    this.$message({message:'导入失败' +res2.data.msg}); 
                                }
                            })
                        }else{
                            this.$message({message:'导入失败' +res.data.data}); 
                        }

                    })
                }
                else if(this.activeName=='宿管'){
                    HousemasaveExcelAllTest(fd).then(res=>{
                        if(res.data.code==200&&res.data.data==''){
                               HousemasterInfsaveExcelAll(fd).then(res2=>{
                                  if(res2.data.code==200){
                                        this.$message({message:'导入成功',type:'success'}); 
                                        this.queryHousemasterInfoByTerms()
                                    }else{
                                         this.$message({message:'导入失败' +res2.data.msg}); 
                                    }
                              })
                        }else{
                            this.$message({message:'导入失败' +res.data.data}); 
                        }
                    })
               
                }
                else if(this.activeName=='辅导员'){
                    TeacherInfoOutExcel1Test(fd).then(res=>{
                        if(res.data.code==200&&res.data.data==''){
                               TeacherInfoSaveExcelAll(fd).then(res2=>{
                                  if(res2.data.code==200){
                                        this.$message({message:'导入成功',type:'success'}); 
                                        this.queryTeacherInfoByTerms()
                                    }else{
                                         this.$message({message:'导入失败' +res2.data.msg}); 
                                    }
                              })
                        }else{
                            this.$message({message:'导入失败' +res.data.data}); 
                        }
                    })
                }
                 else if(this.activeName=='其他'){
                       saveExcelOtherPeopleTest(fd).then(res=>{
                        if(res.data.code==200&&res.data.data==''){
                               saveExcelOtherPeople(fd).then(res2=>{
                                  if(res2.data.code==200){
                                        this.$message({message:'导入成功',type:'success'}); 
                                        this.queryOtherPeoples()
                                    }else{
                                         this.$message({message:'导入失败' +res2.data.msg}); 
                                    }
                              })
                        }else{
                            this.$message({message:'导入失败' +res.data.data}); 
                        }
                    })
                }
                 else if(this.activeName=='黑名单库'){
                      saveExcelBlacklist(fd).then(res2=>{
                            if(res2.data.code==200){
                                this.$message({message:'导入成功',type:'success'}); 
                               this.queryBlacklists()
                            }else{
                                    this.$message({message:'导入失败' +res2.data.msg}); 
                            }
                        })
                }
                
            },          
            handlePreview(file) {
                console.log(file);
            },
            //文件长度限制钩子
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            }, 
           
            preview(event){
                let files = document.getElementById(this.id).files[0]
                // this.imgDataUrl =this.getObjectURL(files)
                // this.$emit('sendImgUrl',this.imgDataUrl,this.id)
                console.log(files)
                },
            blobs(data,msg){
                const content = data
                const blob = new Blob([content])
                const fileName =msg
                if ('download' in document.createElement('a')) { // 非IE下载
                const elink = document.createElement('a')
                elink.download = fileName
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
                } else { // IE10+下载
                navigator.msSaveBlob(blob, fileName)
                }
            },
            //导出
            outExcelStudents(){
                if(this.activeName=='学生'){
                    outExcelStudent().then(res=>{
                        console.log('blob学生',res)
                         if(res.status==200&&res.data!=null){
                            this.blobs(res.data,'学生.xls')
                        }
                    })
                }
                else if(this.activeName=='宿管'){
                    HousemasterInfooutExcel().then(res=>{
                        if(res.status==200&&res.data!=null){
                            this.blobs(res.data,'宿管.xls')
                        }
                        
                    })
                }
                else if(this.activeName=='辅导员'){
                    TeacherInfoOutExcel().then(res=>{
                        if(res.status==200&&res.data!=null){
                            this.blobs(res.data,'辅导员.xls')
                        }
                    })
                }
                 else if(this.activeName=='其他'){
                     outExcelOtherPeople().then(res=>{
                        if(res.status==200&&res.data!=null){
                            this.blobs(res.data,'其他人.xls')
                        }
                    })
                }
                 else if(this.activeName=='黑名单库'){
                      outExcelBlacklist().then(res=>{
                        if(res.status==200&&res.data!=null){
                            this.blobs(res.data,'黑名单.xls')
                        }
                    })
                }
            },        
            //全部区域
            arealist(){
                arealist_2().then(res=>{
                    console.log('全部区域',res)
                     if(res.status==200&&res.data.code==200){
                        this.allarea=res.data.data               
                    }
                })
            },
            //全部学院
            queryCollegeByNames(){
                queryCollegeByName({collegeName:'', pageNum:0,pageSize:0}).then(res=>{
                console.log('全部学院',res)
                if(res.status==200&&res.data.code==200){
                        this.allcollege=res.data.data               
                    }
                })
            },
            //查询全部年级
             queryByYearNames2(){     
                queryByYearName({YearName :'', pageNum :0,pageSize :0}).then(res=>{
                    console.log('查询全部年级',res)
                    if(res.status==200&&res.data.code==200){
                        this.allYear=res.data.data.list
                        
                    }
                })
            },
            //查询全部班级
        queryAllCalsss(item){   
            console.log(item,index)                
            queryAllCalss({
                collegeName:item.value1,
                majorName :item.value2,
                yearName :item.value3,
                className :'',
                pageNum :0,
                pageSize :0
            }).then(res=>{
                console.log(`全部班级`,res)
                 if(res.status==200&&res.data.code==200){
                        this.newStaffMessage.classManagement[index].select7=res.data.data
                         this.newStaffMessage.classManagement[index].value4=''                                                        
                    }
            })
        },
            //查询全部专业
            queryMajorByTerms(collegeName){
                 queryMajorByTerm({collegeName,MajorName:'',pageNum :0,pageSize :0 }).then(res=>{
                    console.log('查询专业',res)
                    if(res.status==200&&res.data.code==200){
                        this.allMajor=res.data.data                                       
                    }
                })
            },    
            //查询辅导员
            queryTeacherInfoByTerms(){ 
                 this.loading=true             
                queryTeacherInfoByTerm({
                    CollegeName:this.college,
                    MajorName:this.major,
                    teacherInfoName:this.StudentsName3 ,
                    pageSize:this.pageSize,
                    pageNum:this.pageNum
                }).then(res=>{
                    console.log('查询辅导员',res)
                       this.loading=false
                    if(res.status==200&&res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total                      
                    }else{
                         this.$message({message:'查询失败'+res.data.msg}); 
                    }
                })
            }, 
            //查询宿管
            queryHousemasterInfoByTerms(){  
                this.loading=true           
                queryHousemasterInfoByTerm({
                    regionId :this.area,
                    housemasterInfoSex :this.StudentsGender2,
                    housemasterInfoName :this.StudentsName2 ,
                    pageSize:this.pageSize,
                    pageNum:this.pageNum
                }).then(res=>{
                    console.log('查询宿管',res)
                    this.loading=false
                    if(res.status==200&&res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total                      
                    }else{
                         this.$message({message:'查询失败'+res.data.msg}); 
                    }
                })
            }, 
            //查询学生
            queryStudents(){
                this.loading=true 
                queryStudent({
                    studentInfoSex:this.StudentsGender1,
                    studentInfoName:this.StudentsName1,
                    pageSize:this.pageSize,
                    pageNum:this.pageNum
                }).then(res=>{
                    console.log('查询学生',res)
                    this.loading=false
                    if(res.status==200&&res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total                      
                    }else{
                         this.$message({message:'查询失败'+res.data.msg}); 
                    }
                })
            },
            //查询其他
            queryOtherPeoples(){
                this.loading=true 
                queryOtherPeople({
                    otherPeopleInfoSex :this.StudentsGender3,
                    nameOrNo :this.StudentsName4,
                    pageSize:this.pageSize,
                    pageNum:this.pageNum
                }).then(res=>{
                    console.log('查询其他',res)
                    this.loading=false
                    if(res.status==200&&res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total                      
                    }else{
                         this.$message({message:'查询失败'+res.data.msg}); 
                    }
                })
            },
             //查询黑名单
            queryBlacklists(){
                this.loading=true 
                queryBlacklist({
                    blacklistName:this.StudentsName5,
                    pageSize:this.pageSize,
                    pageNum:this.pageNum
                }).then(res=>{
                    console.log('查询黑名单',res)
                    this.loading=false
                    if(res.status==200&&res.data.code==200){
                        if(res.data.data.list){
                        
                            this.tableData=res.data.data.list
                        }
                        this.total=res.data.data.total                      
                    }else{
                         this.$message({message:'查询失败'+res.data.msg}); 
                    }
                })
            },
            //鼠标移入单元格
            mouseTable(row, column, cell, event){
                // console.log('单元格',row, column.label)
            },       
            //切换top
            handleClick(tab, event) {                                                                 
                this.activeIndex=tab.index 
                 this.activeName=tab.label  
                 this.dataHeader=[]                         
                if(tab.label =='学生'){
                    this.dataHeader=Students1
                    this.queryStudents()
                }
                else if(tab.label =='宿管'){
                    this.dataHeader=Students2                       
                    this.queryHousemasterInfoByTerms()
                    
                }
                  else if(tab.label =='辅导员'){
                    this.dataHeader=Students3                       
                    this.queryTeacherInfoByTerms()
                }
                  else if(tab.label =='其他'){
                    this.dataHeader=Students4  
                    this.queryOtherPeoples()       
                 }
                  else if(tab.label =='黑名单库'){                       
                    // this.dataHeader=Students5
                     this.queryBlacklists()
                }
                
            },
            //点击操作
            clickOperate(scope,row){
                console.log(scope,row)
                this.deleteId=scope.$index
            },
            //查询
            StudentsData(id){            
                if(id==1){
                    console.log(`查询${id}`,) 
                    this.queryStudents()                  
                }
                else if(id==2){
                     console.log(`查询${id}`,)
                     this.queryHousemasterInfoByTerms()
                }
                else if(id==3){
                     console.log(`查询${id}`,)
                     this.queryTeacherInfoByTerms()
                }
                 else if(id==4){
                     console.log(`查询${id}`,)
                     this.queryOtherPeoples()     
                }
                  else if(id==5){
                     console.log(`查询${id}`,)
                     this.queryBlacklists()
                }
            },
            //新增
            newly(id){
                console.log(id)
                this.popupTitle='新增'
                this.newVisible=true
                this.newName=id
               
            },
            //取消模态框
            newCall(){
                this.newVisible=false
            },
            //新增宿管
            addHousemasterInfos(newStaffMessage){
                 let manageFloor=[]
                    newStaffMessage.patriarch.forEach(data=>{
                        if(data.value2==''){
                            return
                        }else{
                            manageFloor.push(data.value2)
                        }
                    })
                addHousemasterInfo({  
                    housemasterInfoManage:{
                        housemasterInfoIdnum:newStaffMessage.newInput5,
                        housemasterInfoImg:'',
                        housemasterInfoName:newStaffMessage.newInput1,
                        housemasterInfoNation:newStaffMessage.selectValue3,
                        housemasterInfoNative:newStaffMessage.newInput3,
                        housemasterInfoNo:newStaffMessage.newInput2,
                        housemasterInfoPhone:newStaffMessage.newInput4,
                        housemasterInfoSex:newStaffMessage.selectValue1,
                        manageFloor:manageFloor.length>0?manageFloor.join(','):''
                    },            
                   housemasterInfo_Img:newStaffMessage.picture_student,
                   housemasterInfo_ImgName:newStaffMessage.picture_student_name
                }).then(res=>{
                    console.log('新增宿管',res)
                     if(res.status==200&&res.data.code==200){
                            this.$message({message: '新增成功' ,type:'success'}); 
                            this.queryHousemasterInfoByTerms()    
                            this.newVisible=false
                        }else{
                            this.$message({message: '新增失败 '+res.data.msg });
                        }
                })
            },
            // 新增学生
            addStudentInfos(newStaffMessage){
                   this.fullscreenLoading=true
                    addStudentInfo({
                        studentInfo:{
                            studentInfoName: newStaffMessage.newInput1,
                            studentInfoNative:newStaffMessage.newInput3,
                            studentInfoNo: newStaffMessage.newInput2,
                            studentInfoPhone:newStaffMessage.newInput4,
                            studentInfoPolitics:newStaffMessage.selectValue2,
                            studentInfoSex:newStaffMessage.selectValue1,
                            studentInfoNation:newStaffMessage.selectValue3,
                            classId:newStaffMessage.selectValue7,
                            roomId:newStaffMessage.selectValue10,
                            bedId:newStaffMessage.selectValue11,
                          
                            // parentMsg:`${newStaffMessage.newInput6},${newStaffMessage.newInput7},${newStaffMessage.newInput8},${newStaffMessage.selectValue12},${newStaffMessage.newInput9}`,
                            // parentMsgOne:`${newStaffMessage.newInput10==''?0:newStaffMessage.newInput10},${newStaffMessage.newInput11},${newStaffMessage.newInput12},${newStaffMessage.selectValue13},${newStaffMessage.newInput13}`,
                            studentInfoIdnum:newStaffMessage.newInput5,
                            studentInfoImg:'',
                        },                          
                        picture_parent_one:newStaffMessage.picture_parent_one,
                        picture_parent_two:newStaffMessage.picture_parent_two,
                        picture_student:newStaffMessage.picture_student,
                        picture_parent_one_name:newStaffMessage.picture_parent_one_name,
                        picture_parent_two_name:newStaffMessage.picture_parent_two_name,
                        picture_student_name:newStaffMessage.picture_student_name,
                        parentMsg:{
                            parentIdnum:newStaffMessage.newInput9,
                            parentImg:"",
                            parentName:newStaffMessage.newInput6,
                            parentPhone:newStaffMessage.newInput7,
                            parentRelationship:newStaffMessage.newInput8,
                            parentSex:newStaffMessage.selectValue12,
                        },
                        parentMsgOne:{
                            parentIdnum:newStaffMessage.newInput13,
                            parentImg:"",
                            parentName:newStaffMessage.newInput10,
                            parentPhone:newStaffMessage.newInput11,
                            parentRelationship:newStaffMessage.newInput12,
                            parentSex:newStaffMessage.selectValue13,
                        }
                        
                    }).then(res=>{
                        console.log('新增学生',res)
                           this.fullscreenLoading=false
                            if(res.status==200&&res.data.code==200){
                            this.$message({message: '新增成功' ,type:'success'}); 
                            this.queryStudents()
                            this.newVisible=false
                        }else{
                            this.$message({message: '新增失败 '+res.data.msg });
                        }
                    })  
            },
            //新增其他人
            addOtherPeoples(newStaffMessage){
                 let manageFloor=[]
                    newStaffMessage.patriarch.forEach(data=>{
                        if(data.value2==''){
                            return
                        }else{
                            manageFloor.push(data.value2)
                        }
                    })
                addOtherPeople({
                    outorcomefloor:manageFloor.join(','),
                    otherPeopleInfoImg:newStaffMessage.picture_student,
                    otherPeopleInfoImgName:newStaffMessage.picture_student_name,
                    otherPeopleInfo:{
                        otherPeopleInfoName: newStaffMessage.newInput1,
                        otherPeopleInfoNative:newStaffMessage.newInput3,
                        otherPeopleInfoDepartment:newStaffMessage.newInput33,
                        otherPeopleInfoNo: newStaffMessage.newInput2,
                        otherPeopleInfoPhone:newStaffMessage.newInput4,
                        otherPeopleInfoPolitics:newStaffMessage.selectValue2,
                        otherPeopleInfoSex:newStaffMessage.selectValue1,
                        otherPeopleInfoNation:newStaffMessage.selectValue3,                                          
                        otherPeopleInfoIdnum:newStaffMessage.newInput5,
                        otherPeopleInfoImg:'',
                    }
                }).then(res=>{
                    console.log('新增其他',res)
                       if(res.status==200&&res.data.code==200){
                            this.$message({message: '新增成功' ,type:'success'}); 
                            this.queryOtherPeoples()
                            this.newVisible=false
                        }else{
                            this.$message({message: '新增失败 '+res.data.msg });
                        }
                })
            },
            //新增黑名单
            insertBlacklists(newStaffMessage){
                insertBlacklist({
                blacklist:{
                    blacklistName:newStaffMessage.blacklistName,
                    blacklistInfo:newStaffMessage.blacklistInfo,
                    blacklistImg:newStaffMessage.blacklistImg
                },
                pictureBase:newStaffMessage.pictureBase,
                pictureName:newStaffMessage.pictureName,
            }).then(res=>{
                    console.log('新增黑名单',res)
                       if(res.status==200&&res.data.code==200){
                            this.$message({message: '新增成功' ,type:'success'}); 
                            this.newVisible=false
                            this.queryBlacklists()
                        }else{
                            this.$message({message: '新增失败 '+res.data.msg });
                        }
                })
            },
            //新增确认
            newSave(newStaffMessage){
                let phone=/^1[3456789]\d{9}$/,
                    name=/^[\u4e00-\u9fa5 ]{2,20}$/,
                    name2=/^[a-zA-Z\/ ]{2,20}$/,
                    gonghao=/^\w{1,16}$/,
                    reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;   
                if(this.newName==5){
                    if(newStaffMessage.blacklistName==''){
                         this.$message({message: '请输入姓名！' });
                         return
                     }
                    this.insertBlacklists(newStaffMessage)
                }              
                else if(
                        newStaffMessage.newInput1==''||
                        newStaffMessage.newInput2==''||
                        newStaffMessage.newInput4==''||
                        newStaffMessage.newInput5==''||
                        newStaffMessage.selectValue1==''){
                        this.$message({message: '新增信息不能为空' });
                    }
                else if(!name.test(newStaffMessage.newInput1)){
                        this.$message({message: '姓名请输入汉字！'});
                }
                else if(!gonghao.test(newStaffMessage.newInput2)){
                        this.$message({message: '学号或工号 请输入字母或数字！'});
                }
                else if(!phone.test(newStaffMessage.newInput4)){
                        this.$message({message: '请输入11位数字手机号码'});
                }
                else if(!reg.test(newStaffMessage.newInput5)){
                        this.$message({message: '身份证号码格式不对'});
                }
                
               else if(this.newName==1){
                   if(newStaffMessage.picture_student==''){
                        this.$message({message:'学生头像不能空'});
                    }
                    else if(newStaffMessage.selectValue7==null){
                        this.$message({message:'班级不能为空'});
                    }
                    else if(newStaffMessage.selectValue10==null||newStaffMessage.selectValue11==null){
                        this.$message({message:'房间或床位不能为空'});
                    }
                    else if(
                        newStaffMessage.newInput6==''||
                        newStaffMessage.newInput7==''){
                        this.$message({message: '请输入家长1姓名或电话'});
                    }  
                     else if(!name.test(newStaffMessage.newInput6)){
                        this.$message({message: '家长姓名请输入汉字！'});
                    }
                    else if(!phone.test(newStaffMessage.newInput7)){
                        this.$message({message: '家长手机号码格式不对'});
                    }                
                    else if(newStaffMessage.newInput10!=''){
                        if(
                        newStaffMessage.newInput10==''||
                        newStaffMessage.newInput11==''
                       ){
                            this.$message({message: '请输入家长2姓名或电话' });
                        }else{
                            this.addStudentInfos(newStaffMessage)    
                        }
                        
                    }
                    else{                                                                  
                           this.addStudentInfos(newStaffMessage)                    
                        
                    }                 
                }
                else if(this.newName==2){  
                     console.log('新增宿管',)
                     this.addHousemasterInfos(newStaffMessage)         
                }
                 else if(this.newName==3){
                    console.log('新增辅导员',newStaffMessage)
                    
                    if( newStaffMessage.classManagement[0].value4==''){
                         this.$message({message:'请至少选择1个管理班级！'});
                    }
                    else if(newStaffMessage.picture_student==''){
                        this.$message({message:'上传头像不能空'});
                    }
                    else{                                       
                        let classId=[]
                        newStaffMessage.classManagement.forEach(data=>{
                            if(data.value4==''){
                                return
                            }else{
                                classId.push(data.value4)
                            }
                     })                     
                        addTeacherInfo({    
                                teacherInfoManage:{
                                    teacherInfoName:newStaffMessage.newInput1,
                                    teacherInfoNo:newStaffMessage.newInput2,
                                    teacherInfoSex:newStaffMessage.selectValue1,
                                    teacherInfoPhone:newStaffMessage.newInput4,
                                    teacherInfoIdnum:newStaffMessage.newInput5,
                                    teacherInfoPolitics:newStaffMessage.selectValue2,
                                    teacherInfoNative:newStaffMessage.newInput3,
                                    teacherInfoNation:newStaffMessage.selectValue3,
                                    teacherInfoEducation:newStaffMessage.select33Value,
                                    teacherInfoImg:'',
                                    manageClass:classId.length>0?classId.join(','):'' 
                                },                               
                                teacherInfo_Img:newStaffMessage.picture_student,
                                teacherInfo_ImgName:newStaffMessage.picture_student_name,
                                                                                                        
                        }).then(res=>{
                            console.log('新增辅导员2',res)
                            if(res.status==200&&res.data.code==200){
                                this.newVisible=false
                                this.$message({message: '新增成功' ,type:'success'}); 
                                this.queryTeacherInfoByTerms()
                            }else{
                                this.$message({message: '新增失败 '+res.data.msg });
                            }
                        })                         
                        
                    }              
                   
                }
                 else if(this.newName==4){
                     
                        this.addOtherPeoples(newStaffMessage)
                    
                }
                
            },
            //删除多个
            deleteDate(id){
                console.log(`删除多个id${id}`,)
                let multipleSelection=[],
                    teacherInfoImg=[],
                    classid=[];
                if(id==1){
                    console.log(this.multipleSelection)
                    if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }else{
                         this.multipleSelection.forEach((data)=>{
                           if(data.studentInfoId!=''||data.studentInfoId!=null){
                               multipleSelection.push(data.studentInfoId)
                           }
                           if(data.studentInfoImg!=''||data.studentInfoImg!=null){
                                teacherInfoImg.push(data.studentInfoImg)                      
                           }
                          
                        })
                          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                this.fullscreenLoading=true
                                deleteStudentInfo({
                                    studentInfoId :multipleSelection.join(','),
                                    }).then(res=>{
                                    console.log('删除多个学生')
                                    if(res.status==200&&res.data.code==200){
                                        this.fullscreenLoading=false
                                        this.queryStudents()                                                                          
                                        this.$message({type: 'success',message: '删除成功!'});
                                    }else{
                                        this.$message({                                           
                                            message: '删除失败'+res.data.msg
                                        });
                                    }
                                })
                               
                            }) 
                    }
                }
                else if(id==2){
                    console.log(this.multipleSelection)
                     if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }else{
                         this.multipleSelection.forEach((data)=>{
                           if(data.housemasterInfoId!=''||data.housemasterInfoId!=null){
                               multipleSelection.push(data.housemasterInfoId)
                           }
                           if(data.housemasterInfoImg!=''||data.housemasterInfoImg!=null){
                                teacherInfoImg.push(data.housemasterInfoImg)                      
                           }
                          
                        })
                          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                this.fullscreenLoading=true
                                deleteHousemasterInfo({
                                    housemasterInfoId :multipleSelection.join(','),
                                    housemasterInfoImg :teacherInfoImg.join(',')
                                    }).then(res=>{
                                    console.log('删除多个宿管')
                                    if(res.status==200&&res.data.code==200){
                                        this.fullscreenLoading=false
                                        this.queryHousemasterInfoByTerms()                                                                            
                                        this.$message({type: 'success',message: '删除成功!'});
                                    }else{
                                        this.$message({                                           
                                            message: '删除失败'+res.data.msg
                                        });
                                    }
                                })
                               
                            }) 
                    }
                }
                 else if(id==3){
                     console.log(this.multipleSelection)
                      if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }else{                       
                       this.multipleSelection.forEach((data)=>{
                           if(data.teacherInfoId!=''||data.teacherInfoId!=null){
                               multipleSelection.push(data.teacherInfoId)
                           }
                           if(data.classid!=''||data.classid!=null){
                                classid.push(data.classId)  
                                teacherInfoImg.push(data.teacherInfoImg)                      
                           }
                          
                        })
                          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                this.fullscreenLoading=true
                                deleteTeacher({
                                    TeacherInfoId:multipleSelection.join(','),
                                    classId:classid.join(','),
                                    teacherInfoImg:teacherInfoImg.join(',')
                                    }).then(res=>{
                                    console.log('删除多个辅导员')
                                    if(res.status==200&&res.data.code==200){
                                        this.queryTeacherInfoByTerms()      
                                        this.fullscreenLoading=false                            
                                        this.$message({type: 'success',message: '删除成功!'});
                                    }else{
                                        this.$message({                                           
                                            message: '删除失败'+res.data.msg
                                        });
                                    }
                                })
                               
                            })    
                    }
                }
                else if(id==4){
                     console.log(this.multipleSelection)
                      if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }else{                       
                       this.multipleSelection.forEach((data)=>{
                           if(data.otherPeopleInfoId!=''||data.otherPeopleInfoId!=null){
                               multipleSelection.push(data.otherPeopleInfoId)
                           }                         
                          
                        })
                          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                this.fullscreenLoading=true
                                deleteOtherPeople({
                                    otherPeopleInfoId :multipleSelection.join(',')                                  
                                    }).then(res=>{
                                    console.log('删除多个其他')
                                    if(res.status==200&&res.data.code==200){
                                        this.queryOtherPeoples()      
                                          this.fullscreenLoading=false                              
                                        this.$message({type: 'success',message: '删除成功!'});
                                    }else{
                                        this.$message({                                           
                                            message: '删除失败'+res.data.msg
                                        });
                                    }
                                })
                               
                            })    
                    }
                }
                else if(id==5){
                     console.log(this.multipleSelection)
                      if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }else{                       
                       this.multipleSelection.forEach((data)=>{
                           if(data.blacklistId!=''||data.blacklistId !=null){
                               multipleSelection.push(data.blacklistId )
                           }                         
                          
                        })
                          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                this.fullscreenLoading=true
                                deleteBlacklist({
                                    blacklistId:multipleSelection.join(',')                                  
                                    }).then(res=>{
                                    console.log('删除多个黑名单')
                                    if(res.status==200&&res.data.code==200){
                                         this.queryBlacklists()    
                                         this.fullscreenLoading=false                               
                                        this.$message({type: 'success',message: '删除成功!'});
                                    }else{
                                        this.$message({                                           
                                            message: '删除失败'+res.data.msg
                                        });
                                    }
                                })
                               
                            })    
                    }
                }
            },
            //选中的表格数据
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            //区域下拉框
            handcollege2(val){
                 console.log(val)
            },
            //点击学院下拉框
            handcollege(val){
                console.log(val)
                this.queryMajorByTerms(val)
            },
            //设置打卡时间
            setTime(){
                this.setVisible=true
            },
            //编辑
            handleEdit(scope,row){
                console.log('编辑',row)
                this.newVisible=true
                this.popupTitle='修改'   
                        
                if(this.activeName=='学生'){
                    this.newName=1 
                    let classMsg=[],
                        roomMsg=[];
                    classMsg=row.classMsg==''?[]:row.classMsg.split('-')
                    roomMsg=row.bedMsg==''?[]:row.bedMsg.split(',')
                    this.$refs.child.newStaffMessage.teacherInfoImg =row.studentInfoImg   
                    this.$refs.child.imageUrl = `${row.studentInfoImg }`  
                    this.$refs.child.newStaffMessage.classId=row.classId
                    this.$refs.child.newStaffMessage.roomId=row.roomId
                    this.$refs.child.newStaffMessage.bedId=row.bedId
                    this.$refs.child.newStaffMessage.newInput1=row.studentInfoName
                    this.$refs.child.newStaffMessage.newInput2=row.studentInfoNo
                    this.$refs.child.newStaffMessage.newInput3=row.studentInfoNative
                    this.$refs.child.newStaffMessage.newInput4=row.studentInfoPhone
                    this.$refs.child.newStaffMessage.newInput5=row.studentInfoIdnum
                    this.$refs.child.newStaffMessage.selectValue1=row.studentInfoSex
                    this.$refs.child.newStaffMessage.selectValue3=row.studentInfoNation
                    this.$refs.child.newStaffMessage.selectValue2=row.studentInfoPolitics

                    this.$refs.child.newStaffMessage.selectValue4=classMsg[0]
                    this.$refs.child.newStaffMessage.selectValue5=classMsg[1]
                    this.$refs.child.newStaffMessage.selectValue6=classMsg[2]
                    this.$refs.child.newStaffMessage.selectValue7=classMsg[3]

                    this.$refs.child.newStaffMessage.selectValue8=roomMsg[0]
                    this.$refs.child.newStaffMessage.selectValue9=roomMsg[1]
                    this.$refs.child.newStaffMessage.selectValue10=roomMsg[2]
                    this.$refs.child.newStaffMessage.selectValue11=roomMsg[3]
                    this.$refs.child.newStaffMessage.userInfoId=row.studentInfoId   
                    queryParent({studentInfoId:row.studentInfoId}).then(res=>{
                        console.log('父母信息 ',res)
                        if(res.status==200&&res.data.code==200){
                            this.$refs.child.newStaffMessage.newInput6=res.data.data[0].parentName
                            this.$refs.child.newStaffMessage.newInput7=res.data.data[0].parentPhone
                            this.$refs.child.newStaffMessage.newInput8=res.data.data[0].parentRelationship
                            this.$refs.child.newStaffMessage.newInput9=res.data.data[0].parentIdnum
                            this.$refs.child.newStaffMessage.selectValue12=res.data.data[0].parentSex
                            this.$refs.child.imageUr2=`${res.data.data[0].parentImg}`
                            this.$refs.child.newStaffMessage.parentId=res.data.data[0].parentId
                            this.$refs.child.newStaffMessage.patriarchInfoImg=res.data.data[0].parentImg
                            if(res.data.data.length>1){
                                this.$refs.child.newStaffMessage.newInput10=res.data.data[1].parentName
                                this.$refs.child.newStaffMessage.newInput11=res.data.data[1].parentPhone
                                this.$refs.child.newStaffMessage.newInput12=res.data.data[1].parentRelationship
                                this.$refs.child.newStaffMessage.newInput13=res.data.data[1].parentIdnum
                                this.$refs.child.newStaffMessage.selectValue13=res.data.data[1].parentSex
                                this.$refs.child.imageUr3=`${res.data.data[1].parentImg}`
                                this.$refs.child.newStaffMessage.parentId2=res.data.data[1].parentId
                                this.$refs.child.newStaffMessage.patriarchInfoImg2=res.data.data[1].parentImg
                            }else{
                                 this.$refs.child.newStaffMessage.parentId2=0
                            }
                            
                        }
                    })                 
                }
                else if(this.activeName=='宿管'){
                    this.newName=2
                    this.$refs.child.newStaffMessage.teacherInfoImg =row.housemasterInfoImg   
                    this.$refs.child.imageUrl = `${row.housemasterInfoImg }`  
                    this.$refs.child.newStaffMessage.newInput1=row.housemasterInfoName
                    this.$refs.child.newStaffMessage.newInput2=row.housemasterInfoNo
                    this.$refs.child.newStaffMessage.newInput3=row.housemasterInfoNative
                    this.$refs.child.newStaffMessage.newInput4=row.housemasterInfoPhone
                    this.$refs.child.newStaffMessage.newInput5=row.housemasterInfoIdnum
                    this.$refs.child.newStaffMessage.selectValue1=row.housemasterInfoSex
                    this.$refs.child.newStaffMessage.selectValue3=row.housemasterInfoNation
                    this.$refs.child.newStaffMessage.userInfoId=row.housemasterInfoId  
                   let patriarch=[]
                    if(row.manageFloor!=''&&row.manageFloor!=null){
                        let patriarch2=row.manageFloor.split(',')
                        let floorId=row.floorId.split(',')
                        patriarch2=patriarch2.map((data)=>{
                            return data.split('-')
                        })
                        patriarch2.forEach((data2,index)=>{
                            patriarch.push({
                                id:1,value1:data2[0],value2:data2[1],value3:floorId[index],select9:[]
                            })
                        })
                    }else{
                         patriarch.push({
                            id:1,value1:'',value2:'',select9:[]
                        })
                    }
                   
                    this.$refs.child.newStaffMessage.patriarch=patriarch   
                    console.log(patriarch)            
                }
                else if(this.activeName=='辅导员'){
                    this.$refs.child.newStaffMessage.teacherInfoImg =row.teacherInfoImg   
                    this.$refs.child.imageUrl = `${row.teacherInfoImg }`  
                    this.$refs.child.newStaffMessage.newInput1=row.teacherInfoName
                    this.$refs.child.newStaffMessage.newInput2=row.teacherInfoNo
                    this.$refs.child.newStaffMessage.newInput3=row.teacherInfoNative
                    this.$refs.child.newStaffMessage.newInput4=row.teacherInfoPhone
                    this.$refs.child.newStaffMessage.newInput5=row.teacherInfoIdnum
                    this.$refs.child.newStaffMessage.selectValue1=row.teacherInfoSex
                    this.$refs.child.newStaffMessage.selectValue2=row.teacherInfoPolitics	
                    this.$refs.child.newStaffMessage.selectValue3=row.teacherInfoNation
                    this.$refs.child.newStaffMessage.userInfoId=row.teacherInfoId  
                    this.newName=3
                    let classManagement=[]
                    if(row.manageClass!=''&&row.manageClass!=null&&row.classId!=''&&row.classId!=null){
                        let className=row.manageClass.split(',')
                        let classId=row.classId.split(',')
                        className=className.map((data)=>{
                            return data.split('-')
                        })
                        className.forEach((data2,index)=>{
                            classManagement.push({
                                id:1,value1:data2[0],value2:data2[1],value3:data2[2],value4:data2[3],value5:classId[index],select5:[],select7:[]
                            })
                        })
                    }
                   
                    this.$refs.child.newStaffMessage.classManagement=classManagement                
                   
                }
                 else if(this.activeName=='其他'){
                     this.newName=4               
                    this.$refs.child.newStaffMessage.teacherInfoImg =row.otherPeopleInfoImg   
                    this.$refs.child.imageUrl = `${row.otherPeopleInfoImg }`  
                    this.$refs.child.newStaffMessage.newInput1=row.otherPeopleInfoName
                    this.$refs.child.newStaffMessage.newInput2=row.otherPeopleInfoNo
                    this.$refs.child.newStaffMessage.newInput3=row.otherPeopleInfoNative
                    this.$refs.child.newStaffMessage.newInput4=row.otherPeopleInfoPhone
                    this.$refs.child.newStaffMessage.newInput5=row.otherPeopleInfoIdnum
                    this.$refs.child.newStaffMessage.selectValue1=row.otherPeopleInfoSex
                    this.$refs.child.newStaffMessage.selectValue2=row.otherPeopleInfoPolitics	
                    this.$refs.child.newStaffMessage.selectValue3=row.otherPeopleInfoNation
                     this.$refs.child.newStaffMessage.newInput33=row.otherPeopleInfoDepartment
                    this.$refs.child.newStaffMessage.userInfoId=row.otherPeopleInfoId   
                    let patriarch=[]
                    if(row.outorComefloorId!=''&&row.outorComefloorId!=null){
                        let patriarch2=row.outorComefloor.split(',')
                        let floorId=row.outorComefloorId.split(',')
                        patriarch2=patriarch2.map((data)=>{
                            return data.split('-')
                        })
                        patriarch2.forEach((data2,index)=>{
                            patriarch.push({
                                id:1,value1:data2[0],value2:data2[1],value3:floorId[index],select9:[]
                            })
                        })
                    }else{
                         patriarch.push({
                            id:1,value1:'',value2:'',select9:[]
                        })
                    }
                   
                    this.$refs.child.newStaffMessage.patriarch=patriarch                       
                }
                  else if(this.activeName=='黑名单库'){
                    this.newName=5
                    let img=[]
                    if(row.blacklistImg!=''&&row.blacklistImg!=null){
                         img=row.blacklistImg.split(',')
                    }
                    
                    let img2=[]
                        img.forEach((data,index)=>{
                            img2.push({name:`nihao${index}`,url:data})    
                        })
                    this.$refs.child.newStaffMessage.blacklistName=row.blacklistName    
                    this.$refs.child.newStaffMessage.blacklistInfo=row.blacklistInfo   
                    this.$refs.child.newStaffMessage.userInfoId=row.blacklistId   
                    this.$refs.child.fileList=img2                   
                }
            },
            //编辑宿管确认
            updateHousemasterInfos(newStaffMessage,manageFloor){
                updateHousemasterInfo({
                  
                    housemasterInfoManage:{
                        housemasterInfoId:newStaffMessage.userInfoId,
                        housemasterInfoIdnum:newStaffMessage.newInput5,
                        housemasterInfoImg:newStaffMessage.teacherInfoImg,
                        housemasterInfoName:newStaffMessage.newInput1,
                        housemasterInfoNation:newStaffMessage.selectValue3,
                        housemasterInfoNative:newStaffMessage.newInput3,
                        housemasterInfoNo:newStaffMessage.newInput2,
                        housemasterInfoPhone:newStaffMessage.newInput4,
                        housemasterInfoSex:newStaffMessage.selectValue1,
                        manageFloor:manageFloor.length>0?manageFloor.join(','):''
                    },
                    housemasterInfo_Img:newStaffMessage.picture_student,
                    housemasterInfo_ImgName:newStaffMessage.picture_student_name,

                    
                }).then(res=>{
                    if(res.status==200&&res.data.code==200){
                        this.$message({message: '修改成功' ,type:'success'}); 
                        this.queryHousemasterInfoByTerms()
                        this.newVisible=false
                    }else{
                        this.$message({message: '修改失败 '+res.data.msg });
                    }
                })
            },
            //编辑辅导员确认
            updateTeacherInfos(newStaffMessage,classId){
                updateTeacherInfo({ 
                    teacherInfoManage:{
                        teacherInfoName:newStaffMessage.newInput1,
                        teacherInfoNo:newStaffMessage.newInput2,
                        teacherInfoSex:newStaffMessage.selectValue1,
                        teacherInfoPhone:newStaffMessage.newInput4,
                        teacherInfoIdnum:newStaffMessage.newInput5,
                        teacherInfoPolitics:newStaffMessage.selectValue2,
                        teacherInfoNative:newStaffMessage.newInput3,
                        teacherInfoNation:newStaffMessage.selectValue3,
                        teacherInfoEducation:newStaffMessage.select33Value,
                        teacherInfoImg:newStaffMessage.teacherInfoImg,
                        teacherInfoId:newStaffMessage.userInfoId,
                        manageClass:classId.join(',') 
                    },
                    teacherInfo_Img:newStaffMessage.picture_student,                                 
                    teacherInfo_ImgName:newStaffMessage.picture_student_name   
                                                                                            
                }).then(res=>{
                    console.log('更新辅导员2',res)
                    if(res.status==200&&res.data.code==200){
                        this.$message({message: '修改成功' ,type:'success'}); 
                        this.queryTeacherInfoByTerms()
                        this.newVisible=false
                    }else{
                        this.$message({message: '修改失败 '+res.data.msg });
                    }
                })
            },
            //修改学生
            updateStudentInfos(newStaffMessage){
                   this.fullscreenLoading=true
                let numbers=/^[0-9]*$/
                updateStudentInfo({
                    studentInfo:{
                        studentInfoId:newStaffMessage.userInfoId,
                        studentInfoName:newStaffMessage.newInput1,
                        studentInfoNative:newStaffMessage.newInput3,
                        studentInfoNo: newStaffMessage.newInput2,
                        studentInfoPhone:newStaffMessage.newInput4,
                        studentInfoPolitics:newStaffMessage.selectValue2,
                        studentInfoSex:newStaffMessage.selectValue1,
                        studentInfoNation:newStaffMessage.selectValue3,
                        classId:numbers.test(newStaffMessage.selectValue7)?newStaffMessage.selectValue7:newStaffMessage.classId,
                        roomId:numbers.test(newStaffMessage.selectValue10)?newStaffMessage.selectValue10:newStaffMessage.roomId, 
                        bedId:numbers.test(newStaffMessage.selectValue11)?newStaffMessage.selectValue11:newStaffMessage.bedId,                             
                        // parentMsg:`${newStaffMessage.parentId},${newStaffMessage.newInput6},${newStaffMessage.newInput7},${newStaffMessage.newInput8},${newStaffMessage.selectValue12},${newStaffMessage.newInput9},${newStaffMessage.patriarchInfoImg}`,
                        // parentMsgOne:`${newStaffMessage.newInput10==''?0:newStaffMessage.parentId2},${newStaffMessage.newInput10==''?0:newStaffMessage.newInput10},${newStaffMessage.newInput11},${newStaffMessage.newInput12},${newStaffMessage.selectValue13},${newStaffMessage.newInput13},${newStaffMessage.patriarchInfoImg2}`,
                        studentInfoIdnum:newStaffMessage.newInput5,
                        studentInfoImg:newStaffMessage.teacherInfoImg,                    
                    },                          
                    picture_parent_one:newStaffMessage.picture_parent_one,
                    picture_parent_two:newStaffMessage.picture_parent_two,
                    picture_student:newStaffMessage.picture_student,
                    picture_parent_one_name:newStaffMessage.picture_parent_one_name,
                    picture_parent_two_name:newStaffMessage.picture_parent_two_name,
                    picture_student_name:newStaffMessage.picture_student_name,
                    parentMsg:{
                        parentIdnum:newStaffMessage.newInput9,
                        parentImg:newStaffMessage.patriarchInfoImg,
                        parentName:newStaffMessage.newInput6,
                        parentPhone:newStaffMessage.newInput7,
                        parentRelationship:newStaffMessage.newInput8,
                        parentSex:newStaffMessage.selectValue12,
                        parentId:newStaffMessage.parentId
                    },
                    parentMsgOne:{
                        parentIdnum:newStaffMessage.newInput13,
                        parentImg:newStaffMessage.patriarchInfoImg2,
                        parentName:newStaffMessage.newInput10,
                        parentPhone:newStaffMessage.newInput11,
                        parentRelationship:newStaffMessage.newInput12,
                        parentSex:newStaffMessage.selectValue13,
                        parentId:newStaffMessage.parentId2
                    }
                    
                }).then(res=>{
                    console.log('编辑学生',res)
                       this.fullscreenLoading=false
                        if(res.status==200&&res.data.code==200){
                        this.$message({message: '修改成功' ,type:'success'}); 
                        this.queryStudents()
                        this.newVisible=false
                    }else{
                        this.$message({message: '修改失败 '+res.data.msg });
                    }
                })  
            },
            //修改其他人
              updateOtherPeoples(newStaffMessage){
                    let value=/^[0-9]*$/
                    let manageFloor=[]
                    newStaffMessage.patriarch.forEach(data=>{
                        if(data.value2==''){
                            return
                        }
                        else if(value.test(data.value2)){
                            manageFloor.push(data.value2)
                        }
                        else{
                                manageFloor.push(data.value3)
                        }
                    })
                updateOtherPeople({
                    outorcomefloor:manageFloor.join(','),
                    otherPeopleInfoImg:newStaffMessage.picture_student,
                    otherPeopleInfoImgName:newStaffMessage.picture_student_name,
                    otherPeopleInfo:{
                        otherPeopleInfoName: newStaffMessage.newInput1,
                        otherPeopleInfoNative:newStaffMessage.newInput3,
                        otherPeopleInfoDepartment:newStaffMessage.newInput33,
                        otherPeopleInfoNo: newStaffMessage.newInput2,
                        otherPeopleInfoPhone:newStaffMessage.newInput4,
                        otherPeopleInfoPolitics:newStaffMessage.selectValue2,
                        otherPeopleInfoSex:newStaffMessage.selectValue1,
                        otherPeopleInfoNation:newStaffMessage.selectValue3,                                          
                        otherPeopleInfoIdnum:newStaffMessage.newInput5,
                        otherPeopleInfoImg:newStaffMessage.teacherInfoImg,
                        otherPeopleInfoId:newStaffMessage.userInfoId,
                    }
                }).then(res=>{
                    console.log('修改其他',res)
                       if(res.status==200&&res.data.code==200){
                            this.$message({message: '修改成功' ,type:'success'}); 
                            this.queryOtherPeoples()
                            this.newVisible=false
                        }else{
                            this.$message({message: '修改失败 '+res.data.msg });
                        }
                })
            },
            //修改黑名单
            updateBlacklists(newStaffMessage,fileList){
                let img=[]
                console.log(fileList)
                fileList.forEach((data)=>{
                    if(data.raw){
                        return
                    }else{
                        img.push(data.url)
                    }
                })
                updateBlacklist({
                blacklist:{
                    blacklistName:newStaffMessage.blacklistName,
                    blacklistInfo:newStaffMessage.blacklistInfo,
                    blacklistId:newStaffMessage.userInfoId,
                    blacklistImg:img.join(',')
                },
                pictureBase:newStaffMessage.pictureBase,
                pictureName:newStaffMessage.pictureName,
            }).then(res=>{
                    console.log('修改黑名单',res)
                       if(res.status==200&&res.data.code==200){
                            this.$message({message: '修改成功' ,type:'success'}); 
                            this.newVisible=false
                            this.queryBlacklists()
                        }else{
                            this.$message({message: '修改失败 '+res.data.msg });
                        }
                })
            },
            //编辑保存
            editSave(newStaffMessage,fileList){
                 let phone=/^1[3456789]\d{9}$/,
                    name=/^[\u4e00-\u9fa5 ]{2,20}$/,
                    name2=/^[a-zA-Z\/ ]{2,20}$/,
                    gonghao=/^\w{1,16}$/,
                    reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    numbers=/^[0-9]*$/;
                if(this.activeName=='黑名单库'){
                    if(newStaffMessage.blacklistName==''){
                        this.$message({message: '请输入姓名！' })
                        return 
                    }
                   this.updateBlacklists(newStaffMessage,fileList)
                }
                else if(
                    newStaffMessage.newInput1==''||
                    newStaffMessage.newInput2==''||
                    newStaffMessage.newInput4==''||
                    newStaffMessage.newInput5==''||
                    newStaffMessage.selectValue1==''){
                    this.$message({message: '修改信息不能为空' });
                    }
                else if(!name.test(newStaffMessage.newInput1)){
                        this.$message({message: '姓名请输入汉字！'});
                }
                else if(!gonghao.test(newStaffMessage.newInput2)){
                        this.$message({message: '学号或工号 请输入字母或数字！'});
                }   
                else if(!phone.test(newStaffMessage.newInput4)){
                        this.$message({message: '请输入11位数字手机号码'});
                }
                else if(!reg.test(newStaffMessage.newInput5)){
                        this.$message({message: '身份证号码格式不对'});
                }                          
                else if(this.activeName=='学生'){
                    console.log('编辑学生',newStaffMessage)
                     if(newStaffMessage.picture_student==''&&newStaffMessage.teacherInfoImg==''){
                        this.$message({message:'请上传头像'});
                    }
                    else if(newStaffMessage.selectValue7==null){
                        this.$message({message:'班级不能为空'});
                    }
                    else if(newStaffMessage.selectValue10==null||newStaffMessage.selectValue11==null){
                        this.$message({message:'房间或床位不能为空'});
                    }
                    else if(
                        newStaffMessage.newInput6==''||
                        newStaffMessage.newInput7==''                      
                       ){
                        this.$message({message: '请输入家长1姓名或电话' });
                    }
                    else if(!name.test(newStaffMessage.newInput6)){
                        this.$message({message: '家长姓名请输入汉字！'});
                    }
                    else if(!phone.test(newStaffMessage.newInput7)){
                        this.$message({message: '家长手机号码格式不对'});
                    }
                    else if(newStaffMessage.newInput10!=''){
                        if(
                        newStaffMessage.newInput10==''||
                        newStaffMessage.newInput11==''
                       ){
                            this.$message({message: '请输入家长2姓名或电话' });
                        }else{
                            this.updateStudentInfos(newStaffMessage)
                        }
                        
                    }
                    else{                         
                         this.updateStudentInfos(newStaffMessage)                       
                    }  
                       
                }
                else if(this.activeName=='宿管'){
                    console.log('编辑宿管',newStaffMessage)
                      let value=/^[0-9]*$/
                        let manageFloor=[]
                        newStaffMessage.patriarch.forEach(data=>{
                            if(data.value2==''){
                                return
                            }
                            else if(value.test(data.value2)){
                                manageFloor.push(data.value2)
                            }
                            else{
                                 manageFloor.push(data.value3)
                            }
                        })
                     
                         this. updateHousemasterInfos(newStaffMessage,manageFloor)
                     
                  
                }
                else if(this.activeName=='辅导员'){
                    console.log('编辑辅导员',newStaffMessage)
                    if( newStaffMessage.classManagement[0].value4==''){
                         this.$message({message:'请至少选择1个管理班级！'});
                    }
                    else if(newStaffMessage.teacherInfoImg==''&&newStaffMessage.picture_student==''){
                        this.$message({message:'上传头像不能空'});
                    }  
                    else{
                        let value=/^[0-9]*$/
                        let classId=[]
                        newStaffMessage.classManagement.forEach(data=>{
                            if(data.value4==''){
                                return
                            }
                            else if(value.test(data.value4)){
                                classId.push(data.value4)
                            }
                            else{
                                 classId.push(data.value5)
                            }
                        })
                                                             
                        this.newVisible=false
                        this.updateTeacherInfos(newStaffMessage,classId)                                                    
                                              
                        // updateTeacherInfo()teacherInfoImg
                    }
                }
                else if(this.activeName=='其他'){
                    this.updateOtherPeoples(newStaffMessage)
                    console.log('编辑其他',newStaffMessage)
                }
               
            },
            //删除
            handleDelete(scope,row){                 
                if(this.activeName=='学生'){
                    console.log('删除学生',row)
                      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                            deleteStudentInfo({
                                studentInfoId:row.studentInfoId ,
                                studentInfoImg:row.studentInfoImg
                                }).then(res=>{
                                if(res.status==200&&res.data.code==200){
                                    this.queryStudents()
                                    this.$message({type: 'success',message: '删除成功!'});
                                }else{
                                    this.$message({                                           
                                        message: '删除失败'+res.data.msg
                                    });
                                }
                            })
                            
                        })  
                }
                else if(this.activeName=='宿管'){
                     console.log('删除宿管',row)
                      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteHousemasterInfo({
                                    housemasterInfoId :row.housemasterInfoId,
                                    housemasterInfoImg :row.housemasterInfoImg
                                    }).then(res=>{
                                    console.log('删除辅导员',res)
                                    if(res.status==200&&res.data.code==200){
                                        this.queryHousemasterInfoByTerms()                                                                          
                                        this.$message({type: 'success',message: '删除成功!'});
                                    }else{
                                        this.$message({                                           
                                            message: '删除失败'+res.data.msg
                                        });
                                    }
                                })
                               
                            })  
                }
                else if(this.activeName=='辅导员'){
                      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                  deleteTeacher({
                                      TeacherInfoId:row.teacherInfoId,
                                      classId:row.classId,
                                      teacherInfoImg:row.teacherInfoImg
                                      }).then(res=>{
                                    console.log('删除单个辅导员',res)
                                    if(res.status==200&&res.data.code==200){
                                        this.$message({message: '删除成功' ,type:'success'})
                                        this.queryTeacherInfoByTerms()
                                    }else{
                                         this.$message({message: '删除失败'+res.data.msg})
                                    }
                                })                             
                            })   
                   
                }
                 else if(this.activeName=='其他'){
                     console.log('删除其他',scope,row)
                      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                  deleteOtherPeople({
                                      otherPeopleInfoId :row.otherPeopleInfoId ,
                                     
                                      }).then(res=>{
                                    console.log('删除单个其他',res)
                                    if(res.status==200&&res.data.code==200){
                                        this.$message({message: '删除成功' ,type:'success'})
                                        this.queryOtherPeoples()
                                    }else{
                                         this.$message({message: '删除失败'+res.data.msg})
                                    }
                                })                             
                            })   
                }
                 else if(this.activeName=='黑名单库'){
                     console.log('删除黑名单库',scope,row)
                     this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteBlacklist({
                                    blacklistId:row.blacklistId,
                                    
                                    }).then(res=>{
                                console.log('删除单个黑名单',res)
                                if(res.status==200&&res.data.code==200){
                                    this.$message({message: '删除成功' ,type:'success'})
                                     this.queryBlacklists()
                                }else{
                                        this.$message({message: '删除失败'+res.data.msg})
                                }
                            })                             
                        })   
                }
            },
             //分页弹出框
            handleSizeChange2(val) {
                console.log(`每页 ${val} 条`);
                    this.pageSize=val
                    if(this.activeName=='学生'){
                        this.queryStudents()
                    }
                    else if(this.activeName=='宿管'){
                         this.queryHousemasterInfoByTerms()                                                                          
                    }
                    else if(this.activeName=='辅导员'){
                        this.queryTeacherInfoByTerms()                             
                    }
                    else if(this.activeName=='其他'){
                        this.queryOtherPeoples()
                    }
                    else if(this.activeName=='黑名单库'){
                        this.queryBlacklists()
                    }
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val   
                if(this.activeName=='学生'){
                    this.queryStudents()
                }
                else if(this.activeName=='宿管'){
                      this.queryHousemasterInfoByTerms()   
                }
                else if(this.activeName=='辅导员'){
                    this.queryTeacherInfoByTerms()                             
                }
                 else if(this.activeName=='其他'){
                     this.queryOtherPeoples()
                }
                 else if(this.activeName=='黑名单库'){
                     this.queryBlacklists()
                }
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.staffManage{
    flex: 1;
    padding:50px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .ClassManage-top{
        min-height:150px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        padding-top:20px;
        h4{
            color: $haedColor;
            border-left: 2px solid $bcgColor;
            padding-left: 10px;
            margin-bottom: 10px;
        }
        .collegeNmaeBox{
            display: flex;
            width: 100%;
            min-height:32px;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
        }
        .collegeNmae{
            display: flex;
            min-height:32px;
            align-items: center;
            
        }
        .collegeNmae2{
            margin-right: 10px;
            display: flex;
        }
        .spanName{
            color: $haedColor;
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
            overflow: auto;  
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
              .imgBox{
                height:50px;
                width:50px;
                overflow: hidden;
                border-radius:50%;
                display: flex;
                align-items: center;
                .img{
                max-height:100%;
                width:100%;
                border-radius:50%;
                }
            }
        }
        .operate{
            position:absolute;
            left:-17px;
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






