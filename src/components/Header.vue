<template>
    
        <div class="header">
            <div @click="Inform">
                <img src="../../static/img/Shape.png" alt="">
                <span>消息通知</span>
                <span class="amount">22</span>
            </div>
            <div>
               <img src="../../static/img/Shape(1).png" alt="">
                <span>账号设置</span> 
                </div>
            <div @click="quit">
                <img src="../../static/img/Shape(2).png" alt="">
                <span>退出登录</span>               
            </div>
        </div>                  
                    
</template>

<script>
    export default {
        name:"Header",
        components:{
           
        },
        data(){
            return{

            }
        },
        methods: {
            //退出登录
             quit(){
                this.$router.push('/Login')
                localStorage.removeItem('token')
                localStorage.removeItem('roleId')
                localStorage.removeItem('userInfoId')
                localStorage.removeItem('navColor')
                localStorage.removeItem('iconColor')
            },
            //消息通知
            Inform(){
               this.$router.push('/Inform') 
            }
        },
        created() {
             
        },
    }
</script>

<style lang="scss" scoped>
        .header{
              height: 50px;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;         
            display: flex;
            justify-content:flex-end;
            align-items: center;
            background: #fff;
            font-size: 14px;
            padding:0 24px;
            div{
                cursor: pointer;
                width: 120px;
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
                    right:6px;
                    top: 4px;
                }
                &:hover{
                    color: #fff;
                    background:rgba(26,188,156,1)                    
                }
            }
           
        }
    
</style>






