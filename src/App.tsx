
import { getData } from 'api';
import { useEffect, useState } from 'react';

import './App.css';
import 'fontsource-roboto/500.css';
import "fontsource-roboto/900-italic.css"
import { useSelector } from 'react-redux';
import { Box, Container } from '@material-ui/core';
import { Weather } from 'types';
import WeatherCard from 'components/WeatherCard'
import CardControls from 'components/CardControls'
import { dayOfYear, outOfRange } from 'utils';
import TemperatureControls from 'components/TemperatureControls';

import Chart, {
  Series,
  Legend
} from 'devextreme-react/chart';
import { useResponsiveChecks } from 'hooks';

const App = () => {
  const weatherData = useSelector((state: any) => state.weatherData.weatherData)
  const temperatureGroupedByDay = useSelector((state: any) => state.weatherData.temperatureGroupedByDay)
  const [upperLimitOfCards, setUpperLimitOfCards] = useState(3)
  const [currentStartIndex, setCurrentStartIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const {
    phoneScreens,
    tabletScreens
  } = useResponsiveChecks()

  const handleLeftArrow = () => {
    if (currentStartIndex === 0) return
    setCurrentStartIndex(prev => prev - 1)
  }

  useEffect(() => {
      if (phoneScreens){
        setUpperLimitOfCards(1)
      } else if (tabletScreens){
        setUpperLimitOfCards(2)
      } else{
        setUpperLimitOfCards(3)
      }
  }, [phoneScreens, tabletScreens])

  const handleRightArrow = () => {
    if (currentStartIndex === weatherData.length - 2) return
    setCurrentStartIndex(prev => prev + 1)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleClick = (index: number) => {
    setSelectedIndex(index)
  }

  return (
    <Container maxWidth={'md'} >
      <TemperatureControls />
      <CardControls handleLeftArrow={handleLeftArrow} handleRightArrow={handleRightArrow} currentStartIndex={currentStartIndex}/>
      <Box display="flex" flexDirection="row" style={{justifyContent: 'space-around'}}>
        {
          weatherData.map((data: Weather, index: number) => {
            if (outOfRange(index, currentStartIndex, weatherData.length, upperLimitOfCards)) return null
            
            return (
              <WeatherCard onClick={() => handleClick(index)} data={data}/>
            )
          })
        }
      </Box>
      <Box style={{margin: '50px 0'}}>
        {!phoneScreens && (weatherData[selectedIndex] 
          && temperatureGroupedByDay[dayOfYear(weatherData[selectedIndex]?.dt)] ? 
          <Chart dataSource={temperatureGroupedByDay[dayOfYear(weatherData[selectedIndex]?.dt)]}>
              <Series type="bar" />
              <Legend visible={false} />
          </Chart> : <Chart dataSource={{}}>
              <Series type="bar" />
              <Legend visible={false} />
          </Chart>
        )}
      </Box>
    </Container>
  )
}

export default App;
