import React from 'react';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import {App} from './page/App';
import {syncHistoryWithStore} from 'react-router-redux';
import  store from './Store';
import {combineReducers} from 'redux';
import {initValue} from './page/CounterPage';

// import {Home} from './page/Home.js';
// import {About} from './page/About.js';
// import {NotFound} from './page/NotFound.js';

// 异步加载React组件
/**
 * @param: nextState  -  匹配当前route信息
 * @param: callback - 回调函数 第一个参数 代表是否有错误 第二个参数 装载成功的组件
 * **/
const getHomePage = (location, callback) => {
  // 异步加载模块的方法 当webpack 做静态代码分析的时候 会特殊处理 生成一个动态打包文件
  // 参数1： 依赖关系 参数2： 文件路径 参数3： 打包后的名字
  require.ensure(['./page/Home.js'], function (require) {
      //2、如果你的组件是使用es5的module.exports导出的话，那么只需要require(‘components/Index’)即可。
      // 而如果你的组件是使用es6的export default导出的话，那么需要加上default！例如：require(‘components/Index’).default
      callback(null, require('./page/Home.js').default);
  },'home')
};

const getAboutPage = (location, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./page/About.js').default);
    },'about')
};

const getNotFoundPage = (location, callback) => {
    require.ensure([], function (require) {
        callback(null, require('./page/NotFound.js').default);
    },'404');
};

const getCounterPage = (location, callback) => {
    require.ensure([], function (require) {
        const {CounterPage, reducer, stateKey, initValue} = require('./page/CounterPage.js');
        const state = store.getState();
        store.reset(combineReducers({
            ...store._reducers,
            counter: reducer
        }),{
            ...state,
            [stateKey]:initValue
        });

        callback(null, CounterPage);
    },'counter');

};

const getWeatherPage = (location, callback) => {
    require.ensure([], function (require) {
        const {WeatherPage, weatherReducer, weatherStateKey} = require('./page/WeatherPage.js');
        const state = store.getState();
        console.log(state);
        store.reset(combineReducers({
            ...store._reducers,
            weather: weatherReducer
        }),{
            ...state,
            [weatherStateKey]:{
                status:'loading',
            }
        });

        callback(null, WeatherPage);
    },'weather');

};


// 同步 store 的路由状态
const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
  <Router history = {history}>
      <Route path = "/" component = {App}>
          <IndexRoute getComponent={getHomePage}/>
          <Route path ="home" getComponent = {getHomePage} />
          <Route path= "counter" getComponent= {getCounterPage} />
          <Route path="weather" getComponent = {getWeatherPage}/>
          <Route path="*" getComponent= {getNotFoundPage} />
      </Route>
  </Router>
);

export default Routes;