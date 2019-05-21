<template>
  <div class="Notice2" @click="deleteId=null">
    <div class="header">
      <h4>公告通知</h4>
      <div class="collegeNmaeBox">
        <el-button size="small" icon="el-icon-plus" @click="addNotices()"></el-button>
        <el-button style="margin-left:10px;" size="small" icon="el-icon-delete"  @click="toggleSelection()"></el-button>
        <span class="spanName">状态：</span>     
          <el-select v-model="select1" placeholder="请选择" style="width:128px">
            
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>    
          <span class="spanName">编辑时间：</span>     
           <el-date-picker
            v-model="time1"
            type="date"
            format="yyyy/MM/dd"
            :clearable="false"
            value-format="timestamp"
            placeholder="年/月/日">
            </el-date-picker>
            <span style="margin:0 5px;">-</span>
            <el-date-picker
            v-model="time2"
            type="date"
            format="yyyy/MM/dd"
            :clearable="false"
            value-format="timestamp"
            placeholder="年/月/日">
            </el-date-picker>
            <span class="spanName">发送方式：</span>     
          <el-select v-model="select2" placeholder="请选择" style="width:128px">
            
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select> 
            <span class="spanName">发送时间：</span>     
            <el-date-picker
              v-model="time3"
              type="date"
              format="yyyy/MM/dd"
                  :clearable="false"
                  value-format="timestamp"
                  placeholder="年/月/日">
              </el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
              v-model="time4"
              type="date"
              style="margin-right:10px;"
              :class="{isdownloadTOP:isdownload==1}"
              format="yyyy/MM/dd"
              :clearable="false"
              value-format="timestamp"
              placeholder="年/月/日">
              </el-date-picker>
          <el-button :class="{isdownloadTOP:isdownload==1}" @click="search"  size="small">查询</el-button>    
      </div>
      
    </div>
    <div class="content">
      <div class="tablesx">
        <el-table
          ref="multipleTable"
          stripe
          height="100%"
          :data="tableData"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="item in accountList"
            :key="item.name"
            :prop="item.props"
            :label="item.name"
          ></el-table-column>
          <el-table-column  v-if="navjurisdiction2()" label="操作" width="80"  align="center" header-align="center">
            <template slot-scope="scope" style="position: relative;">
            
               <div>
                    <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                    <div class="operate" v-if="scope.$index==deleteId">
                        <p @click="handleEdit(scope.row)">编辑</p>
                        <p v-if="scope.row.noticeSendType=='已发送'" @click="handleDelete(scope.row)">删除</p>  
                        <p v-else @click="handleDelete(scope.row)">撤销</p>                                 
                    </div>
                </div>  
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
        <paginations     
          @handleCurrentChange='handleCurrentChange'
          :total='total'       
          ></paginations> 
    </div>
     
      <!-- 新增 -->
    <el-dialog
      :title="popupTitle"
      :visible.sync="newAdd"
      width="640px"
      center>
      <div v-if="messageUserIfo==1" class="NoticNew">
        <div class="div" style=" justify-content: flex-start;">
            <div class="div2">
              <span class="span">标题</span>
              <el-input v-model="value1"></el-input>
            </div>
            <div class="div2">
              <span class="span">方式</span>
                <el-select v-model="selectValue">
                  <el-option
                    v-for="item in newoptions1"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
            </div>
        </div>
        <div class="div">
            <div v-if="popupTitle=='新增'" class="div2">
              <span class="span">发布时间</span>
              <el-radio v-model="radio" label="0">立即发送</el-radio>
              <el-radio v-model="radio" label="1">预发送</el-radio>
              <el-time-picker
                v-model="value2"
                :disabled="radio==0"
                value-format="timestamp"
                style="margin-left:25px;"              
                placeholder="选择时间">
              </el-time-picker>              
            </div>
            <div v-else class="div2">
              <span class="span">发布时间</span>
              <span>{{value2}}</span>              
            </div>
        </div>
        <div class="div">
            <div class="div2" style="align-items: flex-start;width:100%;">
              <span class="span">通知类容</span>
              
               <el-input
                type="textarea"
                :autosize="{ minRows:5, maxRows:6}"
                placeholder="请输入内容"
                v-model="value3">
              </el-input>
            </div>
        </div>
      </div>
      <div v-else class="NoticNew">
          <div class="div">
            <div class="div2">
              <span class="span2">角色</span>
                <el-select v-model="selectValue1">
                  <el-option v-for="item in options2" :key="item.id" :label="item.label" :value="item.id" @click.native="newUserName1(item)"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">民族</span>
                <el-select v-model="selectValue2">
                  <el-option :label="'全部'" :value="''" @click.native="newUserName2({label:'全部'})"> </el-option>
                  <el-option v-for="item in options3" :key="item.id" :label="item.value" :value="item.value" @click.native="newUserName2(item)"> </el-option>
                </el-select>
            </div>
             <div class="div2" v-if="selectValue1!=0">
              <span class="span2">学历</span>
                <el-select v-model="selectValue3">
                  <el-option v-for="item in options4" :key="item.id" :label="item.label" :value="item.id" @click.native="newUserName3(item)"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div">
            <div class="div2">
              <span class="span2">性别</span>
                <el-select v-model="selectValue4">
                  <el-option v-for="item in options5" :key="item.id" :label="item.label" :value="item.id" @click.native="newUserName4(item)"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div" v-if="selectValue1!=1">
            <div class="div2">
              <span class="span2">院系</span>
                <el-select v-model="selectValue5" @change="handCollege">
                  <el-option :label="'全部'" :value="''" @click.native="newUserName5({label:'全部'})"> </el-option>
                  <el-option v-for="item in options6" :key="item.college_id" :label="item.college_name" :value="item.college_id" @click.native="newUserName5(item)"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">专业</span>
                <el-select v-model="selectValue6" @change="handMajorYear">
                  <el-option :label="'全部'" :value="''" @click.native="newUserName6({label:'全部'})"> </el-option>
                  <el-option v-for="item in options7" :key="item.major_name" :label="item.major_name" :value="item.major_id" @click.native="newUserName6(item)"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">年级</span>
                <el-select v-model="selectValue7" @change="handMajorYear">
                  <el-option :label="'全部'" :value="''" @click.native="newUserName7({label:'全部'})"> </el-option>
                  <el-option v-for="item in options8" :key="item.year_name" :label="item.year_name" :value="item.year_id" @click.native="newUserName7(item)"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div" v-if="selectValue1!=1">
            <div class="div2">
              <span class="span2">班级</span>
                <el-select v-model="selectValue8">
                  <el-option :label="'全部'" :value="''" @click.native="newUserName8({label:'全部'})"> </el-option>
                  <el-option v-for="item in options9" :key="item.class_id" :label="item.class_name" :value="item.class_id" @click.native="newUserName8(item)"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div" v-if="selectValue1!=2">
            <div class="div2">
              <span class="span2">区域</span>
                <el-select v-model="selectValue9" @change="handArea">
                  <el-option :label="'全部'" :value="''" @click.native="newUserName9({label:'全部'})"> </el-option>
                  <el-option v-for="item in options10" :key="item.college_id" :label="item.regionName" :value="item.regionId" @click.native="newUserName9(item)"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">楼栋</span>
                <el-select v-model="selectValue10" @change="newSlect2">
                  <el-option :label="'全部'" :value="''" @click.native="newUserName10({label:'全部'})"> </el-option>
                  <el-option v-for="item in options11" :key="item.floorId" :label="item.floorName" :value="item.floorId" @click.native="newUserName10(item)"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">楼层</span>
                <el-select v-model="selectValue11" @change="handRoomTier">
                  <el-option :label="'全部'" :value="''" @click.native="newUserName11({label:'全部'})"> </el-option>
                  <el-option v-for="item in options12" :key="item" :label="item" :value="item" @click.native="newUserName11(item)"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div" v-if="selectValue1!=2">
            <div class="div2">
              <span class="span2">房间</span>
                <el-select v-model="selectValue12">
                  <el-option :label="'全部'" :value="''" @click.native="newUserName12({label:'全部'})"> </el-option>
                  <el-option v-for="item in options13" :key="item.roomId" :label="item.roomNo" :value="item.roomId" @click.native="newUserName12(item)"> </el-option>
                </el-select>
            </div>
          </div>
      </div>
      <span v-if="messageUserIfo==1" slot="footer" class="dialog-footer">
        <span v-if="popupTitle=='新增'">
           <el-button v-if="popupTitle=='新增'" size="small" type="primary" @click="messageUserIfo=2">通知目标</el-button>
          <el-button v-else size="small" type="primary" @click="updateUserManages2">确定</el-button>
          <el-button size="small" @click="newAdd = false">取消</el-button>
        </span>
       
      </span>
      <span v-else slot="footer" class="dialog-footer">
        <el-button size="small" @click="messageUserIfo=1">继续编辑</el-button>
        <el-button size="small" type="primary" @click="updateUserManages">确定</el-button>
        <el-button size="small" @click="newAdd = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script>
