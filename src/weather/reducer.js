import * as actionTypes from './actionTypes';
import * as status from './status';

/**
 * reducer 根据dispatcher action  改变store的状态
 * **/
export default (state = { status: status.LOADING }, action )=> {

    console.log(state);
    switch (action.type){
        case actionTypes.FETCH_STARTED: {
            return { status: status.LOADING }
        }
        case actionTypes.FETCH_SUCCESS: {

            return {...state, status:status.SUCCESS, ...action.result}
        }
        case actionTypes.FETCH_FAILURE: {
            return {
                status:status.FAILURE
            }
        }
        default:
            return state;
    }
}