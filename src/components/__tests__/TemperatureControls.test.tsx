import userEvent from '@testing-library/user-event';
import TemperatureControls from 'components/TemperatureControls';
import * as ReduxActions from 'redux/actions';
import { render, screen } from 'test/utils'
import {useSelector} from 'react-redux'
import { ReduxActionTypes, TemperatureUnit } from 'types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  dispatch: jest.fn()
}))

describe('Temperature controls', () => {
  test('it allows changing temperature to celcius', () => {
    render(<TemperatureControls />, {})
    const setTemperatureUnitSpy = jest.spyOn(ReduxActions, 'setTemperatureUnit')
    const celcius = screen.getByRole('radio', { name: 'C' })

    expect(celcius.checked).toBe(false)
    const leftClick = { button: 0 }

    userEvent.click(celcius, leftClick)


    expect(setTemperatureUnitSpy).toHaveBeenCalledWith('C')

    expect(celcius.checked).toBe(true)
  })

  test('it allows changing temperature to fahrenheit', () => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      callback({
        temperatureUnit: {
          unit: 'C'
        }
      })
    });

    const setTemperatureUnitSpy = jest.spyOn(ReduxActions, 'setTemperatureUnit')
    .mockImplementation((unit) => ({
      type: ReduxActionTypes.SET_TEMPERATURE_UNIT,
      payload:{
        unit
      }
    }));

    render(<TemperatureControls />, {})
    
    const fahernheit = screen.getByRole('radio', { name: 'F' })

    expect(fahernheit.checked).toBe(false)
    const leftClick = { button: 0 }

    userEvent.click(fahernheit, leftClick)

    expect(setTemperatureUnitSpy).toHaveBeenCalledWith('F')

    expect(fahernheit.checked).toBe(true)
  })
})