<template>
    <div class="home">
        <navs></navs>
        <div class="header">
            <div @click="Inform">
               <img src="../../../static/img/Shape.png" alt="">
                <!-- <span>消息通知</span> -->
                <span class="amount">22</span>
            </div>
            <div style="margin:0 30px" @click="userSeets">
               <img src="../../../static/img/Shape(1).png" alt="">
                <!-- <span>账号设置</span>  -->
                </div>
            <div @click="quit">
               <img src="../../../static/img/Shape(2).png" alt="">
                <!-- <span>退出登录</span>                -->
            </div>         
        </div>                  
        <el-dialog
            title="账号设置"
            :visible.sync="userSeet"
            width="400px"
            center
            >
            <div v-if="user" class="userSeet">
                <div>
                    <span>账号</span>
                    <span>{{username}}</span>
                </div>
                <div>
                    <span>验证码</span>
                    <el-input
                    placeholder="请输入验证码"
                    style="width:150px;margin-right:10px;"
                    v-model="input1"
                    clearable>
                    </el-input>
                    <el-button size="small" v-if="showDownTime" @click="getAuth(1)">获取验证码</el-button>
                    <el-button size="small" v-else>{{downTime}}秒</el-button>
                </div>
            </div>
            <div v-else-if="seetPassword" class="userSeet">              
                 <div>
                    <span>新密码</span>
                    <el-input
                    placeholder="请输入新密码"
                    style="width:180px;margin-left:10px;"
                    v-model="password"
                    clearable>
                    </el-input>                  
                </div>
                <div>
                    <span>确认密码</span>
                    <el-input
                    placeholder="确认密码"
                    style="width:180px;margin-left:10px;"
                    v-model="password2"
                    clearable>
                    </el-input>                  
                </div>
            </div>
             <div v-else-if="seetUsername" class="userSeet">
                <div>
                    <span>账号</span>
                    <el-input
                    placeholder="请输入账号"
                    style="width:150px;margin-right:10px;"
                    v-model="newUsername"
                    clearable>
                    </el-input>
                </div>
                <div>
                    <span>验证码</span>
                    <el-input
                    placeholder="请输入验证码"
                    style="width:150px;margin-right:10px;"
                    v-model="input2"
                    clearable>
                    </el-input>
                    <el-button size="small" v-if="showDownTime" @click="getAuth(2)">获取验证码</el-button>
                     <el-button size="small" v-else>{{downTime}}秒</el-button>
                </div>
            </div>
            <div v-if="user" slot="footer" class="dialog-footer">
                <el-button size="small" @click="seetPasswords">更换密码</el-button>
                <el-button size="small" @click="seetUsernames">更换账号</el-button>
                <el-button size="small" @click="userSeet = false">取 消</el-button>                    
            </div>
             <div v-else-if="seetPassword||seetUsername" slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="change">确认</el-button>         
                <el-button size="small" @click="userSeet = false">取 消</el-button>                    
            </div>
        </el-dialog>   
        <router-view></router-view>    
    </div>
</template>

<script>
import Navs from '@/components/Navs.vue'
import Header from '@/components/Header.vue'
import {  
   
  } from '@/axios/api.js'

    export default {
        name:"Home",
        components:{
            Navs,
            Header
        },
        data(){
            return{
                userSeet:false,
                username:'13666666666',
                input1:'',//设置账号验证码
                input2:'',//账号验证码
                user:true,              
                seetPassword:false,
                seetUsername:false,
                showDownTime:true,
                downTime:59,
                password:'',
                password2:'',
                newUsername:'',
                queryNationList:[]
            }
        },
        methods: {
        
            //退出登录
             quit(){
                 this.$confirm('你确定要退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$router.push('/Login')                                
                        
                    }) 
            },
            //消息通知
            Inform(){
               this.$router.push('/Inform') 
            },
            //账号设置
            userSeets(){
                this.userSeet=true
                this.user=true
                this.seetPassword=false
                this.seetUsername=false
                this.input1=''
                this.input2=''
                this.password=''
                this.password2=''
                this.newUsername=''
            },
            //获取验证码
            getAuth(index){
                this.showDownTime=false
              let times= setInterval(()=>{
                  if(this.downTime==0){
                      clearInterval(times)
                      this.showDownTime=true
                      this.downTime=59
                  }
                  this.downTime=this.downTime-1
                },1000)
            },
            //更换密码
            seetPasswords(){
                this.user=false
                this.seetPassword=true
                this.seetUsername=false
                  console.log('验证码',this.input1)
            },
            //更换账号
            seetUsernames(){
                this.user=false
                this.seetPassword=false
                this.seetUsername=true
                 console.log('验证码',this.input1)
            },
            change(){
                let name=/^1[3456789]\d{9}$/,
                    pass=/^\w{4,16}$/;
                if( this.seetPassword){                  
                    console.log('密码设置',this.password,this.password2)
                    if(!pass.test(this.password)){
                        this.$message.error('密码输入格式有误，4~16位数字或字母！');
                    }
                    else if(this.password!=this.password2){
                         this.$message.error('两次密码输入不一致！');
                    }
                    else{
                          this.$message({
                        message: '密码重置成功',
                        type: 'success'
                        });
                        this.userSeet=false
                    }
                }else{
                    console.log('切换账号',this.newUsername,this.input2)
                     this.userSeet=false
                }
            }
        },
        created() {
        //    this.$router.push('/index') 
        },
    }
</script>

<style lang="scss" scoped>
    .home{
        // padding:20px;
        display: flex;
        height: 100%;
        width: 100%;
        position: relative;
        overflow-x: hidden;
        .userSeet{
            height: 100px;
            padding-left: 20px;
            span{
                display: inline-block;
                width: 60px;
            }
            div{
                width: 100%;
                height: 40px;
                line-height: 40px;
                display: flex;
                align-items: center;
            }
            div:nth-child(1){              
                margin-bottom: 10px;
            }
        }
        .header{
            position: absolute;
            top: 0;
            left: 0;
            height: 50px;
            width: 100%;
            display: flex;
            justify-content:flex-end;
            align-items: center;
            background: #fff;
            font-size: 14px;
            padding:0 24px;
            z-index: 666;
            div{
                cursor: pointer;            
                height: 50px;
                display: flex;
                justify-content:center;
                align-items: center;
                position: relative;
                i{
                    margin-right: 8px;
                }
                .amount{
                    display: inline-block;
                    padding:4px;
                    border-radius:100%;
                    background: #f00;
                    color: #fff;
                    font-size: 12px;
                    position: absolute;
                    right:-16px;
                    top: 4px;
                }
                // &:hover{
                //     color: #fff;
                //     background:rgba(26,188,156,1)                    
                // }
            }
           
        }
    }
</style>






