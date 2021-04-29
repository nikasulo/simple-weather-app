import axios from "axios";
import { setWeatherData, setHourlyData } from "redux/actions";
import store from "redux/store/store";
import { groupHourlyDataByDay } from "utils";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

export const getData = () => {
  return axiosInstance
    .get(`${process.env.REACT_APP_DAILY_DATA_ENDPOINT}`)
    .then(async (res) => {
      const { daily, hourly } = res.data;
      store.dispatch(setWeatherData(daily));

      store.dispatch(setHourlyData(groupHourlyDataByDay(hourly)));
    });
};
