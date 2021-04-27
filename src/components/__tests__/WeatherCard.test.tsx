import {render, screen} from 'test/utils'
import WeatherCard from 'components/WeatherCard'
import * as WeatherUtils from 'utils';

describe('Card controls', () => {
  it('renders without crashing', () => {
    const onClick = jest.fn()
    render(
      <WeatherCard 
        onClick={onClick} 
        selected={false} 
        data={{dt: 1000, temp: {morn: 200, night: 200, day: 300}}} />, {})
  })

  it('runs the appropriate temperature conversions for morn, night and day', () => {
    const onClick = jest.fn()
    const convertTemperatureSpy = jest.spyOn(WeatherUtils, 'convertTemperature')
    render(
      <WeatherCard 
        onClick={onClick} 
        selected={false} 
        data={{dt: 1000, temp: {morn: 200, night: 400, day: 300}}} />, {})

    expect(convertTemperatureSpy).toHaveBeenCalledTimes(3)
    expect(convertTemperatureSpy).toHaveBeenCalledWith("F", 200)
    expect(convertTemperatureSpy).toHaveBeenCalledWith("F", 300)
    expect(convertTemperatureSpy).toHaveBeenCalledWith("F", 400)
  })

  it('shows the correct date for the weather data', () => {
    const onClick = jest.fn()
    const dateToHumanWordsSpy = jest.spyOn(WeatherUtils, 'dateToHumanWords')
    const date = new Date(2010, 6, 26).getTime() / 1000
    render(
      <WeatherCard 
        onClick={onClick} 
        selected={false} 
        data={{dt: date, temp: {morn: 200, night: 400, day: 300}}} />, {})

        
    screen.getByText(/jul 26th 10/i)
    expect(dateToHumanWordsSpy).toHaveBeenCalledWith(date)
  })


})