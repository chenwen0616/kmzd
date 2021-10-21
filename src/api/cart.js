import axios from './index';

// 购物车列表
export function cartList (payload){
  return axios.post('/api/agent/shoppingCart/goodsList',payload)
}

// 加入购物车
export function addCart (payload){
  return axios.post('/api/agent/shoppingCart/add',payload)
}

// 下单
export function orderAdd (payload){
  return axios.post('/api/agent/shoppingCart/orderAdd',payload)
}