<template>
     <!-- 新增弹框 -->
     <div>
            <el-dialog
            :title="popupTitle"
            :visible.sync="newVisible"
            @close="shutModal(1)"
            width="780px"
            :show-close="false"
            center>
                <div class="newFacilityMange">   
                     <div class="divBox">
                        <div class="div">
                            <span class="span">设备名称</span>
                            <el-input v-model="FacilityMange.newInput1"></el-input>
                        </div>
                        <div class="div">
                            <span class="span">所在位置</span>
                            <el-select v-model="FacilityMange.selectValue1" @change="queryFloor" placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.regionId"
                                :label="item.regionName"
                                :value="item.regionId">
                                </el-option>
                            </el-select>
                            <span style="margin:0 7px;"></span>
                            <el-select v-model="FacilityMange.selectValue2" placeholder="请选择">
                                <el-option                              
                                v-for="item in options2"
                                :key="item.floorId"
                                :label="item.floorName"
                                :value="item.floorId">
                                </el-option>
                            </el-select>
                        </div>                     
                    </div>
                     <div class="divBox">
                        <div class="div">
                            <span class="span">状态</span>
                            <el-select v-model="FacilityMange.selectValue3" placeholder="请选择">
                                <el-option
                                v-for="item in select1"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                        </div>
                        <div class="div">
                            <span class="span">类型</span>
                              <el-select v-model="FacilityMange.selectValue4" placeholder="请选择">
                                <el-option
                                v-for="item in select2"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>                            
                        </div>                     
                    </div>
                    <div class="divBox">
                        <div class="div">
                            <span class="span">标识</span>
                            <el-select v-model="FacilityMange.selectValue5" placeholder="请选择">
                                <el-option
                                v-for="item in select3"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                        </div>
                        <div class="div">
                            <span class="span">保修时间</span>
                             <el-date-picker
                                v-model="FacilityMange.time1"
                                type="date"
                                format="yyyy-MM-dd"
                                :clearable="false"
                                placeholder="2018-12-12"
                                value-format="timestamp"
                                >
                            </el-date-picker>   
                            <span style="margin:0 5px;">-</span>
                            <el-date-picker
                                v-model="FacilityMange.time2"
                                type="date"
                                 format="yyyy-MM-dd"
                                :clearable="false"
                                placeholder="2018-12-12"
                                value-format="timestamp">
                            </el-date-picker>                         
                        </div>                     
                    </div>
                     <div class="divBox">
                        <div class="div">
                            <span class="span">IP</span>
                            <el-input type="number" v-model="FacilityMange.newInput2"></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">音量</span>
                            <el-input type="number" v-model="FacilityMange.newInput3"></el-input>  
                        </div>
                         <div class="div">
                            <span class="span">语音设置</span>
                            <el-select v-model="FacilityMange.selectValue6" placeholder="请选择">
                                <el-option
                                v-for="item in select4"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                        </div>                  
                    </div>
                    <div class="divBox">
                        <div class="div">
                            <span class="span">账号</span>
                            <el-input type="number" v-model="FacilityMange.newInput4"></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">密码</span>
                            <el-input type="number" v-model="FacilityMange.newInput5" ></el-input>  
                        </div>
                          <div class="div">
                            <span class="span">监测窗</span>
                            <el-input v-model="FacilityMange.newInput6" ></el-input>  
                        </div>                
                    </div>
                     <div class="divBox">
                        <div class="div">
                            <span class="span">识别间隔</span>
                            <el-input type="number" v-model="FacilityMange.newInput7" ></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">识别帧率</span>
                            <el-input type="number" v-model="FacilityMange.newInput8"></el-input>  
                        </div>
                          <div class="div">
                            <span class="span">角度限制</span>
                            <el-input type="number" v-model="FacilityMange.newInput9" ></el-input>  
                        </div>                
                    </div>
                    <div class="divBox">
                        <div class="div">
                            <span class="span">安全阈值</span>
                            <el-input type="number" v-model="FacilityMange.newInput10" ></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">检测阈值</span>
                            <el-input type="number" v-model="FacilityMange.newInput11"></el-input>  
                        </div>
                          <div class="div">
                            <span class="span">识别阈值</span>
                            <el-input type="number" v-model="FacilityMange.newInput12" ></el-input>  
                        </div>                
                    </div>
                    <div class="divBox">
                        <div class="div">
                            <span class="span">待机时间</span>
                            <el-input  v-model="FacilityMange.newInput13" ></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">持续时间</span>
                            <el-input v-model="FacilityMange.newInput14"></el-input>  
                        </div>
                          <div class="div">
                            <span class="span">闲时熄屏</span>                          
                            <el-select v-model="FacilityMange.selectValue7" placeholder="请选择">
                                <el-option
                                v-for="item in select5"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>                         
                        </div>                
                    </div>
                     <div class="divBox">
                        <div class="div" >
                            <span class="span">屏幕亮度</span>
                            <el-input v-model="FacilityMange.newInput15" ></el-input>  
                        </div>
                        <div class="div" style="min-width:220px">
                            <span class="span" >补光亮度</span>
                            <el-input v-model="FacilityMange.newInput16"></el-input>  
                        </div>
                          <div class="div">
                            <span class="span" style="width:90px;">离线记录保存</span>
                            <el-select v-model="FacilityMange.selectValue8" placeholder="请选择">
                                <el-option
                                v-for="item in select6"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                        </div>                
                    </div>
                </div>        
                <i class="el-icon-close close" @click="$emit('newCall')"></i>           
                <span slot="footer" class="dialog-footer">
                    <el-button v-if="popupTitle=='新增'" type="primary" @click="$emit('newSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button v-else type="primary" @click="$emit('editSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button @click="$emit('newCall')" size="small">取 消</el-button>
                </span>
            </el-dialog> 
             <!-- 新增弹框 -->
            <el-dialog
                :title="popupTitle"
                :visible.sync="newVisible2"
                @close="shutModal(2)"
                width="780px"
                :show-close="false"
                center>
                <div class="newFacilityMange">   
                    <div class="divBox">
                        <div class="div">
                            <span class="span">设备名称</span>
                            <el-input v-model="FacilityMange.newInput1"></el-input>
                        </div>
                        <div class="div">
                            <span class="span">所在位置</span>
                              <el-select v-model="FacilityMange.selectValue1" @change="queryFloor" placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.regionId"
                                :label="item.regionName"
                                :value="item.regionId">
                                </el-option>
                            </el-select>
                             <span style="margin:0 7px;"></span>
                              <el-select v-model="FacilityMange.selectValue2" placeholder="请选择">
                                <el-option                              
                                v-for="item in options2"
                                :key="item.floorId"
                                :label="item.floorName"
                                :value="item.floorId">
                                </el-option>
                            </el-select>
                        </div>                     
                    </div>
                     <div class="divBox">                       
                        <div class="div">
                            <span class="span">依附设备</span>
                              <el-select v-model="FacilityMange.selectValue9" @change="queryFloor" placeholder="请选择">
                                <el-option
                                v-for="item in options3"
                                :key="item.regionId"
                                :label="item.regionName"
                                :value="item.regionId">
                                </el-option>
                            </el-select>                           
                        </div>                     
                    </div>
                    <div class="divBox">
                        <div class="div">
                            <span class="span">IP</span>
                            <el-input type="number" v-model="FacilityMange.newInput2" ></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">账号</span>
                            <el-input type="number" v-model="FacilityMange.newInput4"></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">密码</span>
                            <el-input type="number" v-model="FacilityMange.newInput5" ></el-input>  
                        </div>
                                        
                    </div>
                </div>        
                <i class="el-icon-close close" @click="$emit('newCall')"></i>           
                <span slot="footer" class="dialog-footer">
                    <el-button v-if="popupTitle=='新增'" type="primary" @click="$emit('newSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button v-else type="primary" @click="$emit('editSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button @click="$emit('newCall')" size="small">取 消</el-button>
                </span>
            </el-dialog> 
             <!-- 新增弹框 -->
            <el-dialog
                :title="popupTitle"
                :visible.sync="newVisible3"
                @close="shutModal(3)"
                width="780px"
                :show-close="false"
                center>
                <div class="newFacilityMange">   
                    <div class="divBox">
                        <div class="div">
                            <span class="span">设备名称</span>
                            <el-input v-model="FacilityMange.newInput1"></el-input>
                        </div>
                        <div class="div">
                            <span class="span">所在位置</span>
                              <el-select v-model="FacilityMange.selectValue1" @change="queryFloor" placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.regionId"
                                :label="item.regionName"
                                :value="item.regionId">
                                </el-option>
                            </el-select>
                             <span style="margin-left:14px;"></span>
                              <el-select v-model="FacilityMange.selectValue2" placeholder="请选择">
                                <el-option                              
                                v-for="item in options2"
                                :key="item.floorId"
                                :label="item.floorName"
                                :value="item.floorId">
                                </el-option>
                            </el-select>
                        </div>                     
                    </div>
                     <div class="divBox">
                        <div class="div">
                            <span class="span">状态</span>
                            <el-select v-model="FacilityMange.selectValue3" placeholder="请选择">
                                <el-option
                                v-for="item in select1"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                        </div>
                         <div class="div">
                            <span class="span">保修时间</span>
                             <el-date-picker
                                v-model="FacilityMange.time1"
                                type="date"
                                format="yyyy-MM-dd"
                                :clearable="false"
                                placeholder="2018-12-12"
                                value-format="timestamp"
                                >
                            </el-date-picker>   
                            <span style="margin:0 5px;">-</span>
                            <el-date-picker
                                v-model="FacilityMange.time2"
                                type="date"
                                 format="yyyy-MM-dd"
                                :clearable="false"
                                placeholder="2018-12-12"
                                value-format="timestamp">
                            </el-date-picker>                         
                        </div>                      
                    </div>                 
                     <div class="divBox">
                        <div class="div">
                            <span class="span">IP</span>
                            <el-input type="number" v-model="FacilityMange.newInput2"></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">厂家</span>
                            <el-select v-model="FacilityMange.selectValue10" placeholder="请选择">
                                <el-option
                                v-for="item in options4"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select> 
                        </div>
                         <div class="div">
                            <span class="span">检测窗口</span>
                            <el-input type="number" v-model="FacilityMange.newInput3"></el-input>    
                        </div>                  
                    </div>
                    <div class="divBox">
                        <div class="div">
                            <span class="span">账号</span>
                            <el-input type="number" v-model="FacilityMange.newInput4"></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">密码</span>
                            <el-input type="number" v-model="FacilityMange.newInput5" ></el-input>  
                        </div>
                          <div class="div">
                            <span class="span">端口</span>
                            <el-input type="number" v-model="FacilityMange.newInput6" ></el-input>  
                        </div>                
                    </div>                  
                    <div class="divBox">
                        <div class="div">
                            <span class="span">安全阈值</span>
                            <el-input type="number" v-model="FacilityMange.newInput8" ></el-input>  
                        </div>
                        <div class="div">
                            <span class="span">检测阈值</span>
                            <el-input type="number" v-model="FacilityMange.newInput9"></el-input>  
                        </div>
                          <div class="div">
                            <span class="span">识别阈值</span>
                            <el-input type="number" v-model="FacilityMange.newInput10" ></el-input>  
                        </div>                
                    </div>
                     <div class="divBox">
                        <div class="div">
                            <span class="span">角度限制</span>
                            <el-input type="number" v-model="FacilityMange.newInput7" ></el-input>  
                        </div>
                                        
                    </div>
                </div>        
                <i class="el-icon-close close" @click="$emit('newCall')"></i>           
                <span slot="footer" class="dialog-footer">
                    <el-button v-if="popupTitle=='新增'" type="primary" @click="$emit('newSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button v-else type="primary" @click="$emit('editSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button @click="$emit('newCall')" size="small">取 消</el-button>
                </span>
            </el-dialog>
             <!-- 新增弹框 -->
            <el-dialog
                :title="popupTitle"
                :visible.sync="newVisible4"
                @close="shutModal(4)"
                width="780px"
                :show-close="false"
                center>
                <div class="newFacilityMange">   
                    
                    <div class="divBox">
                        <div class="div">
                            <span class="span">设备名称</span>
                            <el-input v-model="FacilityMange.newInput1"></el-input>
                        </div>
                        <div class="div">
                            <span class="span">所在位置</span>
                              <el-select v-model="FacilityMange.selectValue1" @change="queryFloor" placeholder="请选择">
                                <el-option
                                v-for="item in options1"
                                :key="item.regionId"
                                :label="item.regionName"
                                :value="item.regionId">
                                </el-option>
                            </el-select>
                             <span style="margin-left:14px;"></span>
                              <el-select v-model="FacilityMange.selectValue2" placeholder="请选择">
                                <el-option                              
                                v-for="item in options2"
                                :key="item.floorId"
                                :label="item.floorName"
                                :value="item.floorId">
                                </el-option>
                            </el-select>
                        </div>                     
                    </div>
                     <div class="divBox">
                        <div class="div">
                            <span class="span">状态</span>
                            <el-select v-model="FacilityMange.selectValue3" placeholder="请选择">
                                <el-option
                                v-for="item in select1"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>  
                        </div>
                        <div class="div">
                            <span class="span">保修时间</span>
                             <el-date-picker
                                v-model="FacilityMange.time1"
                                type="date"
                                format="yyyy-MM-dd"
                                :clearable="false"
                                placeholder="2018-12-12"
                                value-format="timestamp"
                                >
                            </el-date-picker>   
                            <span style="margin:0 5px;">-</span>
                            <el-date-picker
                                v-model="FacilityMange.time2"
                                type="date"
                                 format="yyyy-MM-dd"
                                :clearable="false"
                                placeholder="2018-12-12"
                                value-format="timestamp">
                            </el-date-picker>                         
                        </div>                     
                    </div>
                    <div class="divBox">
                        <div class="div">
                            <span class="span">IP</span>
                            <el-input type="number" v-model="FacilityMange.newInput2"></el-input>  
                        </div>
                    </div>
                </div>        
                <i class="el-icon-close close" @click="$emit('newCall')"></i>           
                <span slot="footer" class="dialog-footer">
                    <el-button v-if="popupTitle=='新增'" type="primary" @click="$emit('newSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button v-else type="primary" @click="$emit('editSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button @click="$emit('newCall')" size="small">取 消</el-button>
                </span>
            </el-dialog>
             <!-- 新增弹框 -->
            <el-dialog
                :title="popupTitle"
                :visible.sync="newVisible5"
                @close="shutModal(5)"
                width="550px"
                :show-close="false"
                center>
                <div class="newFacilityMange">   
                    <div class="divBox">
                        <div class="div">
                            <span class="span">选择文件</span>
                               <el-upload
                                class="upload-demo"
                                :show-file-list="false"
                                style="margin-right:10px;"
                                action="https://jsonplaceholder.typicode.com/posts/"                             
                                :on-change="handleAvatarSuccess"   
                                :before-upload="beforeAvatarUpload"                                         
                                :limit="1"
                                :auto-upload='false'
                                :file-list="fileList">
                                <el-button size="small" icon="el-icon-upload2">上传文件</el-button>
                                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload> 
                                <div style="font-size:12px;">{{FacilityMange.demoName}}</div>
                                <div style="font-size:12px;margin-left:20px;">大小不能超过20M</div>
                        </div>
                    </div>
                    <div class="divBox">
                        <div class="div" style="align-items: flex-start;">
                            <span class="span">更新说明</span>
                            <el-input  style="width:400px;" type="textarea" :autosize="{ minRows:3, maxRows:6}"  v-model="FacilityMange.newInput2"></el-input>  
                        </div>
                    </div>
            
                </div>        
                <i class="el-icon-close close" @click="$emit('newCall')"></i>           
                <span slot="footer" class="dialog-footer">
                    <el-button v-if="popupTitle=='新增'" type="primary" @click="$emit('newSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button v-else type="primary" @click="$emit('editSave',FacilityMange)" size="small">确 定</el-button>
                    <el-button @click="$emit('newCall')" size="small">取 消</el-button>
                </span>
            </el-dialog>
     </div>
   
    
</template>

<script>
import { arealist_2,floorlist_2,} from '@/axios/api1'
import { 
      
} from '@/axios/api'
import bus from '../../js/bus.js'
export default {
    name:'NewStudents',
    props:['newName','newVisible','popupTitle','newVisible2','newVisible3','newVisible4','newVisible5',],
    data(){
        return{
             fileList:[],
             imageUrl:'',
            imageUr2:'',
            imageUr3:'',
            dialogImageUrl: '',
            dialogVisible: false,  
            //设备管理
            FacilityMange:{
               time1:'',
                time2:'',
                demoName:'' ,    
               newInput1:'',//设备名称
                newInput2:'',//ip
                newInput3:'',//音量
                newInput4:'',//账号
                newInput5:'', //密码  

                newInput6:'',//检测窗
                newInput7:'',//识别间隔
                newInput8:'',//识别帧率
                newInput9:'',//角度限制

                newInput10:'', //安全阈值
                newInput11:'',//检测阈值
                newInput12:'',//识别阈值
                newInput13:'',  //待机时间     
                newInput14:'', //持续时间
                newInput15:'',//屏幕亮度
                newInput16:'',//补光亮度
                newInput17:'',  //                
                //下拉框
                selectValue1:null,//区域
                selectValue2:null,//楼栋
                selectValue3:1,//状态
                selectValue4:1,//类型
                selectValue5:1,//标识
                selectValue6:1,//语音
                selectValue7:1,//闲时熄屏
                selectValue8:1,//离线记录保存
                selectValue9:null,//依附设备
                selectValue10:null,//厂家
                selectValue11:null,//              
                 
            },
            options1:[],//区域
            options2:[],//楼栋
             //依附设备
            options3:[],
             options4:[],//厂家
            select1:[ //状态
                {value:1,name:'在线'},
                {value:2,name:'离线'},
            ],
            select2:[//类型
                {value:1,name:'宿舍门禁'},
                {value:2,name:'访客登记'},              
            ],
            select3:[//标识
                {value:1,name:'出'},
                {value:2,name:'入'},
            ],
            select4:[//语音
                {value:1,name:'开'},
                {value:2,name:'关'},             
            ],        
              //闲时熄屏
            select5:[
                 {value:1,name:'是'},
                {value:2,name:'否'}, 
            ],
           
              //离线记录保存
            select6:[
                 {value:1,name:'7天'},
                {value:2,name:'30天'}, 
                {value:3,name:'180天'}, 
            ],
            
        }
    },
    created() {
         //区域
        arealist_2().then(res=>{         
            if(res.data.code==200&&res.data.data!=null){
                this.options1=res.data.data
            }
        })
    },
    methods: {
       //关闭模态框
       shutModal(id){
           console.log('关闭模态框',id)
           bus.$emit('newCall')
             
       },
        //区域下拉
        queryFloor(id){
             floorlist_2({regionId:id}).then(res=>{
                    if(res.data.code==200&&res.data.data!=null){
                        this.options2=res.data.data
                    }
                })
        },
         //文件长度限制钩子
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            }, 
             //导入成功或失败
            handleAvatarSuccess(file){
                console.log(file)
                this.FacilityMange.demoName=file.name
                 let fd = new FormData();
                fd.append('file',file.raw);//传文件
                this.fileList=[]
                const isLt2M = file.size / 1024 / 1024 < 20;
                if(!isLt2M){
                     this.$message('上传大小不能超过20M');
                     this.FacilityMange.demoName=''
                }
                   
                
            },

            //上传前的钩子
            beforeAvatarUpload(file) {
                console.log('上传前的钩子',file)
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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
     .newFacilityMange /deep/ .el-input{
         width: 140px;
     }
     .newFacilityMange /deep/ .el-select{
         width: 140px;
     }
    .newFacilityMange{
        width: 100%;
        min-height:100px;      
        position: relative; 
        // padding-left: 180px;
        .divBox{
            display: flex;
            margin-bottom: 10px;
        }
        .div{
            min-width:250px;  
            min-height: 32px; 
            display: flex;
            align-items: center;  
            // align-items: flex-start;                         
            .span{
                display: inline-block;
                min-width:60px;
                text-align: right;  
                margin-right: 15px;             
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
     
    
    
</style>
