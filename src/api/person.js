import axios from './index';

// 登录
export function apiLogin (payload){
  return axios.post(`/api/common/login/appLogin?password=${payload.password}&phone=${payload.phone}`)
}