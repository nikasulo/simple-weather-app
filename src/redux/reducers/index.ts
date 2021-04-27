import { combineReducers } from "redux";
import { weatherData } from 'redux/reducers/weatherData.reducer'
import { temperatureUnit } from 'redux/reducers/temperatureUnit.reducer'

export const rootReducer = combineReducers({
  temperatureUnit,
  weatherData,
});