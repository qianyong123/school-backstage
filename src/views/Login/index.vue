<template>
  <div class="Login">
      <div class="Login-user">
          <img class="login-img" src="../../../static/img/Bitmap.png" alt="">
          <div class="login-main" v-if="islogin_2">
               <!-- <h3>账号密码登录</h3> -->
                <el-input
                    placeholder="请输入账号"
                    v-model="username" 
                    class="loginInput"               
                    >
                    </el-input>
                    <el-input
                    placeholder="请输入密码"
                    v-model="password" 
                    type="password"
                     class="loginInput"      
                             
                    >
                </el-input>
                <p class="login-cuowu">{{msg}}</p>
                <div class="forget">
                    <el-checkbox style="" v-model="checked">15天内自动登录</el-checkbox>
                    <p @click="forgetPassword">忘记密码？</p>
                </div>
                <el-button style="width:100%;" @click="login">登录</el-button>              
          </div>
            <div class="login-main" v-if="iscode_2">
                <el-input
                    placeholder="请输入账号"
                    v-model="username"   
                     class="loginInput"                 
                    >
                    </el-input>
                <div>
                    <el-input
                    placeholder="请输入验证码"
                    v-model="yansheng"  
                    class="loginInput code"        
                    >
                </el-input>
                 <el-button v-if="istime" style=" color:#9EA0A2;background: #4B515B;border:1px solid #4B515B;" plain @click="getYanzheng">获取验证码</el-button>
                 <el-button v-else style=" color:#9EA0A2;background: #4B515B;border:1px solid #4B515B;width:112px;" plain @click="getYanzheng">{{time}}秒</el-button>
                </div>
                <div v-if="newPassword==2">
                    <el-input
                    placeholder="新密码"
                    v-model="password2" 
                    type="password"
                    class="loginInput"              
                    ></el-input>
                    <el-input
                    placeholder="确认密码"
                    v-model="password3" 
                    type="password"
                    class="loginInput"              
                    ></el-input>
                </div>
                <p class="login-cuowu">{{msg}}</p>
                <div v-if="newPassword==1" class="forget">
                    <el-checkbox v-model="checked">15天内自动登录</el-checkbox>
                </div>
                <el-button style="width:100%;" @click="login">登录</el-button>              
          </div>
        <div class="login-main" v-if="iswx_2">
                <div>
                    <img src="../../../static/img/saoma.png" alt="">
                </div>
                
          </div>
         <div class="else-login" v-if="newPassword==1">
              <div v-if="iswx" @click="handleWx()">微信登录</div>          
              <div v-if="iscode" @click="handleCode()">验证码登录</div>
              <div v-if="islogin" @click="handleLogin()">账号密码登录</div>
        </div>
        
      </div>
        <div class="bcgImg">
            <img src="../../../static/img/Group23.png" alt="">
        </div>
  </div>
</template>

<script>
import {requestLogin } from '@/axios/api1.js'
import { setInterval, clearInterval } from 'timers';
const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
    export default {
        name:"Login",
        components:{
          
        },
        data(){
            return{
                username:'',
                password:'',
                password2:'',
                password3:'',
                iscuowu:'',
                yansheng:'',
                time:60,
                istime:true,
                newPassword:1,
                msg:'',
                checked:false,
                //账号登录显示隐藏
                islogin:false, //按钮
                islogin_2: true,//内容
                //验证码登录显示隐藏
                iscode: true, //按钮
                iscode_2: false,//内容
                //微信登录显示隐藏
                iswx:true,// 按钮
                iswx_2: false //内容
            }
        },
        mounted(){
             this.username=''
             this.npm9password=''
        
               
        },
        methods: {
            //验证码登录
            handleCode() {
                this.islogin =true
                this.iscode =false
                this.iscode_2=true
                this.islogin_2 =false
                this.iswx_2 =false
                this.iswx =true
            },
            //账号密码登录
            handleLogin(){
                this.islogin =false
                this.iscode =true
                this.iscode_2=false
                this.islogin_2 =true
                this.iswx_2 =false
                this.iswx =true
            },
            //微信登录
            handleWx() {
                this.iswx_2 =true
                this.iswx =false
                this.islogin_2 =false
                this.iscode_2 =false
                this.iscode =true
                this.islogin =true
            },

            submit(){
                console.log('sxzd')
            },
            //忘记密码
            forgetPassword(){
                this.islogin =true
                this.iscode =false
                this.iscode_2=true
                this.islogin_2 =false
                this.iswx_2 =false
                this.iswx =true
                this.newPassword=2
            },
            //获取验证码
            getYanzheng(){
                this.istime=false
                let setItems=setInterval(()=>{
                    if(this.time==0){
                       this.istime=true
                       clearInterval('setItems') 
                    }
                    this.time=this.time-1
                },1000)
            },
            login(){
                
                 let name=/^1[3456789]\d{9}$/,
                    pass=/^\w{4,16}$/,             
                    username=this.username,
                    password=this.password;
                     // this.$router.push('/')   
                if(!name.test(username)||username==''){
                    this.msg='用户名请输入11位的手机号码';                  
                } 
                else if(!pass.test(password)||password==''){
                    this.msg='密码请输入4~16位字母或数字';
                }  
                //  else if(name.test(username)&&pass.test(password))
                else if(pass.test(password)){
                    this.msg='';  
                     const loading = this.$loading({
                        lock: true,
                        text: "登录中...",
                        spinner: "el-icon-loading",
                        background: "rgba(255, 255, 255, 0.8)"
                    });           
                    requestLogin({
                        username:this.username,
                        password:this.password,
                        flag :this.checked
                    }).then(res=>{
                         loading.close();
                        // let datas=JSON.parse(res.data)userInfoId
                        // console.log(datas)
                        if(res.status=='200'&&res.data.code==200){                       
                           localStorage.setItem('token',res.data.data.Authorization)
                            this.$router.push('/index')                         
                            localStorage.setItem('roleId',res.data.data.roleId)
                            localStorage.setItem('userInfoId',res.data.data.userInfoId)
                            this.$store.commit('indexs','/index')
                            this.$store.commit('homes',1)
                        } else{
                            this.msg=res.data.msg
                        }                
                    })
                }                                                     
            }
            
        },
        created() {
         
        },
    }
