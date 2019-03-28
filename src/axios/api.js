import qs from 'qs'
import service from './request'
let url=`http://192.168.2.118:8080/dormitoryManagement`
// let url ='http://192.168.2.111:8080/dormitoryManagement'
// let url ='http://94.191.13.156:8080/dormitoryManagement'


//获取全部导航菜单 15228824570
export const getAllNew = data => { 
    return service({url: `${url}/Menu/queryAllMenu`,method: 'post',data:qs.stringify(data)}) 
};
//根据角色表id，查询角色对应的菜单权限
export const getRueryMenuByIdw = data => { 
    return service({url: `${url}/Menu/queryMenuById`,method: 'post',data:qs.stringify(data)}) 
};
//富文本
export const article= data => { 
    return service({url: `http://192.168.2.109:8080/api/article/save`,method: 'post',data:data}) 
};

//班级管理
    //学院新增
    export const addCollege = data => {
        return service({url: `${url}/CollegeInfo/addCollege`,method: 'post',data:qs.stringify(data)}) 
    };
    //学院查询
    export const queryCollegeByName = data => {
        return service({url: `${url}/CollegeInfo/queryCollegeByName`,method: 'post',data:qs.stringify(data)}) 
    };
    //学院删除
    export const deleteCollege = data => {
        return service({url: `${url}/CollegeInfo/deleteCollege`,method: 'post',data:qs.stringify(data)}) 
    };
     //学院编辑
     export const updataCollege = data => {
        return service({url: `${url}/CollegeInfo/updataCollege`,method: 'post',data:data}) 
    };
    //专业新增
    export const addMajor = data => {
        return service({url: `${url}/MajorInfo/addMajor`,method: 'post',data:qs.stringify(data)}) 
    };
    //专业查询
    export const queryMajorByTerm = data => {
        return service({url: `${url}/MajorInfo/queryMajorByTerm`,method: 'post',data:qs.stringify(data)}) 
    };
    //专业查询id
    export const queryMajorById = data => {
      return service({url: `${url}/MajorInfo/queryMajorById`,method: 'post',data:qs.stringify(data)}) 
  };
    //专业删除
    export const deleteMajor = data => {
        return service({url: `${url}/MajorInfo/deleteMajor`,method: 'post',data:qs.stringify(data)}) 
    };
     //专业编辑
     export const updataMajor = data => {
        return service({url: `${url}/MajorInfo/updataMajor`,method: 'post',data:data}) 
    };
     //年级新增
     export const addYear = data => {
        return service({url: `${url}/Year/addYear`,method: 'post',data:qs.stringify(data)}) 
    };
    //年级查询
    export const queryByYearName = data => {
        return service({url: `${url}/Year/queryByYearName`,method: 'post',data:qs.stringify(data)}) 
    };
    //年级删除
    export const deleteYear = data => {
        return service({url: `${url}/Year/deleteYear`,method: 'post',data:qs.stringify(data)}) 
    };
    //年级编辑
    export const updataYear= data => {
        return service({url: `${url}/Year/updataYear`,method: 'post',data:data}) 
    };
    //班级新增
      export const addClassInfo = data => {
        return service({url: `${url}/ClassManage/insertClassInfo`,method: 'post',data:qs.stringify(data)}) 
    };
    //班级查询
    export const queryAllCalss = data => {
        return service({url: `${url}/ClassManage/queryClassByTerm`,method: 'post',data:qs.stringify(data)}) 
    };
     //班级查询id
     export const queryClassById = data => {
      return service({url: `${url}/ClassManage/queryClassById`,method: 'post',data:qs.stringify(data)}) 
  };
    //班级删除/TeacherInfo/addCircle
    export const deleteClassInfo = data => {
        return service({url: `${url}/ClassManage/deleteClassInfo`,method: 'post',data:qs.stringify(data)}) 
    };
    //班级编辑
    export const updataClassInfo = data => {
        return service({url: `${url}/ClassManage/updataClassInfo`,method: 'post',data:data}) 
    };
