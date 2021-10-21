import axios from './index';

// 登录
export function apiLogin (payload){
  return axios.post(`/api/common/login/appLogin?password=${payload.password}&phone=${payload.phone}`)
}

// 经销商基础信息
export function agentDetail(payload){
  return axios.post('/api/seller/agent/detail?agentId='+payload.agentId)
}