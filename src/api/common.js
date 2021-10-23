import axios from './index';
// 获取产品系列
export function getProducts (payload){
    return axios.post('/api/common/dict/getDictList?dictType='+payload.dictType)
  }