//人员管理
     //上传图片/TeacherInfo/addCircle headers:{'Content-Type':"multipart/form-data"}
     export const addCircle = data => {
        return service({url: `${url}/TeacherInfo/addUpload`,method: 'post',data:data}) 
    };
    //新增辅导员
    export const addTeacherInfo = data => {
        return service({url: `${url}/TeacherInfo/addTeacherInfo`,method: 'post',data:data}) 
    };
     //查询辅导员
     export const queryTeacherInfoByTerm = data => {
        return service({url: `${url}/TeacherInfo/queryTeacherInfoByTerm`,method: 'post',data:qs.stringify(data)}) 
    };
     //删除辅导员
     export const deleteTeacher = data => {
        return service({url: `${url}/TeacherInfo/deleteTeacher`,method: 'post',data:qs.stringify(data)}) 
    };
    //编辑辅导员
      export const updateTeacherInfo = data => {
        return service({url: `${url}/TeacherInfo/updateTeacherInfo`,method: 'post',data:data}) 
    };
     //导入辅导员验证
     export const TeacherInfoOutExcel1Test= data => {
        return service({url: `${url}/TeacherInfo/saveExcelAllTeacher-test`,method: 'post',data:data}) 
    };
     //导入辅导员
     export const TeacherInfoSaveExcelAll = data => {
        return service({url: `${url}/TeacherInfo/saveExcelAll`,method: 'post',data:data}) 
    };
     //导出辅导员
     export const TeacherInfoOutExcel = data => {
        return service({url: `${url}/TeacherInfo/outExcel`,method: 'post',data:qs.stringify(data),responseType: 'blob'}) 
    };
     
     //新增宿管
     export const addHousemasterInfo= data => {
        return service({url: `${url}/HousemasterInfo/addHousemasterInfo`,method: 'post',data:data}) 
    };
      //查询宿管
      export const queryHousemasterInfoByTerm= data => {
        return service({url: `${url}/HousemasterInfo/queryHousemasterInfoByTerm`,method: 'post',data:qs.stringify(data)}) 
    };
      //删除宿管
      export const deleteHousemasterInfo= data => {
        return service({url: `${url}/HousemasterInfo/deleteHousemasterInfo`,method: 'post',data:qs.stringify(data)}) 
    };
      //编辑宿管
      export const updateHousemasterInfo= data => {
        return service({url: `${url}/HousemasterInfo/updateHousemasterInfo`,method: 'post',data:data}) 
    };
     //导入宿管验证
     export const HousemasaveExcelAllTest= data => {
        return service({url: `${url}/HousemasterInfo/saveExcelAll-test`,method: 'post',data:data}) 
    };
      //导入宿管
      export const HousemasterInfsaveExcelAll= data => {
        return service({url: `${url}/HousemasterInfo/saveExcelAll`,method: 'post',data:data}) 
    };
      //导出宿管
      export const HousemasterInfooutExcel= data => {
        return service({url: `${url}/HousemasterInfo/outExcel`,method: 'post',data:data,responseType: 'blob'}) 
    };
    //新增学生
    export const addStudentInfo= data => {
        return service({url: `${url}/TeacherInfo/addStudentInfo`,method: 'post',data:data}) 
    };
      //查询学生
      export const queryStudent= data => {
        return service({url: `${url}/TeacherInfo/queryStudent`,method: 'post',data:qs.stringify(data)}) 
    };
      //删除学生
      export const deleteStudentInfo= data => {
        return service({url: `${url}/TeacherInfo/deleteStudentInfo`,method: 'post',data:qs.stringify(data)}) 
    };
      //编辑学生
      export const updateStudentInfo= data => {
        return service({url: `${url}/TeacherInfo/updateStudentInfo`,method: 'post',data:data}) 
    };
     //导入学生
     export const saveExcelAllStudent= data => {
        return service({url: `${url}/TeacherInfo/saveExcelAllStudent`,method: 'post',data}) 
    };
     //导入验证学生
     export const saveExcelAllStudentTest= data => {
        return service({url: `${url}/TeacherInfo/saveExcelAllStudent-test`,method: 'post',data}) 
    };
    //导出学生
    export const outExcelStudent= data => {
        return service({url: `${url}/TeacherInfo/outExcelStudent`,method: 'post',data:data,responseType: 'blob'}) 
    };
     //编辑获取父母信息
     export const queryParent= data => {
        return service({url: `${url}/TeacherInfo/queryParent`,method: 'post',data:qs.stringify(data)}) 
    };
     //查询学生床位分配信息
     export const queryStudentInfoBed= data => {
        return service({url: `${url}/TeacherInfo/queryStudentInfoBed`,method: 'post',data:qs.stringify(data)}) 
    };
    //删除其他人
      export const deleteOtherPeople= data => {
        return service({url: `${url}/otherPeople/deleteOtherPeople`,method: 'post',data:qs.stringify(data)}) 
    };
     //查询其他人
     export const queryOtherPeople= data => {
        return service({url: `${url}/otherPeople/queryOtherPeople`,method: 'post',data:qs.stringify(data)}) 
    };
      //新增其他人
      export const addOtherPeople= data => {
        return service({url: `${url}/otherPeople/addOtherPeople`,method: 'post',data:data}) 
    };
      //修改其他人
      export const updateOtherPeople= data => {
        return service({url: `${url}/otherPeople/updateOtherPeople`,method: 'post',data:data}) 
    };
    //导出其他人
    export const outExcelOtherPeople= data => {
      return service({url: `${url}/otherPeople/outExcelOtherPeople`,method: 'post',data:data,responseType: 'blob'}) 
  };
   //导入其他人验证
   export const saveExcelOtherPeopleTest= data => {
    return service({url: `${url}/otherPeople/saveExcelOtherPeople-test`,method: 'post',data:data}) 
};
 //导入其他人
 export const saveExcelOtherPeople= data => {
  return service({url: `${url}/otherPeople/saveExcelOtherPeople`,method: 'post',data:data}) 
};
    //删除黑名单
    export const deleteBlacklist= data => {
        return service({url: `${url}/Blacklist/deleteBlacklist`,method: 'post',data:qs.stringify(data)}) 
    };
     //查询黑名单
     export const queryBlacklist= data => {
        return service({url: `${url}/Blacklist/queryBlacklist`,method: 'post',data:qs.stringify(data)}) 
    };
      //新增黑名单
      export const insertBlacklist= data => {
        return service({url: `${url}/Blacklist/insertBlacklist`,method: 'post',data:data}) 
    };
      //修改黑名单
      export const updateBlacklist= data => {
        return service({url: `${url}/Blacklist/updateBlacklist`,method: 'post',data:data}) 
    };
     //导出黑名单
     export const outExcelBlacklist= data => {
      return service({url: `${url}/Blacklist/outExcelBlacklist`,method: 'post',data:data,responseType: 'blob'}) 
  };
    //导入黑名单
    export const saveExcelBlacklist= data => {
      return service({url: `${url}/Blacklist/saveExcelBlacklist`,method: 'post',data:data}) 
  };

