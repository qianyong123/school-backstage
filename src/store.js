
import Vue from 'vue'
import Vuex from 'vuex'
 
 
Vue.use(Vuex)
 
 const store= new Vuex.Store({
    state:{
        token:'',
        headerName:'返回首页',
        organizationList:[],
        roleInfoMenu:[],
        home:1,
        index:'/index'
        },
        mutations:{
            //存token到localstorage里面
            set_token(state, token) {
                state.token = token
               localStorage.setItem('token',token)
            },
            //从localstorage里面删除token
            del_token(state) {
                state.token = ''
                localStorage.removeItem('token')
            },
            //公用头部的名字
            headerName(state,name){
                state.headerName = name
            },
            //权限菜单
            roleInfoMenus(state,roleInfoMenu){
                state.roleInfoMenu = roleInfoMenu
            },
            indexs(state,index){
                state.index=index
                localStorage.setItem('navColor',index)
            },
            homes(state,home){
                state.home=home
                localStorage.setItem('iconColor',home)
            }
           
    }
})
export default store
