import { ReduxActionTypes, TemperatureUnit } from "types";

export const temperatureUnit = (state={unit: TemperatureUnit.F}, action: {type: ReduxActionTypes, payload: {unit: TemperatureUnit}}) => {
  switch (action.type) {
    case ReduxActionTypes.SET_TEMPERATURE_UNIT: {
      return Object.assign({}, state, {unit: action.payload.unit})
    }

    default:
      return state
  }
}