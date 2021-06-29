import axios from '../utils/server';
import {router} from '../route'
console.log(router,'-=-=-=-==-=-=-')

export function  getLoginApi (data:any) {
  return axios.post(`/erupt-api/login?account=${data.userName}&pwd=${data.passWord}&clientId=${router.currentRoute.value.query.clientId}`)//返回的时promies对象，所以直接return出去就好了
}
//获取关卡列表
export function  getLevelList (data:any) {
  return axios.post(`/erupt-api/data/table/LevelMap`,data,{
    headers:{
      erupt:'LevelMap'
    }
  })
}
//关卡详情
export function  getLevelDetail (id:any) {
  return axios.get(`/erupt-api/data/LevelMap/${id}`,{
    headers:{
      erupt:'LevelMap'
    }
  })
}
//修改关卡详情
export function  editLevel (data:any) {
  return axios.put(`/erupt-api/data/modify/LevelMap`,data,{
    headers:{
      erupt:'LevelMap'
    }
  })
}
//新增关卡
export function  addLevel (data:any) {
  return axios.post(`/erupt-api/data/modify/LevelMap`,data,{
    headers:{
      erupt:'LevelMap'
    }
  })
}
//单个删除关卡
export function  deleteLevel (id:any) {
  return axios.delete(`/erupt-api/data/modify/LevelMap/${id}`,{
    headers:{
      erupt:'LevelMap'
    }
  })
}

//多个删除关卡
export function  deleteLevels (ids:any) {
  let idsStr=''
  ids.map((item:any,index:any)=>{
    if(index==0){
      idsStr+=item.id
    }else{
      idsStr+='&ids='+item.id;
    }
  })
  return axios.delete(`/erupt-api/data/modify/LevelMap?ids=${idsStr}`,{
    headers:{
      erupt:'LevelMap'
    }
  })
}
// 打开游戏
export function  openGame (data:any) {
  return axios.post(`/erupt-api/data/LevelMap/operator/open?clientId=${router.currentRoute.value.query.clientId}`,{
    ids:[data.id],
    param:data
  },{
    headers:{
      erupt:'LevelMap'
    }
  })
}
// 获取用户列表
export function  createUser () {
  return axios.post(`/erupt-api/data/LevelMap/reference-table/createUser?tabRef=false`,{
    pageIndex:1,
    pageSize:1000,
    sort:''
  },{
    headers:{
      erupt:'LevelMap'
    }
  })
}
