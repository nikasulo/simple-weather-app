import { render } from "test/utils";
import WeatherCardList from "components/WeatherCardList";

describe("Card controls", () => {
  test("renders without crashing", () => {
    const onClick = jest.fn();
    render(
      <WeatherCardList
        handleClick={onClick}
        currentStartIndex={0}
        upperLimitOfCards={9}
        selectedIndex={3}
      />,
      {}
    );
  });
});
