import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import Chart, { Series, Legend } from "devextreme-react/chart";
import { computeBarCharTemperatures, dayOfYear } from "utils";
import { useResponsiveChecks } from "hooks";
import { blue } from "@material-ui/core/colors";
import { State } from "types";
import { DataSourceOptions } from "devextreme/data/data_source";

const BarChart = ({ selectedIndex }: { selectedIndex: number }) => {
  const weatherData = useSelector(
    (state: State) => state.weatherData.weatherData
  );
  const temperatureGroupedByDay = useSelector(
    (state: State) => state.weatherData.temperatureGroupedByDay
  );
  const unit = useSelector(
    (state: State) => state.temperatureUnit.unit
  );

  const { phoneScreens } = useResponsiveChecks();
  if (phoneScreens) return null;

  if (
    weatherData[selectedIndex] &&
    temperatureGroupedByDay[dayOfYear(weatherData[selectedIndex]?.dt)]
  )
    return (
      <Box style={{ margin: "50px 0" }}>
        <Chart
          dataSource={
            computeBarCharTemperatures(temperatureGroupedByDay[dayOfYear(weatherData[selectedIndex]?.dt)], unit) as DataSourceOptions
          }
        >
          <Series type="bar" color={blue[200]} />
          <Legend visible={false} />
        </Chart>
      </Box>
    );

  return (
    <Box style={{ margin: "50px 0" }}>
      <Chart dataSource={{}}>
        <Series type="bar" />
        <Legend visible={false} />
      </Chart>
      <h3>No Data for the selected day</h3>
    </Box>
  );
};

export default BarChart;
