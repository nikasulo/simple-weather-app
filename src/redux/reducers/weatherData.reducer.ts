import { ReduxActionTypes, TemperatureTimePair, Weather } from "types";

interface Action {
  type: ReduxActionTypes;
  payload: { data: Weather[] | TemperatureTimePair };
}

export const weatherData = (
  state = { weatherData: [{dt: 100, temp: {morn: 600, day: 900, night: 650}}], temperatureGroupedByDay: {}, loading: true },
  action: Action
) => {
  switch (action.type) {
    case ReduxActionTypes.SET_WEATHER_DATA: {
      return Object.assign({}, state, {
        weatherData: action.payload.data,
        loading: false,
      });
    }

    case ReduxActionTypes.SET_HOURLY_WEATHER: {
      return Object.assign({}, state, {
        temperatureGroupedByDay: action.payload.data,
        loading: false,
      });
    }

    default:
      return state;
  }
};
