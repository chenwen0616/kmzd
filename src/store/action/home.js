import * as TYPES from '../action-types';
import {goodsList} from '../../api/home';

const home = {
  goodsList(payload){
    return async dispatch=>{
      const result = await goodsList(payload)
      dispatch({
        type: TYPES.goods_list,
        goodsListRes: result
      })
    }
  }
};
export default home;