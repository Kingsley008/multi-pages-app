import React from 'react';
import {WeatherView} from '../weather/index';
import {weatherReducer, weatherStateKey} from '../weather/index';
import WeatherSelector from '../city_selector/view';

const WeatherPage = ()=>{
  return(
      <div>
          <WeatherSelector/>
          <WeatherView/>
      </div>
  )
};

export {WeatherPage, weatherStateKey, weatherReducer};