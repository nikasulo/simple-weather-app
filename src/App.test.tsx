import App from './App';
// import * as ReactRedux from 'react-redux'
import { render, screen } from 'test/utils';
import { useSelector } from 'react-redux';
import { TemperatureUnit } from 'types';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}))

describe('App Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback({
        weatherData: {
          weatherData: [],
          loading: false
        },
        temperatureUnit: {
          unit: TemperatureUnit.C
        },
      })
    });

    render(<App />,{});

    const loading = screen.queryByText(/loading.../i)

    expect(loading).toBe(null)
  });

  test('shows loading screen when data is loading', () => {
    
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback({
        weatherData: {
          weatherData: [],
          loading: true
        },
        temperatureUnit: {
          unit: TemperatureUnit.C
        },
      })
    });
    render(<App />,{});

    screen.getByText(/loading.../i)
  });

})
