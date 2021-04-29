import { TemperatureTimePair, TemperatureUnit } from "types";
import moment from "moment";

export const isToday = (epochTime: number) => {
  const today = new Date()
  const date = new Date(epochTime * 1000)
  return (
    today.getFullYear() === date.getFullYear()
    && today.getMonth() === date.getMonth()
    && today.getDate() === date.getDate()
  )
}

export const isTomorrow = (epochTime: number) => {
  const today = new Date()
  const date = new Date(epochTime * 1000)
  return (
    today.getFullYear() === date.getFullYear()
    && today.getMonth() === date.getMonth()
    && today.getDate() + 1 === date.getDate()
  )
}

export const convertEpochToDate = (epochTime: number) => {
  if (isToday(epochTime))
    return "Today"
  if (isTomorrow(epochTime))
    return "Tomorrow"
  return moment(epochTime * 1000).format("MMM Do YY");
};

export const getResponsiveCardWidths = (
  phoneScreens: boolean,
  tabletScreens: boolean
) => {
  if (phoneScreens) return "100%";
  if (tabletScreens) return "47%";
};

export const outOfRange = (
  currentIndex: number,
  currentStartIndex: number,
  sizeOfData: number,
  upperLimit: number
) => {
  if (
    sizeOfData % upperLimit !== 0 &&
    // moving forward will lead us to the last data card
    currentStartIndex + (sizeOfData % upperLimit) === sizeOfData &&
    // the next card is the last one or the two before the last
    (currentIndex + 1 === sizeOfData ||
      sizeOfData - currentIndex < upperLimit + 1)
  )
    return false;
  if (currentIndex - currentStartIndex > upperLimit - 1) return true;
  if (currentIndex - currentStartIndex < 0) return true;
};

export const convertTemperature = (
  unit: TemperatureUnit,
  temperature: number
) => {
  if (unit === TemperatureUnit.F) return `${temperature}°F`;

  const newTemperature = ((temperature - 32) * (5 / 9)).toFixed(2);

  return `${newTemperature}°C`;
};

export const dayOfYear = (date: number) => {
  return moment(date * 1000).dayOfYear();
};

export const dateToday = (epochTime: number) => {
  return moment(epochTime * 1000);
};

export const formatDate = (epochTime: number, format: string) => {
  return dateToday(epochTime).format(format);
};

export const groupHourlyDataByDay = (
  data: { temp: number; dt: number }[]
): TemperatureTimePair => {
  let currentDay = dayOfYear(data[0].dt);
  const groupedDataHash: { [key: number]: { arg: string; val: number }[] } = {};

  data.forEach((hour) => {
    if (currentDay === dayOfYear(hour.dt)) {
      if (groupedDataHash[currentDay]) {
        groupedDataHash[currentDay].push({
          arg: formatDate(hour.dt, "h:mm:ss"),
          val: hour.temp,
        });
      } else {
        groupedDataHash[currentDay] = [];
        groupedDataHash[currentDay].push({
          arg: formatDate(hour.dt, "h:mm:ss"),
          val: hour.temp,
        });
      }
    } else {
      currentDay = dayOfYear(hour.dt);
      groupedDataHash[currentDay] = [];
      groupedDataHash[currentDay].push({
        arg: formatDate(hour.dt, "h:mm:ss"),
        val: hour.temp,
      });
    }
  });

  return groupedDataHash;
};
