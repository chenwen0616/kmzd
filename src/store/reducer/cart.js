import * as TYPES from '../action-types';
export default function cart (state={
    orderData:[],
},action){
  state = JSON.parse(JSON.stringify(state));
  // eslint-disable-next-line default-case
  switch(action.type){
    case TYPES.CARTDATA:
      const {payload} = action;
      // console.log(payload, 'payload')
      state = {...state, orderData: [...payload]};
      break;
  }
  return state;
}