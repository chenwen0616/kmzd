import axios from './index';

// 登录
export function login (){
  return axios.post('/api/common/login/appLogin')
}