import React from 'react';
import * as actions from './actions.js';
import {connect} from 'react-redux';

// 在状态树上的节点名称
export const stateKey = 'counter';

const  buttonStyle = {
    margin:'10px'
};
function Counter({onIncrement, onDecrement, value}) {
    return (
        <div>
            <button style={buttonStyle} onClick={onIncrement}>+</button>
            <button style={buttonStyle} onClick={onDecrement}>-</button>
            <span>Count:{value}</span>
        </div>
    )
}
const mapState = (state)=> (
    {
        value: state[stateKey] || 0,
    }
);

const mapDispatch = (dispatch) => {
    return{
        onIncrement:()=> dispatch(actions.increse()),
        onDecrement:()=> dispatch(actions.decrese())
    }
};

export default connect(mapState, mapDispatch)(Counter);
