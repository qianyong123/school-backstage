<template>
  <div class="CallerRecord" @click="deleteId=null">
    <div class="header">
      <h4>访客记录</h4>
      <div class="collegeNmaeBox">
        <div class="collegeNmae2">
            <span class="spanName" style=" margin-left:0px;">区域：</span>     
            <el-select v-model="selectValue1" @change="changeArea" placeholder="请选择" style="width:120px">
                  <el-option           
                :label="'全部'"
                :value="null"
                ></el-option>
                <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.regionName"
                :value="item.regionId"
                ></el-option>
            </el-select>   
            <span class="spanName">楼栋：</span>     
            <el-select v-model="selectValue2" placeholder="请选择" style="width:120px">
                 <el-option           
                :label="'全部'"
                :value="null"
                ></el-option>
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.floorName"
                :value="item.floorId"
                ></el-option>
            </el-select>    
            <span class="spanName">时间：</span>     
            <el-date-picker
                v-model="value1"
                type="date"
                style="width:120px"
                format="yyyy/MM/dd"
                :clearable="false"
                value-format="timestamp"
                placeholder="年/月/日">
                </el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                v-model="value2"
                type="date"
                style="width:120px"
                format="yyyy/MM/dd"
                :clearable="false"
                value-format="timestamp"
                placeholder="年/月/日">
                </el-date-picker>
                <el-input style="width:120px;margin-left:10px;" v-model="value3" placeholder="姓名/学号"></el-input>                       
            <el-button style="margin-left:10px;" size="small"  @click="queryCallerRecord">查询</el-button>    
        </div>
        <el-button size="small" icon="el-icon-upload2"  @click="exportData"></el-button>      
      </div>
    </div>
    <div class="content">
      <div class="tablesx">
        <el-table      
          stripe
          height="100%"
          :data="tableData"
          style="width: 100%;"
          tooltip-effect="dark"
        >
          <el-table-column width="30">
                    <template slot-scope="scope">
                        <div style=" visibility: hidden;">{{scope.$index}}</div>
                    </template>
                   
            </el-table-column> 
           <el-table-column width="150" :label="'照片'">
                    <template slot-scope="scope">
                      <div class="imgBox">
                          <img class="img" :src="scope.row.visitorImg==null?'':scope.row.visitorImg" alt="">
                      </div>
                    </template>
                   
            </el-table-column> 
          <el-table-column
            v-for="item in accountList"
            :key="item.name"
            :prop="item.props"
            :label="item.name"
          ></el-table-column>
          <el-table-column v-if="navjurisdiction2()"  label="操作" width="80"  align="center" header-align="center">
            <template slot-scope="scope" style="position: relative;">         
               <div>                 
                    <p style="color:#4CABFD;cursor: pointer;" @click="handleEdit(scope.row)">更多</p>                                                                  
                </div>  
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
     <!-- 分页 -->
    <div class="pagexs">
         <div class="pagination_1">
          <el-pagination
      @size-change="handleSizeChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="10"
      layout="sizes,total"
      :total="total">
    </el-pagination>
    </div>
    <div class="pagination_2">
      <el-pagination
      background
       @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="prev, pager, next,jumper,slot"
      :total="total">
      <span style="margin-left:1%;"> <el-button style="border:1px solid #dcdfe6">确认</el-button></span>
    </el-pagination>
    </div>
     </div>
      <!-- <div></div> -->
    </div>
    <!--  table -->
    <!-- 新增弹框 -->
    <el-dialog  center @close="shutModal"  :visible.sync="more" width="560px">
      <div class="CallerRecordss">
        
         <div class="logImg">
            <div style="width:130px;height:150px;">
                <img :src="userMsg.visitorImg==null?'':userMsg.visitorImg" alt="">
            </div>
        </div> 
        <div class="userIfoBox">
            <div class="div">
                <span class="span">访客姓名：</span>
                <span>{{userMsg.visitorName}}</span>
            </div>
            <div class="div">
                <span class="span">手机：</span>
                <span>{{userMsg.visitorPhone}}</span>
            </div>
            
            <div class="div div2">
                <span class="span">身份证号：</span>
                <span>{{userMsg.visitorIdnum}}</span>
            </div>
            <div class="div">
                <span class="span">访问对象：</span>
                <span>{{userMsg.studentInfoName}}</span>
            </div>
            <div class="div">
                <span class="span">学号：</span>
                <span>{{userMsg.studentInfoNo}}</span>
            </div>
            <div class="div div2">
                <span class="span">访问地址：</span>
                <span class="span2">{{userMsg.roomMsg}}</span>
            </div>
            <div class="div div2">
                <span class="span">来访时间：</span>
                <span class="span2">{{userMsg.visitorCome}}</span>
            </div>
            <div class="div div2">
                <span class="span">离开时间：</span>
                <span class="span2">{{userMsg.visitorTo}}</span>
            </div>
            <div class="div">
                <span class="span">关系：</span>
                <span>{{userMsg.applyVisitorType}}</span>
            </div>
           <div class="div" v-if="userMsg.applyVisitorType!='同学'">
                <span class="span">性别：</span>
                <span>{{userMsg.studentInfoSex}}</span>
            </div>
            <div class="div div2">
                <span class="span">访问事由：</span>
                <span>{{userMsg.visitorReason}}</span>
            </div>
        </div>
      </div>
     
       </el-dialog>
    <!-- //编辑 -->
    <!-- 辅导员 -->
<!-- 宿管 -->
  </div>