//系统设置
    //全部角色
    export const queryAllRole= data => {
        return service({url: `${url}/Menu/queryAllRole`,method: 'post',data:qs.stringify(data)}) 
    };
      //编辑权限
      export const updateMenu= data => {
        return service({url: `${url}/Menu/updateMenu`,method: 'post',data:data}) 
    };
      //获取权限列表
      export const queryMenuById= data => {
        return service({url: `${url}/Menu/queryMenuById`,method: 'post',data:qs.stringify(data)}) 
    };
      //修改角色描述
      export const updateRoleInfoData= data => {
        return service({url: `${url}/Menu/updateRoleInfoData`,method: 'post',data:data}) 
    };
      //账号列表
      export const queryUserManage= data => {
        return service({url: `${url}/user/queryUserManage`,method: 'post',data:qs.stringify(data)}) 
    };
      //账号新增
      export const addUserManage= data => {
        return service({url: `${url}/user/addUserManage`,method: 'post',data:data}) 
    };
      //账号新增
      export const deleteUserManage= data => {
        return service({url: `${url}/user/deleteUserManage`,method: 'post',data:qs.stringify(data)}) 
    };
      //账号编辑
      export const updateUserManage= data => {
        return service({url: `${url}/user/updateUserManage`,method: 'post',data:data}) 
    };

