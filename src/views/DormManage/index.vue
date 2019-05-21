<template>
  <div class="AccountMange" @click="deleteId=null">
    <div class="header">
      <h4>宿舍管理</h4>
      <el-tabs style="flex:1;font-size:14px;" v-model="activeName" @tab-click="handleClick">
        <!-- //区域管理 -->
        <el-tab-pane label="区域管理" name="first">
          <div class="collegeNmaeBox">   
            <div class="collegeNmae">
              <el-button size="small" icon="el-icon-plus" @click="dialogArea_2()"></el-button>
              <el-button size="small" icon="el-icon-delete" @click="dialogArea_detele()"></el-button>
              <el-upload
                class="upload-demo"
                style="margin-left:10px;"
                action="https://jsonplaceholder.typicode.com/posts/"              
                :on-change="handleAvatarSuccess"
                :show-file-list="false"                  
                :limit="1"
                :auto-upload='false'
                :on-exceed="handleExceed"
                :file-list="fileList">
                  <el-button size="small" icon="el-icon-download"></el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              <!-- <el-button size="small"  icon="el-icon-upload2" @click="dialogAdd = true"></el-button> -->
              <el-input v-model="input_search" style="width:130px;margin:0 10px" placeholder="区域名"></el-input>
                <el-button size="small" @click="search">查询</el-button>             
            </div>        
             
            <el-button size="small" icon="el-icon-upload2" @click="regionexports"></el-button>
            
          </div>
        </el-tab-pane>
        <!-- //楼栋管理 -->
        <el-tab-pane label="楼栋管理" name="second">
          <div class="collegeNmae">
              <el-button size="small" icon="el-icon-plus" @click="dialogFloor_2()"></el-button>
              <el-button size="small" icon="el-icon-delete" @click="dialogArea_detele()"></el-button>
              <span class="spanName" style="font-size:14px;">区域：</span>
              <el-select
                v-model="value_2_1"
                placeholder="请选择"
                style="width:130px"
                @change="indexSelect_6"
              >
              <el-option            
                  :label="'全部'"
                  :value="null"
                ></el-option>
                <el-option
                  v-for="item in options"
                  :key="item.regionId"
                  :label="item.regionName"
                  :value="item.regionId"
                ></el-option>
              </el-select>
          
            <span class="spanName" style="font-size:14px;">性别：</span>
       
              <el-select
                v-model="value_2_2"
                placeholder="请选择"
                style="width:130px"            
              >
                <el-option
                  v-for="(item,index) in options_2"
                  :key="index"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
       
            <span class="spanName"  style="font-size:14px;">空置：</span>          
              <el-select
                v-model="value_2_3"
                placeholder="请选择"
                style="width:130px"      
              >
                <el-option
                  v-for="item in options_3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
          
              <el-input v-model="input_2_5" style="width:130px;margin:0 10px;" placeholder="楼栋名"></el-input>
          
          
              <el-button size="small" @click="search">查询</el-button>
            
          </div>

        
         
        </el-tab-pane>
        <!-- //房间管理 -->
        <el-tab-pane label="房间管理" name="third">
          <div class="collegeNmae">
            <el-button size="small" icon="el-icon-plus" @click="dialogHouses_2()"></el-button>
            <el-button size="small" icon="el-icon-delete" @click="dialogArea_detele()"></el-button>
            <span class="spanName" style="font-size:14px;">区域：</span>         
              <el-select
                v-model="value_3_1"
                placeholder="请选择"
                style="width:130px"
                @change="indexSelect_10"
              >
               <el-option            
                  :label="'全部'"
                  :value="null"
                ></el-option>
                <el-option
                  v-for="item in options"
                  :key="item.regionId"
                  :label="item.regionName"
                  :value="item.regionId"
                ></el-option>
              </el-select>
          
            <span class="spanName" style="font-size:14px;">楼栋名：</span>
       
              <el-select
                v-model="value_3_2"
                placeholder="请选择"
                style="width:130px"
                @change="indexSelect_11"
              >
              <el-option               
                  :label="'全部'"
                  :value="null"
                ></el-option>
                <el-option
                  v-for="item in options_4"
                  :key="item.floorId"
                  :label="item.floorName"
                  :value="item.floorId"
                ></el-option>
              </el-select>
      
            <span class="spanName" style="font-size:14px;">楼层：</span>
     
              <el-select
                v-model="value_3_3"
                placeholder="请选择"
                style="width:130px"         
              >
               <el-option                        
                  :label="'全部'"
                  :value="null"
                ></el-option>
                <el-option
                  v-for="(item,index) in options_5"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
        
            <span class="spanName" style="font-size:14px;">空置：</span>
         
              <el-select
                v-model="value_3_4"
                placeholder="请选择"
                style="width:130px;margin-right:10px;"
              >
                <el-option
                  v-for="item in options_3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
           
          
              <el-button size="small" @click="search">查询</el-button>
          
          </div>
   
            
         
        </el-tab-pane>
        <!-- //床位管理 -->
        <el-tab-pane label="床位管理" name="fourth">
          <div class="collegeNmae">
            <el-button size="small" icon="el-icon-plus" @click="dialogBeds"></el-button>
            <el-button size="small" icon="el-icon-delete" @click="dialogArea_detele()"></el-button>
            <el-button size="small" @click="bedbatchRetirements">退寝</el-button>
            <el-button size="small" @click="bedIdFPs">床位分配</el-button>
            <span class="spanName" style="font-size:14px;">区域：</span>          
              <el-select
                v-model="value_4_1"
                placeholder="请选择"
                style="width:130px"
                @change="indexSelect_10"
              >     
               <el-option            
                  :label="'全部'"
                  :value="null"
                ></el-option>        
                <el-option
                  v-for="item in options"
                  :key="item.regionId"
                  :label="item.regionName"
                  :value="item.regionId"
                ></el-option>
              </el-select>
        
            <span class="spanName" style="font-size:14px;">楼栋名：</span>
         
              <el-select
                v-model="value_4_2"
                placeholder="请选择"
                style="width:130px"
                @change="indexSelect_11"
              >
              <el-option               
                  :label="'全部'"
                  :value="null"
                ></el-option>
                <el-option
                  v-for="item in options_6"
                  :key="item.floorId"
                  :label="item.floorName"
                  :value="item.floorId"
                ></el-option>
              </el-select>
       
            <span class="spanName" style="font-size:14px;">楼层：</span>
           
              <el-select
                v-model="value_4_3"
                placeholder="请选择"
                style="width:130px"
              >
              <el-option               
                  :label="'全部'"
                  :value="null"
                ></el-option>
                <el-option
                  v-for="(item,index) in options_7"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
       
            <span class="spanName" style="font-size:14px;">空置：</span>

              <el-select
                v-model="value_4_4"
                placeholder="请选择"
                style="width:130px;margin-right:10px;"      
              >
                <el-option
                  v-for="item in options_3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>            
              <el-input :class="{respondCss:isdownload==1}" v-model="input_4_4" style="width:130px;margin-right:10px;" placeholder="学生姓名/学号"></el-input>                
              <el-button :class="{respondCss:isdownload==1}" size="small" @click="search">查询</el-button>
          
          </div>
       
            
          
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <div class="tablesx">
        <el-table
          ref="multipleTable"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.8)"
          stripe
          height="100%"
          :data="tableData"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="item in tableheaderList"
            :key="item.name"
            :prop="item.props"
            :label="item.name"
            
          ></el-table-column>
          <el-table-column v-if="navjurisdiction()" label="操作" width="80" class-name>
            <template slot-scope="scope" style="position: relative;">
              <!-- <el-button
                size="small"
                @click="handleAdjust(scope.row)"

                v-if="tabindex=='3'&&scope.row.checkInSituation!='空置'"
              >调寝</el-button>
              <el-button
                size="small"
                @click="handleQuit(scope.row)"
                v-if="tabindex=='3'&&scope.row.checkInSituation!='空置'"
              >退寝</el-button>
              <el-button size="small" @click="handleEdit(scope.row)" v-if="checkInSituations(scope.row)">编辑</el-button> v-if="checkInSituations(scope.row)"
              <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button> -->
                <div>
                    <i class="el-icon-more" @click.stop="clickOperate(scope, scope.row)"></i>
                    <div class="operate" v-if="scope.$index==deleteId">
                      <p v-if="tabindex=='3'&&scope.row.checkInSituation!='空置'" @click="handleAdjust(scope.row)">调寝</p>
                      <p v-if="tabindex=='3'&&scope.row.checkInSituation!='空置'" @click="handleQuit(scope.row)">退寝</p>
                      <p @click="handleEdit(scope.row)">编辑</p>
                      <p @click="handleDelete(scope.row)">删除</p>                                  
                    </div>
                </div>  
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="pagexs">
        <div class="pagination_1">
          <el-pagination
            @size-change="handleSizeChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 15, 20, 30]"
            :page-size="10"
            layout="sizes,total"
            :total="total"
          ></el-pagination>
        </div>
        <div class="pagination_2">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="prev, pager, next,jumper,slot"
            :total="total"
          >
            <span style="margin-left:10px;">
              <el-button style="border:1px solid #dcdfe6">确认</el-button>
            </span>
          </el-pagination>
        </div>
      </div>
      <!-- <div></div> -->
    </div>
    <!--  table -->
    <!-- 区域管理 新增弹框 -->
    <el-dialog :title="regionId ==null?'新增':'修改'" center :visible.sync="dialogArea" width="320px">
      <div class="adds">
        <div>
          <span style="width:60px;">区域名</span>
          <el-input v-model="input_area" style="width:180px" placeholder="请输入内容"></el-input>
        </div>
        <div style="margin-top:10px;">
          <span style="width:60px;">楼栋数</span>
          <el-input v-model="input_floor" type="number" style="width:180px" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
         <el-button size="small" type="primary" v-if="!regionId" @click="dialogAreas()">确定</el-button>
        <el-button size="small" type="primary" v-if="regionId" @click="dialogAreas_2()">确定</el-button>
        <el-button size="small" @click="dialogArea = false">取消</el-button>
       
      </div>
    </el-dialog>
    <!-- 楼栋管理 -->
    <el-dialog :title="regionId ==null?'新增':'修改'" center :visible.sync="dialogFloor" width="520px">
      <div class="adds_2">
        <div>
          <span>所属区域</span>
          <el-select
            v-model="select_2_1"
            placeholder="请选择"
            style="width:128px"
            @change="indexSelect_9"
           :disabled="regionId!=null?true:false"
          >
            <el-option
              v-for="item in options"
              :key="item.regionId"
              :label="item.regionName"
              :value="item.regionId"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>楼栋名</span>
          <el-input v-model="input_2_1" style="width:128px" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>入住性别</span>
          <el-select
            v-model="select_2_2"
            placeholder="请选择"
            style="width:128px"        
          >
            <el-option
              v-for="item in newoptions_2"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>楼层数</span>
          <el-input v-model="input_2_2" type="number"  style="width:128px" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>每层房间数</span>
          <el-input v-model="input_2_3" type="number" style="width:128px" placeholder="请输入内容"></el-input>
        </div>
        <div style="margin-top:10px;">
          <span>房间床位数</span>
          <el-input v-model="input_2_4" type="number" style="width:128px" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!-- 文字描述 -->
      <div style="margin-top:20px;">
        <p style="line-height: 20px;text-align: left;">
         
          <span style="margin-bottom:5px;">
          *楼栋数据输入完成后，若减少“楼层数”、“房间数”、“床位数”、修改性别等数值，系统将对原住宿人员作
          </span>
         
          <span style="color:red">退寝处理</span>，请谨慎操作
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" v-if="!regionId" @click="dialogFloors()">确 定</el-button>
        <el-button size="small" type="primary" v-if="regionId" @click="dialogFloors_2()">确定</el-button>
        <el-button size="small" @click="dialogFloor = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 房间管理 -->
    <el-dialog :title="regionId ==null?'新增':'修改'" center :visible.sync="dialogHouse" width="520px">
      <div class="adds_2">
        <div>
          <span>所属区域</span>
          <el-select
            v-model="select_3_1"
            placeholder="请选择"
            style="width:128px"
            @change="newSlect"
            :disabled="regionId ==null?false:true"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.regionName"
              :value="item.regionId"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>所属楼栋</span>
          <el-select
            v-model="select_3_2"
            placeholder="请选择"
            style="width:128px"
            :disabled="regionId ==null?false:true"
            @change="newSlect2"
          >
            <el-option
              v-for="item in newfloorList"
              :key="item.floorId"
              :label="item.floorName"
              :value="item.floorId"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>所属楼层</span>
          <el-select
            v-model="select_3_3"
            placeholder="请选择"
            style="width:128px"
            :disabled="regionId ==null?false:true"
          >
            <el-option
              v-for="item in newfloorList2"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>房间号</span>
          <el-input :disabled="regionId ==null?true:false" type="number" placeholder="自动生成" v-model="input_3_1"  style="width:128px" ></el-input>
        </div>
        <div>
          <span>床位数</span>
          <el-input v-model="input_3_2" type="number" style="width:128px" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!-- 文字描述 -->
      <div style="margin-top:5%;">
        <p style="line-height: 20px;text-align: left;">
          <span style="margin-bottom:5px;">
            *房间数据输入完成后，若减少“床位数”，系统将对原住宿人员作
          </span>
          <span style="color:red">退寝处理</span>，请谨慎操作
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" v-if="regionId==null" @click="dialogHouses">确定</el-button>
        <el-button size="small" type="primary" v-else @click="editRoom">确定</el-button>
        <el-button size="small"  @click="dialogHouse = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 床位管理 -->
    <el-dialog title="新增" :visible.sync="dialogBed" center width="520px">
      <div class="adds_2">
        <div>
          <span>所属区域</span>
          <el-select
            v-model="select_4_1"
            placeholder="请选择"
            style="width:128px"
            @change="newSlect"          
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.regionName"
              :value="item.regionId"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>所属楼栋</span>
          <el-select
            v-model="select_4_2"
            placeholder="请选择"
            style="width:128px"
            @change="newSlect2"
          >
            <el-option
              v-for="item in newfloorList"
              :key="item.floorId"
              :label="item.floorName"
              :value="item.floorId"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>所属楼层</span>
          <el-select
            v-model="select_4_3"
            placeholder="请选择"
            style="width:128px"
            @change="newSlect3"
          >
            <el-option
              v-for="item in newfloorList2"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>房间号</span>
         <el-select
            v-model="select_4_4"
            placeholder="请选择"
            style="width:128px"
          >
            <el-option
              v-for="item in newfloorList3"
              :key="item.roomId"
              :label="item.roomNo"
              :value="item.roomId"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>床位数</span>
          <el-input v-model="input_4_3" type="number" style="width:128px" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!-- 文字描述 -->
      <div style="margin-top:20px;">
        <p style="line-height: 20px;text-align: left;">
          <span style="margin-bottom:5px;">
            *房间数据输入完成后，若减少“床位数”，系统将对原住宿人员作
          </span>
          <span style="color:red">退寝处理</span>，请谨慎操作
        </p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="bedsaves()">确 定</el-button>
        <el-button size="small" @click="dialogBed = false">取 消</el-button>
      </div>
    </el-dialog>
      <!-- 床位分配-->
    <el-dialog title="床位分配" center  @close="shutModal" :visible.sync="bedIdFP"  width="760px">
      <div style="  min-height:126px;width:100%">
          <div class="bedFP" v-show="isfenpeng">
            <div class="div" style="margin-left:0">
              <span>所属院系</span>
              <el-select
                v-model="select_5_1"
                placeholder="请选择"
                style="width:128px"   
              >
                <el-option
                  v-for="(item,index) in selectList5_1"
                  :key="index"
                  :label="item.college_name"
                  :value="item.college_id"
                  @click.native="fenpengSelect(item)"
                ></el-option>
              </el-select>
            </div>
            <div  class="div">
              <span>所属专业</span>
              <el-select
                v-model="select_5_2"
                placeholder="请选择"
                style="width:128px"
              
              >
                <el-option
                  v-for="(item,index) in selectList5_2"
                  :key="index"
                  :label="item.major_name"
                  :value="item.major_id"
                  @click.native="fenpengSelect2(item)"
                ></el-option>
              </el-select>
            </div>
            <div  class="div" >
              <span>所属年级</span>
              <el-select
                v-model="select_5_6"
                placeholder="请选择"
                style="width:128px"
              
              >
                <el-option
                  v-for="(item,index) in allYear"
                  :key="index"
                  :label="item.year_name"
                  :value="item.year_id"
                  @click.native="fenpengSelect3(item)"
                ></el-option>
              </el-select>
            </div>
            <div class="div" style="margin-left:0">
              <span>所属班级</span>
              <el-select
                v-model="select_5_3"
                placeholder="请选择"
                style="width:128px"          
              >
                <el-option
                  v-for="(item,index) in selectList5_3"
                  :key="index"
                  :label="item.class_name"
                  :value="item.class_id"
                ></el-option>
              </el-select>
            </div>
            <div class="div">
              <span>性别</span>
            <el-select
                v-model="select_5_4"
                placeholder="请选择"
                style="width:128px"
              >
                <el-option
                  v-for="item in options_4_2"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
            <div  class="div">
              <span>分配状态</span>
              <el-select
                v-model="select_5_5"
                placeholder="请选择"
                style="width:128px"
              >
                <el-option
                  v-for="item in fenpeng"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="div">
                <el-button size="small" @click="queryStudentInfoBeds">查询</el-button>
            </div>
          </div>
      </div>
      <div v-if="isfenpeng" class="bedFP2">
           <el-table
            :data="tableData4"
            ref="multipleTable2"
            tooltip-effect="dark"
            height="400"
            @selection-change="handleSelectionChange2"
            style="width:100%">
            <el-table-column
            type="selection"
            width="55">
          </el-table-column>
            <el-table-column
              prop="studentInfoName"
              label="姓名"
          >
            </el-table-column>
            <el-table-column
              prop="studentInfoNo"
              label="学号"
          >
            </el-table-column>
            <el-table-column
              prop="bedMsg"
              label="分配状态">
               <template slot-scope="scope">
                    <div v-if="scope.row.bedMsg=='未分配'" style="color:#E01763;">{{scope.row.bedMsg}}</div>
                    <div v-else>{{scope.row.bedMsg}}</div>
               </template>
            </el-table-column>
          </el-table>
       
              <paginations :total='total2'></paginations>         
         
      </div>
      <div v-else class="bedFP4">
          <div>
              <div class="bedFP2-div" v-for="item in tableData6" :key="item.id">
                  {{item.name}}
              </div>  
          </div>
          <div style="margin-left:50px;">
              <el-radio-group v-model="bedRedio">
                <div class="bedFP2-div" v-for="item in tableData5" :key="item.id">
                  <el-radio :label="item.id">{{item.name}}</el-radio>
                </div>               
              </el-radio-group>
          </div>
      </div>
      <!-- <div slot="footer" class="dialog-footer" style="padding:10px;">
        <el-button size="small" type="primary" @click="bedFPsaves()">确 定</el-button>
        <el-button size="small" @click="bedIdFP = false">取 消</el-button>
      </div> -->
      <div class="bedFP3">
          <div>
              <span>选择床位数：{{bedAmount}}</span>
              <span style="margin:15px;">男床位数：{{bedAmount2.length}}</span>
              <span>女床位数：{{bedAmount3.length}}</span>
              <span style="margin-left:15px;">选择学生数：{{studentAmount}}</span>
          </div>
          <div v-if="isfenpeng2">
              <el-button size="small" type="primary" @click="onStep(1)">下一步</el-button>
              <el-button size="small" style="margin-left:10px;" @click="bedIdFP=false">取消</el-button>
          </div>
          <div v-else>
              <el-button size="small" @click="onStep(2)">上一步</el-button>
              <el-button size="small" type="primary" style="margin:0 10px;" @click="allotConfirm"> 确认</el-button>
              <el-button size="small" @click="bedIdFP=false">取消</el-button>
          </div>
      </div>
      
    </el-dialog>
    <!-- //调寝消息提示 -->
    <el-dialog
      
      title="提示"
      :close-on-click-modal="false"
      :visible.sync="dialogMsg"
      center
      width="350px"
    >
      <span style="color:#333;">请选择需要更换的寝室</span>
      
    </el-dialog>
    <!-- //调寝 -->
    <el-dialog title="调寝" @close="dialogBeds2" :close-on-click-modal="false" center :visible.sync="dialogMsg_2" width="500px">
       <div class="adds_2">
        <div>
          <span>所属区域</span>
          <el-select
            v-model="select_4_1"
            placeholder="请选择"
            style="width:128px"
            @change="newSlect"          
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.regionName"
              :value="item.regionId"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>所属楼栋</span>
          <el-select
            v-model="select_4_2"
            placeholder="请选择"
            style="width:128px"
            @change="newSlect2"
          >
            <el-option
              v-for="item in newfloorList"
              :key="item.floorId"
              :label="item.floorName"
              :value="item.floorId"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>所属楼层</span>
          <el-select
            v-model="select_4_3"
            placeholder="请选择"
            style="width:128px"
            @change="newSlect3"
          >
            <el-option
              v-for="item in newfloorList2"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>房间号</span>
         <el-select
            v-model="select_4_4"
            placeholder="请选择"
            style="width:128px"
            @change="newSlect4"
          >
            <el-option
              v-for="item in newfloorList3"
              :key="item.roomId"
              :label="item.roomNo"
              :value="item.roomId"
            ></el-option>
          </el-select>
        </div>
        <div style="margin-top:10px;">
          <span>床位号</span>
         <el-select
            v-model="select_4_5"
            placeholder="请选择"
            style="width:128px"
          >
            <el-option
              v-for="item in newfloorList4"
              :key="item.bedId"
              @click.native="newSlect5(item)"
              :label="item.bedNo"
              :value="item.bedId"
            ></el-option>
          </el-select>
        </div>       
      </div>
      <div class="tiaoqin">
        <div class="div">
          <span class="span">原居住人</span>
          <span>{{getUserInfo.studentInfoName}}</span>
        </div>
        <div class="div">
          <span class="span">辅导员</span>
          <span>{{getUserInfo.teacherInfoName}}&nbsp;&nbsp;{{getUserInfo.teacherInfoPhone}}</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="oNdialogMso(1)">确 定</el-button>
        <!-- <el-button size="small" @click="oNdialogMso(2)">重新选择</el-button> -->
        <el-button size="small" @click="dialogMsg_2=false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 床位编辑 -->
    <el-dialog
      title="修改" 
      :visible.sync="chuangwei"
      width="300px"
      center
    >
      <div>
        <span style="color:#333;">床位号</span>
         <el-input v-model="input_4_5" type="number" style="width:120px;margin:0 10px;" placeholder="输入数字"></el-input>
         <span>号床位</span>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="chuangweis()">确 定</el-button>
        <el-button size="small" @click="chuangwei = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  areaList,
  areaAdd,
  areaEdit,
  areaDetele,
  areaDeteles,
  floorList,
  arealist_2,
  floorAdd,
  floorEdit,
  houseList,
  floorlist_2,
  floorlist_3,
  bedList,
  bedEdit,
  floorDelete,
  floorDetail,
  roomedit,
  roomedelete,
  roomsave,
  bedsave,
  roomGetRoomNumber,
  beddelete,
  regionexport,
  batchDeletion,
  bedEdit2,
  bedbatchRetirement,
  bedExchangeBed,
  distribution,
  importRegionTemplateExcel,
  getOldResidenceInformation,
  getBedListByRoomId
} from "@/axios/api1.js";
import {
  queryCollegeByName,
  queryMajorByTerm,
  queryAllCalss,
  queryStudentInfoBed,
  queryByYearName,
  queryMenuById
} from '@/axios/api'
import { setTimeout } from "timers";
const item = {
  date: "2016-05-02",
  name: "王小虎",
  address: "上海市普陀区金沙江路 1518 弄"
};
import paginations from './Paginations'
import bus from '../../js/bus.js'
export default {
  name: "RoleMange",
  components: {
    paginations
  },
  data() {
    return {
        tableData4: [],
        tableData5: [
            {name: '同学院学生分配到一起',id:1},
            {name: '同专业学生分配到一起',id:2},
            {name: '同班级学生分配到一起',id:3},
            {name: '同民族学生分配到一起',id:4},
            {name: '同籍贯学生分配到一起',id:5},
          ],
          tableData6: [
            {name: '按学院分配',id:1},
            {name: '按专业分配',id:2},
            {name: '按班级分配',id:3},
            {name: '按民族分配',id:4},
            {name: '按籍贯分配',id:5},
          ],
      currentPage2: 1,
      pageNum: 1, //页码
      pageSize: 10, //页数量
      total:0,
      deleteId:null,
      regionId: null,
      fileList:[],
      // table button 显示隐藏
      checkInSituation: "",
      tormal: false, //判断床位传入的值是否为空置， 空置就隐藏
      normal: true, // 前3个显示编辑
      abnormal: false, //最后1个显示不一样
      tabtext: "区域管理", //获取tab切换时的值
      tabindex: "0", //获取tab切换的下标
      // tabs 弹出框显示隐藏
      dialogArea: false,
      dialogFloor: false,
      dialogHouse: false,
      dialogBed: false,
      dialogMsg: false, // 调寝消息消失提示
      dialogMsg_2: false, // 调寝 判断是否要选中
      dialogVal:null,//调寝的val
      chuangwei:false,//床位编辑
      // tabs 导航 下拉框
      activeName: "first",
      value_2_1: null,
      select_id_2_1:null, //区域列表 id
      select_id_2_2:null, //楼栋列表 id
      value_2_2:null,//楼栋性别
      value_2_3:null,
      value_3_1: null,
      value_3_2: null,
      value_3_3:null ,
      select_id_2_3: "", // 楼层值
      value_3_4:null,
      value_4_1: null,
      value_4_2: null,
      value_4_3: null,
      value_4_4: null,
      //tabs 输入框
      input_2_5: "",
      input_4_4: "",
      //弹出框参数
      //宿舍管理 input 参数
      input_area: "",
      input_floor: null,
      //楼栋管理参数
      select_2_1:null, //所属区域
      select_2_2:0, //性别
      input_2_1: "", //楼栋名
      input_2_2: "", //楼层名
      input_2_3: null, //放间数
      input_2_4: null,//床位数
      select_value_2_2: null, //转换数字后所属区域
      select_boole_2_2: null, //转换布尔后的空置
      floorid: null,
      //房间管理参数
      select_3_1: "",
      select_3_2: "",
      select_3_3: "",
      input_3_1: "",
      input_3_2: "",
      roomId:null,
      newfloorList:[],//楼栋下拉列表
      newfloorList2:[],//楼层下拉列表
      //床位管理参数
      select_4_1:null,
      select_4_2: null,
      select_4_3: null,
      select_4_4: null,
      select_4_5:null,
      bedId:null,
      input_4_1: "",
      input_4_2: "",
      input_4_3: null,
      input_4_5:'',//编辑床位
      newfloorList3:[], //房间下拉列表
      newfloorList4:[], //床位下拉列表
      jurisdictional: true, //管辖范围 显示隐藏
      tableId: [],
      options_6:[],//查询楼栋列表
      options_7:[],//查询楼层列表
      input_search: "",
      input_user: "",
      input_pwd: "",
      add_1: false,
      add_2: false,
      add_3: false,
      add_4: false,
      dialogAdd: false,
      input: "",
      //床位分配
      bedIdFP:false,
      select_5_1:null,
      select_5_2:null,
      select_5_3:null,
      select_5_6:null,//年级
      selectName1:'',
      selectName2:'',
      selectName6:'',
      select_5_4:'男',
      select_5_5:3,
      selectList5_1:[],
      selectList5_2:[],
      selectList5_3:[],
      isfenpeng2:true,
      isfenpeng:true,
      bedRedio:1,
      multipleSelection2:[],
      bedAmount:0,
      bedAmount2:[],
      bedAmount3:[],
      studentAmount:0,
      pageSize2:10,
      pageNum2:1,
      total2:0,
      fenpeng:[
        {id:3,name:'全部'},
        {id:1,name:'是'},
        {id:0,name:'否'},
      ],
      areaList: [
        { name: "区域名", props: "regionName" },
        { name: "楼栋数", props: "regionNum" }
      ],
      floorList: [
        { name: "楼栋名", props: "floorName" },
        { name: "宿管信息", props: "housemasterInfoName" },
        { name: "性别", props: "floorSex" },
        { name: "层数", props: "floorLayerNum" },
        { name: "房间数", props: "floorRoomsNum" },
        { name: "床位数", props: "floorBedsNum" },
        { name: "空置数", props: "vacantTotal" },
        { name: "所属区域", props: "regionName" }
      ],
      houseList: [
        { name: "房间号", props: "roomNo" },
        { name: "床位数", props: "roomBedNum" },
        { name: "空置数", props: "vacantTotal" },
        { name: "所属楼栋", props: "floorName" },
        { name: "所属区域", props: "regionName" }
      ],
      bedList: [
        { name: "床位号", props: "bedNo" },
        { name: "房间号", props: "roomNo" },
        { name: "入住情况", props: "checkInSituation" },
        { name: "所属楼栋", props: "floorName" },
        { name: "所属区域", props: "regionName" }
      ],
      loading: false,
      tableheaderList: [],
      multipleSelection: [],
      tableData: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      options_2: [
         {
          label: "全部",
          id: null
        },
        {
          label: "女",
          id: 1
        },
        {
          label: "男",
          id: 0
        }
      ],
       newoptions_2: [
       
        {
          label: "女",
          id: 1
        },
        {
          label: "男",
          id: 0
        }
      ],
      options_4_2: [
         
        {
          name: "女",
          id: 1
        },
        {
          name: "男",
          id: 0
        }
      ],
      options_3: [
        {
          label: "全部",
          id:null
        },
        {
          label: "是",
          id: 0
        },
        {
          label: "否",
          id: 1
        }
      ],
      options_4: [], //楼栋列表
      options_5: [], //楼栋楼层列表
      options: [],
      value: "",
      value_1: "",
      value_2: "",
      value_3: "",
      value_4: "",
      value_5: "",
      value_6: "",
      formLabelWidth: "120px",
      allYear:[],
      roleInfoMenu:[],
      roleId:null,
      getUserInfo:{},
      bedMsg:{},
      isdownload:0,
      numbers:/^([1-9]|1\d|20)$/  //1到20的正则
    };
  },
  mounted() {
      
    this.tableheaderList = this.areaList;
    this.list();
    bus.$on('handleSizeChange23',(val)=>{
        this.handleSizeChange23(val)
    })
  },
  created(){
      this.roleInfoMenu=this.$store.state.roleInfoMenu
    let roleId=localStorage.getItem('roleId')  
    this.roleId=roleId
     let widths=document.documentElement.clientWidth
        if(widths<=1460){
            this.isdownload=1
        }
    if(this.roleInfoMenu.length<1){
        
        if(roleId!=1){
            queryMenuById({roleId}).then(res=>{
                console.log('菜单权限',res)   
                if(res.data.code==200&&res.data.data.roleInfoMenuMain!=null){                   
                      this.roleInfoMenu=res.data.data.roleInfoMenu==null?[]:res.data.data.roleInfoMenu
                      this.$store.commit('roleInfoMenus',res.data.data.roleInfoMenu)                   
                    
                }else{
                  this.$router.push('/hideIndex')
                }
            })
              
        }
      }
    //查询全部学院           
      queryCollegeByName({collegeName:'', pageNum:0,pageSize:0}).then(res=>{
        console.log('全部学院2',res)
        if(res.status==200&&res.data.code==200){
                this.selectList5_1=res.data.data               
        }
    })
     this.queryByYearNames2()
  },
  computed:{
      navjurisdiction(){
          return function(){
              if(this.roleId==1){
                  return true
              }
               else if(this.roleInfoMenu.length<1){
                        return true
                    }
              else{
                  return this.roleInfoMenu[8].indexOf('9')==-1?false:true
              }
             
          }
      },
  },
  methods: {
    //导出区域
    regionexports(){
      regionexport().then(res=>{
        // console.log('导出区域',res)
        const content = res.data
        const blob = new Blob([content])
        const fileName = '导出区域.xls'
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
      })
    },
    //导入区域
    handleAvatarSuccess(file){
          console.log(file)
            let fd = new FormData();
            this.floorList=[]
          fd.append('file',file.raw);//传文件
          importRegionTemplateExcel(fd).then(res=>{
              if(res.data.code==200){                   
                    this.$message({message:'导入成功',type:'success'}); 
                    this.list();                                  
              }else{
                  this.$message({message:'导入失败' +res.data.msg}); 
              }

          })
    },
    //文件长度限制钩子
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
     //点击操作
        clickOperate(scope,row){
            console.log(scope,row)
            this.deleteId=scope.$index
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
    //床位编辑
    checkInSituations(row){
        if(this.tabindex!='3'){
          return true
        }else{
          return row.checkInSituation=='空置'?false:true
        }
    },
    // 分页
    //页数量
    handleSizeChange(val) {
      this.pageSize = val;

      if (this.tabindex === "0") {
        this.list();
      } else if (this.tabindex === "1") {
        this.list_2();
      } else if (this.tabindex === "2") {
        this.list_3();
      } else if (this.tabindex === "3") {
        this.list_4();
      }
    },
    // 页码
    handleCurrentChange(val) {
      this.pageNum = val;
      if (this.tabindex === "0") {
        this.list();
      } else if (this.tabindex === "1") {
        this.list_2();
      } else if (this.tabindex === "2") {
        this.list_3();
      } else if (this.tabindex === "3") {
        this.list_4();
      }
    },
    //床位分配分页页码
    handleCurrentChange22(val){
      this.pageNum2=val
      this.queryStudentInfoBed2()
    },
    //床位分配分页数量
    handleSizeChange23(val){
      this.pageSize2=val
      this.queryStudentInfoBed2()
    },
    //tab列表请求
    list() {
      this.loading=true
      areaList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        regionName: this.input_search
      }).then(res => {
        console.log(res);
        this.loading=false
        if (res.status === 200 && res.data.code === 200) {
          console.log('区域分页',res);
          
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
           arealist_2().then(res => {
            if (res.data.code === 200) {           
              this.options = res.data.data;
              // this.options.unshift({ regionName: "全部", regionId: null });
            }
          });
        }else{
          this.open6('查询失败',res.data.msg)
        }
      });
    },
    list_2() {
        this.loading=true     
      floorList({
         regionId: this.value_2_1,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          floorSex: this.value_2_2,
          isVacant: this.value_2_3,
          floorName: this.input_2_5
      }).then(res => {
        console.log(res);
        this.loading=false
        if (res.status === 200 && res.data.code === 200) {
          console.log(res);
          this.total = res.data.data.total;
          this.tableData = res.data.data.list
        }else{
           this.open6('查询失败',res.data.msg)
        }
      });
    },
    list_3() {
      this.loading=true
      houseList({
        pageNum: this.pageNum,
          pageSize: this.pageSize,
          regionId: this.value_3_1,
          floorId: this.value_3_2,
          roomTier: this.value_3_3,
          isVacant: this.value_3_4
        // regionId:this.
      }).then(res => {
        console.log(res);
          this.loading=false
        if (res.status === 200 && res.data.code === 200) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        }else{
           this.open6('查询失败',res.data.msg)
        }
      });
    },
    list_4() {
      this.loading=true
      bedList({
         pageNum: this.pageNum,
          pageSize: this.pageSize,
          regionId: this.value_4_1,
          floorId:  this.value_4_2,
          floorLayerNum: this.value_4_3,
          isVacant: this.value_4_4,
          studentInfoName: this.input_4_4
        // regionId:this.
      }).then(res => {
        console.log(res);
        this.loading=false
        if (res.status === 200 && res.data.code === 200) {
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
          // this.tableData.map(item => {
          //   console.log(item.checkInSituation);
          //   this.checkInSituation = item.checkInSituation;
          //   return item;
          // });
        }else{
           this.open6('查询失败',res.data.msg)
        }
      });
    },
    //选中的表格数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      // if (this.dialogMsg === true) {
      //   this.dialogMsg_2 = true;
      //   this.dialogMsg = false;
      // }
    },
      //调寝
    handleAdjust(val) {
      // if(this.multipleSelection.length<1){
      // this.dialogMsg = true;
      // }else{
      //   this.dialogMsg_2=true
      // }
      this.dialogMsg_2=true
      getOldResidenceInformation({bedId:val.bedId}).then(res=>{
        if(res.data.code==200){
          this.getUserInfo=res.data.data
        }
        console.log(res)
      })
      console.log(val);
      this.dialogVal=val
    },
    //调寝确认
    oNdialogMso(id){
      
        if(id==1){
          if( this.select_4_5==null){
              this.$message({message: "请选择床位号！",});           
          }
          else if(this.dialogVal.bedId==this.bedMsg.bedId){
              this.$message({message: "选择的床位号不能跟当前床位号一样",});  
          }     
          else{
            bedExchangeBed({
              firstBedId:this.dialogVal.bedId,
              firstStudentId:this.dialogVal.studentInfoId,
              lastBedId:this.bedMsg.bedId,
              lastStudentId:this.bedMsg.studentInfoId,
            }).then(res=>{
              this.dialogMsg_2 = false;
              console.log('调寝',res)
             
              if(res.data.code==200){
                  this.$message({type: "success",message: "调寝成功",})
                  this.list_4()
              }else{
                this.$message({message: "调寝失败!"+res.data.msg})
              }
            })
          }
        }    
       
    },
      //查询全部班级下拉
        queryAllCalsss(){    
           this.select_5_3=null                       
            queryAllCalss({
                collegeName:this.selectName1,
                majorName :this.selectName2,
                yearName :this.selectName6,
                className :'',
                pageNum :0,
                pageSize :0
            }).then(res=>{
                console.log(`全部班级`,res)
                 if(res.status==200&&res.data.code==200){
                        this.selectList5_3=res.data.data                                                     
                    }
            })
        },
    //分配学院下拉
    fenpengSelect(item){
          this.select_5_2=null
           this.select_5_3=null   
           this.selectList5_3=[] 
           this.selectName1=item.college_name
           console.log(item)
      queryMajorByTerm({collegeName:item.college_name,MajorName:'',pageNum :0,pageSize :0 }).then(res=>{
            console.log('查询专业',res)
            if(res.status==200&&res.data.code==200){
                this.selectList5_2=res.data.data                    
            }
        })
    },
    //分配专业下拉
    fenpengSelect2(item){
      this.selectName2=item.major_name
      this.queryAllCalsss()
    },
    //年级下拉
    fenpengSelect3(item){
       this.selectName6=item.year_name
      this.queryAllCalsss()
    },
    //查询床位分配信息
    queryStudentInfoBed2(){
          queryStudentInfoBed({
          collegeId:this.select_5_1,
          majorId :this.select_5_2,
          yearId:this.select_5_6,
          classId :this.select_5_3,
          studentInfoSex:this.select_5_4,
          studentInfoBed :this.select_5_5,
          pageSize:this.pageSize2,
          pageNum:this.pageNum2
        }).then(res=>{
          console.log('分配信息',res)
          if(res.data.code==200&&res.data.data!=null){
            this.tableData4=res.data.data.list
            this.total2=res.data.data.total
          }else{
            this.open6('查询失败 ',res.data.msg)
          }
        })
    },
    queryStudentInfoBeds(){
      // if(this.select_5_6==null){
      //     this.$message({message: "请选择年级!"})
      // }
      this.queryStudentInfoBed2()
      
    },
    //床位分配
    bedIdFPs(){
      this.bedAmount2=[]
      this.bedAmount3=[]
      if(this.multipleSelection.length<1){
          this.$message({message: "请选择床位!"})
      }else{
         
          this.multipleSelection.forEach(data=>{
            if(data.floorSex=='男'){
              this.bedAmount2.push(data.bedId)
            }else{
               this.bedAmount3.push(data.bedId)
            }
          })          
          this.bedIdFP=true
        // this.$refs.multipleTable2.clearSelection()
        this.bedAmount=this.multipleSelection.length
      }   
           
    },
    //分配下一步
    onStep(id){
      if(id==1){
         if(this.multipleSelection2.length<1){
          this.$message({message: "请选择学生!"})
        }
        else if(this.select_5_4=='男'){
            if(this.multipleSelection2.length==this.bedAmount2.length){
                this.isfenpeng=false
                this.isfenpeng2=false
            }else{
              
                this.$message({message: "男学生人数必须等于男床位数!"})

            }
        }
         else if(this.select_5_4=='女'){
            if(this.multipleSelection2.length==this.bedAmount3.length){
              this.isfenpeng=false
              this.isfenpeng2=false
            }else{
              
              this.$message({message: "女学生人数必须等于女床位数!"})

            }
        }
      
        
      }
      else if(id==2){
        this.isfenpeng=true
         this.isfenpeng2=true
      }
    },
    //关闭分配模态框
    shutModal(){
      

        this.select_5_1=null
        this.select_5_2=null
        this.select_5_3=null
        this.select_5_4='男'
        this.select_5_5=3
        this.multipleSelection2=[]
        this.tableData4=[]
        this.studentAmount=0
        this.isfenpeng=true
        this.isfenpeng2=true
    },
    //确认分配studentInfoId
    allotConfirm(){
      this.bedIdFP=false
      let studentInfoId=[]
      this.multipleSelection2.forEach(data=>{
        studentInfoId.push(data.studentInfoId)
      })
      distribution({
        rule:this.bedRedio,
        bedIds:this.select_5_4=='男'?this.bedAmount2:this.bedAmount3,
        studentIds:studentInfoId
      }).then(res=>{
        console.log('确认分配',res)       
        if(res.data.code==200){
            this.$message({
              type: "success",
              message: "分配成功",            
            })
            this.list_4()
        }else{
          this.$message({message: "分配失败 "+res.data.msg})
        }
      })
      // console.log('确认分配',this.bedAmount2,this.bedAmount3,studentInfoId,bedRedio)
    },
    //多选学生分配
    handleSelectionChange2(val){
      console.log(val)
      // if(val.length>this.multipleSelection.length){
      //   this.$message({type: "success",message: "学生数不能大于床位数，一个学生只能对应一个床位!",})
      // } 
      this.multipleSelection2=val   
      this.studentAmount=this.multipleSelection2.length
    },
    //床位分配保存
    bedFPsaves(){
      this.bedIdFP=false
    },
    //弹出 下拉框的值
    indexSelect(val) {
      console.log(val);
      if (val === "系统管理员") {
        this.jurisdictional = false;
      } else {
        this.jurisdictional = true;
      }
    },
    indexSelect_1(val) {
      console.log(val);
    },
    indexSelect_2(val) {
      console.log(val);
    },
    indexSelect_3(val) {
      console.log(val);
    },
    indexSelect_4(val) {
      console.log(val);
    },
    //查询 麻烦点
    indexSelect_6(val) {
      this.options.filter(item => {
        console.log(item.regionName, val);
        if (val === item.regionName) {
          this.select_id_2_1 = item.regionId;
        }
        return item;
      });
    },
    //新增房间区域下拉
    newSlect(id){
       floorlist_2({ regionId: id }).then(res => {
              console.log("楼栋",res);
            if (res.data.code === 200) {
              this.newfloorList= res.data.data;
              this.select_3_2=null
              this.select_3_3=null
              this.newfloorList2=[]

              this.select_4_2=null
              this.select_4_3=null
              this.select_4_4=null
              this.select_4_5=null
              // this.options_4.unshift({ floorName: "全部", floorId: null });
            }
          });  
    },
    //新增房间楼栋下拉
    newSlect2(id){
          floorlist_3({ floorId:id }).then(res => {
              console.log('楼层',res);
            if (res.data.code === 200) {
              this.newfloorList2=res.data.data   
               this.select_3_3=null
                this.newfloorList3=[]

               this.select_4_3=null
              this.select_4_4=null  
              this.select_4_5=null      
            }
          });
    },
     //新增床位 楼层下拉
    newSlect3(id){
      console.log('房间',this.select_4_2)
          roomGetRoomNumber({ floorId: this.select_4_2,roomTier:id}).then(res => {
              console.log('房间',res);
            if (res.data.code === 200) {
              this.newfloorList3=res.data.data   
               this.select_4_4=null  
               this.select_4_5=null      
            }
          });
    },
      //房间下拉 查询床位
    newSlect4(){     
          getBedListByRoomId({ roomId : this.select_4_4}).then(res => {
              console.log('床位',res);
            if (res.data.code === 200) {
              this.newfloorList4=res.data.data                
               this.select_4_5=null      
            }
          });
    },
    //床位下拉
    newSlect5(msg){
      this.bedMsg=msg
    },
    indexSelect_7(val) {
      console.log(val);
      if (val === "女") {
        this.select_value_2_2 = 1;
      } else {
        this.select_value_2_2 = 0;
      }
    },
    // indexSelect_8(val) {
    //   if (val == "是") {
    //     this.select_boole_2_2 = 0;
    //     console.log(val, this.select_boole_2_2);
    //   }
    //   if (val == "全部") {
    //     this.select_boole_2_2 = null;
    //     console.log(val, this.select_boole_2_2);
    //   }

    //   if (val == "否") {
    //     this.select_boole_2_2 = 1;
    //     console.log(val, this.select_boole_2_2);
    //   }
    // },
    indexSelect_9(val) {
      console.log(this.select_2_1);
      this.options.filter(item => {
        console.log(item.regionName, val);
        if (val === item.regionName) {
          this.select_id_2_1 = item.regionId;
        }
        return item;
      });
    },
    //房间区域下拉
    indexSelect_10(val) {
      console.log(val);      
        
          //  楼栋列表
          console.log("ccc", val);
          floorlist_2({ regionId: val }).then(res => {
              console.log("楼栋",res);
            if (res.data.code === 200) {
              if(this.tabindex === "2"){
                this.select_id_2_1 = val;
                this.value_3_2 = null;
                this.value_3_3 = null;
                this.options_5 = [];
                this.options_4 = [];
                this.options_4 = res.data.data;
              }
              else if(this.tabindex === "3"){
                this.value_4_2=null
                this.value_4_3=null
                this.options_6 = res.data.data;
              }
              // this.options_4.unshift({ floorName: "全部", floorId: null });
            }
          });      
    },
    //房间楼栋下拉
    indexSelect_11(val) {
      console.log('楼层',val);    
       floorlist_3({ floorId:val }).then(res => {
              console.log(res);
            if (res.data.code === 200) {
               if(this.tabindex === "2"){
                this.options_5 = [];
                this.value_3_3 = null;
               this.options_5=res.data.data           
              }
              else if(this.tabindex === "3"){
                this.value_4_3=null
                this.options_7 = res.data.data;
              }
            }
          });
    },
    indexSelect_12(val) {
      console.log(val);
      if (val == "全部") {
        this.select_id_2_3 = null;
      } else {
        this.select_id_2_3 = val;
      }
    },
    //查询
    search() {
      console.log(this.tabindex);

      if (this.tabindex === "0") {
        this.list()
      } else if (this.tabindex === "1") {
        this.list_2()
      } else if (this.tabindex === "2") {
       this.list_3()
      } else if (this.tabindex === "3") {
        this.list_4()
      }
    },
    //编辑
    handleEdit(val) {
      this.regionId = val.regionId;
     
      console.log(val);
      if (this.tabtext === "区域管理") {
         this.input_area = val.regionName;
        this.input_floor = val.regionNum;
        this.dialogArea = true;
      } else if (this.tabtext === "楼栋管理") {
        console.log(val.floorId);
        floorDetail({floorId:val.floorId}).then(res=>{
            console.log('楼栋信息',res)
            if(res.status==200&&res.data.code==200){
              this.input_2_4 = res.data.data.floorBedsNum;
              this.input_2_2 = res.data.data.floorLayerNum;
              this.input_2_1 = res.data.data.floorName;
              this.input_2_3 = res.data.data.floorRoomsNum;
              this.floorid = res.data.data.floorId;
              this.select_id_2_1=res.data.data.regionId;
              this.select_2_2 =Number(res.data.data.floorSex)
              this.select_2_1 =res.data.data.regionId
            }
        })      
        this.dialogFloor = true;
      } else if (this.tabtext === "房间管理") {
              this.select_3_1 =val.regionName
               this.select_3_2 = val.floorName
               this.select_3_3 = val.roomTier
              this.input_3_1 =  val.roomNo
              this.input_3_2 = val.roomBedNum
              this.roomId=val.roomId
            // this.select_value_2_2=val.floorSex
            // this.select_id_2_1=val.regionId
            // this.select_2_2 = val.floorSex;
        
        this.dialogHouse = true;
      } else if (this.tabtext === "床位管理") {
        this.chuangwei = true;
        this.bedId=val.bedId
        this.input_4_5=val.bedNo.slice(0,val.bedNo.indexOf('号'))
        console.log(this.input_4_5)
      }
    },
   
    //单个删除
    handleDelete(val) {
      console.log(val)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.tabindex === "0") {
            areaDetele({ regionId: parseInt(val.regionId) }).then(res => {
              console.log(res);
                if (res.data.code === 200) {
                  this.list();
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                  
                  });
                }else{
                  this.open6('删除失败 '+res.data.msg)
                }
            });
           
          } else if (this.tabindex === "1") {
            floorDelete({ floorId : parseInt(val.floorId ) }).then(res => {
              console.log(res);
              if (res.data.code === 200) {
                   this.$message({
                  type: "success",
                  message: "删除成功!",
                 
                });
                this.list_2();
              }else{
                  this.open6('删除失败 '+res.data.msg)
                }
            });
         
          } else if (this.tabindex === "2") {
            roomedelete({ roomId : parseInt(val.roomId ) }).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                  this.list_3();
                    this.$message({
                    type: "success",
                    message: "删除成功!",
                  
                  });
                }else{
                  this.open6('删除失败 '+res.data.msg)
                }
            });
            
          } else if (this.tabindex === "3") {//beddelete
           
            beddelete({ roomId : parseInt(val.roomId),bedId:parseInt(val.bedId)}).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                  this.list_4();
                    this.$message({
                    type: "success",
                    message: "删除成功!",
                  
                  });
                }else{
                  this.open6('删除失败 '+res.data.msg)
                }
            });
          }
        })
       
    },
    //多选表格删除
    dialogArea_detele() {
      //传入后台的ID
      let dataId = [];

      if (this.tabindex === "0") {
         this.multipleSelection.map(item => {
          dataId.push(item.regionId);
          return item;
        });
        let x_2 = dataId.join(",");
        if (this.multipleSelection.length !== 0) {
          this.$confirm("此操作将永久删除选中的文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              console.log(dataId);
              areaDeteles({ ids: x_2 }).then(res => {
                console.log("批量删除", res);
                if (res.data.code === 200) {
                  this.list();
                   this.$message({
                    type: "success",
                    message: "删除成功!",
                    
                  });
                }else{
                  this.open6('删除失败 '+res.data.msg)
                }
              });            
            })        
        } else {
          this.$message({
            message: "请选择要删除的文件",
           
          });
        }
      } else if (this.tabindex === "1") {
        this.multipleSelection.map(item => {
          dataId.push(item.floorId);
          return item;
        });
        if (this.multipleSelection.length !== 0) {
          this.$confirm("此操作将永久删除选中的文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
             floorDelete({ floorId :dataId.join(',')}).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                    this.$message({
                    type: "success",
                    message: "删除成功!",
                  
                  });
                  this.list_2();
                }else{
                  this.open6('删除失败 '+res.data.msg)
                }
              });            
            })        
        } else {
          this.$message({
            message: "请选择要删除的文件",
           
          });
        }
         
      } else if (this.tabindex === "2") {
         this.multipleSelection.map(item => {
          dataId.push(item.roomId);
          return item;
        });
        if (this.multipleSelection.length !== 0) {
          this.$confirm("此操作将永久删除选中的文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
             roomedelete({ roomId :dataId.join(',')}).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                    this.$message({
                    type: "success",
                    message: "删除成功!",
                  
                  });
                  this.list_3();
                }else{
                  this.open6('删除失败 '+res.data.msg)
                }
              });            
            })        
        } else {
          this.$message({
            message: "请选择要删除的文件",
           
          });
        }
      } else if (this.tabindex === "3") {
        //    this.multipleSelection.map(item => {
        //   dataId.push(item.bedId);
        //   return item;
        // });
        if (this.multipleSelection.length !== 0) {
          this.$confirm("此操作将永久删除选中的文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
             batchDeletion( this.multipleSelection).then(res => {
                console.log(res);
                if (res.data.code === 200) {
                    this.$message({
                    type: "success",
                    message: "删除成功!",
                  
                  });
                  this.list_4();
                }else{
                  this.open6('删除失败 '+res.data.msg)
                }
              });            
            })        
        } else {
          this.$message({
            message: "请选择要删除的文件",
           
          });
        }
      }
    },
    //退寝batchDeletion
    handleQuit(val) {
      console.log(val);
      this.$confirm("你正在做退寝处理, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {       
          bedEdit({
            bedId: val.bedId         
          })
            .then(res => {
              console.log(res);
              if(res.data.code==200){
                  this.$message({type: "success",message: "退寝成功!"});
                this.list_4();
                } else{
                  this.open6('退寝失败 '+res.data.msg)
                }         
            })
          
        })

    },
    //批量退寝
    bedbatchRetirements(){
      let bedId=[]
      this.multipleSelection.forEach(data=>{
        bedId.push(data.bedId)
      })
      if( this.multipleSelection.length<1){
          this.$message({message: "请选择床位！"});
      }else{
        this.$confirm("你正在做退寝处理, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
          bedbatchRetirement(bedId).then(res=>{
          console.log('批量退寝',res)
          if(res.data.code==200){
              this.$message({type: "success",message: "退寝成功!"});
                this.list_4();
          }else{
                  this.open6('删除失败 '+res.data.msg)
                }
        })
      })
         
      }
    
    },
  
    // 切换tabs 方法
    handleClick(tab, event) {
      this.pageNum = 1;
      this.$refs.multipleTable.clearSelection()
      this.multipleSelection=[]
      this.tabindex = tab.index;
      this.tabtext = event.target.innerHTML;
      this.tableData=[]
      console.log(event.target.innerHTML);
      if (tab.index == "0") {
        console.log(this.normal, this.abnormal);
        this.list();
        
        this.tableheaderList = this.areaList;
        console.log(tab.index);
      } else if (tab.index == "1") { 
        this.list_2();
       
        this.tableheaderList = this.floorList;
        console.log(tab.index);
      } else if (tab.index == "2") {
        this.list_3();      
        
        this.tableheaderList = this.houseList;
        console.log(tab.index);
      } else if (tab.index == "3") {     
        this.list_4();      
        
        this.tableheaderList = this.bedList;
        console.log(tab.index);
      }
    },
    //区域新增 sub按钮
    dialogAreas() {
      console.log(this.input_area);
      console.log(this.input_floor);
      
      if (this.input_area === "" || this.input_floor == null) {
        this.open6('新增信息不能为空');
      } else {
        const loading = this.$loading({
        lock: true,
        text: "拼命加载中",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.8)"
      });
      this.dialogArea = false;
        areaAdd({
          regionName: this.input_area,
          regionNum: this.input_floor
        }).then(res => {
          console.log(res);
          if (res.status === 200 && res.data.code === 200) {
            loading.close();
            this.open2();
            this.list();
          }else{
                  this.open3(res.data.msg)
                }
        });
      }
    },
    //区域新增
    dialogArea_2() {
      this.input_area = "";
      this.input_floor = null;
      this.dialogArea = true;
      this.regionId = null;
    },
    //区域编辑
    dialogAreas_2() {
      // const loading = this.$loading({
      //   lock: true,
      //   text: "拼命加载中",
      //   spinner: "el-icon-loading",
      //   background: "rgba(255, 255, 255, 0.8)"
      // });
      console.log("xxxx");
      console.log();
      console.log(this.input_area, this.input_floor,this.regionId);
      if (this.input_area !== "" && this.input_floor !== null) {
      this.dialogArea = false;
        areaEdit({
          regionId: this.regionId,
          regionName: this.input_area,
          regionNum: this.input_floor
        }).then(res => {
          console.log(res);
          if (res.data.code === 200) {
            // loading.close();
            this.list();
            this.$message({
              message: "编辑成功",
              type: "success",
             
            });
          } else {
            this.open5(res.data.msg)
          }
        });
      }else{
        this.$message({message:"修改信息不能为空"});
      }
    },
    
    //楼栋新增
    dialogFloors() {
      if(!this.numbers.test(this.input_2_4)){
        this.open6('床位数 请输入1~20的数字！')
        return
      }
      if(this.input_2_4 !== null && this.input_2_2 !== null &&
       this.input_2_1 !== '' &&  this.input_2_3 !==null &&
       this.select_2_2 !== null && this.select_2_1 !== null
      ){
        const loading = this.$loading({
        lock: true,
        text: "保存中...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.8)"
      });
      this.dialogFloor = false;
    floorAdd({
        floorBedsNum: this.input_2_4,
        floorLayerNum: this.input_2_2,
        floorName: this.input_2_1,
        floorRoomsNum: this.input_2_3,
        floorSex: this.select_2_2,
        regionId: this.select_2_1
      }).then(res => {
        if(res.data.code==200){
          loading.close();
           this.list_2();          
          this.$message({
            message: "新增成功",
            type: "success",
          
          });
        }else{
          this.open3(res.data.msg)
        }
       
      });
    } else{
       this.$message({
          message: "新增信息不能为空",
         
        });
    }
    },
    // 楼栋编辑确认
    dialogFloors_2() {
       if(!this.numbers.test(this.input_2_4)){
        this.open6('床位数 请输入1~20的数字！')
        return
      }
       if(this.input_2_4 != null && this.input_2_2 != null &&
       this.input_2_1 != '' &&  this.input_2_3 !=null 
      ){
        const loading = this.$loading({
        lock: true,
        text: "拼命加载中",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.8)"
      });
      this.dialogFloor = false;   
      floorEdit({
        floorBedsNum: this.input_2_4,
        floorLayerNum: this.input_2_2,
        floorName: this.input_2_1,
        floorRoomsNum: this.input_2_3,
        floorSex: this.select_2_2,
        regionId: this.select_id_2_1,
        floorId: this.floorid,
      }).then(res => {
            loading.close();
            console.log('楼栋编辑确认',res)
          if (res.status === 200 && res.data.code === 200) {
            this.list_2();
            this.$message({
              message: "修改成功",
              type: "success",
            
            });
          }else{
             this.$message({message: "修改失败 "+res.data.msg});
          }
        });
      }else{
           this.$message({
          message: "修改信息不能为空",
         
        });
      }
    },
    // 楼栋新增
    dialogFloor_2() {
      this.regionId = null;
      this.dialogFloor = true;
      this.input_2_4 = "";
      this.input_2_2 = "";
      this.input_2_1 = "";
      this.input_2_3 =null;
      this.select_2_2 =0;
      
      this.select_2_1 =null;
      this.select_value_2_2 = null;
      this.select_id_2_1 = null;
      this.newfloorList=[]
      this.newfloorList2=[]
    },
    //房间新增保存
    dialogHouses() {
      //  this.regionId = null;
      console.log('新增房间')
     if(this.select_3_2==null||this.select_3_3==null||this.input_3_2==null){
       this.open6('新增信息不能为空！')
       return
     }
      else if(!this.numbers.test(this.input_3_2)){
        this.open6('床位数 请输入1~20的数字！')
        return
      }
      roomsave({
        floorId:this.select_3_2,
        roomTier:this.select_3_3,
        roomBedNum:this.input_3_2,
        roomId:null,
        roomNo:this.input_3_1
      }).then(res=>{
      this.dialogHouse = false;
        console.log('新增',res)
        if(res.data.code==200){
            this.open2()
            this.list_3()
        }else{
          this.open3(res.data.msg)
        }
      })
    },
    //房间编辑保存
    editRoom(){
      if(this.input_3_2==''||this.input_3_1==''){
         this.open6('修改信息不能为空！')
         return
      }
     else if(!this.numbers.test(this.input_3_2)){
        this.open6('床位数 请输入1~20的数字！')
        return
      }
        roomedit({roomId:this.roomId,roomBedNum:this.input_3_2,roomNo:this.input_3_1}).then(res=>{
          console.log('房间编辑保存',res)
          this.dialogHouse=false
          if(res.data.code==200){
             this.$message({message: "修改成功",type: "success",});
              this.list_3()
          }else{
            this.open5(res.data.msg)
          }
        })
    },
    //房间新增
    dialogHouses_2(){
      this.select_3_1 =null
      this.select_3_2 = null
      this.select_3_3 = null
      // input_3_1 =  房间号 自动生成
      this.input_3_2 = null

     
      this.regionId = null;
      this.dialogHouse = true;
      this.input_3_1=''
      this.newfloorList=[]
      this.newfloorList2=[]
    },
    //床位新增
    dialogBeds() {
      this.select_4_1 =null
      this.select_4_2 = null
      this.select_4_3 = null
      this.select_4_4 = null
      this.select_4_5 = null
      this.input_4_3 = null
      this.dialogBed = true;
      this.newfloorList=[]
      this.newfloorList2=[]
       this.newfloorList3=[]
       this.newfloorList4=[]
       this.getUserInfo={}
    },
    dialogBeds2(){
        this.select_4_1 =null
      this.select_4_2 = null
      this.select_4_3 = null
      this.select_4_4 = null
      this.select_4_5 = null
      this.input_4_3 = null
      this.dialogBed = false;
      this.newfloorList=[]
      this.newfloorList2=[]
       this.newfloorList3=[]
       this.newfloorList4=[]
       this.getUserInfo={}
    },
    //床位新增保存
    bedsaves(){
      if(this.input_4_3==null||this.select_4_4==null){
        this.open6('请输入床位数或房间号')
        return
      }
      else if(!this.numbers.test(this.input_4_3)){
        this.open6('床位数 请输入1~20的数字！')
        return
      }
      else{
        bedsave({
          roomId:this.select_4_4,
          bedNum :this.input_4_3
        }).then(res=>{
          console.log(' 床位新增',res)
          this.dialogBed =false
          if(res.data.code==200){
            this.list_4()
            this.open2()
          }else{
            this.open3(res.data.msg)
          }
        })
      }
        
    },
     //床位编辑保存
    chuangweis(){
      if(!this.numbers.test(this.input_4_5)){
        this.open6('请输入1~20的数字！')
        return
      }
        bedEdit2({
          bedId:this.bedId,
          bedNo :this.input_4_5+'号床位'
        }).then(res=>{
        console.log('床位编辑',res)
        if (res.data.code === 200) {
                this.list_4();
                this.open4()
                 this.chuangwei =false;
            }else{
               this.$message({
              message: "修改失败"+res.data.msg,            
            });
            }
        })
    },
    //消息提示
    open2() {
      this.$message({
        message: "新增成功",
        type: "success",
       
      });
    },
    open3(msg) {
      this.$message({
        message: "新增失败"+msg,
       
      });
    },
    open4() {
      this.$message({
        message: "修改成功",
        type: "success",
       
      });
    },
    open5(msg) {
      this.$message({
        message: "修改失败"+msg,      
      });
    },
    open6(msg) {
      this.$message({
        message:msg,      
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../stylecss/commonStyle.scss";
.AccountMange {
  flex: 1;
  padding: 50px 20px 20px 20px;
  display: flex;
  flex-direction: column;
   overflow: hidden;
  .header {
    min-height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    padding-top: 20px;
    .header_1 {
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
         color: $haedColor;
      }
    }
    h4 {
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
            flex-wrap: wrap;
            .respondCss{
              margin:10px 0;
            }
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
  .content {
    z-index: 66;
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
}
/deep/ .el-form-item__content {
  margin-left: 0 !important;
}
.el-checkbox + .el-checkbox {
  margin-left: 30px;
  width: 110px;
}
.bounced {
  height: 400px;
  overflow-y: auto;
  text-align: left;
}
.chakan {
  width: 150px;
  text-align: left;
  .user_description {
    position: relative;
    width: 360px;
    overflow: hidden;
    .description_1 {
      width: 120px;
      position: absolute;
      left: 0;
      top: 0;
    }
    .description_2 {
      margin-left: 60px;
    }
  }
}
// 弹框 新增
.adds {
  text-align: left;
  span {
    display: inline-block;
    width: 80px;
  }
}
.new_p{
    height: 20px;
    line-height: 20px;
    text-align: left;
  }
.adds_2 {
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  span {
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 15px;
  }
  
}
.tiaoqin{
  margin-top:20px;
  border-top: 1px solid #ededed;
  padding-top: 20px;
  .div{
    height: 32px;
    line-height:32px;
  }
  .span {
    display: inline-block;
    width: 70px;
    text-align: right;
    margin-right: 15px;
  }
  
}
.bedFP{
    // text-align: left;
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    flex-wrap: wrap;
    min-height:70px;
    margin-bottom:10px;
    border-bottom:1px solid #EDEDED;
    .div{
      margin-bottom:10px;
      min-width: 204px;
      margin-left:10px;
      height: 32px;
      display: flex;
      align-items: center;
    }
    span {
      display: inline-block;
      width:70px;
      text-align:right;
      margin-right: 15px;
    }
}
.bedFP2{
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .bedFP2-div{
    height: 50px;
    display: flex;
    align-items: center;
  }
}
.bedFP4{
  min-height: 400px;
  display: flex;
  justify-content:center;
  align-items: center;
  .bedFP2-div{
    height: 50px;
    display: flex;
    align-items: center;
  }
}
.bedFP3{
  margin:20px 0 10px 0;
  height:40px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  // border-top:1px solid #EDEDED;
}
p {
  font-size: 14px;
  text-align: center;
}
.dialogs {
  z-index:999 !important;

}
.pagexs {
  z-index: 55;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.pagination_2 {
  margin: 0 auto;
}
//调寝隐藏
 .tormals {
  visibility: hidden;
}
//调寝显示
 .tormalx {
  visibility: none;
}
//设置调寝的优先级
</style>