</template>

<script>
import {
  queryMenuById,
  queryVisitorRecord,
  visitorRecordExcelOut
  } from '@/axios/api.js'
import {
  floorlist_2,
  arealist_2
  } from '@/axios/api1.js'
export default {
  name: "RoleMange",
  components: {
  },
  data() {
    return {
      roleInfoId: null, //tab 表转换
      jurisdictional: true,  //管辖范围 显示隐藏
      tableId: [],
        selectValue1:null,
        selectValue2:null,

        value1:'',
        value2:'',
        value3:'',
        value4:null,
      deleteId:null,
      more:false,
      accountList: [
        // { name: "照片", props: "visitorImg" },
        { name: "访问姓名", props: "visitorName"},
        { name: "电话", props: "visitorPhone" },
        { name: "来访时间", props: "visitorCome" },
        { name: "离开时间", props: "visitorTo" },
        { name: "访问对象", props: "studentInfoName" },
         { name: "房间信息", props: "roomMsg" },
          { name: "事由", props: "visitorReason" },
      ],
      // tableList: [],
      multipleSelection: [],
      tableData: [],
      pageSize:10,
      pageNum:1,
      total:0,
      currentPage2: 1,
      options1:[],
      options2:[],
      roleInfoMenu:[],
      roleId:null,
      userMsg:{}
    };
  },
  mounted () {
     //区域
        arealist_2().then(res=>{               
            if(res.data.code==200&&res.data.data!=null){
                this.options1=res.data.data
            }
        })
 },
 created(){
       this.roleInfoMenu=this.$store.state.roleInfoMenu
       this.queryVisitorRecords()
          let roleId=localStorage.getItem('roleId')  
          this.roleId=roleId
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
                    return this.roleInfoMenu[4].indexOf('5')==-1?false:true
                }
                
            }
        }
    },
  methods: {
    // 分页
    //页数量
      handleSizeChange(val) {
        this.pageSize =val
         this.queryVisitorRecords()

      },
      // 页码
      handleCurrentChange(val) {
           this.pageNum =val
           this.queryVisitorRecords()
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
        //导出数据    
      exportData(){
         visitorRecordExcelOut({
          regionId:this.selectValue1,
          floorId:this.selectValue1,
          visitorCome_start:this.value1,
          visitorCome_end:this.value2,
          nameOrNo:this.value3,       
        }).then(res=>{
                if(res.status==200&&res.data!=null){
                      this.blobs(res.data,'访问记录.xls')
                  }else{
                      this.$message('导出失败',res.data.msg)
                  }
              })
      },
      //查询访客记录
      queryVisitorRecords(){
        queryVisitorRecord({
          regionId:this.selectValue1,
          floorId:this.selectValue1,
          visitorCome_start:this.value1,
          visitorCome_end:this.value2,
          nameOrNo:this.value3,
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }).then(res=>{
          console.log('访客记录',res)
          if(res.data.code==200){
            this.tableData=res.data.data.list
            this.total=res.data.data.total
          }else{
            this.$message('查询访客记录失败 ' +res.data.msg);
          }
        })
      },
    //查询
     queryCallerRecord() {
        console.log('查询访客记录')
        this.queryVisitorRecords()
      },
      //模态框消失
      shutModal(){
          
      },
      
      //区域下拉
      changeArea(){
            floorlist_2({ regionId:this.selectValue1}).then(res => {
            console.log("楼栋",res)
             this.selectValue2=null
            
            if (res.data.code === 200&&res.data.data!=null) {           
              this.options2=res.data.data
            }
          });
      },
      
    //点击操作
     clickOperate(scope,row){
          console.log(scope,row)
          this.deleteId=scope.$index
         
      },
   
     //编辑collegeControl
    handleEdit(val){
        this.more=true
       console.log(val)
      this.userMsg=val
    },
   
  }
};
</script>
<style lang="scss" scoped>
@import "../../stylecss/commonStyle.scss";
.CallerRecord {
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
    justify-content: space-between;
    text-align: left;
    padding:20px 0px 10px 0px;
    h4{
        color: $haedColor;
        border-left: 2px solid $bcgColor;
        padding-left: 10px;
    }
  }
  .collegeNmaeBox{
          display: flex;
           min-height:32px;
          width: 100%;
        justify-content: space-between;
          padding: 5px 0;
        .collegeNmae2{       
            display: flex;
            min-height:32px;
           align-items: center;
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
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    .tablesx {
      flex: 1;
       overflow: hidden;
      border-radius:15px 15px 0 0;
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
   
  }
    // 查看
    .CallerRecordss{
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
                padding-left: 20px;
                flex-wrap: wrap;
                align-content: flex-start;
                margin-top:6px;
                justify-content: space-between;
            }
            .logImg{
                display: flex;
                flex-direction: column;
                align-items: center;    
                width: 130px;
                height:100%;  
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
                    // margin-right: 10px;
                }    
            }     
            .div2{
                width: 100%; 
                min-height:10px; 
                display: flex;
                align-items:flex-start;  
                margin-bottom :20px;
                // margin-top: 6px;
                // cursor: pointer;
                .span2{
                    display: inline-block;
                    min-width: 60px;
                    text-align:left;
                    line-height: 20px;
                    // margin-right: 12px;
                }
            }
        
        }
    .pagexs{
        z-index: 55;
        width: 100%;
        display: flex;
        align-items: center;
        height: 50px;
    }
    .pagination_2{
        margin: 0 auto;
    }
}


</style>






