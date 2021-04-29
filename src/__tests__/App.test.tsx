import { getData } from "api";
import { useSelector } from "react-redux";
import { render, screen } from "test/utils";
import { TemperatureUnit } from "types";
import App from "App";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

jest.mock("api");

describe("App Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback({
        weatherData: {
          weatherData: [],
          loading: false,
        },
        temperatureUnit: {
          unit: TemperatureUnit.C,
        },
      });
    });

    render(<App />, {});

    const loading = screen.queryByText(/loading.../i);

    expect(loading).toBe(null);
  });

  test("shows loading screen when data is loading", () => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback({
        weatherData: {
          weatherData: [],
          loading: true,
        },
        temperatureUnit: {
          unit: TemperatureUnit.C,
        },
      });
    });
    render(<App />, {});

    screen.getByText(/loading.../i);
  });

  test("fetches data on mount", () => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback({
        weatherData: {
          weatherData: [],
          loading: true,
        },
        temperatureUnit: {
          unit: TemperatureUnit.C,
        },
      });
    });
    render(<App />, {});

    expect(getData).toHaveBeenCalledWith();
  });
});
