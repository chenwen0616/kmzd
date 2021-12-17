import * as TYPES from '../action-types';
let cart = {
  getData(payload){
      // console.log(payload, '传入进来的payload')
    return{
      type: TYPES.CARTDATA,
      payload
    }
  }
}
export default cart;