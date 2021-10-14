import {combineReducers} from 'redux'
import cart from './cart';
import personal from './personal';

let reducer = combineReducers({
    cart,
    personal,
})
export default reducer;