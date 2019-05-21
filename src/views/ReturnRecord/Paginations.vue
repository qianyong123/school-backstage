<template>
<!-- 分页 -->
    <div class="pagexs">
         <div class="pagination_1">
          <el-pagination
      @size-change="handleSizeChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 15, 20, 30]"
      :page-size="pageSize"
      layout="sizes,total"
      :total="total">
    </el-pagination>
    </div>
    <div class="pagination_2">
      <el-pagination
      background
      @current-change="$emit('handleCurrentChange',currentPage2)"
      :current-page.sync="currentPage2"
      :page-size="pageSize"
      layout="prev, pager, next,jumper,slot"
      :total="total">
      <span style="margin-left:1%;"> <el-button class="pagination-btn" style="border:1px solid #dcdfe6;">确认</el-button></span>
    </el-pagination>
    </div>
     </div>
</template>

<script>
import bus from '../../js/bus.js'
export default {
name:'Paginations',
props:['total'],
data () {
    return{
        currentPage2:1,
        pageSize:10,
       
    }
},
methods:{
     handleSizeChange(val){
         this.pageSize=val
        //  console.log('每页条数',val)
         bus.$emit('handleSizeChange2',val)
     }
     
}
}
</script>

<style>
 .pagexs{
    z-index: 55;
    height: 50px;
     width: 100%;
    display: flex;
    align-items: center;
    border-top: 1px solid rgba(238,238,238,1);
}
.pagination_2{
    margin: 0 auto;
}
</style>
