<template>
<div class="navs">
    <div class="logoBox">
        <div class="logo">
            <img src="../../static/img/Bitmap.png" alt="">
        </div>
    </div>
     <!-- :default-openeds="[]" -->
    <el-menu
      :default-active="index"
      class="el-menu-vertical-demo"
     
      router
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      style="width:200px;min-height:500px;border:0;"
      active-text-color="#E01763">
      <el-menu-item  v-if="navjurisdiction('nav1')" :index="index2.path" @click="active('/index',1)">
         <img v-show="home!=1" style="margin-right:5px" src="../../static/img/index.png" alt="">
         <img v-show="home==1" style="margin-right:2px;" src="../../static/img/home.png" alt="">
        <span slot="title">{{index2.name}}</span>         
      </el-menu-item>
      <el-submenu index="2" v-if="navjurisdiction('nav2')">
         <template slot="title">
            <img v-show="home!=2" style="margin-right:5px" src="../../static/img/chuang.png" alt="">
            <img v-show="home==2" style="margin-right:5px" src="../../static/img/cuang22.png" alt="">
            <span>归寝管理</span>
            </template>
            <el-menu-item-group>      
                <!-- <el-menu-item v-for="(item,index) in dormitorys"  :key="index" @click="active(item.path)" :index="item.path">{{item.name}}</el-menu-item> -->
                <el-menu-item @click="active(dormitory[0].path,2)" v-if="navjurisdiction('1')" :index="dormitory[0].path">{{dormitory[0].name}}</el-menu-item>
                <el-menu-item @click="active(dormitory[1].path,2)" v-if="navjurisdiction('2')" :index="dormitory[1].path">{{dormitory[1].name}}</el-menu-item>
                <el-menu-item @click="active(dormitory[2].path,2)" v-if="navjurisdiction('3')" :index="dormitory[2].path">{{dormitory[2].name}}</el-menu-item>
            </el-menu-item-group>  
      </el-submenu>
        <el-submenu index="3" v-if="navjurisdiction('nav3')">
          <template slot="title">
            <img v-show="home!=3"  style="margin-right:5px" src="../../static/img/jilu.png" alt="">
            <img v-show="home==3"  style="margin-right:2px" src="../../static/img/jilu22.png" alt="">
            <span>记录查询</span>
            </template>
            <el-menu-item-group>                  
                 <!-- <el-menu-item 
                 v-for="(item,index) in recordQuerys"
                  :key="index" @click="active(item.path)" :index="item.path">{{item.name}}</el-menu-item> -->
                <el-menu-item @click="active(recordQuery[0].path,3)" v-if="navjurisdiction('4')" :index="recordQuery[0].path">{{recordQuery[0].name}}</el-menu-item>
                <el-menu-item @click="active(recordQuery[1].path,3)" v-if="navjurisdiction('5')" :index="recordQuery[1].path">{{recordQuery[1].name}}</el-menu-item>
                <el-menu-item @click="active(recordQuery[2].path,3)" v-if="navjurisdiction('6')" :index="recordQuery[2].path">{{recordQuery[2].name}}</el-menu-item>
                <el-menu-item @click="active(recordQuery[3].path,3)" v-if="navjurisdiction('7')" :index="recordQuery[3].path">{{recordQuery[3].name}}</el-menu-item>
                <el-menu-item @click="active(recordQuery[4].path,3)" v-if="navjurisdiction('8')" :index="recordQuery[4].path">{{recordQuery[4].name}}</el-menu-item>
            </el-menu-item-group>  
      </el-submenu>
      <el-submenu index="4" v-if="navjurisdiction('nav4')">
          <template slot="title">
            <img v-show="home!=4"  style="margin-right:5px" src="../../static/img/data.png" alt="">
            <img v-show="home==4"  style="margin-right:5px" src="../../static/img/data2.png" alt="">
            <span>数据中心</span>
            </template>
            <el-menu-item-group>      
                <!-- <el-menu-item 
                v-for="(item,index) in dataCentres" 
                :key="index" @click="active(item.path)" :index="item.path">{{item.name}}</el-menu-item> -->
                <el-menu-item @click="active(dataCentre[0].path,4)" v-if="navjurisdiction('9')" :index="dataCentre[0].path">{{dataCentre[0].name}}</el-menu-item>
                <el-menu-item @click="active(dataCentre[1].path,4)" v-if="navjurisdiction('10')" :index="dataCentre[1].path">{{dataCentre[1].name}}</el-menu-item>
                <el-menu-item @click="active(dataCentre[2].path,4)" v-if="navjurisdiction('11')" :index="dataCentre[2].path">{{dataCentre[2].name}}</el-menu-item>
                <el-menu-item @click="active(dataCentre[3].path,4)" v-if="navjurisdiction('12')" :index="dataCentre[3].path">{{dataCentre[3].name}}</el-menu-item>
                <el-menu-item @click="active(dataCentre[4].path,4)" v-if="navjurisdiction('13')" :index="dataCentre[4].path">{{dataCentre[4].name}}</el-menu-item>
                <el-menu-item @click="active(dataCentre[5].path,4)" v-if="navjurisdiction('14')" :index="dataCentre[5].path">{{dataCentre[5].name}}</el-menu-item>
            </el-menu-item-group>  
      </el-submenu>
        <el-submenu index="5" v-if="navjurisdiction('nav5')">
          <template slot="title">
            <img v-show="home!=5"  style="margin-right:5px" src="../../static/img/set2.png" alt="">
             <img v-show="home==5"  style="margin-right:5px" src="../../static/img/set4.png" alt="">
            <span>系统设置</span>
            </template>
            <el-menu-item-group>      
                <!-- <el-menu-item 
                v-for="(item,index) in systems" 
                :key="index" @click="active(item.path)" :index="item.path">{{item.name}}</el-menu-item> -->
                 <el-menu-item @click="active(system[0].path,5)" v-if="navjurisdiction('15')" :index="system[0].path">{{system[0].name}}</el-menu-item>
                <el-menu-item @click="active(system[1].path,5)" v-if="navjurisdiction('16')" :index="system[1].path">{{system[1].name}}</el-menu-item>
            </el-menu-item-group>  
      </el-submenu>
    </el-menu>