//申请记录
     //查询请假
     export const queryApplyLeave= data => {
      return service({url: `${url}/Blacklist/queryApplyLeave`,method: 'post',data:qs.stringify(data)}) 
  };
    //请假审核
    export const updateApplyLeave= data => {
      return service({url: `${url}/Blacklist/updateApplyLeave`,method: 'post',data:qs.stringify(data)}) 
  };
    //请假更新逾期时间
    export const updateOverdue= data => {
      return service({url: `${url}/Blacklist/updateOverdue`,method: 'post',data:qs.stringify(data)}) 
  };
    //请假日志
    export const handleApplyLeave= data => {
      return service({url: `${url}/Blacklist/handleApplyLeave`,method: 'post',data:qs.stringify(data)}) 
  };
  //被访查询
    export const queryApplyVisitor= data => {
      return service({url: `${url}/Blacklist/queryApplyVisitor`,method: 'post',data:qs.stringify(data)}) 
  };
  //被访审核
  export const updateApplyVisitor= data => {
    return service({url: `${url}/Blacklist/updateApplyVisitor`,method: 'post',data:qs.stringify(data)}) 
};
 //被访更新逾期时间
 export const updateOverdueForApplyVisitor= data => {
  return service({url: `${url}/Blacklist/updateOverdueForApplyVisitor`,method: 'post',data:qs.stringify(data)}) 
};
 //被访日志
 export const handleApplyVisitor= data => {
  return service({url: `${url}/Blacklist/handleApplyVisitor`,method: 'post',data:qs.stringify(data)}) 
};
 //报修查询
 export const queryApplyRepair= data => {
  return service({url: `${url}/Blacklist/queryApplyRepair`,method: 'post',data:qs.stringify(data)}) 
};
//报修审核
export const updateApplyRepair= data => {
return service({url: `${url}/Blacklist/updateApplyRepair`,method: 'post',data:qs.stringify(data)}) 
};
//报修更新逾期时间
export const updateOverdueForApplyRepair= data => {
return service({url: `${url}/Blacklist/updateOverdueForApplyRepair`,method: 'post',data:qs.stringify(data)}) 
};
//报修日志
export const handleApplyRepair= data => {
return service({url: `${url}/Blacklist/handleApplyRepair`,method: 'post',data:qs.stringify(data)}) 
};
//物品出楼查询
export const queryApplyGoods= data => {
  return service({url: `${url}/Blacklist/queryApplyGoods`,method: 'post',data:qs.stringify(data)}) 
};
//物品出楼审核
export const updateApplyGoods= data => {
return service({url: `${url}/Blacklist/updateApplyGoods`,method: 'post',data:qs.stringify(data)}) 
};
//物品出楼更新逾期时间
export const updateOverdueForApplyGoods= data => {
return service({url: `${url}/Blacklist/updateOverdueForApplyGoods`,method: 'post',data:qs.stringify(data)}) 
};
//物品出楼日志
export const handleApplyGoods= data => {
return service({url: `${url}/Blacklist/handleApplyGoods`,method: 'post',data:qs.stringify(data)}) 
};
//调寝查询
export const queryApplyChangeBed= data => {
  return service({url: `${url}/Blacklist/queryApplyChangeBed`,method: 'post',data:qs.stringify(data)}) 
};
//调寝审核
export const updateApplyChangeBed= data => {
  return service({url: `${url}/Blacklist/updateApplyChangeBed`,method: 'post',data:qs.stringify(data)}) 
  };
  //调寝更新逾期时间
  export const updateOverdueForApplyChangeBed= data => {
  return service({url: `${url}/Blacklist/updateOverdueForApplyChangeBed`,method: 'post',data:qs.stringify(data)}) 
  };
  //调寝日志
  export const handleApplyChangeBed= data => {
  return service({url: `${url}/Blacklist/handleApplyChangeBed`,method: 'post',data:qs.stringify(data)}) 
  };

//出入记录
   //出入记录查询
   export const queryAccessRecord= data => {
    return service({url: `${url}/AccessRecord/queryAccessRecord`,method: 'post',data:qs.stringify(data)}) 
    };

//归寝管理
   //归寝规则查询
   export const queryDormRule= data => {
    return service({url: `${url}/DormRule/queryDormRule`,method: 'post',data:qs.stringify(data)}) 
    };
    //归寝规则设置
   export const updateDormRule= data => {
    return service({url: `${url}/DormRule/updateDormRule`,method: 'post',data:data}) 
    };
     //归寝记录查询
   export const queryDormRecord= data => {
    return service({url: `${url}/DormRule/queryDormRecord`,method: 'post',data:qs.stringify(data)}) 
    };
      //归寝记录分析
   export const dormRecordAnalysis= data => {
    return service({url: `${url}/DormRule/dormRecordAnalysis`,method: 'post',data:qs.stringify(data)}) 
    };
       //归寝记录导出
   export const dormRecordExcel= data => {
    return service({url: `${url}/DormRule/dormRecordExcel`,method: 'post',data:data,responseType: 'blob'}) 
    };