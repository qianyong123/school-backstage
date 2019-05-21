<template>
  <div class="ClassManage" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>班级管理</h4>
            <div style="flex:1;font-size:14px;">
                <el-tabs style="height:100%;width:100%;"  v-model="activeName" @tab-click="handleClick">                  
                <el-tab-pane label="学院管理" name="学院管理">
                    <div class="collegeNmaeBox">
                        <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(1)"></el-button>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(1)"></el-button>                               
                            </div>
                             <el-upload
                                class="upload-demo"
                                style="margin-right:10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"                           
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="1"
                                :auto-upload='false'                            
                                :file-list="fileList">
                                 <el-button size="small" icon="el-icon-download"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                            <el-input
                            placeholder="学院名"
                            v-model="referName1"
                            style="width:130px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="referData(1)" size="small">查询</el-button>
                        </div>
                       
                        <el-button @click="outExcelStudents" size="small" icon="el-icon-upload2"></el-button> 
                     </div>
                </el-tab-pane>
                <el-tab-pane label="专业管理" name="专业管理">
                    <div class="collegeNmaeBox">
                        <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(2)"></el-button>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(2)"></el-button>                       
                            </div> 
                            <span class="spanName">学院:</span>
                             <el-select style="width:130px;margin:0 10px;" @change="handcollegeQuery1" v-model="collegeValue" placeholder="请选择">
                                <el-option                                   
                                :label="'全部'"                            
                                :value="''">
                                </el-option>
                                <el-option
                                v-for="(item,index) in allCollege"
                                :key="index"
                                :label="item.college_name"                            
                                :value="item.college_name">
                                </el-option>
                            </el-select>
                            <el-input
                            placeholder="专业名"
                            v-model="referName2"
                            style="width:130px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="referData(2)" size="small">查询</el-button>
                        </div>
                        
                    </div>                  
                </el-tab-pane>
                <el-tab-pane label="年级管理" name="年级管理">
                    <div class="collegeNmaeBox">
                      <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(3)"></el-button>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(3)"></el-button>                       
                            </div> 
                            <el-input
                            placeholder="年级名"
                            v-model="referName3"
                            style="width:130px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="referData(3)" size="small">查询</el-button>
                        </div>
                        
                    </div>
                </el-tab-pane>
                <el-tab-pane label="班级管理" name="班级管理">
                    <div class="collegeNmaeBox">
                        <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(4)"></el-button>
                                <el-button size="small" icon="el-icon-delete"  @click="deleteDate(4)"></el-button>                       
                            </div> 
                            <span class="spanName">学院:</span>
                             <el-select style="width:130px;margin:0 10px;" @change="handcollegeQuery2" v-model="collegeValue2" placeholder="请选择">
                               <el-option                                   
                                :label="'全部'"                            
                                :value="''">
                                </el-option>
                                <el-option
                                v-for="(item,index) in allCollege"
                                :key="index"
                                :label="item.college_name"                            
                                :value="item.college_name">
                                </el-option>
                            </el-select>                          
                             <span class="spanName">专业:</span>
                             <el-select style="width:130px;margin:0 10px;" @change="handmajorQuery1" v-model="majorValue" placeholder="请选择">
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
                             <span class="spanName">年级:</span>
                             <el-select style="width:130px;margin:0 10px;" @change="handclassQuery1" v-model="classValue" placeholder="请选择">
                                <el-option                                   
                                :label="'全部'"                            
                                :value="''">
                                </el-option>
                                <el-option
                                v-for="(item,index) in allClass"
                                :key="index"
                                :label="item.year_name"                            
                                :value="item.year_name">
                                </el-option>
                            </el-select>
                            <el-input
                            placeholder="班级名"
                            v-model="referName4"
                            style="width:130px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="referData(4)" size="small">查询</el-button>
                        </div>
                        <el-button size="small" icon="el-icon-setting" @click="setTime()"></el-button>                          
                    </div> 
                </el-tab-pane>
            </el-tabs>
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
                    
                    <el-table-column label="操作" v-if="navjurisdiction()" width="80">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p  v-if="activeName=='班级管理'" @click="setTime(scope.row)">设置</p>
                                    <p @click="handleEdit(scope, scope.row)">编辑</p>
                                    <p @click="handleDelete(scope.$index, scope.row)">删除</p>                                  
                                </div>
                            </div>
                            <!-- <el-button
                            size="mini"
                            v-if="activeName=='班级管理'"
                            @click="setTime(scope.row)">设置</el-button>
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <paginations     
            @handleCurrentChange='handleCurrentChange'
            :total='total'
            :activeName='activeName'
            ></paginations>
        </div>

        <!-- 新增弹框 -->
        <el-dialog
        :title="popupTitle"
        :visible.sync="newVisible"
        width="300px"
        center>
        <div v-if="newName==1" class="newclass">
            <div>
                <span style="margin-right:10px;">学院名</span>
                <el-input
                    placeholder="学院名"
                    v-model="newCollegeNmae"
                    style="width:150px;"
                    >
                </el-input>
            </div>           
        </div>
         <div v-else-if="newName==2" class="newclass newclass2">
            <div v-if="popupTitle=='新增'">
                <span  class="span">所属学院</span>
                  <el-select style="width:150px;" v-model="newCollegeValue" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in allCollege"
                    :key="index"
                    :label="item.college_name"                            
                    :value="item.college_name">
                    </el-option>
                </el-select> 
            </div>  
            <div v-else>
                <span  class="span">所属学院</span>
                  <el-select style="width:150px;" v-model="newCollegeId" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in allCollege"
                    :key="index"
                    :label="item.college_name"                            
                    :value="item.college_id">
                    </el-option>
                </el-select> 
            </div> 
             <div style="margin-top:10px;">
                <span class="span">专业名称</span>
                <el-input
                    placeholder="专业名称"
                    v-model="newCollegeNmae"
                    style="width:150px;"
                    >
                </el-input>
            </div>          
        </div>
         <div v-else-if="newName==3" class="newclass">
            <div>
                <span style="margin-right:10px;">年级名</span>
                <el-input
                    placeholder="2018级"
                    v-model="newCollegeNmae"
                    style="width:150px;"
                    clearable>
                </el-input>
            </div>           
        </div>
         <div v-else-if="newName==4" class="newclass newclass3">
            <div>
                <span  class="span">所属学院</span>
                  <el-select style="width:150px;" @change="handclassNew1" v-model="newCollegeValue2" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in allCollege"
                    :key="index"
                    :label="item.college_name"                            
                    :value="item.college_name">
                    </el-option>
                </el-select> 
            </div>  
            <div style="margin-top:10px;">
                <span  class="span">所属专业</span>
                  <el-select style="width:150px;" @change="handGradeNew1" v-model="newGradeValue" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in allMajor2"
                    :key="index"
                    :label="item.major_name"                            
                    :value="item.major_name">
                    </el-option>
                </el-select> 
            </div> 
              <div style="margin-top:10px;">
                <span  class="span">所属年级</span>
                  <el-select style="width:150px;" v-model="newclassValue" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in allClass"
                    :key="index"
                    :label="item.year_name"                            
                    :value="item.year_name">
                    </el-option>
                </el-select> 
            </div> 
             <div style="margin-top:10px;">
                <span  class="span">班级数</span>
                <el-input
                    placeholder="班级数"
                    v-model="newClassAmount"
                    style="width:150px;"
                    type="number"
                    >
                </el-input>
            </div>          
        </div>
        <div v-else-if="newName==5" class="newclass">
            <div>
                <span class="span">班级名</span>
                <el-input
                    placeholder="2018级"
                    v-model="EditCollegeNmae"
                    style="width:150px;"
                    clearable>
                </el-input>
            </div>           
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button v-if="popupTitle=='新增'" type="primary" @click="newSave" size="small">确 定</el-button>
            <el-button v-else type="primary" @click="updataClass" size="small">确定</el-button>
            <el-button @click="newVisible = false" size="small">取 消</el-button>
        </span>
        </el-dialog>
        <!-- 设置弹框-->
        <el-dialog
        title="设置打卡时间"
        :visible.sync="setVisible"
        width="720px"
        center>
        <div class="setVisibles">
            <div class="time1" style="padding-right:20px;">
                <div class="time-top">             
                    <div>
                        <!-- <span style="margin-right:10px;">从</span> -->
                        <el-date-picker
                            v-model="timevalue1"
                            type="date"
                            placeholder="选择日期"
                            style="width:140px"
                            format="yyyy-MM-dd "
                            value-format="timestamp">
                            </el-date-picker>
                            <span>-</span>
                             <el-date-picker
                            v-model="timevalue2"
                            type="date"
                            placeholder="选择日期"
                            style="width:140px;margin-right:10px;"
                            format="yyyy-MM-dd"
                            value-format="timestamp">
                            </el-date-picker>
                    </div>
                    <div>                                  
                         <el-button @click="addTimes" style="margin:10px 0;background:rgba(226,226,226,1);border:rgba(226,226,226,1);color:#fff;" size="small">添加打卡时间</el-button>
                    </div>
                    <div>
                        <el-checkbox v-model="timechecked">智能避开法定节假日</el-checkbox>
                        <el-checkbox v-model="timechecked2">智能避开周末</el-checkbox>
                    </div>
                    <p style="margin-top:15px;font-size:14px;line-height:20px;">
                        <span style="color:#f00;">*注:</span>
                        <span>智能避开后，从假期前一天至收假前一天，关于学生的“未归”、“晚归”、“无记录”等不做分析</span>
                    </p>
                 </div>
               <ul>
                   <li>打卡时间</li>
                   <li v-for="(item,index) in timeList" :key="index">
                       <div>{{times1(item.timevalue1)}}~{{times1(item.timevalue2)}}</div>
                   </li>
                   <!-- <li>{{times1(timevalue1)}}~{{times1(timevalue2)}}</li> -->
               </ul>
            </div>
            <div class="time1 time2">
                 <div class="time-top" style="height:90px;">             
                    <div>
                        <el-date-picker
                            v-model="timevalue3"
                            type="date"
                            placeholder="选择日期"
                            style="width:140px"
                            format="yyyy-MM-dd "
                            value-format="timestamp">
                            </el-date-picker>
                            <span>-</span>
                            <el-date-picker
                            v-model="timevalue4"
                            type="date"
                            placeholder="选择日期"
                            style="width:140px;margin-right:10px;"
                            format="yyyy-MM-dd"
                            value-format="timestamp">
                            </el-date-picker>
                    </div>
                    <div>                      
                        <el-button @click="addTimes2" style="margin:10px 0;background:rgba(226,226,226,1);border:rgba(226,226,226,1);color:#fff;" size="small">添加不打卡时间</el-button>
                    </div>                                   
                 </div>
               <ul>
                   <li>不打卡时间</li>
                   <li v-for="(item,index) in timeList2" :key="index">
                       <div>{{times1(item.timevalue3)}}~{{times1(item.timevalue4)}}</div>
                   </li>
               </ul>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="setTimes" size="small">确 定</el-button>
            <el-button @click="setVisible = false" size="small">取 消</el-button>
        </span>
        </el-dialog>

  </div>
