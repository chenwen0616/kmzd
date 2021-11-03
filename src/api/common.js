import axios from './index';
// 获取字典 （产品系列、合同状态）
export function getDict (payload){
  return axios.post('/api/common/dict/getDictList?dictType='+payload.dictType)
}
// 获取区域
export function getRegion(payload){
  return axios.post('/api/common/region/list',payload)
}
// 消息列表接口
export function getMessage(payload){
  return axios.post('/api/common/message/list',payload)
}
// 修改密码
export function updatePassword(payload){
  return axios.post(`/api/common/login/passwordUpdate?oldPassword=${payload.oldPassword}&password=${payload.password}`)
}
