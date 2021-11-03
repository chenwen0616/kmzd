import axios from './index';

// 获取商品列表
export function goodsList (payload){
  return axios.post('api/agent/goods/goodsList',payload)
}

// 获取类型
export function goodsTypeList(payload){
  return axios.post('/api/agent/goods/goodsTypeList',payload)
}

// /api/agent/order/oderList
export function orderList(payload){
  return axios.post('/api/agent/order/orderList',payload.data)
}