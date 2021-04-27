import { ReduxActionTypes, TemperatureUnit } from "types";
import { setHourlyData, setTemperatureUnit, setWeatherData } from ".";

describe("redux actions", () => {
  describe('setWeatherData', () => {
    it('returns type weather data and payload', () => {
      const data = [{
        dt: 100,
        temp: {
          day: 200,
          morn: 50,
          night: 400
        }
      }]
      const expectedAction = {
        type: ReduxActionTypes.SET_WEATHER_DATA,
        payload: {
          data
        }
      }

      expect(setWeatherData(data)).toEqual(expectedAction)
    })
    
  })

  describe('setHourlyData', () => {
    it('returns type set hourly data and payload', () => {
      const data = {100: [{
        arg: 'Today',
        val: 200
      }]}
      const expectedAction = {
        type: ReduxActionTypes.SET_HOURLY_WEATHER,
        payload: {
          data
        }
      }

      expect(setHourlyData(data)).toEqual(expectedAction)
    })
  })

  describe('setTemperatureUnit', () => {
    it('returns type set temperature unit and payload', () => {
      const unit = TemperatureUnit.C

      const expectedAction = {
        type: ReduxActionTypes.SET_TEMPERATURE_UNIT,
        payload: {
          unit
        }
      }

      expect(setTemperatureUnit(unit)).toEqual(expectedAction)
    })
  })
})