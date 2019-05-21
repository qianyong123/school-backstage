<template>
      <div class="tableBox">
        <el-table  
            v-if="activeName=='未归'"             
            v-loading="loading"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData"                
            stripe                         
            height="100%"                     
            style="width:100%;">   
            <el-table-column
            width="30"
            >
            <template slot-scope="scope">
                <div style=" visibility: hidden;">{{scope.$index}}</div>
            </template>

            </el-table-column>  
                    
            <el-table-column
            v-for="(item,index) in Students1"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >   
                <template slot-scope="scope">
                    <div v-if="item.name=='姓名'">{{scope.row.studentInfoName}}</div>
                    <div v-else-if="item.name=='学号'">{{scope.row.studentInfoNo}}</div>
                    <div v-else-if="item.name=='监测时间'">{{scope.row.studentInfoSex}}</div>
                    <div v-else-if="item.name=='未归级别'" style="color:#E01763">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理意见'" style="color:#E01763">{{scope.row.parentMsg}}</div>
                    <div v-else-if="item.name=='处理时间'">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理人'">{{scope.row.parentMsg}}</div>
                </template>        
            </el-table-column>                  
                                
            <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                <template slot-scope="scope" style="position: relative;">
                    <div>
                        <i class="el-icon-more" @click.stop="$emit('clickOperate',scope)"></i>
                        <div class="operate" v-if="scope.$index==deleteId">
                            <p @click="$emit('handleEdit',scope.row,1)">查看详情</p>
                            <p @click="$emit('handleEdit',scope.row,2)">立即处理</p>                                  
                        </div>
                    </div>                          
                </template>
            </el-table-column>
        </el-table>
         <el-table  
            v-else-if="activeName=='晚归'"             
            v-loading="loading"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData"                
            stripe                         
            height="100%"                     
            style="width:100%;">   
            <el-table-column
            width="30"
            >
            <template slot-scope="scope">
                <div style=" visibility: hidden;">{{scope.$index}}</div>
            </template>

            </el-table-column>  
                    
            <el-table-column
            v-for="(item,index) in Students2"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >   
                <template slot-scope="scope">
                    <div v-if="item.name=='姓名'">{{scope.row.studentInfoName}}</div>
                    <div v-else-if="item.name=='学号'">{{scope.row.studentInfoNo}}</div>
                    <div v-else-if="item.name=='监测时间'">{{scope.row.studentInfoSex}}</div>
                    <div v-else-if="item.name=='晚归级别'" style="color:#E01763">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理意见'">{{scope.row.parentMsg}}</div>
                    <div v-else-if="item.name=='处理时间'">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理人'">{{scope.row.parentMsg}}</div>
                </template>        
            </el-table-column>                  
                                
            <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                <template slot-scope="scope" style="position: relative;">
                    <div>
                        <i class="el-icon-more" @click.stop="$emit('clickOperate',scope)"></i>
                        <div class="operate" v-if="scope.$index==deleteId">
                            <p @click="$emit('handleEdit',scope.row,1)">查看详情</p>
                            <p @click="$emit('handleEdit',scope.row,2)">立即处理</p>                                  
                        </div>
                    </div>                          
                </template>
            </el-table-column>
        </el-table>
         <el-table  
            v-else-if="activeName=='无记录'"             
            v-loading="loading"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData"                
            stripe                         
            height="100%"                     
            style="width:100%;">   
            <el-table-column
            width="30"
            >
            <template slot-scope="scope">
                <div style=" visibility: hidden;">{{scope.$index}}</div>
            </template>

            </el-table-column>  
                    
            <el-table-column
            v-for="(item,index) in Students3"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >   
                <template slot-scope="scope">
                    <div v-if="item.name=='姓名'">{{scope.row.studentInfoName}}</div>
                    <div v-else-if="item.name=='学号'">{{scope.row.studentInfoNo}}</div>
                    <div v-else-if="item.name=='监测时间'">{{scope.row.studentInfoSex}}</div>
                    <div v-else-if="item.name=='连续无记录天数'" style="color:#E01763">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理意见'">{{scope.row.parentMsg}}</div>
                    <div v-else-if="item.name=='处理时间'">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理人'">{{scope.row.parentMsg}}</div>
                </template>        
            </el-table-column>                  
                                
            <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                <template slot-scope="scope" style="position: relative;">
                    <div>
                        <i class="el-icon-more" @click.stop="$emit('clickOperate',scope)"></i>
                        <div class="operate" v-if="scope.$index==deleteId">
                            <p @click="$emit('handleEdit',scope.row,1)">查看详情</p>
                            <p @click="$emit('handleEdit',scope.row,2)">立即处理</p>                                  
                        </div>
                    </div>                          
                </template>
            </el-table-column>
        </el-table>
         <el-table  
            v-else-if="activeName=='连进连出'"             
            v-loading="loading"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData"                
            stripe                         
            height="100%"                     
            style="width:100%;">   
            <el-table-column
            width="30"
            >
            <template slot-scope="scope">
                <div style=" visibility: hidden;">{{scope.$index}}</div>
            </template>

            </el-table-column>  
                    
            <el-table-column
            v-for="(item,index) in Students4"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >   
                <template slot-scope="scope">
                    <div v-if="item.name=='姓名'">{{scope.row.studentInfoName}}</div>
                    <div v-else-if="item.name=='学号'">{{scope.row.studentInfoNo}}</div>
                    <div v-else-if="item.name=='监测时间'">{{scope.row.studentInfoSex}}</div>
                    <div v-else-if="item.name=='次数'" style="color:#E01763">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='标识'" style="color:#E01763">{{scope.row.parentMsg}}</div>
                    <div v-else-if="item.name=='处理意见'" style="color:#E01763">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理时间'">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理人'">{{scope.row.parentMsg}}</div>
                </template>        
            </el-table-column>                  
                                
            <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                <template slot-scope="scope" style="position: relative;">
                    <div>
                        <i class="el-icon-more" @click.stop="$emit('clickOperate',scope)"></i>
                        <div class="operate" v-if="scope.$index==deleteId">
                            <p @click="$emit('handleEdit',scope.row,1)">查看详情</p>
                            <p @click="$emit('handleEdit',scope.row,2)">立即处理</p>                                  
                        </div>
                    </div>                          
                </template>
            </el-table-column>
        </el-table>
         <el-table  
            v-else-if="activeName=='翻越'"             
            v-loading="loading"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData"                
            stripe                         
            height="100%"                     
            style="width:100%;">   
            <el-table-column
            width="30"
            >
            <template slot-scope="scope">
                <div style=" visibility: hidden;">{{scope.$index}}</div>
            </template>

            </el-table-column>  
                    
            <el-table-column
            v-for="(item,index) in Students5"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >   
                <template slot-scope="scope">
                    <div v-if="item.name=='照片'">{{scope.row.studentInfoName}}</div>
                    <div v-else-if="item.name=='设备名称'">{{scope.row.studentInfoNo}}</div>
                    <div v-else-if="item.name=='监测时间'">{{scope.row.studentInfoSex}}</div>
                    <div v-else-if="item.name=='宿管信息'">{{scope.row.teacherMsg}}</div>
                    
                </template>        
            </el-table-column>                  
                                
            <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                <template slot-scope="scope" style="position: relative;">
                    <div>
                        <i class="el-icon-more" @click.stop="$emit('clickOperate',scope)"></i>
                        <div class="operate" v-if="scope.$index==deleteId">
                            <p @click="$emit('handleEdit',scope.row,1)">查看详情</p>
                            <p @click="$emit('handleEdit',scope.row,2)">立即处理</p>                                  
                        </div>
                    </div>                          
                </template>
            </el-table-column>
        </el-table>
         <el-table  
            v-else-if="activeName=='尾随'"             
            v-loading="loading"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData"                
            stripe                         
            height="100%"                     
            style="width:100%;">   
            <el-table-column
            width="30"
            >
            <template slot-scope="scope">
                <div style=" visibility: hidden;">{{scope.$index}}</div>
            </template>

            </el-table-column>  
                    
            <el-table-column
            v-for="(item,index) in Students5"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >   
                <template slot-scope="scope">
                    <div v-if="item.name=='照片'">{{scope.row.studentInfoName}}</div>
                    <div v-else-if="item.name=='设备名称'">{{scope.row.studentInfoNo}}</div>
                    <div v-else-if="item.name=='监测时间'">{{scope.row.studentInfoSex}}</div>
                    <div v-else-if="item.name=='宿管信息'">{{scope.row.teacherMsg}}</div>
                </template>        
            </el-table-column>                  
                                
            <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                <template slot-scope="scope" style="position: relative;">
                    <div>
                        <i class="el-icon-more" @click.stop="$emit('clickOperate',scope)"></i>
                        <div class="operate" v-if="scope.$index==deleteId">
                            <p @click="$emit('handleEdit',scope.row,1)">查看详情</p>
                            <p @click="$emit('handleEdit',scope.row,2)">立即处理</p>                                  
                        </div>
                    </div>                          
                </template>
            </el-table-column>
        </el-table>
         <el-table  
            v-else-if="activeName=='黑名单'"             
            v-loading="loading"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData"                
            stripe                         
            height="100%"                     
            style="width:100%;">   
            <el-table-column type="selection" width="55"></el-table-column> 
                    
            <el-table-column
            v-for="(item,index) in Students6"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >   
                <template slot-scope="scope">
                    <div v-if="item.name=='对比照片'">{{scope.row.studentInfoName}}</div>
                    <div v-else-if="item.name=='设备名称'">{{scope.row.studentInfoNo}}</div>
                    <div v-else-if="item.name=='监测时间'">{{scope.row.studentInfoSex}}</div>
                    <div v-else-if="item.name=='出现次数'">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理意见'" style="color:#E01763">{{scope.row.parentMsg}}</div>
                    <div v-else-if="item.name=='处理时间'">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='处理人'">{{scope.row.parentMsg}}</div>
                </template>        
            </el-table-column>                  
                                
            <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                <template slot-scope="scope" style="position: relative;">
                    <div>
                        <i class="el-icon-more" @click.stop="$emit('clickOperate',scope)"></i>
                        <div class="operate" v-if="scope.$index==deleteId">
                            <p @click="$emit('handleEdit',scope.row,1)">查看详情</p>
                            <p @click="$emit('handleEdit',scope.row,2)">立即处理</p>                                  
                        </div>
                    </div>                          
                </template>
            </el-table-column>
        </el-table>
         <el-table  
            v-else-if="activeName=='访客超时'"             
            v-loading="loading"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData"                
            stripe                         
            height="100%"                     
            style="width:100%;">   
            <el-table-column
            width="30"
            >
            <template slot-scope="scope">
                <div style=" visibility: hidden;">{{scope.$index}}</div>
            </template>

            </el-table-column>  
                    
            <el-table-column
            v-for="(item,index) in Students7"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >   
                <template slot-scope="scope">
                    <div v-if="item.name=='访客姓名'">{{scope.row.studentInfoName}}</div>
                    <div v-else-if="item.name=='访客照片'">{{scope.row.studentInfoNo}}</div>
                    <div v-else-if="item.name=='访客电话'">{{scope.row.studentInfoSex}}</div>
                    <div v-else-if="item.name=='进入时间'">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='离开时间'">{{scope.row.parentMsg}}</div>
                    <div v-else-if="item.name=='被访人员'">{{scope.row.teacherMsg}}</div>
                    <div v-else-if="item.name=='房间信息'">{{scope.row.parentMsg}}</div>
                </template>        
            </el-table-column>                  
                                
            <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                <template slot-scope="scope" style="position: relative;">
                    <div>
                        <i class="el-icon-more" @click.stop="$emit('clickOperate',scope)"></i>
                        <div class="operate" v-if="scope.$index==deleteId">
                            <p @click="$emit('handleEdit',scope.row,1)">查看详情</p>
                            <p @click="$emit('handleEdit',scope.row,2)">立即处理</p>                                  
                        </div>
                    </div>                          
                </template>
            </el-table-column>
        </el-table>
         <el-table  
            v-else-if="activeName=='设备异常'"             
            v-loading="loading"               
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            :data="tableData"                
            stripe                         
            height="100%"                     
            style="width:100%;">   
            <el-table-column
            width="30"
            >
            <template slot-scope="scope">
                <div style=" visibility: hidden;">{{scope.$index}}</div>
            </template>

            </el-table-column>  
                    
            <el-table-column
            v-for="(item,index) in Students8"
            :key="index"
            :prop="item.props"
            :label="item.name"
            >   
                <template slot-scope="scope">
                    <div v-if="item.name=='设备名称'">{{scope.row.studentInfoName}}</div>
                    <div v-else-if="item.name=='设备类型'">{{scope.row.studentInfoNo}}</div>
                    <div v-else-if="item.name=='监测时间'">{{scope.row.studentInfoSex}}</div>
                    <div v-else-if="item.name=='位置信息'">{{scope.row.teacherMsg}}</div>                 
                </template>        
            </el-table-column>                  
                                
            <el-table-column v-if="navjurisdiction2()" label="操作" width="100">
                <template slot-scope="scope" style="position: relative;">
                    <div>
                        <i class="el-icon-more" @click.stop="$emit('clickOperate',scope)"></i>
                        <div class="operate" v-if="scope.$index==deleteId">
                            <p @click="$emit('handleEdit',scope.row,1)">查看详情</p>
                            <p @click="$emit('handleEdit',scope.row,2)">立即处理</p>                                  
                        </div>
                    </div>                          
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props:['tableData','activeName','roleInfoMenu','roleId','deleteId','loading'],
    data(){
        return {
            Students1:[
            {name:'姓名',props:'studentInfoName'},      
            {name:'学号',props:'studentInfoNo'},
            {name:'监测时间',props:'studentInfoSex'},
            {name:'未归级别',props:'teacherMsg'},    
            {name:'处理意见',props:'parentMsg'},      
             {name:'处理时间',props:'teacherMsg'},    
            {name:'处理人',props:'parentMsg'},                
        ],
        Students2:[
                    {name:'姓名',props:'studentInfoName'},      
                    {name:'学号',props:'studentInfoNo'},
                    {name:'监测时间',props:'studentInfoSex'},
                    {name:'晚归级别',props:'teacherMsg'},    
                    {name:'处理意见',props:'parentMsg'},      
                    {name:'处理时间',props:'teacherMsg'},    
                    {name:'处理人',props:'parentMsg'},  
                ],
        Students3:[
                    {name:'姓名',props:'studentInfoName'},      
                    {name:'学号',props:'studentInfoNo'},
                    {name:'监测时间',props:'studentInfoSex'},
                    {name:'连续无记录天数',props:'teacherMsg'},    
                    {name:'处理意见',props:'parentMsg'},      
                    {name:'处理时间',props:'teacherMsg'},    
                    {name:'处理人',props:'parentMsg'},   
                ],
        Students4:[
                {name:'姓名',props:'studentInfoName'},      
                    {name:'学号',props:'studentInfoNo'},
                    {name:'监测时间',props:'studentInfoSex'},
                    {name:'次数',props:'teacherMsg'},  
                    {name:'标识',props:'teacherMsg'},    
                    {name:'处理意见',props:'parentMsg'},      
                    {name:'处理时间',props:'teacherMsg'},    
                    {name:'处理人',props:'parentMsg'},  
            ],
    //翻越、尾随
     Students5:[
        {name:'照片',props:'studentInfoNo'},   
        {name:'设备名称',props:'studentInfoNo'},
        {name:'监测时间',props:'classMsg'},
        {name:'宿管信息',props:'applyLeaveInfo'},    
    ],
   Students6:[
        {name:'对比照片',props:'studentInfoNo'}, 
        {name:'设备名称',props:'studentInfoNo'},
        {name:'监测时间',props:'studentInfoSex'},
        {name:'出现次数',props:'teacherMsg'},  
        {name:'处理意见',props:'parentMsg'},      
        {name:'处理时间',props:'teacherMsg'},    
        {name:'处理人',props:'parentMsg'},  
    ],
      Students7:[      
      {name:'访客照片',props:'studentInfoNo'},
        {name:'访客姓名',props:'studentInfoNo'},
        {name:'访客电话',props:'studentInfoSex'},
        {name:'进入时间',props:'teacherMsg'},  
        {name:'离开时间',props:'parentMsg'},      
        {name:'被访人员',props:'teacherMsg'},    
        {name:'房间信息',props:'parentMsg'},  
    ],
      Students8:[
        {name:'设备名称',props:'studentInfoNo'},
        {name:'设备类型',props:'studentInfoName'},      
        {name:'监测时间',props:'classMsg'},
        {name:'位置信息',props:'applyLeaveInfo'},    
    ]
        }
    },
    computed:{
          navjurisdiction2(){
                return function(){
                    if(this.roleId==1){     
                        if(this.activeName=='翻越'||this.activeName=='尾随'||this.activeName=='访客超时'||this.activeName=='设备异常'){
                            return false
                        }          
                        else  return true
                    }
                    else if(this.roleInfoMenu.length<1){
                        return true
                    }
                    else if(this.activeName=='未归'){
                         return this.roleInfoMenu[5].indexOf('6-1')==-1?false:true                      
                    }
                    else if(this.activeName=='晚归'){
                       return this.roleInfoMenu[5].indexOf('6-2')==-1?false:true
                    }
                     else if(this.activeName=='无记录'){
                        return this.roleInfoMenu[5].indexOf('6-3')==-1?false:true
                    }
                     else if(this.activeName=='连进连出'){
                          return this.roleInfoMenu[5].indexOf('6-4')==-1?false:true
                    }
                     else if(this.activeName=='黑名单'){
                          return this.roleInfoMenu[5].indexOf('6-5')==-1?false:true
                    }
                  
                    
                }
            }
    }
}
</script>

<style lang="scss">
@import '../../stylecss/commonStyle.scss';
       .tableBox{
            flex: 1;
            // overflow: auto;  
            overflow: hidden;
           .scheduleColor{
               color: #E01763;
           }  
            tr{
                padding:0 20px!important;
            }  
            th{
                color: $color;
            } 

            td{
            color: $haedColor;
            }
              .operate{
                position:absolute;
                left:-20px;
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
</style>
