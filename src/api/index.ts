import axios from 'axios';
import { setWeatherData, setHourlyData } from 'redux/actions';
import store from 'redux/store/store';
import { groupHourlyDataByDay } from 'utils';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
})

export const getData = () => {
  return axiosInstance.get(`${process.env.REACT_APP_DAILY_DATA_ENDPOINT}`).then(res => { 
    store.dispatch(setHourlyData(groupHourlyDataByDay(res.data.hourly)))
    store.dispatch(setWeatherData(res.data.daily))
  })
}