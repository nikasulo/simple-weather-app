import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Container } from "@material-ui/core";

import { getData } from "api";

import "./App.css";
import "fontsource-roboto/500.css";
import "fontsource-roboto/900-italic.css";

import CardControls from "components/CardControls";
import WeatherCardList from "components/WeatherCardList";
import TemperatureControls from "components/TemperatureControls";
import BarChart from "components/BarChart";
import { useApp } from "hooks/useApp";
import { State } from "types";

const App = () => {
  const weatherData = useSelector(
    (state: State) => state.weatherData.weatherData
  );

  const {
    currentStartIndex,
    selectedIndex,
    upperLimitOfCards,
    handleRightArrow,
    handleLeftArrow,
    handleCardSelection,
    loading,
  } = useApp(weatherData?.length);

  useEffect(() => {
    getData();
  }, []);

  if (loading)
    return (
      <Container
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth={"md"}
      >
        <Typography>Loading...</Typography>
      </Container>
    );

  return (
    <Container maxWidth={"md"}>
      <TemperatureControls />
      <CardControls
        upperLimit={upperLimitOfCards}
        handleLeftArrow={handleLeftArrow}
        handleRightArrow={handleRightArrow}
        dataSetSize={weatherData.length}
        currentStartIndex={currentStartIndex}
      />
      <WeatherCardList
        currentStartIndex={currentStartIndex}
        selectedIndex={selectedIndex}
        upperLimitOfCards={upperLimitOfCards}
        handleClick={handleCardSelection}
      />
      <BarChart selectedIndex={selectedIndex} />
    </Container>
  );
};

export default App;
