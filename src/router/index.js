import Vue from 'vue'
import Router from 'vue-router'


import store from '@/store.js'
// import Home from '@/views/Home/Home'
Vue.use(Router)
const Login=()=>import('@/views/Login/index')//登录

const Home=()=>import('@/views/Home/Home')//首页
const index=()=>import('@/views/index/index')//首页内容
const Inform=()=>import('@/views/Inform/index')//消息通知

//归寝管理
const Examine=()=>import('@/views/Examine/index')//实时查寝
const ReturnRecord=()=>import('@/views/ReturnRecord/index')//归寝记录
const ReturnRule=()=>import('@/views/ReturnRule/index')//归寝规则
//记录查询
const AccessRecord=()=>import('@/views/AccessRecord/index')//出入记录
const CallerRecord=()=>import('@/views/CallerRecord/index')//访客记录
const Alarm=()=>import('@/views/Alarm/index')//报警管理
const ApplyRecord=()=>import('@/views/ApplyRecord/index')//申请记录
const BreakRecord=()=>import('@/views/BreakRecord/index')//违纪记录
//数据中心
const DormManage=()=>import('@/views/DormManage/index')//宿舍管理
const ClassManage=()=>import('@/views/ClassManage/index')//班级管理
const StaffMange=()=>import('@/views/StaffMange/index')//人员管理
const Notice=()=>import('@/views/Notice/index')//公告通知
const FacilityMange=()=>import('@/views/FacilityMange/index')//设备管理
const Express=()=>import('@/views/Express/index')//快递站点
//系统设置
const RoleMange=()=>import('@/views/RoleMange/index')//角色管理
const AccountMange=()=>import('@/views/AccountMange/index')//账号管理

const hideIndex=()=>import('@/components/hideIndex')//没权限首页


 const router= new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      redirect:'/index',  
      children:[
        {path: 'hideIndex',name: 'hideIndex',component: hideIndex,props:true}, 

        {path: 'index',name: 'index',component: index,props:true}, 

        {path: 'Inform',name: 'Inform',component: Inform,props:true}, 

        {path: 'Examine',name: 'Examine',component: Examine,props:true},  
        {path: 'ReturnRecord',name: 'ReturnRecord',component: ReturnRecord,props:true},  
        {path: 'ReturnRule',name: 'ReturnRule',component: ReturnRule,props:true},  
          
        {path: 'AccessRecord',name: 'AccessRecord',component: AccessRecord,props:true},  
        {path: 'CallerRecord',name: 'CallerRecord',component: CallerRecord,props:true},  
        {path: 'Alarm',name: 'Alarm',component: Alarm,props:true},
        {path: 'ApplyRecord',name: 'ApplyRecord',component: ApplyRecord,props:true},  
        {path: 'BreakRecord',name: 'BreakRecord',component: BreakRecord,props:true},  

        {path: 'DormManage',name: 'DormManage',component: DormManage,props:true},  
        {path: 'ClassManage',name: 'ClassManage',component: ClassManage,props:true},  
        {path: 'StaffMange',name: 'StaffMange',component: StaffMange,props:true},
        {path: 'Notice',name: 'Notice',component: Notice,props:true},  
        {path: 'FacilityMange',name: 'FacilityMange',component: FacilityMange,props:true},  
        {path: 'Express',name: 'Express',component: Express,props:true},  

        {path: 'RoleMange',name: 'RoleMange',component: RoleMange,props:true},  
        {path: 'AccountMange',name: 'AccountMange',component: AccountMange,props:true},  

      ]
    
    },
    { path:"",redirect:"/index"},
    { path:"/Login",component:Login,name:'Login'},
  ]
})

// 页面刷新时，重新赋值token
// if (localStorage.getItem('token')) {
//     store.commit('set_token', localStorage.getItem('token'))
//   }
  
router.beforeEach((to, from, next) => {
  let token=localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    if (token) { 
      next();    
    }
    else {
      next({
        path: '/Login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
});


export default router