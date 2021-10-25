import axios from './index';
// 获取产品系列
export function getProducts (payload){
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
