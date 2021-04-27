import { ReduxActionTypes, TemperatureTimePair} from "types";

interface Action {type: ReduxActionTypes, payload: {data: [] | TemperatureTimePair}}

export const weatherData = (state={weatherData:[], temperatureGroupedByDay: {}}, action: Action) => {
  switch (action.type) {
    case ReduxActionTypes.SET_WEATHER_DATA: {
      return Object.assign({}, state, {weatherData: action.payload.data})
    }

    case ReduxActionTypes.SET_HOURLY_WEATHER: {
      return Object.assign({}, state, {temperatureGroupedByDay: action.payload.data})
    }

    default:
      return state
  }
}