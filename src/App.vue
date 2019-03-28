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
      height: 32px;   
      display: flex;
      align-items: center;
      // padding:0 10px;
    }
    .el-input__suffix{
      display: flex;
      align-items:center;
      justify-content: center;
    }
    .el-input__prefix{
        top: -4px;
    }
    .el-submenu__title i{
      color: #fff;
    }
    .el-dialog__body{
      // padding:15px !important;
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
        // width: 120px;
    }
    .el-select{
      width: 128px;
    }
    .el-tabs__item{
      color:#888888;
    }
   .el-tabs__item.is-active {
    // color:#333333;
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
