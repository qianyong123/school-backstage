<template>
  <div class="FacilityMange" @click="deleteId=null">
        <div class="ClassManage-top">
            <h4>设备管理</h4>
            <div style="flex:1;font-size:14px;">
                <el-tabs style="height:100%;width:100%;"  v-model="activeName" @tab-click="handleClick">                  
                <el-tab-pane v-if="navjurisdiction(1)" label="赤眸" name="赤眸">  
                    <div class="collegeNmaeBox">                                
                        <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(1)"></el-button>
                                 <el-upload
                                class="upload-demo"
                                style="margin:0 10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="3"
                                :auto-upload='false'
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                <el-button size="small" icon="el-icon-upload2"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(1)"></el-button>
                            </div>
                            <span class="spanName" style="margin-left:0;">类型：</span>
                             <el-select style="width:120px;" v-model="Select1" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select> 
                            <span class="spanName">状态：</span>
                             <el-select style="width:120px;" v-model="Select2" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types2"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select> 
                            <span class="spanName">保修期：</span>
                             <el-select style="width:120px;" v-model="Select3" placeholder="请选择">
                                <el-option                              
                                v-for="(item,index) in types3"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select> 
                            <span class="spanName">区域：</span>
                             <el-select style="width:120px;" @change="getFloor" v-model="Select4" placeholder="请选择">
                                 <el-option :label="'全部'" :value="null"></el-option>
                                <el-option                              
                                v-for="(item,index) in types4"
                                :key="index"
                                :label="item.regionName"                            
                                :value="item.regionId">
                                </el-option>
                            </el-select> 
                            <span class="spanName">楼栋：</span>
                             <el-select style="width:120px;" v-model="Select5" placeholder="请选择">
                                <el-option :label="'全部'" :value="null"></el-option>
                                <el-option                              
                                v-for="(item,index) in types5"
                                :key="index"
                                :label="item.floorName"                            
                                :value="item.floorId">
                                </el-option>
                            </el-select> 
                            <el-input
                            placeholder="设备编号"
                            v-model="value"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(1)" size="small">查询</el-button>
                        </div>                    
                        <el-button @click="outExcelStudents" size="small" icon="el-icon-download"></el-button>   
                        <!-- <input type="file" :id="id" name="image" class="getImgUrl_file" @change="preview($event)">                    -->
                    </div>
                </el-tab-pane>
                <el-tab-pane v-if="navjurisdiction(2)" label="闸机" name="闸机">
                    <div class="collegeNmaeBox">
                        
                        <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(2)"></el-button>
                                <el-upload
                                class="upload-demo"
                                style="margin:0 10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="3"
                                :auto-upload='false'
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                 <el-button size="small" icon="el-icon-upload2"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(2)"></el-button>
                            </div> 
                            <span class="spanName" style="margin-left:0;">依附设备：</span>
                             <el-select style="width:120px;" v-model="Select6" placeholder="请选择">
                                
                                <el-option
                                v-for="(item,index) in types2"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select>
                            <span class="spanName">区域：</span>
                             <el-select style="width:120px;" @change="getFloor"  v-model="Select7" placeholder="请选择">
                                <el-option :label="'全部'" :value="null"></el-option>
                                <el-option
                                v-for="(item,index) in types4"
                                :key="index"
                                :label="item.regionName"                            
                                :value="item.regionId">
                                </el-option>
                            </el-select>
                            <span class="spanName">楼栋：</span>
                             <el-select style="width:120px;"  v-model="Select8" placeholder="请选择">
                                  <el-option :label="'全部'" :value="null"></el-option>
                                <el-option
                                v-for="(item,index) in types6"
                                :key="index"
                                :label="item.floorName"                            
                                :value="item.floorId">
                                </el-option>
                            </el-select>
                            <el-input
                            placeholder="设备编号"
                            v-model="value2"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(2)" size="small">查询</el-button>
                        </div> 
                        <el-button size="small" @click="outExcelStudents" icon="el-icon-download"></el-button>                       
                    </div>
                                                                
                </el-tab-pane>
                <el-tab-pane v-if="navjurisdiction(3)" label="摄像头" name="摄像头">
                    <div class="collegeNmaeBox">                                      
                      <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-plus" @click="newly(3)"></el-button>
                                <el-upload
                                class="upload-demo"
                                style="margin:0 10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="3"
                                :auto-upload='false'
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                 <el-button size="small" icon="el-icon-upload2"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(3)"></el-button>
                            </div>   
                            <span class="spanName" style="margin-left:0;">厂家：</span>
                             <el-select style="width:120px;" v-model="Select9" placeholder="请选择">
                               
                                <el-option
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select>
                            <span class="spanName">状态：</span>
                             <el-select style="width:120px;" v-model="Select10" placeholder="请选择">
                                
                                <el-option
                                v-for="(item,index) in types2"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select>
                            <span class="spanName">保修期：</span>
                             <el-select style="width:120px;" v-model="Select11" placeholder="请选择">
                                
                                <el-option
                                v-for="(item,index) in types3"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select>
                            <span class="spanName">区域：</span>
                             <el-select style="width:120px;" @change="getFloor" v-model="Select12" placeholder="请选择">
                                 <el-option :label="'全部'" :value="null"></el-option>
                                <el-option
                                v-for="(item,index) in types4"
                                :key="index"
                                 :label="item.regionName"                            
                                :value="item.regionId">
                                </el-option>
                            </el-select>
                               <span class="spanName">楼栋：</span>
                             <el-select style="width:120px;" v-model="Select13" placeholder="请选择">
                                 <el-option :label="'全部'" :value="null"></el-option>
                                <el-option
                                v-for="(item,index) in types7"
                                :key="index"
                                :label="item.floorName"                            
                                :value="item.floorId">
                                </el-option>
                            </el-select>
                            <el-input
                            placeholder="设备编号"
                            v-model="value3"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(3)" size="small">查询</el-button>
                        </div>             
                        <el-button size="small" @click="outExcelStudents" icon="el-icon-download"></el-button>                                               
                    </div>   
                </el-tab-pane>
                <el-tab-pane label="大屏" name="大屏" v-if="navjurisdiction(4)" >
                    <div class="collegeNmaeBox">  
                        <div class="collegeNmae">
                             <div class="collegeNmae2">                    
                                <el-button size="small" icon="el-icon-plus" @click="newly(4)"></el-button>
                                <el-upload
                                class="upload-demo"
                                style="margin:0 10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-change="handleAvatarSuccess"
                                :show-file-list="false"                  
                                :limit="3"
                                :auto-upload='false'
                                :on-exceed="handleExceed"
                                :file-list="fileList">
                                 <el-button size="small" icon="el-icon-upload2"></el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(4)"></el-button>
                            </div> 
                            <span class="spanName" style="margin-left:0;">状态：</span>
                             <el-select style="width:120px;" v-model="Select14" placeholder="请选择">                              
                                <el-option
                                v-for="(item,index) in types2"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select>  
                            <span class="spanName">保修期：</span>
                             <el-select style="width:120px;" v-model="Select15" placeholder="请选择">
                               
                                <el-option
                                v-for="(item,index) in types3"
                                :key="index"
                                :label="item.label"                            
                                :value="item.name">
                                </el-option>
                            </el-select>    
                            <span class="spanName">区域：</span>
                             <el-select style="width:120px;" @change="getFloor" v-model="Select16" placeholder="请选择">
                                <el-option :label="'全部'" :value="null"></el-option>
                                <el-option
                                v-for="(item,index) in types4"
                                :key="index"
                                :label="item.regionName"                            
                                :value="item.regionId">
                                </el-option>
                            </el-select>                         
                            
                            <span class="spanName">楼栋：</span>                                                
                             <el-select style="width:120px;" v-model="Select17" placeholder="请选择">
                                <el-option :label="'全部'" :value="null"></el-option>
                                <el-option
                                v-for="(item,index) in types8"
                                :key="index"
                                :label="item.floorName"                            
                                :value="item.floorId">
                                </el-option>
                            </el-select>                                                                                  
                            <el-input
                            placeholder="设备编号"
                            v-model="value4"
                            style="width:120px;margin:0 10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(4)" size="small">查询</el-button>
                        </div>
                       
                        <el-button @click="outExcelStudents" size="small" icon="el-icon-download"></el-button>                       
                    </div> 
                </el-tab-pane>
                <el-tab-pane label="固件更新" name="固件更新" v-if="navjurisdiction(5)" >
                    <div class="collegeNmaeBox">  
                      <div class="collegeNmae">
                            <div class="collegeNmae2">
                                <el-button size="small" icon="el-icon-upload2" @click="newly(5)"></el-button>                             
                                <el-button size="small" icon="el-icon-delete" @click="deleteDate(5)"></el-button>
                            </div>
                            <el-input
                            placeholder="版本号"
                            v-model="value5"
                            style="width:120px;margin-right:10px;"
                            >
                            </el-input>
                            <el-button @click="queryName(5)" size="small">查询</el-button>
                        </div>                   
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
                    v-show="activeName=='赤眸'"             
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
                    label="设备名称"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="类型"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="所在位置"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="标识"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="状态"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="保修期"         
                    >
                        <template slot-scope="scope">                         
                           <div v-if="(scope.row.parentMsg)!='在保'" style="color:#E01763">{{scope.row.parentMsg}}</div>
                           <div v-else>{{scope.row.parentMsg}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="IP"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="软件版本号"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="安全阔值"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="检测阔值"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
                        </template>
                    </el-table-column>
                     <el-table-column                 
                    label="识别阔值"         
                    >
                        <template slot-scope="scope">                         
                           <div>{{scope.row.name}}</div>
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
                <el-table
                    v-show="activeName!='赤眸'"     
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
                   
                    <!-- <el-table-column
                    v-if="activeName=='宿管'"   
                    label="管理楼栋"         
                    >
                        <template slot-scope="scope">
                           
                           
                        </template>
                    </el-table-column> -->
                    <el-table-column v-if="navjurisdiction2()" label="操作" width="80">
                        <template slot-scope="scope" style="position: relative;">
                            <div>
                                <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                                <div class="operate" v-if="scope.$index==deleteId">
                                    <p @click="handleEdit(scope, scope.row)">编辑</p>
                                    <p v-if="activeName=='固件更新'" @click="handTuisong">推送</p>
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
        <!-- 推送 -->
        <el-dialog
        title="推送"
        :visible.sync="tuisong"
        width="300px"
        center>
        <div>
            <span>推送目标</span>
            <el-select style="width:150px;margin-left:10px;" v-model="tuisongValue" placeholder="请选择">
                <el-option
                v-for="item in tuisongList"
                :key="item.value"
                :label="item.name"
                :value="item.value">
                </el-option>
            </el-select> 
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="saveTuisong">确定</el-button>
            <el-button size="small" @click="tuisong = false">取消</el-button>
        </span>
        </el-dialog>

        <new-students 
        :newVisible='newVisible'
        :newVisible2='newVisible2'
        :newVisible3='newVisible3'
        :newVisible4='newVisible4'
        :newVisible5='newVisible5'
        :popupTitle='popupTitle'
        :allcollege='allcollege'      
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
import { arealist_2,floorlist_2} from '@/axios/api1'
import { 
 queryMenuById
} from '@/axios/api'
const Students1=[
            // {name:'设备名称',props:'studentInfoName'},      
            // {name:'类型',props:'studentInfoNo'},
            // {name:'所在位置',props:'studentInfoSex'},
            // {name:'标识',props:'teacherMsg'},    
            // {name:'状态',props:'parentMsg'},
            // {name:'保修期',props:'roomMsg'},
            {name:'IP',props:'classMsg'},  
            {name:'软件版本号',props:'teacherMsg'},    
            {name:'安全阔值',props:'parentMsg'},
            {name:'检测阔值',props:'roomMsg'},
            {name:'识别阔值',props:'classMsg'},            
        ]
const Students2=[
            {name:'设备名称',props:'housemasterInfoName'},      
            {name:'所在位置',props:'housemasterInfoNo'},
            {name:'依附设备',props:'housemasterInfoSex'},
            {name:'IP',props:'housemasterInfoPhone'}, 
        ]
const Students3=[
            {name:'设备名称',props:'teacherInfoName'},      
            {name:'IP',props:'teacherInfoNo'},
            {name:'所在位置',props:'teacherInfoSex'},
            {name:'状态',props:'teacherInfoPhone'}, 
            {name:'保修期',props:'teacherInfoName'},      
            {name:'厂家',props:'teacherInfoNo'},
            {name:'安全阔值',props:'teacherInfoSex'},
            {name:'检测阔值',props:'teacherInfoSex'},
            {name:'识别阔值',props:'teacherInfoPhone'}, 
        ]
const Students4=[
        {name:'设备名称',props:'name'},      
        {name:'所在位置',props:'majorAmount'},
        {name:'状态',props:'classAmount'},
        {name:'保修期',props:'majorNmae'},  
        {name:'IP',props:'classAmount'},
        {name:'软件版本号',props:'majorNmae'},  
    ]
    const Students5=[
        {name:'版本',props:'name'},      
        {name:'文件大小',props:'majorAmount'},
        {name:'更新说明',props:'classAmount'},
    ]
export default {
    name:"ClassManage",
    components:{
        Paginations,
        newStudents
    },
    data(){
        return{
            activeName:"赤眸",
            activeIndex:'',
            loading:true,
            tuisong:false,
            newName:'',
            total:0,
            id:'student',
            pageSize:10,
            pageNum:1,
            allcollege:false,
            deleteId:null,//表格操作
            newVisible:false,//新增弹框
            newVisible2:false,
            newVisible3:false,
            newVisible4:false,
            newVisible5:false,
            setVisible:false,//设置弹框   
            fileList:[],//导入          
            //查询
            Select1:null,
            Select2:null,
            Select3:null,
            Select4:null,
            Select5:null,
            Select6:null,
            Select7:null,
            Select8:null,
            Select9:null,
            Select10:null,
            Select11:null,
            Select12:null,
            Select13:null,
            Select14:null,
            Select15:null,
            Select16:null,
            Select17:null,
            tuisongValue:0,
           value:'',
           value2:'',
           value3:'',
           value4:'',
           value5:'',

            //类型
            types: [
            {value: null,label: '全部',name:null}, 
            {value:0,label: '宿舍门禁',name:'宿舍门禁'}, 
            {value:1,label: '访客登记',name:'访客登记'}, 
            ],
             //状态
            types2: [
            {value: null,label: '全部',name:null}, 
            {value: 0,label: '在线',name:'在线'}, 
            {value: 1,label: '离线',name:'离线'}, 
            ],
             //保修期
            types3: [
            {value: null,label: '全部',name:null}, 
            {value: 1,label: '在保',name:'在保'}, 
            {value: 2,label: '过保',name:'过保'}, 
            {value: 0,label: '即将过保',name:'即将过保'}, 

            ],
            //推送
            tuisongList:[
                {value: 0,name:'宿舍门禁'}, 
                 {value: 1,name:'访客登记'}, 
                {value: 2,name:'大屏'}, 
            ],
             //区域
            types4: [
           
            ],
             //楼栋1
            types5: [
          
            ],
              //楼栋2
            types6: [
            
            ],
              //楼栋3
            types7: [
            
            ],
              //楼栋4
            types8: [
          
            ],         
          
            //编辑弹框
            EditCollegeNmae:'',//编辑班级名

            dataHeader:[],//表格头部                         
            value: '',
            multipleSelection: [], //表格多选
            tableData: [                   
             {parentMsg:'在保',props:'parentMsg'},
             {parentMsg:'已过保',props:'parentMsg'},
            ],
            roleInfoMenu:[],
            roleId:null,
            popupTitle:''
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
          
            this.dataHeader=Students1
            this.loading=false
            bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
            bus.$on('newCall',this.newCall)
            
            this.arealist()
        },
        created(){
            this.roleInfoMenu=this.$store.state.roleInfoMenu
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
                    else if(id==1){
                       return this.roleInfoMenu[12].indexOf('赤眸')==-1?false:true
                    }
                   else if(id==2){
                       return this.roleInfoMenu[12].indexOf('闸机')==-1?false:true
                    }
                    else if(id==3){
                       return this.roleInfoMenu[12].indexOf('摄像头')==-1?false:true
                    }
                     else if(id==4){
                       return this.roleInfoMenu[12].indexOf('大屏')==-1?false:true
                    }
                    else if(id==5){
                       return this.roleInfoMenu[12].indexOf('固件更新')==-1?false:true
                    }
                }
            },
            navjurisdiction2(){
                return function(){
                    if(this.roleId==1){
                        return true
                    }                 
                    else if(this.activeName=='赤眸'){
                        return this.roleInfoMenu[12].indexOf('13-1')==-1?false:true
                    }
                    else if(this.activeName=='闸机'){
                        return this.roleInfoMenu[12].indexOf('13-2')==-1?false:true
                    }
                     else if(this.activeName=='摄像头'){
                        return this.roleInfoMenu[12].indexOf('13-3')==-1?false:true
                    }
                     else if(this.activeName=='大屏'){
                        return this.roleInfoMenu[12].indexOf('13-4')==-1?false:true
                    }
                     else if(this.activeName=='固件更新'){
                        return this.roleInfoMenu[12].indexOf('13-5')==-1?false:true
                    }
                }
            }
        },
         watch: {
             activeIndex(){
                this.multipleSelection=[]
                this.$refs.multipleTable.clearSelection()
                this.pageNum=1
                // this.tableData=[]
                this.loading=true
                setTimeout(()=>{
                    this.loading=false
                },1000)
                console.log(this.activeName)
                if(this.activeName=='赤眸'){
                    this.dataHeader=Students1
                }
                else if(this.activeName=='闸机'){
                    this.dataHeader=Students2
                }
                  else if(this.activeName=='摄像头'){
                    this.dataHeader=Students3
                }
                  else if(this.activeName=='大屏'){
                    this.dataHeader=Students4                }
                  else if(this.activeName=='固件更新'){
                    this.dataHeader=Students5
                }
             }
         },      
        methods: {
            //导入成功或失败
            handleAvatarSuccess(file){
                console.log(file)
                 let fd = new FormData();
                fd.append('file',file.raw);//传文件
                this.fileList=[]
                if(this.activeName=='赤眸'){
                    
                
                }
                else if(this.activeName=='闸机'){
                  
                }
                else if(this.activeName=='摄像头'){
                }
                 else if(this.activeName=='大屏'){
                }
                 else if(this.activeName=='固件更新'){
                }
                
            },          
            handlePreview(file) {
                console.log(file);
            },
            //文件长度限制钩子
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
                if(this.activeName=='赤眸'){
                    
                }
                else if(this.activeName=='闸机'){
                   
                }
                else if(this.activeName=='摄像头'){
                   
                }
                 else if(this.activeName=='大屏'){
                }
                 else if(this.activeName=='固件更新'){
                }
            },        
            //全部区域
            arealist(){
                arealist_2().then(res=>{
                    console.log('全部区域',res)
                     if(res.status==200&&res.data.code==200){
                        this.types4=res.data.data               
                    }
                })
            },
           
             //查询楼栋
            getFloor(val){
                floorlist_2({regionId:val}).then(res=>{
                    if(res.data.code==200&&res.data.data!=null){
                        if(this.activeName=='赤眸'){
                            this.Select5=null 
                            this.types5=res.data.data
                        }
                        else if(this.activeName=='闸机'){
                            this.Select8=null 
                            this.types6=res.data.data
                        }
                        else if(this.activeName=='摄像头'){
                            this.Select13=null 
                            this.types7=res.data.data
                        }
                        else if(this.activeName=='大屏'){
                            this.Select17=null 
                            this.types8=res.data.data
                        }
                        
                    }else{
                        this.open2('查询楼栋失败',res.data.msg)
                    }
                })
            },
            open(msg){
                  this.$message({
                            message:msg             
                        });  
            },
             open2(msg){
                this.$message({
                message:msg,
                type: 'success'
                }); 
            },
            //鼠标移入单元格
            mouseTable(row, column, cell, event){
                // console.log('单元格',row, column.label)
            },       
            //切换top
            handleClick(tab, event) {
                console.log(tab);                            
                this.activeName=tab.label
                this.activeIndex=tab.index                          
                
            },
            //点击操作
            clickOperate(scope,row){
                console.log(scope,row)
                this.deleteId=scope.$index
            },
            //查询
            queryName(id){            
                if(id==1){
                    console.log(`查询${id}`,) 
                }
                else if(id==2){
                     console.log(`查询${id}`,)
                }
                else if(id==3){
                     console.log(`查询${id}`,)
                }
                 else if(id==4){
                     console.log(`查询${id}`,)
                }
                  else if(id==5){
                     console.log(`查询${id}`,)
                }
            },
            //新增
            newly(id){
                console.log(id)
                this.popupTitle='新增'              
                this.newName=id
               if(id==1){
                    this.newVisible=true
               }
               else if(id==2){
                   this.newVisible2=true
               }
               else if(id==3){
                   this.newVisible3=true
               }
               else if(id==4){
                   this.newVisible4=true
               }
               else if(id==5){
                   this.newVisible5=true
               }
            },
            //取消模态框
            newCall(){
                this.newVisible=false
                this.newVisible2=false
                this.newVisible3=false
                this.newVisible4=false
                this.newVisible5=false
            },
           
            //新增确认
            newSave(newStaffMessage){
                // const loading = this.$loading({
                // lock: true,
                // text: '保存中...',
                // spinner: 'el-icon-loading',
                // background: 'rgba(255, 255, 255, 0.8)'
                // });
                // setTimeout(() => {
                // loading.close();
                // }, 2000);
                let phone=/^1[3456789]\d{9}$/,
                    reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;   
                    console.log(newStaffMessage)
                   
                if(this.newName==1){
                     this.newVisible=false
                }              
                             
               else if(this.newName==2){
                    this.newVisible2=false             
                }
                else if(this.newName==3){  
                       this.newVisible3=false      
                }
                 else if(this.newName==4){
                        this.newVisible4=false      
                   
                }
                 else if(this.newName==5){
                  this.newVisible5=false
                }
                
            },
            //推送
            handTuisong(){
                this.tuisong=true
            },
            //推送确认
            saveTuisong(){
                this.tuisong=false
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
                        //  this.multipleSelection.forEach((data)=>{
                        //    if(data.studentInfoId!=''||data.studentInfoId!=null){
                        //        multipleSelection.push(data.studentInfoId)
                        //    }
                        //    if(data.studentInfoImg!=''||data.studentInfoImg!=null){
                        //         teacherInfoImg.push(data.studentInfoImg)                      
                        //    }
                          
                        // })
                        //   this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        //     confirmButtonText: '确定',
                        //     cancelButtonText: '取消',
                        //     type: 'warning'
                        //     }).then(() => {
                        //         deleteStudentInfo({
                        //             studentInfoId :multipleSelection.join(','),
                        //             }).then(res=>{
                        //             console.log('删除多个学生',res)
                        //             if(res.status==200&&res.data.code==200){
                        //                 this.queryStudents()                                                                          
                        //                 this.$message({type: 'success',message: '删除成功!'});
                        //             }else{
                        //                 this.$message({                                           
                        //                     message: '删除失败'+res.data.msg
                        //                 });
                        //             }
                        //         })
                               
                        //     }) 
                    }
                }
                else if(id==2){
                    console.log(this.multipleSelection)
                     if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }else{
                        
                        
                    }
                }
                 else if(id==3){
                     console.log(this.multipleSelection)
                      if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }else{                       
                      
                    }
                }
                else if(id==4){
                     console.log(this.multipleSelection)
                      if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }
                }
                else if(id==5){
                     console.log(this.multipleSelection)
                      if(this.multipleSelection.length<1){
                          this.$message({
                            message: '请你选择删除数据！'              
                        });       
                    }
                }
            },
             //删除单个
            handleDelete(scope,row){                             
                    console.log('删除单个',row)
                      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            }).then(() => {
                                 if(this.activeName=='赤眸'){
                                    
                                }
                                else if(this.activeName=='闸机'){
                                }
                                else if(this.activeName=='摄像头'){
                                }
                                else if(this.activeName=='大屏'){
                                }
                                else if(this.activeName=='固件更新'){
                                }
                            // deleteStudentInfo({
                            //     studentInfoId:row.studentInfoId ,
                            //     studentInfoImg:row.studentInfoImg
                            //     }).then(res=>{
                            //     if(res.status==200&&res.data.code==200){
                            //         this.queryStudents()
                            //         this.$message({type: 'success',message: '删除成功!'});
                            //     }else{
                            //         this.$message({                                           
                            //             message: '删除失败'+res.data.msg
                            //         });
                            //     }
                            // })
                            
                        })  
                
              
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
            },
            //设置打卡时间
            setTime(){
                this.setVisible=true
            },
            //编辑
            handleEdit(scope,row){
                console.log('编辑',row)             
                this.popupTitle='修改'   
               if(this.activeName=='赤眸'){
                     this.newVisible=true
                }
                else if(this.activeName=='闸机'){
                    this.newVisible2=true
                }
                else if(this.activeName=='摄像头'){
                    this.newVisible3=true
                }
                 else if(this.activeName=='大屏'){
                      this.newVisible4=true
                }
                 else if(this.activeName=='固件更新'){
                      this.newVisible5=true
                }
            },
            //编辑宿管确认
            updateHousemasterInfos(newStaffMessage,img,manageFloor){
                this.newVisible=false
                
            },
            //编辑辅导员确认
            updateTeacherInfos(newStaffMessage,img,classId){
                this.newVisible=false
              
            },
            //修改学生
            updateStudentInfos(newStaffMessage){
                let numbers=/^[0-9]*$/
                
            },
            //编辑保存
            editSave(newStaffMessage){
                 let phone=/^1[3456789]\d{9}$/,
                    reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    numbers=/^[0-9]*$/;
               if(this.activeName=='赤眸'){
                     this.newVisible=false
                }
                else if(this.activeName=='闸机'){
                    this.newVisible2=false
                }
                else if(this.activeName=='摄像头'){
                    this.newVisible3=false
                }
                 else if(this.activeName=='大屏'){
                      this.newVisible4=false
                }
                 else if(this.activeName=='固件更新'){
                      this.newVisible5=false
                }
               
            },
           
             //分页弹出框
            handleSizeChange2(val) {
                console.log(`每页 ${val} 条`);
                    this.pageSize=val
                    if(this.activeName=='赤眸'){
                                    
                    }
                    else if(this.activeName=='闸机'){
                    }
                    else if(this.activeName=='摄像头'){
                    }
                    else if(this.activeName=='大屏'){
                    }
                    else if(this.activeName=='固件更新'){
                    }
            },
            //点击分页
             handleCurrentChange(val) {
                console.log(`当前页: ${val}`);   
                this.pageNum=val   
                if(this.activeName=='赤眸'){
                                    
                }
                else if(this.activeName=='闸机'){
                }
                else if(this.activeName=='摄像头'){
                }
                else if(this.activeName=='大屏'){
                }
                else if(this.activeName=='固件更新'){
                }
            },
        },
       
    }
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';

.FacilityMange{
    flex: 1;
    padding:50px 20px 20px 20px;
    display: flex;
    flex-direction: column;
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
            margin-left: 10px;
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






