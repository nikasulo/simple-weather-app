import { ReduxActionTypes, TemperatureTimePair, TemperatureUnit } from "types";

export const setWeatherData = (data: any) => ({
  type: ReduxActionTypes.SET_WEATHER_DATA,
  payload: {
    data
  }
})

export const setHourlyData = (data: TemperatureTimePair) => ({
  type: ReduxActionTypes.SET_HOURLY_WEATHER,
  payload: {
    data
  }
})

export const setTemperatureUnit = (unit: TemperatureUnit) => ({
  type: ReduxActionTypes.SET_TEMPERATURE_UNIT,
  payload: {
    unit
  }
})