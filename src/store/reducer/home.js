import * as TYPES from '../action-types';

const INIT_STATE = {
    goodsList: {
        total: 1,
        pageSize: 1,
        pageNum: 10,
        data: []
    },
};

export default function home (state=INIT_STATE,action){
    state = JSON.parse(JSON.stringify(state));
    switch(action.type){
        // case TYPES.goods_list:
        //     break;
    }
    return state;
}