import {
    arealist_2,
    floorlist_2,
    floorlist_3,
    roomGetRoomNumber,
    bedGetBedNo
  } from '@/axios/api1.js'
  import {
    queryCollegeByName,
    queryMajorByTerm,
    queryByYearName,
    queryAllCalss,
    queryMajorById,
    queryClassById,
     queryNation,
     addNotice,
     deleteNotice,
     queryNotice
  } from '@/axios/api.js'
import Paginations from './Paginations'
import bus from '../../js/bus.js'
export default {
  name: "RoleMange",
  components: {
    Paginations
  },
  data() {
    return {
      roleInfoId: null, //tab 表转换
      jurisdictional: true,  //管辖范围 显示隐藏
      tableId: [],
      //通知目标下拉框id
      select1:null,
      select2:null,
      selectValue:'',
      selectValue1:'',
      selectValue2:'',
      selectValue3:'',
      selectValue4:'',
      selectValue5:'',
      selectValue6:'',
      selectValue7:'',
      selectValue8:'',
      selectValue9:'',
      selectValue10:'',
      selectValue11:'',
      selectValue12:'',
      //通知目标
      selectNameList:['','','','','','','','','','','',''],

      value1:'',
      value2:'',
      value3:'',
      time1:'',
      time2:'',
      time3:'',
      time4:'',
      messageUserIfo:1,
      value4:null,
      deleteId:null,
      newAdd:false,
      popupTitle:'',
      accountList: [
        { name: "标题", props: "noticeTitle" },
        { name: "编辑时间", props: "noticeCreateTime"},
        { name: "发送时间", props: "noticeSendTime" },
         { name: "发送方式", props: "noticeSendMode" },
        { name: "发送状态", props: "noticeSendType" },
        { name: "编辑人", props: "noticeCreatePeople" },
        { name: "目标人员", props: "noticeSendPeople" }
      ],
      // tableList: [],
      multipleSelection: [],
      tableData: [
        // {roleInfoName:'你好啊',userInfoName:'2012-20-22 20:00',userName:'已发送'},
        // {roleInfoName:'你好',userInfoName:'2012-20-22 20:00',userName:'待发送'},

      ],
      pageSize:10,
      pageNum:1,
      total:0,
      radio:'0',
      currentPage2: 1,   
       options:[
         {label:'全部',id:null,}, 
         {label:'已发送',id:1,}, 
         {label:'待发送',id:0,},
       ],
       options1:[
         {label:'全部',id:null,}, 
         {label:'短信',id:'短信',}, 
         {label:'微信',id:'微信',},
       ],
       newoptions1:[
         {label:'全部',id:'',}, 
         {label:'短信',id:'短信',}, 
         {label:'微信',id:'微信',},
       ],
       options2:[
         {label:'全部',id:'',}, 
         {label:'学生',id:5,}, 
         {label:'宿管',id:4,},
         {label:'辅导员',id:3,},
       ],
        options3:[
        //  {label:'全部',id:'',}, 
        //  {label:'汉族',id:'汉',}, 
        //  {label:'其他',id:'其他',},
       ],
        options4:[
         {label:'全部',id:'',}, 
         {label:'大专',id:'大专',}, 
         {label:'本科',id:'本科',},
         {label:'研究生',id:'研究生',}, 
         {label:'博士',id:'博士',},
       ],
        options5:[
         {label:'全部',id:'',}, 
         {label:'男',id:'男',}, 
         {label:'女',id:'女',},
       ],
        options6:[
        
         
       ],
        options7:[
        
         
       ],
        options8:[
        
         
       ],
        options9:[
        
         
       ],
        options10:[
        
         
       ],
        options11:[
        
         
       ],
        options12:[
        
         
       ],
        options13:[
        
         
       ],
       roleInfoMenu:[],
       roleId:null,
       isdownload:0,
       userInfoId:null,
       noticeSendPeople:''
    };
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
                        return this.roleInfoMenu[13].indexOf('14')==-1?false:true
                    }
                    
                }
            }
  },
   mounted () {
       bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
             let widths=document.documentElement.clientWidth
            if(widths<=1630){
                this.isdownload=1
            }
        this.arealist()
      this.queryCollegeByNames()
      this.queryByYearNames2()
      this.queryNations()

 },
 created(){
      this.roleInfoMenu=this.$store.state.roleInfoMenu
        console.log(this.roleInfoMenu)
          let roleId=localStorage.getItem('roleId')  
          this.roleId=roleId
          this.userInfoId=localStorage.getItem('userInfoId')  
          this.search()
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
  methods: {
    // 分页
    //页数量
      handleSizeChange2(val) {
        this.pageSize =val
        console.log(val)
        this.search()
      },
      // 页码
      handleCurrentChange(val) {
           this.pageNum =val
          console.log(val)
          this.search()
        },
        //民族
        queryNations(){
          queryNation().then(res=>{
            console.log('民族',res)
            if(res.data.code==200){
              this.options3=res.data.data
            }
          })
        },
         //全部区域
            arealist(){
                arealist_2().then(res=>{
                    console.log('全部区域',res)
                     if(res.status==200&&res.data.code==200){
                        this.options10=res.data.data               
                    }
                })
            },
          //全部学院
            queryCollegeByNames(){
                queryCollegeByName({collegeName:'', pageNum:0,pageSize:0}).then(res=>{
                console.log('全部学院',res)
                if(res.status==200&&res.data.code==200){
                        this.options6=res.data.data               
                    }
                })
            },
        //查询全部年级
             queryByYearNames2(){     
                queryByYearName({YearName :'', pageNum :0,pageSize :0}).then(res=>{
                    console.log('查询全部年级',res)
                    if(res.status==200&&res.data.code==200){
                        this.options8=res.data.data.list
                        
                    }
                })
            },
        //新增学学院下拉事件
        handCollege(collegeId){      
              //查询全部专业   
               queryMajorById({
                    collegeId,MajorName:'',pageNum :0,pageSize :0 
                }).then(res=>{
                     this.selectValue6=''    
                      this.selectValue7='' 
                      this.selectValue8=''   
                      this.options9=[]   
                    console.log('专业',res)
                      if(res.status==200&&res.data.code==200){
                            this.options7=res.data.data.list
                                                                   
                    }else{
                        this.$message('查询专业失败' +res.data.msg)
                    }
                })      
                       
        },
          //新增专业和年级下拉
          handMajorYear(){
              queryClassById({
                    collegeId:this.selectValue5,
                    majorId :this.selectValue6,
                    yearId :this.selectValue7,
                    className :'',
                    pageNum :0,
                    pageSize :0
                }).then(res=>{
                    console.log(res)
                    if(res.data.code==200&&res.data.data!=''){                      
                        this.options9=res.data.data
                        this.selectValue8=''                                                          
                    }else{
                        this.$message('查询班级失败' +res.data.msg)
                    }
                })          
        },
        //新增区域下拉
        handArea(id){
            floorlist_2({ regionId:id}).then(res => {
            console.log("楼栋",res)
          
            if (res.data.code === 200) {           
              this.options11=res.data.data
                this.selectValue10=''  
                this.selectValue11=''
                this.selectValue12=''
                 this.options12=[]
                 this.options13=[]
            }
          });
        },
        //新增楼栋下拉
        newSlect2(id){
              floorlist_3({ floorId:id }).then(res => {
                  console.log('楼层',res);
                if (res.data.code === 200) {
                  this.options12=res.data.data   
                  this.selectValue11=''
                  this.selectValue12=''  
                  this.options13=[]
                }
              });
        },
         //楼层下拉
     handRoomTier(id){
          roomGetRoomNumber({ floorId:this.selectValue10,roomTier:id}).then(res => {
              console.log('房间',res);
            if (res.data.code === 200) {
              this.options13=res.data.data 
              this.selectValue12=''    
            }
          });
    },
    
        //tab列表请求
      list(){
        
      },   
     
      //编辑collegeControl
    handleEdit(val){
      this.newAdd=true
      this.popupTitle='查看'
      this.messageUserIfo=1
       console.log(val)
       this.value1=val.noticeTitle
       this.selectValue=val.noticeSendMode
       this.value2=val.noticeSendTime
       this.value3=val.noticeContent
    }, 
    
    //查询
    search(){
      queryNotice({
         pageNum:this.pageNum,
         pageSize:this.pageSize,
         noticeSendType:this.select1,
         noticeCreateTime_start:this.time1,
         noticeCreateTime_end:this.time2,
         noticeSendMode:this.select2,
         noticeSendTime_start:this.time3,
         noticeSendTime_end:this.time4
      }).then(res=>{
        console.log('公告通知查询',res)
        if(res.data.code==200){
          this.tableData=res.data.data.list
          this.total=res.data.data.total
        }else{
            this.$message({                                           
                  message: '查询失败'+res.data.msg
              });
        }
      })
    },
  
    //   多选表格删除userInfoName
     toggleSelection() {
       let noticeId =[];        
       if(this.multipleSelection.length<1){
          this.$message({message:'请选择你要删除的数据！'}); 
       }else{
         this.multipleSelection.forEach(data=>{        
           noticeId.push(data.noticeId)
         })
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
      
              deleteNotice({            
                  noticeId  :noticeId.join(',')
                  }).then(res=>{
    
                  if(res.status==200&&res.data.code==200){
                      this.search()                                                                         
                      this.$message({type: 'success',message: '删除成功!'});
                  }else{
                      this.$message({                                           
                          message: '删除失败'+res.data.msg
                      });
                  }
              })
              
          }) 
       }

      },
       //单个删除
    handleDelete(val){
      console.log(val)
      let msg=`此操作将永久删除该数据, 是否继续？`
      let msg2=`撤销后，通知将不再发送且信息不可恢复，是否撤销？`
       this.$confirm(val.userName=='已发送'?msg:msg2, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
             deleteNotice({ noticeId:val.noticeId}).then(res=>{
               if(res.data.code===200){
                 this.$message({message:'删除成功',type:'success'}); 
                 this.search()
               }else{
                 this.$message({message:'删除失败 '+res.data.msg}); 
               }
             })
          }) 
    },      
        //新增
    addNotices( ){
      this.value1=''
      this.selectValue=''
      this.value2=''
      this.value3=''
      this.newAdd=true
      this.popupTitle='新增'
      this.messageUserIfo=1
      this. selectValue=''
      this.selectValue1=''
      this.selectValue2=''
      this.selectValue3=''
      this.selectValue4=''
      this.selectValue5=''
      this.selectValue6=''
      this.selectValue7=''
      this.selectValue8=''
      this.selectValue9=''
      this.selectValue10=''
      this.selectValue11=''
      this.selectValue12=''
    },  
    
      //新增保存
      updateUserManages(){      
        let noticeSendPeople=this.selectNameList.filter(data=>{
          if(data!=''){
            return true
          }
        })
        console.log(noticeSendPeople)
        let datas=new Date().getTime()
        console.log(datas,this.value2)
        let noticeSendTime=''
        if(this.radio==0){
            noticeSendTime=datas
        }else{
          noticeSendTime=this.value2
        }
        if(this.value1==''||this.value3==''){
            this.$message({message:'标题或通知类容不能空'})
            return
        }
        addNotice({
          
          classId:this.selectValue8,//班级
          collegeId:this.selectValue5,//学院
          education:this.selectValue3,//学历
          floorId:this.selectValue10,//楼栋
          majorId:this.selectValue6,//专业
          nation:this.selectValue2,//民族
          noticeContent:this.value3,//发送类容
          noticeCreateTime:'',//编辑时间
          // noticeId: 0,//主键
          noticeSendMode: this.selectValue,//发送方式
          noticeSendPeople:noticeSendPeople.join(','),//目标人员
          noticeSendTime,//发送时间
          noticeTitle:this.value1,//标题
          regionId: this.selectValue9,//区域
          roleInfoId:this.selectValue1,//角色
          roomId:this.selectValue12,//房间
          roomTier:this.selectValue11,//楼层
          sex:this.selectValue4,//性别
          userInfoId:this.userInfoId,//用户id
          yearId: this.selectValue7//年级id
        
        }).then(res=>{
          console.log('公告通知',res)
          this.newAdd=false
          if(res.data.code==200){
            this.search()
             this.$message({message:'新增成功',type:'success'}); 
          }else{
            this.$message({message:'新增失败 '+res.data.msg}); 
          }
        })
      },
      // 编辑保存
      updateUserManages2(){
        this.newAdd=false
      },
    //选中的表格数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    //点击操作
     clickOperate(scope,row){
          console.log(scope,row)
          this.deleteId=scope.$index
         
      },
    //获取角色名字
      newUserName1(val){
        if(val.label=='全部'){
           this.selectNameList[0]=''
          return
        }
          this.selectNameList[0]=val.label
      },
      //民族
      newUserName2(val){
        if(val.label=='全部'){
           this.selectNameList[1]=''
          return
        }
        this.selectNameList[1]=val.value
      },
       //学历      
      newUserName3(val){
        if(val.label=='全部'){
           this.selectNameList[2]=''
          return
        }
        this.selectNameList[2]=val.label
      },
        //性别    
      newUserName4(val){
        if(val.label=='全部'){
           this.selectNameList[3]=''
          return
        }
        this.selectNameList[3]=val.label
      },
        //学院   
      newUserName5(val){
        if(val.label=='全部'){
          this.selectNameList[4]=''
          return
        }       
        this.selectNameList[4]=val.college_name
      },
         //专业  
      newUserName6(val){
        if(val.label=='全部'){
           this.selectNameList[5]=''
          return
        }
        this.selectNameList[5]=val.major_name
      },
        //年级  
      newUserName7(val){
        if(val.label=='全部'){
           this.selectNameList[6]=''
          return
        }
        this.selectNameList[6]=val.year_name
      },
        //班级
      newUserName8(val){
        if(val.label=='全部'){
           this.selectNameList[7]=''
          return
        }
        this.selectNameList[7]=val.class_name
      },
        //区域
      newUserName9(val){
        if(val.label=='全部'){
           this.selectNameList[8]=''
          return
        }
        this.selectNameList[8]=val.regionName
      },
        //楼栋
      newUserName10(val){
        if(val.label=='全部'){
           this.selectNameList[9]=''
          return
        }
        this.selectNameList[9]=val.floorName
      },
        //楼层
      newUserName11(val){
        if(val.label=='全部'){
           this.selectNameList[10]=''
          return
        }
        this.selectNameList[10]=val
      },
        //房间
      newUserName12(val){
        if(val.label=='全部'){
           this.selectNameList[11]=''
          return
        }
        this.selectNameList[11]=val.roomNo
      },
  }
};
</script>
<style lang="scss" scoped>
@import "../../stylecss/commonStyle.scss";
.Notice2 /deep/ .el-input{
  width: 128px;
}
// .Notice2 /deep/ .el-table__row:nth-child(1){
//   color:#E0226A;
// }
.Notice2{
  flex: 1;
  padding: 50px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header {
    min-height:120px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    text-align: left;
    padding:20px 10px 10px 0px;
    h4{
        color: $haedColor;
        border-left: 2px solid $bcgColor;
        padding-left: 10px;
    }
  }
  .collegeNmaeBox{
          display: flex;
          width: 100%;
          min-height:32px;
          align-items:center;
          padding: 5px 0;
          flex-wrap: wrap;  
          margin-top:20px;   
          // margin-bottom: 10px;    
        .collegeNmae2{
            margin-right: 10px;
            display: flex;
        }
        .spanName{
          display:block;
          min-width: 30px;
            color: $haedColor;
            font-size: 14px;
            margin-left: 10px;
      }
      .isdownloadTOP{
        margin-top: 10px;
      }
    }
       
  .content {
    width:100%;
    flex: 1;
    background: rgba(255, 255, 255, 1);
    border-radius:15px;
    display: flex;
    flex-direction: column;
    .tablesx {
      flex: 1;
     overflow: hidden;
      border-radius:15px 15px 0 0;
    }
   .operate{
        position:absolute;
        left:0px;
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
  // 弹框 新增
  .NoticNew{
      text-align: left;
      width:100%;
      min-height: 200px;
      font-size: 14px;
      color: #333;
      .span{
              display: inline-block;
              min-width:56px;
              text-align:right;
              margin-right: 15px;
          }
      .div{
        width: 100%;
        min-height: 32px;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        .div2{
          height: 32px;
          min-width:200px;
          display: flex;
          align-items: center;
          // align-items: flex-start;
          margin: 0;         
          .span2{
            min-width:28px;
            margin-right: 15px;
          }
        }
      }
    
  }
  .edit{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    span{
      display:inline-block; 
      width: 60px;
    }
      .edit_1{
      margin-bottom: 2%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }

  }
  .pagexs{
      height: 50px;
      z-index: 55;
      width: 100%;
      display: flex;
      align-items: center;
  }
  .pagination_2{
      margin: 0 auto;
  }
}
</style>






