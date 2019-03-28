<template>
  <div class="Notice2" @click="deleteId=null">
    <div class="header">
      <h4>公告通知</h4>
      <div class="collegeNmaeBox">
        <el-button size="small" icon="el-icon-plus" @click="addNotice()"></el-button>
        <el-button style="margin-left:10px;" size="small" icon="el-icon-delete"  @click="toggleSelection()"></el-button>
        <span class="spanName">状态：</span>     
          <el-select v-model="selectValue1" placeholder="请选择" style="width:140px">
            
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
          <el-select v-model="selectValue2" placeholder="请选择" style="width:140px">
            
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
            format="yyyy/MM/dd"
            :clearable="false"
            value-format="timestamp"
            placeholder="年/月/日">
            </el-date-picker>
          <el-button style="margin-left:10px;" size="small">查询</el-button>    
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
          <el-table-column  label="操作" width="80"  align="center" header-align="center">
            <template slot-scope="scope" style="position: relative;">
            
               <div>
                    <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                    <div class="operate" v-if="scope.$index==deleteId">
                        <p @click="handleEdit(scope.row)">编辑</p>
                        <p v-if="scope.row.userName=='已发送'" @click="handleDelete(scope.row)">删除</p>  
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
      <div v-if="messageUserIfo==1" class="newMsg">
        <div class="div" style=" justify-content: flex-start;">
            <div class="div2">
              <span class="span">标题</span>
              <el-input v-model="value1"></el-input>
            </div>
            <div class="div2">
              <span class="span">方式</span>
                <el-select v-model="selectValue">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
            </div>
        </div>
        <div class="div">
            <div class="div2">
              <span class="span">发布时间</span>
               <el-date-picker
                v-model="value2"
                type="datetime"
                style="width:200px"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
        </div>
        <div class="div">
            <div class="div2" style="align-items: flex-start;width:100%;">
              <span class="span">通知类容</span>
               <el-input
                type="textarea"
                :autosize="{ minRows:3, maxRows:6}"
                placeholder="请输入内容"
                v-model="value3">
              </el-input>
            </div>
        </div>
      </div>
      <div v-else class="newMsg">
          <div class="div">
            <div class="div2">
              <span class="span2">角色</span>
                <el-select v-model="selectValue1" @change="cutRole">
                  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.id"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">民族</span>
                <el-select v-model="selectValue2">
                  <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.id"> </el-option>
                </el-select>
            </div>
             <div class="div2" v-if="selectValue1!=0">
              <span class="span2">学历</span>
                <el-select v-model="selectValue3">
                  <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.id"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div">
            <div class="div2">
              <span class="span2">性别</span>
                <el-select v-model="selectValue4">
                  <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.id"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div" v-if="selectValue1!=1">
            <div class="div2">
              <span class="span2">院系</span>
                <el-select v-model="selectValue5" @change="handCollege">
                  <el-option :label="'全部'" :value="null"> </el-option>
                  <el-option v-for="item in options6" :key="item.college_id" :label="item.college_name" :value="item.college_id"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">专业</span>
                <el-select v-model="selectValue6" @change="handMajorYear">
                  <el-option :label="'全部'" :value="null"> </el-option>
                  <el-option v-for="item in options7" :key="item.major_name" :label="item.major_name" :value="item.major_id"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">年级</span>
                <el-select v-model="selectValue7" @change="handMajorYear">
                  <el-option :label="'全部'" :value="null"> </el-option>
                  <el-option v-for="item in options8" :key="item.year_name" :label="item.year_name" :value="item.year_id"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div" v-if="selectValue1!=1">
            <div class="div2">
              <span class="span2">班级</span>
                <el-select v-model="selectValue8">
                  <el-option :label="'全部'" :value="null"> </el-option>
                  <el-option v-for="item in options9" :key="item.class_id" :label="item.class_name" :value="item.class_id"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div" v-if="selectValue1!=2">
            <div class="div2">
              <span class="span2">区域</span>
                <el-select v-model="selectValue9" @change="handArea">
                  <el-option :label="'全部'" :value="null"> </el-option>
                  <el-option v-for="item in options10" :key="item.college_id" :label="item.regionName" :value="item.regionId"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">楼栋</span>
                <el-select v-model="selectValue10" @change="newSlect2">
                  <el-option :label="'全部'" :value="null"> </el-option>
                  <el-option v-for="item in options11" :key="item.floorId" :label="item.floorName" :value="item.floorId"> </el-option>
                </el-select>
            </div>
             <div class="div2">
              <span class="span2">楼层</span>
                <el-select v-model="selectValue11" @change="handRoomTier">
                  <el-option :label="'全部'" :value="null"> </el-option>
                  <el-option v-for="item in options12" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
          </div>
          <div class="div" v-if="selectValue1!=2">
            <div class="div2">
              <span class="span2">房间</span>
                <el-select v-model="selectValue12">
                  <el-option :label="'全部'" :value="null"> </el-option>
                  <el-option v-for="item in options13" :key="item.roomId" :label="item.roomNo" :value="item.roomId"> </el-option>
                </el-select>
            </div>
          </div>
      </div>
      <span v-if="messageUserIfo==1" slot="footer" class="dialog-footer">
        <el-button v-if="popupTitle=='新增'" size="small" type="primary" @click="messageUserIfo=2">通知目标</el-button>
        <el-button v-else size="small" type="primary" @click="updateUserManages2">确 定</el-button>
        <el-button size="small" @click="newAdd = false">取 消</el-button>
      </span>
      <span v-else slot="footer" class="dialog-footer">
        <el-button size="small" @click="messageUserIfo=1">继续编辑</el-button>
        <el-button size="small" type="primary" @click="updateUserManages">确 定</el-button>
        <el-button size="small" @click="newAdd = false">取 消</el-button>
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
    queryClassById
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
      selectValue:null,
      selectValue1:null,
      selectValue2:null,
      selectValue3:null,
      selectValue4:null,
      selectValue5:null,
      selectValue6:null,
      selectValue7:null,
      selectValue8:null,
      selectValue9:null,
      selectValue10:null,
      selectValue11:null,
      selectValue12:null,

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
        { name: "标题", props: "roleInfoName" },
        { name: "编辑时间", props: "userInfoName"},
        { name: "发送时间", props: "manageRange" },
        { name: "发送状态", props: "userName" },
        { name: "编辑人", props: "userName" },
        { name: "目标人员", props: "userName" }
      ],
      // tableList: [],
      multipleSelection: [],
      tableData: [
        {roleInfoName:'你好啊',userInfoName:'2012-20-22 20:00',userName:'已发送'},
        {roleInfoName:'你好',userInfoName:'2012-20-22 20:00',userName:'待发送'},


      ],
      pageSize:10,
      pageNum1:1,
      total:0,
      currentPage2: 1,   
       options:[
         {label:'全部',id:null,}, 
         {label:'已发送',id:0,}, 
         {label:'待发送',id:1,},
       ],
       options1:[
         {label:'全部',id:null,}, 
         {label:'短信',id:0,}, 
         {label:'微信',id:1,},
       ],
       options2:[
         {label:'全部',id:null,}, 
         {label:'学生',id:0,}, 
         {label:'宿管',id:1,},
         {label:'辅导员',id:2,},
       ],
        options3:[
         {label:'全部',id:null,}, 
         {label:'汉族',id:0,}, 
         {label:'其他',id:1,},
       ],
        options4:[
         {label:'全部',id:null,}, 
         {label:'大专',id:0,}, 
         {label:'本科',id:1,},
         {label:'研究生',id:2,}, 
         {label:'博士',id:3,},
       ],
        options5:[
         {label:'全部',id:null,}, 
         {label:'男',id:0,}, 
         {label:'女',id:1,},
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
    };
  },
   mounted () {
       bus.$on('handleSizeChange2',(val)=>{
                this.handleSizeChange2(val)
            })
        this.arealist()
      this.queryCollegeByNames()
      this.queryByYearNames2()
 },
 created(){
    
 },
  methods: {
    // 分页
    //页数量
      handleSizeChange2(val) {
        this.pageSize =val
        console.log(val)

      },
      // 页码
      handleCurrentChange(val) {
           this.pageNum =val
          console.log(val)
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
                     this.selectValue6=null    
                      this.selectValue7=null 
                      this.selectValue8=null   
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
                    if(res.data.code==200&&res.data.data!=null){                      
                        this.options9=res.data.data
                        this.selectValue8=null                                                          
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
                this.selectValue10=null  
                this.selectValue11=null
                this.selectValue12=null
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
                  this.selectValue11=null
                  this.selectValue12=null  
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
              this.selectValue12=null    
            }
          });
    },
      //新增
    addNotice( ){
      
      this.newAdd=true
      this.popupTitle='新增'
    },
        //tab列表请求
      list(){
        
      },
      //切换角色下拉
      cutRole(val){
        console.log(val)
      },
      //编辑collegeControl
    handleEdit(val){
      this.newAdd=true
      this.popupTitle='修改'
      this.messageUserIfo=1
       console.log(val)
       
    }, 
    
    //查询
    search(){
    
      
    },
  
    //   多选表格删除userInfoName
     toggleSelection() {
       let phone=[],
          roleInfoId=[];
       if(this.multipleSelection.length<1){
          this.$message({message:'请选择你要删除的数据！'}); 
       }else{
        //  this.multipleSelection.forEach(data=>{
        //    phone.push(data.userInfoName)
        //    roleInfoId.push(data.roleInfoId)
        //  })
          this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
      
            //   deleteUserManage({
            //       phone:phone.join(','),
            //       roleInfoId :roleInfoId.join(',')
            //       }).then(res=>{
    
            //       if(res.status==200&&res.data.code==200){
            //           this.list()                                                                         
            //           this.$message({type: 'success',message: '删除成功!'});
            //       }else{
            //           this.$message({                                           
            //               message: '删除失败'+res.data.msg
            //           });
            //       }
            //   })
              
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
            //  deleteUserManage({phone:val.userInfoName,roleInfoId:val.roleInfoId}).then(res=>{
            //    if(res.data.code===200){
            //      this.$message({message:'删除成功',type:'success'}); 
            //      this.list()
            //    }else{
            //      this.$message({message:'删除失败 '+res.data.msg}); 
            //    }
            //  })
          }) 
    },
      //模态框消失
      shutModal(){
          
      },    
      //新增保存
      updateUserManages(){
        this.newAdd=false
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
  
  .header {
    min-height:120px;
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
    }
  }
  .collegeNmaeBox{
          display: flex;
          width: 100%;
          min-height:35px;
          align-items: center;
          padding: 5px 0;
         
        .collegeNmae2{
            margin-right: 10px;
            display: flex;
        }
        .spanName{
            color: $haedColor;
            font-size: 14px;
            margin-left: 10px;
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
      overflow: auto;
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
  .newMsg{
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