</script>

<style lang="scss" scoped>
   .bcgImg{
            position: absolute;        
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            z-index:100;
            // img{
            //     width: 100%;
            //     height: 100%;
            // }
        }
    .Login{
        width: 100%;
        height: 100%;
        // padding: 50px;
        // background:#141D2C url('../../../static/img/Group23.png') no-repeat center center;
        background: #141D2C;
        color: #9EA0A2;
        position: relative;
     
        .Login-user{
            width: 480px;
            height:430px;
            background: #212C3D;
            position: absolute;
            top: 0;
            bottom: 0;
            right:0;
            left: 0;
            margin: auto;
            // margin-bottom: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
             padding:30px 40px;
             z-index:999;
            .login-img{
                position:absolute;
                top: -70px;
                left: 0;
                right: 0;
                margin: auto;
                width: 300px;
                height:35px;              
            }
            .else-login{
                width: 100%;
                height: 50px;
              
                display: flex;
                align-items: center;
                cursor: pointer;
                div{
                    height: 50px;
                    width: 50%;
                    text-align: center;
                    line-height: 50px;
                }
                 div:nth-child(1){
                   border-right: 1px solid #9EA0A2;
                }
            }
            .login-main{
                width: 100%;
                height: 300px;             
                // margin-top:0px;
                font-size: 14px;
                h3{
                    margin-bottom: 20px;
                }
                .password{
                    margin-top:20px;
                }
                 .login-cuowu{  
                    width: 100%;              
                    color: #f00;
                    font-size: 12px;            
                    height: 50px;  
                    text-align: left;
                    line-height: 50px;   
                    overflow: hidden;  
                }
                .forget{
                    // height: 40px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    p{
                        cursor: pointer;
                        // &:hover{
                        //     color: #09f;
                        // }
                    }
                }
            }
        }
       
    }
  
/deep/ .el-checkbox__input{
    background: #141D2C;
    border: 1px solid #212C3D;
}
 /deep/ .el-checkbox__input.is-checked+.el-checkbox__label{
        color:#9EA0A2;
 }  
 /deep/ .el-checkbox__label{
     color:#9EA0A2;
 }
 /deep/ .el-checkbox__inner{
     color:#9EA0A2;
     background: #141D2C;
     border:1px solid #9EA0A2;
 }
//  /deep/ .el-input__inner{
//      height:50px;
//      background: #4B515B;
//      border:1px solid #4B515B;
//      border-radius: 6px;
//      color: #9EA0A2;
//      font-size: 16px;
     
//  }
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
     color:#9EA0A2;
     background: #141D2C;
     border:1px solid #9EA0A2;
}
/deep/ .el-checkbox__input .is-focus{
     border:1px solid #9EA0A2;
}
.loginInput{
    margin-bottom: 20px;
}
/deep/ .loginInput .el-input__inner{
    height:50px !important;
     background: #4B515B;
     border:1px solid #4B515B;
     border-radius: 6px;
     color: #9EA0A2;
     font-size: 16px;
}
/deep/  .code{
    width:260px !important;
    margin-right: 20px;
    margin-left: 0;
}
/deep/ .el-button{
    height:50px;
    background: #fff;
    color: #333;
    border:1px solid #fff;
    border-radius: 6px;
}


input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: #4B515B !important;
    background-image: none !important;
    color: #4B515B !important;
}
</style>






