import * as API from "./index";
import store from "redux/store/store";
import { setHourlyData } from "redux/actions";
import { groupHourlyDataByDay } from "utils";

jest.mock("redux/store/store", () => ({
  dispatch: jest.fn(),
}));

jest.mock("redux/actions");
jest.mock("utils");

describe("API", () => {
  describe("getData", () => {
    it("fetches daily weather data", async () => {
      const dispatch = jest.spyOn(store, "dispatch");
      await API.getData();
      expect(dispatch).toHaveBeenCalledWith(
        setHourlyData(groupHourlyDataByDay([{ dt: 100, temp: 12 }]))
      );
    });
  });
});
