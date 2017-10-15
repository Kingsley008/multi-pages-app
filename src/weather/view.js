import React from 'react';
import {connect} from 'react-redux';
import * as Status from './status';


const ForeCast  = ({date, fengli, fengxiang, high, low, type }) =>{
    return(<li>日期：{date} 风力：{fengli} 风向：{fengxiang} 最高气温： {high} 最低气温：{low} 天气类型：{type}</li>);
};
export const weatherStateKey = 'weather';

const Weather = ({status,city, wendu, ganmao, forecast}) => {
    console.log(status);
    switch (status){
        case Status.LOADING:{
            return (
                <div>数据请求中</div>
            )
        }
        case Status.SUCCESS:{
            let forecastList = [];
            for(let i = 0; i < forecast.length; i++) {
                let value = forecast[i];
                forecastList.push(<ForeCast
                    key={i} date={value.date} fengli={value.fengli} fengxiang ={value.fengxiang}
                    high={value.high} low={value.low} type={value.type}
                />)
            }

            return(
                <div>
                    {city} {wendu}℃ :{ganmao}
                    <div>未来五天天气预告</div>
                    <ul>
                        {forecastList}
                    </ul>
                </div>
            )
        }

        case Status.FAILURE:{
            return(
                <div>数据请求失败...</div>
            )
        }
        default:
            throw new Error ('unexpected status ' + status);
    }

};

const mapState = (state) => {
  const weatherData = state[weatherStateKey];
  console.log(state.weather.state);
  /*{city, wendu, ganmao, forecast}*/
  return {
      status:weatherData.status,
      city : weatherData.city,
      wendu : weatherData.wendu,
      ganmao: weatherData.ganmao,
      forecast : weatherData.forecast,
  };
};

export default connect(mapState, null)(Weather);