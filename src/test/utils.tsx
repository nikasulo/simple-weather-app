import { render } from "@testing-library/react";
import { FC } from "react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "redux/reducers";
import { State, TemperatureUnit } from "types";

const INITIAL_STATE = {
  temperatureUnit: {
    unit: TemperatureUnit.F
  },
  weatherData: {
    weatherData: [],
    temperatureGroupedByDay: {},
    loading: true
  }
}

const customRender = (ui: ReactElement, {
  initialState=INITIAL_STATE,
  store=createStore(rootReducer, initialState),
  ...renderOptions
}: {initialState?: State, store?: any}) => {
  const Wrapper: FC = ({ children }): ReactElement => {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
  }

  render(ui, {wrapper: Wrapper, ...renderOptions})
}

export * from '@testing-library/react'

export {customRender as render}