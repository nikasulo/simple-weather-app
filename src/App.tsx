
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getData } from 'api';

import './App.css';
import 'fontsource-roboto/500.css';
import "fontsource-roboto/900-italic.css"


import CardControls from 'components/CardControls'
import WeatherCardList from 'components/WeatherCardList'
import TemperatureControls from 'components/TemperatureControls';
import BarChart from 'components/BarChart';

import { Container } from '@material-ui/core';


import { useResponsiveChecks } from 'hooks';
import { Typography } from '@material-ui/core';

const App = () => {
  const {weatherData} = useSelector((state: any) => state.weatherData)
  const {loading} = useSelector((state: any) => state.weatherData)
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

  if (loading) return (
    <Container style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}} maxWidth={'md'} >
      <Typography>Loading...</Typography>
    </Container>
  )

  return (
    <Container maxWidth={'md'} >
      <TemperatureControls />
      <CardControls handleLeftArrow={handleLeftArrow} handleRightArrow={handleRightArrow} dataSetSize={weatherData.length} currentStartIndex={currentStartIndex}/>
      <WeatherCardList currentStartIndex={currentStartIndex} selectedIndex={selectedIndex} upperLimitOfCards={upperLimitOfCards} handleClick={handleClick}  />
      <BarChart selectedIndex={selectedIndex}/>
    </Container>
  )
}

export default App;
