import axios from './index';

// 购物车列表
export function cartList (payload){
  return axios.post('/api/agent/shoppingCart/goodsList',payload)
}

// 加入购物车
export function addCart (payload){
  return axios.post('/api/agent/shoppingCart/add',payload)
}

// 删除购物车
export function delCart (payload){
  return axios.post('/api/agent/shoppingCart/goodsDel',payload)
}
// 购物车货品数量修改
export function updateGoodsNum (payload){
  return axios.post('/api/agent/shoppingCart/goodsCountUpdate',payload)
}
// 下单
export function orderAdd (payload){
  return axios.post('/api/agent/shoppingCart/orderAdd',payload)
}
// 购物车订单确认相关信息接口
export function confirmOrderInfo (payload){
  return axios.post('/api/agent/shoppingCart/orderInfo',payload)
}