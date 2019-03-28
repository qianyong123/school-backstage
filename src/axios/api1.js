import qs from 'qs'
import service from './request'
let url ='http://192.168.2.118:8080/dormitoryManagement'
// let url ='http://94.191.13.156:8080/dormitoryManagement'


//登录
export const requestLogin = data => { 
    return service({url: `${url}/auth/login`,method: 'post',data:qs.stringify(data)}) 
};
//账号管理 列表页面
export const accountListx = data => { 
    return service({url: `${url}/user/pageList`,method: 'get',params:data})
};
// 宿舍管理 区域管理/region/pageList
export const areaList = data => { 
    return service({url: `${url}/region/pageList`,method: 'get',params:data})
};
// 区域管理  新增 /region/save
export const areaAdd = data => { 
    return service({url: `${url}/region/save`,method: 'post',data:data}) 
};
// 区域管理  编辑 /region/edit
export const areaEdit = data => {
    return service({url: `${url}/region/edit`,method: 'post',data:data}) 
};
// 区域管理  删除 /region/delete/
export const areaDetele = data => { 
    return service({url: `${url}/region/delete`,method: 'post',data:qs.stringify(data)}) 
};
// 区域管理  批量删除 /region/batchDeletion
export const areaDeteles = data => { 
    return service({url: `${url}/region/batchDeletion`,method: 'post',data:qs.stringify(data)}) 
};
// 区域管理  区域列表  /region/list
export const arealist_2 = data => { 
    return service({url: `${url}/region/list`,method: 'get',data:qs.stringify(data)})
};
// 区域管理  区域导出
export const regionexport = data => { 
    return service({url: `${url}/region/export`,method: 'post',data:qs.stringify(data),responseType: 'blob' })
};
// 区域管理  区域导入
export const importRegionTemplateExcel = data => { 
    return service({url: `${url}/region/importRegionTemplateExcel`,method: 'post',data:data})
};
// 楼栋管理 楼栋列表
export const floorList = data => { 
    return service({url: `${url}/floor/pageList`,method: 'get',params:data})
};
// 楼栋管理 楼栋新增 
export const floorAdd = data => { 
    return service({url: `${url}/floor/save`,method: 'post',data:data})
};
// 楼栋管理 楼栋列表 下拉框
export const floorlist_2 = data => { 
    return service({url: `${url}/floor/list`,method: 'post',data:qs.stringify(data)})
};
// 楼栋层数查询    /floor/getFloorLayerNum
export const floorlist_3 = data => { 
    return service({url: `${url}/floor/getFloorLayerNum`,method: 'post',data:qs.stringify(data)})
};
// 楼栋管理  楼栋编辑/floor/edit
export const floorEdit = data => { 
    return service({url: `${url}/floor/edit`,method: 'post',data:data})
};
// 楼栋管理  获取楼栋信息
export const floorDetail= data => { 
    return service({url: `${url}/floor/detail/${data.floorId}`,method: 'get',data:data})
};
// 楼栋管理  楼栋删除
export const floorDelete = data => { 
    return service({url: `${url}/floor/delete`,method: 'post',data:qs.stringify(data)})
};
//房间管理 // 房间列表 /room/pageList
export const houseList = data => { 
    return service({url: `${url}/room/pageList`,method: 'post',data:qs.stringify(data)})
};
//房间管理 编辑保存
export const roomedit = data => { 
    return service({url: `${url}/room/edit`,method: 'post',data:qs.stringify(data)})
};
//房间管理   查询所有房间
export const roomGetRoomNumber= data => { 
    return service({url: `${url}/room/getRoomNumber`,method: 'post',data:qs.stringify(data)})
};
//房间管理 删除
export const roomedelete= data => { 
    return service({url: `${url}/room/delete`,method: 'post',data:qs.stringify(data)})
};
//房间管理 新增
export const roomsave= data => { 
    return service({url: `${url}/room/save`,method: 'post',data:data})
};
//床位管理   床位列表 /bed/pageList
export const bedList = data => { 
    return service({url: `${url}/bed/pageList`,method: 'post',data:qs.stringify(data)})
};
//床位管理   新增
export const bedsave = data => { 
    return service({url: `${url}/bed/save`,method: 'post',data:qs.stringify(data)})
};
//床位管理   删除
export const beddelete = data => { 
    return service({url: `${url}/bed/delete`,method: 'post',data:qs.stringify(data)})
};
//床位管理    批量删除
export const batchDeletion = data => { 
    return service({url: `${url}/bed/batchDeletion`,method: 'post',data:data})
};

//床位管理   床位编辑
export const bedEdit2 = data => { 
    return service({url: `${url}/bed/edit`,method: 'post',data:qs.stringify(data)})
};
//床位管理   退寝/bed/retirement
export const bedEdit = data => { 
    return service({url: `${url}/bed/retirement`,method: 'post',data:qs.stringify(data)})
};
//床位管理   批量退寝
export const bedbatchRetirement = data => { 
    return service({url: `${url}/bed/batchRetirement`,method: 'post',data:data})
};
//床位管理   调寝
export const bedExchangeBed = data => { 
    return service({url: `${url}/bed/exchangeBed`,method: 'post',data:qs.stringify(data)})
};
//床位管理   查询全部床位
export const bedGetBedNo = data => { 
    return service({url: `${url}/bed/getBedNo`,method: 'post',data:qs.stringify(data)})
};
//床位管理   分配床位
export const distribution = data => { 
    return service({url: `${url}/bed/distribution`,method: 'post',data:data})
};