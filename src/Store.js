import { createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import resetEnhancer from './enhancer/reset';

const orginalReducers = {
    routing:  routerReducer
};

const  reducer  = combineReducers({
    routing: routerReducer
});
const middlewares = [thunkMiddleware];

const win = window;
const storeEnhancers = compose(
    //加入中间件
    applyMiddleware(...middlewares), resetEnhancer,
    (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
);

const initialState = {};
const store = createStore(reducer, initialState, storeEnhancers);
store._reducers = orginalReducers;
export default store;

