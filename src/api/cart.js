import axios from './index';

// 购物车列表
export function cartList (payload){
  return axios.post('/api/agent/shoppingCart/goodsList',payload)
}

