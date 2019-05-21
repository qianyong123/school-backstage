<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '@/stylecss/main.scss';
@import '@/stylecss/commonStyle.scss';
//下拉菜单

   // 处理input type = number的上下箭头
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none!important;
    }
    input[type="number"]{
    -moz-appearance: textfield!important;
    }
  //文本输入框
  textarea {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #606266;
    font-size: 14px
}
  
  //消息提示框
  .el-message{
       width: 500px;  
    }
   .el-message .el-message--success{
          width: 500px;  
          margin: 20px auto;  
    }
    .el-message .el-message--error{
        width: 500px;  
        margin: 20px auto;  
    }
    .el-message .el-message--info{
        width: 500px;  
        margin: 20px auto;
    }
    .el-dialog__header{   
      text-align: left;
      padding:15px 25px;
      color:$haedColor;
      font-weight:500;
      font-size: 16px;
    }
    .el-dialog__footer{
      padding:0;
      padding-bottom:20px;
    }
  .el-input .el-input__inner{
      height: 32px!important;   
      display: flex!important;
      align-items: center!important;
      // padding:0 10px;
    }
    //下拉框
   .el-input__suffix{
      display: flex;
      align-items:center;
      justify-content: center;
    }
    .el-input__prefix{
        top: -4px !important;
    }
    .el-dropdown-menu{
    max-height: 300px;
    overflow-y: auto; 
  }
   .el-submenu__title i{
      color: #fff;
    }  
  .el-button{
      color: #888888;
    }
    
   .el-button--primary,.el-button--danger{
      color: #fff;
      background-color:$bcgColor !important;
      border-color:$bcgColor !important;
      &:hover{
        background-color:$bcgColor;
        border-color:$bcgColor;
      }
    }
    .el-input{
        // display: flex;
        // align-items:center;
        // justify-content: center;
    }
    .el-select{
      width: 128px;
    }
    .el-tabs__item{
      color:#888888;
    }
 
//日期
.el-input .el-input__inner{
  padding-right:10px !important;;
}
//操作icon
.el-icon-more{
    color: #444444;
    font-size: 20px;
    cursor: pointer;
}
  .el-form-item__content{
      margin-left: 0!important;
  }  
  .el-checkbox{
      margin-left: 0!important;
  }
  .el-form-item{
    margin-bottom: 0!important;
  }
  //表格
   .el-table{
    color:$haedColor;
  }
   .el-table__header th{
    color:#888888;
  }
  .avatar-uploader-icon{
    display: flex!important;
    justify-content: center;
    align-items: center;
  }
  //单选
   .el-radio__input.is-checked .el-radio__inner{
         background: #E01763;
         border-color: #E01763;
     }
      .el-radio__input.is-checked+.el-radio__label{
         color: #333;
     }
     //分页
     .pagexs{
       height: 60px!important;
     }
     .pagination_2 .btn-prev,.el-pager,.btn-next,.number,{
       height: 32px!important;
       line-height: 32px!important;
     }
     .pagination-btn{
       height: 32px!important;
     }
     .pagination_1 .el-pagination__sizes{
        height: 32px!important;
       line-height: 32px!important;
       display: flex;
       align-items: center;
     }
     .el-pagination__total{
      //  margin-top: 3px;
       height: 32px!important;
       line-height: 32px!important;
     }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #888888;
  width: 100%;
  height: 100%;
  // margin-top: 60px;
  box-sizing:border-box;
}
  //分页背景颜色
#app /deep/ .active{

    background: $bcgColor;
  }
  
</style>
