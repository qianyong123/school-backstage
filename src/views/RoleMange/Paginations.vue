<template>
<!-- 分页 -->
    <div class="pagexs">
         <div class="pagination_1">
          <el-pagination
      @size-change="handleSizeChange"
      :current-page.sync="currentPage2"
      :page-sizes="[10, 15, 20, 30]"
      :page-size="10"
      layout="sizes,total"
      :total="200">
    </el-pagination>
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
      :total="200">
      <span style="margin-left:1%;"> <el-button class="pagination-btn" style="border:1px solid #dcdfe6">确认</el-button></span>
    </el-pagination>
    </div>
     </div>
</template>

<script>
export default {
name:'Paginations',
data () {
    return{
        currentPage2: 1,
        pageSize:10,
        total:100
    }
},
methods:{
      //弹出框
          handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize=val
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
}
}
</script>

<style>
 .pagexs{
     z-index: 55;
     width: 100%;
    display: flex;
    align-items: center;
}
.pagination_2{
    margin: 0 auto;
}
</style>
