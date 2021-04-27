import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import Chart, {
  Series,
  Legend
} from 'devextreme-react/chart';
import { dayOfYear } from 'utils';
import { useResponsiveChecks } from "hooks";
import { blue } from "@material-ui/core/colors";


const BarChart = ({ selectedIndex }: { selectedIndex: number }) => {
  const weatherData = useSelector((state: any) => state.weatherData.weatherData)
  const temperatureGroupedByDay = useSelector((state: any) => state.weatherData.temperatureGroupedByDay)

  const {
    phoneScreens,
  } = useResponsiveChecks()
  if (phoneScreens) return null

  if (weatherData[selectedIndex] && temperatureGroupedByDay[dayOfYear(weatherData[selectedIndex]?.dt)]) 
    return (
      <Box style={{margin: '50px 0'}}>
        <Chart dataSource={temperatureGroupedByDay[dayOfYear(weatherData[selectedIndex]?.dt)]}>
            <Series type="bar" color={blue[200]}/>
            <Legend visible={false} />
        </Chart>
      </Box>
    )

  return (
    <Box style={{margin: '50px 0'}}>
      <Chart dataSource={{}}>
          <Series type="bar" />
          <Legend visible={false} />
      </Chart>
          <h3>No Data for the selected day</h3>
    </Box>
  )
}

export default BarChart;