export enum ReduxActionTypes {
  SET_WEATHER_DATA = 'SET_WEATHER_DATA',
  SET_TEMPERATURE_UNIT = 'SET_TEMPERATURE_UNIT',
  SET_HOURLY_WEATHER = 'SET_HOURLY_WEATHER'
}

export interface TemperatureTimePair {
  [key: number]: {
      arg: string;
      val: number;
  }[];
}


export enum TemperatureUnit { 
  F = 'F',
  C = 'C'
}

export interface Weather {
  dt: number,
  temp: {
    day: number,
    morn: number,
    night: number
  }
}