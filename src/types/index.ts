export enum ReduxActionTypes {
  SET_WEATHER_DATA = "SET_WEATHER_DATA",
  SET_TEMPERATURE_UNIT = "SET_TEMPERATURE_UNIT",
  SET_HOURLY_WEATHER = "SET_HOURLY_WEATHER",
}

export interface TemperatureTimePair {
  [key: number]: {
    arg: string;
    val: number;
  }[];
}

export interface State {
  temperatureUnit: {
    unit: TemperatureUnit;
  };
  weatherData: {
    weatherData: never[];
    temperatureGroupedByDay: {};
    loading: boolean;
  };
}

export enum TemperatureUnit {
  F = "F",
  C = "C",
}

export interface Weather {
  dt: number;
  temp: {
    day: number;
    morn: number;
    night: number;
  };
}