</template>

<script>
import Paginations from './Paginations'
import {formatDate} from '../../js/date.js'
import bus from '../../js/bus.js'
import {
    addCollege,
    deleteCollege,
    queryCollegeByName,
    addMajor,
    queryMajorByTerm,
    deleteMajor,
    addClassInfo,
    queryAllCalss,
    deleteClassInfo,
    addYear,
    queryByYearName,
    deleteYear,
    updataCollege,
    updataMajor,
    updataYear,
    updataClassInfo,
    queryMenuById,
    saveCollegeExcelAll,
    outCollegeExcel
} from '@/axios/api.js'
const collegeList=[
            {name:'学院名',props:'college_name'},      
            {name:'专业数',props:'major_num'},
            {name:'班级数',props:'class_num'},
            {name:'辅导员人数',props:'instructor_num'},    
            {name:'学生人数',props:'student_num'},      
        ]
const majorList=[
            {name:'专业名',props:'major_name'},      
            {name:'班级数',props:'class_num'},                       
            {name:'辅导员人数',props:'instructor_num'}, 
            {name:'学生人数',props:'student_num'}, 
            {name:'所属学院',props:'college_name'}, 
        ]
const gradeList=[
            {name:'年级名',props:'year_name'},      
            {name:'辅导员人数',props:'instructor_num'}, 
            {name:'学生人数',props:'student_num'}, 
        ]
    const classList=[
        {name:'班级',props:'class_name'},      
        {name:'辅导员资料',props:'teacher_msg'},                       
        {name:'学生人数',props:'student_num'}, 
        {name:'所在年级',props:'year_name'}, 
        {name:'所属专业',props:'major_name'}, 
        {name:'所属学院',props:'college_name'}, 
    ]
    export default {
        name:"ClassManage",
        components:{
          Paginations
        },
        data(){
            return{
                activeName:"学院管理",
                classId:null,//班级编辑的id
                deleteId:null,//操作id
                loading:true,
                newName:'',
                 total:0,
                 pageSize:10,
                 pageNum:1,    
                  roleInfoMenu:[],
                roleId:null,       
                newVisible:false,//新增弹框
                setVisible:false,//设置弹框
                //打卡时间
                timevalue1:null,
                timevalue2:null,
                timevalue3:null,
                timevalue4:null,
                timechecked:false,
                timechecked2:false,
                timeList:[],
                timeList2:[],
                //查询
                collegeValue:'',//学院下拉框
                collegeValue2:'',//学院下拉框2
                majorValue:'',//专业下拉框
                classValue:'',//年级下拉框
                referName1:'',//学院名
                referName2:'',//专业名
                referName3:'',//年级名
                referName4:'',//班级名
                //学院
                allCollege: [
              
                ],
                //所有专业
                 allMajor: [
               
                ],
                //所有年级
                 allClass: [
               
                ],
                popupTitle:'',//弹出框标题
                //弹框新增属性
                newCollegeNmae:'',//学院名
                // newGradeNmae:'',//专业名
                 newclassValue:'',//年级名
                newClassAmount:null,//班级数
                newCollegeValue:null,
                newCollegeValue2:null,
                newCollegeId:null,//编辑学院id
                newGradeValue:'',
                 //所有专业
                allMajor2: [
                
                ],
                //所有年级
                 allClass2: [
                
                ],
                //编辑弹框
                EditCollegeNmae:'',//编辑班级名

                dataHeader:[],//表格头部                         
                value: '',
                multipleSelection: [],
                //表格数据
                tableData: [ 
                                
                ],
                fileList:[]
            }
        },
        mounted() {
            this.dataHeader=collegeList
            this.loading=false
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
        },
         created() {
            this.queryCollegeByNames()
            this.queryByYearNames2()
            //全部学院    
            this.roleInfoMenu=this.$store.state.roleInfoMenu
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
        computed: {
            times1(){
                return function(date){ 
                    if(date){
                        return formatDate(new Date(date), 'yyyy/MM/dd')                        
                    }  else{
                        return ''
                    }          
                }
            },
             navjurisdiction(){
                return function(){
                    if(this.roleId==1){
                        return true
                    }
                     else if(this.roleInfoMenu.length<1){
                        return true
                    }
                    else{
                        return this.roleInfoMenu[9].indexOf('10')==-1?false:true
                    }
                    
                }
            },
        },
        methods: {
            //切换top
            handleClick(tab, event) {
                console.log(tab);
                this.multipleSelection=[]
                this.tableData=[]
                this.$refs.multipleTable.clearSelection();
                this.activeName=tab.label
                this.pageNum=1
                this.total=0
                if(tab.index=='0'){
                    this.dataHeader=collegeList
                    this.queryCollegeByNames()
                }
                else if(tab.index=='1'){
                    this.dataHeader=majorList
                    this.queryMajorByTerms()
                }
                  else if(tab.index=='2'){
                    this.dataHeader=gradeList
                    this.queryByYearNames()
                }
                  else if(tab.index=='3'){
                    this.dataHeader=classList
                    this.queryAllCalsss()
                }
            },
            //导入
            handleAvatarSuccess(){
                 console.log(file)
                 let fd = new FormData();
                fd.append('file',file.raw);//传文件
                this.fileList=[]
              
                    // saveCollegeExcelAll(fd).then(res=>{
                    //     if(res.data.code==200&&res.data.data==''){
                    //            saveExcelAllStudent(fd).then(res2=>{
                    //             if(res2.data.code==200){
                    //                 this.$message({message:'导入成功',type:'success'}); 
                    //                 this.queryStudents()
                    //             }else{
                    //                 this.$message({message:'导入失败' +res2.data.msg}); 
                    //             }
                    //         })
                    //     }else{
                    //         this.$message({message:'导入失败' +res.data.data}); 
                    //     }

                    // })
                
            },
            //导出处理
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
                if(this.multipleSelection.length<1){
                    this.$message('请选择要导出的数据')
                }
                else{               
                     outCollegeExcel({jsonObject:this.multipleSelection}).then(res=>{
                             if(res.status==200&&res.data!=null){
                                this.blobs(res.data,'学院.xls')
                            }else{
                                this.$message('导出失败',res.data.msg)
                            }
                        })
                }
                
             },
              //点击操作
            clickOperate(scope,row){
                this.deleteId=scope.$index
            },
            //添加打卡时间
            addTimes(){
                if(this.timevalue1!=null&&this.timevalue2!=null){
                   this.timeList.push({timevalue1:this.timevalue1,timevalue2:this.timevalue2})
                   this.timevalue1=null
                   this.timevalue2=null
                }else{
                     this.$message({message:'设置打卡时间不能为空'});
                }
            },
            //添加不打卡时间
            addTimes2(){
                if(this.timevalue3!=null&&this.timevalue4!=null){
                   this.timeList2.push({timevalue3:this.timevalue3,timevalue4:this.timevalue4})
                    this.timevalue3=null
                   this.timevalue4=null
                }else{
                     this.$message({message:'设置不打卡时间不能为空'});
                }
            },
            //设置打卡时间
            setTimes(){
                this.setVisible=false
            },
            //查询全部学院
            queryCollegeByNames2(){
                 this.loading=true
                  queryCollegeByName({collegeName:'', pageNum:0,pageSize:0}).then(res=>{
                    console.log('全部学院2',res)
                    this.loading=false
                    if(res.status==200&&res.data.code==200){
                            this.allCollege=res.data.data               
                        }
                })
            },
             //查询全部年级
             queryByYearNames2(){   
                  this.loading=true  
                queryByYearName({YearName :'', pageNum :0,pageSize :0}).then(res=>{
                    console.log('查询全部年级',res)
                    this.loading=false
                    if(res.status==200&&res.data.code==200){
                        this.allClass=res.data.data.list
                        
                    }
                })
            },
            //查询学院
            queryCollegeByNames(){
                this.loading=true
                this.queryCollegeByNames2()
                queryCollegeByName({collegeName:this.referName1, pageNum :this.pageNum ,pageSize :this.pageSize }).then(res=>{
                    console.log('查询学院',res)
                        this.loading=false
                    if(res.status==200&&res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total
                    }
                })
            },
            //查询专业
            queryMajorByTerms(){
                this.loading=true
                 queryMajorByTerm({collegeName:this.collegeValue,MajorName:this.referName2,pageNum :this.pageNum ,pageSize :this.pageSize }).then(res=>{
                    console.log('查询专业',res)
                    this.loading=false
                    if(res.status==200&&res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total
                    }
                })
            },
              //查询年级
            queryByYearNames(){
                this.loading=true
                queryByYearName({YearName :this.referName3, pageNum :this.pageNum ,pageSize :this.pageSize }).then(res=>{
                    console.log('查询年级',res)
                    if(res.status==200&&res.data.code==200){
                        let list=res.data.data.list
                        this.queryByYearNames2()
                        // list.forEach((data,index)=>{
                        //     list[index].instructor_name=data.instructor_name +data.instructor_phone
                        // })
                        this.tableData=list
                        this.total=res.data.data.total
                        this.loading=false
                    }
                })
            },
              //查询班级
            queryAllCalsss(){
                this.loading=true
                   queryAllCalss({
                    collegeName:this.collegeValue2,
                    majorName:this.majorValue,
                    yearName:this.classValue,
                    className:this.referName4,
                    pageNum :this.pageNum ,
                    pageSize :this.pageSize 
                    }).then(res=>{
                    console.log('查询班级',res)
                     if(res.status==200&&res.data.code==200){
                        this.tableData=res.data.data.list
                        this.total=res.data.data.total
                        this.loading=false
                    }                     
                })
            },
            //查询
            referData(id){   
                this.pageNum=1
                if(id==1){
                    console.log(`查询${id}`,this.referName1)
                    this.queryCollegeByNames()
                }
                else if(id==2){
                     console.log(`查询${id}`,this.collegeValue,this.referName2)
                     this.queryMajorByTerms()
                }
                else if(id==3){
                     console.log(`查询${id}`,this.referName3)
                      this.queryByYearNames()
                }
                 else if(id==4){
                     console.log(`查询${id}`,this.collegeValue2,this.majorValue,this.classValue,this.referName4)
                    this.queryAllCalsss()
                }
            },
            //新增
            newly(id){
                console.log(id)
                this.popupTitle='新增'
                this.newVisible=true
                this.newName=id
                this.newCollegeNmae=''
                this.newClassAmount=null        
                this.newCollegeValue=null
                this.newCollegeValue2=null
                this.newGradeValue=''
                this.newclassValue=''
            },
            //新增确认
            newSave(){
                if(this.newName==1){
                    if(this.newCollegeNmae!=''){
                        addCollege({collegeName:this.newCollegeNmae}).then(res=>{
                            console.log('新增学院',res)
                            if(res.status==200&&res.data.code==200){
                                this.newVisible=false
                                 this.queryCollegeByNames()
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'            
                                }); 
                            }else{
                                this.$message({
                                    message:'新增失败'+res.data.msg,                                          
                                }); 
                            }
                        })
                    }else{
                        this.$message({
                            message:'新增信息不能为空！',                                          
                        }); 
                    }
                  
                }
                else if(this.newName==2){
                    if(this.newCollegeNmae!=''&&this.newCollegeValue!=null){
                        addMajor({
                            collegeName:this.newCollegeValue,
                            MajorName:this.newCollegeNmae}).then(res=>{
                            if(res.status==200&&res.data.code==200){
                                this.newVisible=false
                                this.queryMajorByTerms()
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'            
                                }); 
                            }else{
                                 this.$message({
                                    message:'新增失败'+res.data.msg                                          
                                }); 
                            }
                        })
                    }else{
                        this.$message({
                            message:'新增信息不能为空',                                          
                        }); 
                    }
                    
                }
                 else if(this.newName==3){   
                     if(this.newCollegeNmae!=''){
                        addYear({                          
                            YearName:this.newCollegeNmae}).then(res=>{
                            if(res.status==200&&res.data.code==200){
                                 this.newVisible=false
                                 console.log('新增年级',res)
                                 this.queryByYearNames()
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'            
                                }); 
                            }else{
                                 this.$message({
                                    message:'新增失败'+res.data.msg                                          
                                }); 
                            }
                        })
                    }else{
                        this.$message({
                            message:'新增信息不能为空',                                          
                        }); 
                    }
                }
                 else if(this.newName==4){
                    console.log('新增班级',this.newClassAmount,this.newCollegeValue2,this.newGradeValue)
                    if(this.newCollegeValue2!=null&&this.newGradeValue!=''&&this.newClassAmount!=null&&this.newclassValue!=''){
                        addClassInfo({                           
                            collegeName:this.newCollegeValue2,
                            majorName:this.newGradeValue,
                            yearName:this.newclassValue,
                            classnum :parseInt(this.newClassAmount)
                        }).then(res=>{
                            console.log('新增班级',res)
                            if(res.status==200&&res.data.code==200){
                                 this.newVisible=false
                                  this.queryAllCalsss()
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'            
                                }); 
                            }else{
                                 this.$message({
                                    message:'新增失败'+res.data.msg                                          
                                }); 
                            }
                        })
                    }else{
                        this.$message({
                            message:'新增信息不能为空',                                          
                        }); 
                    }
                }
            },
            //删除多个
            deleteDate(id){
                console.log(`删除多个id${id}`,)
                if(id==1){
                    console.log(this.multipleSelection)
                    if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }else{
                        let multipleSelection=[]
                       this.multipleSelection.forEach((data)=>{
                            multipleSelection.push(data.college_id)
                        })
                          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteCollege({collegeId:multipleSelection.join(',')}).then(res=>{
                                    console.log('删除学院',res)
                                    if(res.status==200&&res.data.code==200){
                                        this.queryCollegeByNames()                                      
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
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
                          let multipleSelection=[]
                       this.multipleSelection.forEach((data)=>{
                            multipleSelection.push(data.major_id)
                        })
                          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteMajor({majorId:multipleSelection.join(',')}).then(res=>{
                                    console.log('删除专业',res)
                                    if(res.status==200&&res.data.code==200){
                                        this.queryMajorByTerms()                                      
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
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
                      if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        })     
                    }else{
                        let multipleSelection=[]
                        this.multipleSelection.forEach((data)=>{
                            multipleSelection.push(data.year_id)
                        })
                          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteYear({YearId :multipleSelection.join(',')}).then(res=>{
                                    console.log('删除班级',res)
                                    if(res.status==200&&res.data.code==200){
                                        this.queryByYearNames()                                      
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
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
                        let multipleSelection=[]
                        this.multipleSelection.forEach((data)=>{
                            multipleSelection.push(data.class_id)
                        })
                          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteClassInfo({classId:multipleSelection.join(',')}).then(res=>{
                                    console.log('删除班级',res)
                                    if(res.status==200&&res.data.code==200){
                                        this.queryAllCalsss()                                     
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
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
            //点击查询下拉框
            //学院下拉
            handcollegeQuery1(val){
                console.log(val)
            },
            //学院下拉2
            handcollegeQuery2(val){
                console.log(val)
                this.majorValue=''
                queryMajorByTerm({collegeName:this.collegeValue2,MajorName:'',pageNum :0,pageSize :0 }).then(res=>{
                    console.log('查询专业',res)
                    if(res.status==200&&res.data.code==200){
                        this.allMajor=res.data.data                   
                        this.loading=false
                    }
                })
            },
            //专业下拉
            handmajorQuery1(val){
                console.log(val)
                this.classValue=''
            },
            //年级下拉
            handclassQuery1(val){
                 console.log(val)
            },
            //点击新增下拉框newCollegeValue2
            //学院下拉
            handclassNew1(val){
                console.log(val)
                this.newGradeValue=''
                 queryMajorByTerm({collegeName:this.newCollegeValue2,MajorName:'',pageNum :0,pageSize :0 }).then(res=>{
                    console.log('查询专业',res)
                    if(res.status==200&&res.data.code==200){
                        this.allMajor2=res.data.data                    
                        this.loading=false
                    }
                })
            },
            //专业下拉
             handGradeNew1(val){
                 console.log(val)
            },
            //设置打卡时间
            setTime(){
                this.setVisible=true
            },
            //编辑
            handleEdit(scope,row){
                console.log('编辑',scope,row)
                this.newVisible=true
                this.popupTitle='修改'       
                if(this.activeName=='学院管理'){
                       this.newName=1
                       this.newCollegeNmae=row.college_name   
                       this.classId=row                
                }
                else if(this.activeName=='专业管理'){
                     this.newName=2
                     this.newCollegeNmae=row.major_name
                     this.newCollegeId=row.college_id
                      this.classId=row
                }
                else if(this.activeName=='年级管理'){
                     this.newName=3
                     this.newCollegeNmae=row.year_name    
                      this.classId=row              
                }
                 else if(this.activeName=='班级管理'){
                     this.newName=5
                     this.EditCollegeNmae=row.class_name   
                      this.classId=row         
                     console.log( this.EditCollegeNmae)
                }
            },
            //编辑确认
            updataClass(){
                 this.newVisible=false
                //  if(this.newCollegeNmae==''){
                //      this.$message({message:'修改信息不能为空'}); 
                //  }
                 if(this.activeName=='学院管理'){
                    updataCollege({collegeId:this.classId.college_id,collegeName:this.newCollegeNmae}).then(res=>{
                        console.log('学院管理修改',res)
                        if(res.status==200&&res.data.code==200){
                            this.queryCollegeByNames()                                     
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                        }else{
                            this.$message({                                           
                                message: '修改失败'+res.data.msg
                            });
                        }
                    })                      
                }
                else if(this.activeName=='专业管理'){
                     if(this.newCollegeId==null){
                         this.$message({message:'修改信息不能为空'}); 
                     }else{
                        updataMajor({collegeId:this.newCollegeId,majorId:this.classId.major_id,majorName:this.newCollegeNmae}).then(res=>{
                            console.log('专业管理修改',res)
                              if(res.status==200&&res.data.code==200){
                                this.queryMajorByTerms()                                     
                                    this.$message({
                                        type: 'success',
                                        message: '修改成功'
                                    });
                            }else{
                                this.$message({                                           
                                    message: '修改失败'+res.data.msg
                                });
                            }
                        })  
                     }
                }
                else if(this.activeName=='年级管理'){
                      updataYear({yearId:this.classId.year_id,yearName:this.newCollegeNmae}).then(res=>{
                        console.log('年级管理修改',res)
                          if(res.status==200&&res.data.code==200){
                            this.queryByYearNames()                                     
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                        }else{
                            this.$message({                                           
                                message: '修改失败'+res.data.msg
                            });
                        }
                    })                  
                }
                else if(this.activeName=='班级管理'){                 
                    updataClassInfo({classId:this.classId.class_id,className:this.EditCollegeNmae}).then(res=>{
                    console.log('班级管理修改',res)
                        if(res.status==200&&res.data.code==200){
                            this.queryAllCalsss()                                     
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                        }else{
                            this.$message({                                           
                                message: '修改失败'+res.data.msg
                            });
                        }
                    })  
                    
                }
            },
            //删除
            handleDelete(scope,row){

                if(this.activeName=='学院管理'){
                      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteCollege({collegeId:row.college_id}).then(res=>{
                                    console.log('删除学院',res)
                                    if(res.status==200&&res.data.code==200){
                                        this.queryCollegeByNames()
                                        console.log('删除',scope,row)
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
                                    }else{
                                        this.$message({                                           
                                            message:'删除失败'+res.data.msg
                                        });
                                    }
                                })
                               
                            })
                    
                }
                else if(this.activeName=='专业管理'){
                     this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteMajor({majorId :row.major_id }).then(res=>{    
                                       if(res.status==200&&res.data.code==200){
                                        console.log('删除',scope,row)
                                        this.queryMajorByTerms()
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
                                    }else{
                                         this.$message({                                           
                                                message:'删除失败'+res.data.msg
                                            });
                                    }
                                })
                           
                            })
                      
                }
                else if(this.activeName=='年级管理'){
                      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteYear({YearId  :row.year_id }).then(res=>{    
                                       if(res.status==200&&res.data.code==200){
                                        console.log('删除',res)
                                        this.queryByYearNames()  
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
                                    }else{
                                         this.$message({                                           
                                                message:'删除失败'+res.data.msg
                                            });
                                    }
                                })
                           
                            })
                }
                 else if(this.activeName=='班级管理'){
                        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                deleteClassInfo({classId :row.class_id  }).then(res=>{    
                                    if(res.status==200&&res.data.code==200){
                                        console.log('删除',row)
                                         this.queryAllCalsss()
                                            this.$message({
                                                type: 'success',
                                                message: '删除成功!'
                                            });
                                    }else{
                                         this.$message({                                           
                                                message:'删除失败'+res.data.msg
                                            });
                                    }
                                })
                           
                            })
                }
            
            },
             //分页弹出框
            handleSizeChange2(val) {
                console.log(`每页 ${val} 条`);
                    this.pageSize=val
                if(this.activeName=='学院管理'){
                    this.queryCollegeByNames()                                          
                }
                else if(this.activeName=='专业管理'){
                    this.queryMajorByTerms()
                }
                else if(this.activeName=='年级管理'){
                       this.queryByYearNames()  
                }
                 else if(this.activeName=='班级管理'){
                     this.queryAllCalsss()
                }
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);  
                this.pageNum=val   
                 if(this.activeName=='学院管理'){
                    this.queryCollegeByNames()                                          
                }
                else if(this.activeName=='专业管理'){
                     this.queryMajorByTerms()
                }
                else if(this.activeName=='年级管理'){
                       this.queryByYearNames()  
                }
                 else if(this.activeName=='班级管理'){
                     this.queryAllCalsss()
                }
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.ClassManage{
    flex: 1;
    padding:50px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .ClassManage-top{
        min-height:150px;
        width:100%;
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
            // margin-top:10px;
        }
        .collegeNmae2{
            margin-right: 10px;
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
        .tableBox{
            flex: 1;
            overflow: hidden;
            border-radius:15px 15px 0 0;
            th{
                color: $color;
            }  
            td{
            color: $haedColor;
            }    
        }
        .operate{
            position:absolute;
            left:-17px;
            top: 0px;
            width:100%;
            min-height:30px;
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
    //新增弹框
    .newclass{
        width: 100%;
        height:50px;
        display: flex;
        flex-direction: column;
        justify-content:center;      
        div{
            width: 100%;   
            display: flex;
            align-items: center;   
            .span{
                display: inline-block;
                width: 70px;
            }    
        }
    }
    .newclass2{
          height:100px;
    }
    .newclass3{
          height:150px;
    }
    .setVisibles{
        width: 100%;
        max-height:350px;
        display: flex;
        overflow:auto;
        color: $haedColor;
        .time1{
            flex: 1;     
            .time-top{
                height: 170px;
            }   
            ul{
                // border-top: 1px solid #ccc;
                font-size: 14px;
                li{
                    height: 32px;
                    line-height: 32px;                 
                    // text-align: center;
                    // border-bottom: 1px solid #ccc;
                }
                li:nth-child(1){
                    color: $haedColor;
                    font-weight: 500;
                }
            } 
        }
        .time2{
            border-left: 1px solid rgba(237,237,237,1);
            padding-left:20px;
        }
    }
}
 
</style>






