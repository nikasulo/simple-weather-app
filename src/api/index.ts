import axios from "axios";
import { setWeatherData, setHourlyData } from "redux/actions";
import store from "redux/store/store";
import { groupHourlyDataByDay } from "utils";

const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getData = () => {
  return axiosInstance
    .get(`/onecall?lat=48.1351&lon=11.5820&exclude=current,minutely,alerts&appid=${process.env.REACT_APP_ID}`)
    .then(async (res) => {
      const { daily, hourly } = res.data;
      store.dispatch(setWeatherData(daily));

      store.dispatch(setHourlyData(groupHourlyDataByDay(hourly)));
    });
};
