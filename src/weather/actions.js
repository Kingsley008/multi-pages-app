import * as actionTypes from './actionTypes';


// 异步action  定义fetch 的行为
export const fetchWeatherStarted = () => ({
   type: actionTypes.FETCH_STARTED
});

export const fetchWeatherSuccess = (result) => ({
        type: actionTypes.FETCH_SUCCESS,
        result
});

export const fetchWeatherFailure = (error) => ({
        type: actionTypes.FETCH_FAILURE,
        error
});

let nextSeqId = 0;

// 定义 fetchWeather 的行为
export const fetchWeather = (city) => {
  return (dispatch) => {
      const apiUrl = `/weather_mini?city=${city}`;
      const seqId = ++nextSeqId;
      // 确保当前 seq id 一致才 派发动作
      const dispatchIfValid = (action) => {
          if (seqId === nextSeqId) {
              return dispatch(action);
          }
      };
      dispatch(fetchWeatherStarted());
      fetch(apiUrl).then((response) => {
          console.log('fetch');
          if (response.status !== 200) {
              throw new Error('Fail to get response with status ' + response.status);
          }
          response.json().then((responseJSON) => {
              dispatchIfValid(fetchWeatherSuccess(responseJSON.data));
          }).catch((error) => {
              dispatchIfValid(fetchWeatherFailure(error));
          })

      }).catch((error) => {
          dispatchIfValid(fetchWeatherFailure(error));
      })
  }
};
