import axios from './index';

// 登录
export function apiLogin (payload){
  return axios.post(`/api/common/login/appLogin?password=${payload.password}&phone=${payload.phone}`)
}

// 经销商基础信息
export function agentDetail(payload){
  return axios.post('/api/seller/agent/detail?agentId='+payload.agentId)
}

// 我的订单列表
export function myOrderList(payload){
  return axios.post('/api/agent/order/oderList',payload)
}
// 我的订单详情
export function myOrderDetail(payload){
  return axios.post('/api/agent/order/orderDetail',payload)
}
// 订单签收
export function getOrderSign(payload){
  return axios.post('/api/agent/order/orderSign',payload)
}

// 折扣列表
export function agentDiscountList(payload){
  return axios.post('/api/agent/discount/discountList',payload)
}
// 折扣详情
export function agentDiscountDetail(payload){
  return axios.post('/api/agent/discount/discountDetail',payload)
}
// 合同列表
export function agentContractList(payload){
  return axios.post('/api/agent/contract/contractList',payload)
}

//地址相关信息（经销商）
// 地址添加
export function agentAddrAdd(payload){
  return axios.post('/api/seller/agent/addressAdd',payload)
}
// 地址列表
export function agentAddrList(payload){
  return axios.post('/api/seller/agent/addressList',payload)
}
// 删除地址
export function agentAddrDel(payload){
  return axios.post('/api/seller/agent/addressDel',payload)
}
// 编辑地址
export function agentAddrUpdate(payload){
  return axios.post('/api/seller/agent/addressUpdate', payload)
}
//许可证列表接口
export function getLicenceList(payload){
  return axios.post('/api/seller/agent/licenceList?agentId='+payload)
}
//第三方资质接口
export function getThirdLicenceList(payload){
  return axios.post('/api/seller/agent/thirdLicenceList?agentId='+payload)
}