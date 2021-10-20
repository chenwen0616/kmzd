import axios from './index';

// 获取列表
export function goodsList (){
  return axios.post('/api/agent​/goods​/goodsList')
}

// /api/agent/order/oderList
export function orderList(){
  return axios.post('/api/agent/order/orderList')
}