</div>
  
</template>

<script>
import {mapState} from 'vuex'
import store from '../store.js'
import  {getRueryMenuByIdw,getAllNew,queryMenuById}  from '@/axios/api.js';
    export default {
        name:"Login",
        data(){
            return{
                //首页
                // index:'/index',
                // home:1,
                dormitorys:true,
                recordQuerys:true,
                dataCentres:true,
                systems:true,
                index2:{name:'首页',path:'/index',show:'Y'},
                //归寝管理
              dormitory:[                  
                  {name:'实时查寝',path:'/Examine',show:'Y'},
                  {name:'归寝记录',path:'/ReturnRecord',show:'Y'},
                  {name:'归寝规则',path:'/ReturnRule',show:'Y'},
                  
              ],
                //记录查询
              recordQuery:[
                {name:'出入记录',path:'/AccessRecord',show:'Y'},
                {name:'访客记录',path:'/CallerRecord',show:'Y'},
                {name:'报警管理',path:'/Alarm',show:'Y'},
                 {name:'申请记录',path:'/ApplyRecord',show:'Y'},
                {name:'违纪记录',path:'/BreakRecord',show:'Y'},
              ],
              //数据中心
              dataCentre:[
                {name:'宿舍管理',path:'/DormManage',show:'Y'},
                {name:'班级管理',path:'/ClassManage',show:'Y'},
                {name:'人员管理',path:'/StaffMange',show:'Y'},
                {name:'公告通知',path:'/Notice',show:'Y'},
                {name:'设备管理',path:'/FacilityMange',show:'Y'},
                {name:'快递站点',path:'/Express',show:'Y'},
              ],
                 //系统设置
              system:[
                {name:'角色管理',path:'/RoleMange',show:'Y'},
                {name:'账号管理',path:'/AccountMange',show:'Y'},
               
              ],
              roleId:null,
              roleInfoMenu:[],
              roleInfoMenuMain:[],
              limitsList:[]
            }
        },
        computed: {
          ...mapState(['index','home']),
            navjurisdiction(id){
              return function(id){
                if(this.roleId==1){
                  return true
                }
                else if(id=='nav1'){
                  return this.roleInfoMenuMain[0]==1?true:false
                }
                else if(id=='nav2'){
                  return this.roleInfoMenuMain[1]==1?true:false
                }
                else if(id=='nav3'){
                  return this.roleInfoMenuMain[2]==1?true:false
                }
                else if(id=='nav4'){
                  return this.roleInfoMenuMain[3]==1?true:false
                }
                else if(id=='nav5'){
                  return this.roleInfoMenuMain[4]==1?true:false
                }
                else if(id=='1'){
                  return this.roleInfoMenu[0].indexOf('实时查寝')==-1?false:true
                }
                else if(id=='2'){
                  return this.roleInfoMenu[1].indexOf('归寝记录')==-1?false:true
                }
                else if(id=='3'){
                  return this.roleInfoMenu[2].indexOf('归寝规则')==-1?false:true
                }
                else if(id=='4'){
                  return this.roleInfoMenu[3].indexOf('出入记录')==-1?false:true
                }
                else if(id=='5'){
                  return this.roleInfoMenu[4].indexOf('访客记录')==-1?false:true
                }
                else if(id=='6'){
                  return this.roleInfoMenu[5].indexOf('报警管理')==-1?false:true
                }
                else if(id=='7'){
                  return this.roleInfoMenu[6].indexOf('申请记录')==-1?false:true
                }
                else if(id=='8'){
                  return this.roleInfoMenu[7].indexOf('违纪记录')==-1?false:true
                }
                else if(id=='9'){
                  return this.roleInfoMenu[8].indexOf('宿舍管理')==-1?false:true
                }
                else if(id=='10'){
                  return this.roleInfoMenu[9].indexOf('班级管理')==-1?false:true
                }
                else if(id=='11'){
                  return this.roleInfoMenu[10].indexOf('人员管理')==-1?false:true
                }
                else if(id=='12'){
                  return this.roleInfoMenu[11].indexOf('公告通知')==-1?false:true
                }
                else if(id=='13'){
                  return this.roleInfoMenu[12].indexOf('设备管理')==-1?false:true
                }
                else if(id=='14'){
                  return this.roleInfoMenu[13].indexOf('快递站点')==-1?false:true
                }
                else if(id=='15'){
                  return this.roleInfoMenu[14].indexOf('角色管理')==-1?false:true
                }
                else if(id=='16'){
                  return this.roleInfoMenu[15].indexOf('账号管理')==-1?false:true
                }
              }
            },
          
        },
        methods:{        
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            active(index,home){
                // this.home=home
                store.commit('indexs',index)
                store.commit('homes',home)
            },
            quit(){
                this.$router.push('/Login')
            },
            
        },
        mounted() {
          let navColor=localStorage.getItem('navColor');
          let iconColor=localStorage.getItem('iconColor');
          let path=this.$route.path
           console.log(navColor,iconColor)
           if(path=='/index'){
             return
           }
          if(navColor){
              store.commit('indexs',navColor)
              store.commit('homes',iconColor)
          }       
        },
        created() {
              let roleId=localStorage.getItem('roleId')  
              if(roleId){
                  this.roleId=roleId
                  queryMenuById({roleId}).then(res=>{
                      // console.log('菜单权限',res)  
                      if(roleId==1){
                        return
                      } 
                      if(res.data.code==200&&res.data.data.roleInfoMenuMain!=null){
                            this.roleInfoMenuMain=res.data.data.roleInfoMenuMain.split(',')    
                            this.roleInfoMenu=res.data.data.roleInfoMenu==null?[]:res.data.data.roleInfoMenu
                            this.$store.commit('roleInfoMenus',res.data.data.roleInfoMenu)
                      }else{
                        this.$router.push('/hideIndex')
                      }
                  })
                    // getAllNew().then(res=>{
                    //     console.log('获取全部菜单',res)
                    // })
              }else{
                  this.$router.push('/Login')
              } 
        },
    }
</script>

<style lang="scss">
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .navs{
    min-width:210px;
     height: 100%;
     overflow-y:auto;
     overflow-x:hidden;
     position: relative;
     z-index: 999;
     background: #545c64;
     .logoBox{
         width: 100%;
         height: 100px;
         display: flex;
         justify-content: center;
         align-items: center;
        background: #545c64;    
     }
    
  }
  .el-submenu{
        text-align:left!important;
  }
  .el-menu-item{
      text-align:left !important;
  }
</style>






