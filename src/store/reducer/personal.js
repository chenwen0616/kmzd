import * as TYPES from '../action-types';
export default personal=(state={
    data:[],
},action)=>{
    state = JSON.parse(JSON.stringify(state));
    switch(action.type){
        // case
    }
    return state;
}