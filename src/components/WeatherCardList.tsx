import { useSelector } from "react-redux";

import { Weather } from "types";
import { outOfRange } from "utils";
import WeatherCard from "components/WeatherCard";

import { Box } from "@material-ui/core";

interface Props {
  currentStartIndex: number;
  upperLimitOfCards: number;
  selectedIndex: number;
  handleClick: (index: number) => void;
}

const WeatherCardList = ({
  currentStartIndex,
  upperLimitOfCards,
  handleClick,
  selectedIndex,
}: Props) => {
  const weatherData = useSelector(
    (state: any) => state.weatherData.weatherData
  );

  return (
    <Box
      display="flex"
      flexDirection="row"
      style={{ justifyContent: "space-around" }}
    >
      {weatherData.map((data: Weather, index: number) => {
        if (
          outOfRange(
            index,
            currentStartIndex,
            weatherData.length,
            upperLimitOfCards
          )
        )
          return null;

        return (
          <WeatherCard
            selected={index === selectedIndex}
            onClick={() => handleClick(index)}
            data={data}
          />
        );
      })}
    </Box>
  );
};

export default WeatherCardList;
