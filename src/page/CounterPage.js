import {view as Counter} from '../Counter/index';
import React from 'react';
import {reducer, stateKey} from '../Counter/index';

const CounterPage = () => {
    return (
        <div>
            <div>Counter</div>
            <Counter caption = "text" />
        </div>
    )
};

const initValue = 100;
export {CounterPage,reducer, initValue, stateKey};