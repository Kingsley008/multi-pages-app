import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../weather/actions';

const CITY_NAME = {
    Ningbo: '宁波',
    Beijing: '北京',
    Shanghai:'上海'
};

class CitySelector extends React.Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(ev){
        let currentCity = ev.target.value;
        this.props.onSelectCity(currentCity);
    }

    componentDidMount(){
        // 发送默认请求
        let defaultCity = Object.keys(CITY_NAME)[0];
        this.props.onSelectCity(CITY_NAME[defaultCity]);
    }
    render(){
        return(
        <select onChange={this.onChange}>
            {
                Object.keys(CITY_NAME).map(
                    cityName => <option key={cityName} value={CITY_NAME[cityName]}>{CITY_NAME[cityName]}</option>
                )
            }
        </select>
        )
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        onSelectCity: (cityName) => {
            dispatch(actions.fetchWeather(cityName))
        }
    }
};

export default connect(null, mapDispatchToProps)(CitySelector);