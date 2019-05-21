<template>
  <div class="Index">
    <super-data v-if="roleId==1" :isdownload='isdownload'></super-data>
    <college-data v-else-if="roleId==2" :isdownload='isdownload'></college-data>
    <teacher-data v-else-if="roleId==3" :isdownload='isdownload'></teacher-data>
    <dormitory v-else-if="roleId==4" :isdownload='isdownload'></dormitory>
  </div>
</template>

<script>
import {
    queryMenuById,

} from '../../axios/api.js'
import superData from './superData'
import collegeData from './collegeData'
import teacherData from './teacherData'
import dormitory from './dormitory'

    export default {
        name:"Index",
        components:{
          superData,
          collegeData,
          teacherData,
          dormitory
        },      
        data(){
            return{
                msg:'',
                roleInfoMenu:[],  
                roleId:1,  
                isdownload:0

            }
        },
        created() {
           sessionStorage.setItem('navColor','/index')  
           this.roleInfoMenu=this.$store.state.roleInfoMenu
            let widths=document.documentElement.clientWidth
            if(widths<=1600){
                this.isdownload=1
            }
        },       
        mounted(){          
            // console.log(this.roleInfoMenu)
            if(this.roleInfoMenu.length<1){
                let roleId=localStorage.getItem('roleId')  
                this.roleId=roleId
              if(roleId!=1){
                  
                  queryMenuById({roleId}).then(res=>{
                      console.log('菜单权限',res)   
                      if(res.data.code==200&&res.data.data.roleInfoMenuMain!=null){                   
                            this.roleInfoMenu=res.data.data.roleInfoMenu==null?[]:res.data.data.roleInfoMenu
                            let roleInfoMenuMain=res.data.data.roleInfoMenuMain.split(',')
                            this.$store.commit('roleInfoMenus',res.data.data.roleInfoMenu)
                            console.log(roleInfoMenuMain)
                            if(roleInfoMenuMain[0]==2){
                                this.$router.push('/hideIndex')
                            }
                      }else{
                        // this.$router.push('/hideIndex')
                      }
                  })
                   
              }
            }
        },
        methods: {
           
        }
    }
</script>

<style lang="scss" scoped>
    .Index{
        flex: 1;
        padding:105px 20px 20px 20px;
        text-align: left;
        color: #333;
        font-weight: 500;
        overflow: auto;
    }
  
</style>






