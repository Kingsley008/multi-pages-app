import * as actionTypes from './actionTypes';

export const increse = ()=> {
  return{
      type: actionTypes.INCREMENT
  }
};

export const decrese = ()=> {
    return {
        type: actionTypes.DECREMENT
    }
};