import { TemperatureUnit } from "types";
import * as Utils from "./index";

describe("Utils", () => {
  const RealDate = global.Date;

  const mockDate = (customDate?: number) => {
    global.Date = class extends RealDate {
      constructor(date: number = 1619638584985) {
        super();
        if (customDate) return new RealDate(customDate);
        return new RealDate(date);
      }
    } as any;
  };

  beforeEach(() => {
    mockDate();
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  describe("convertEpochToDate", () => {
    it("returns today if the day of year is the same", () => {
      const today = new Date();
      const result = Utils.convertEpochToDate(1619638584985 / 1000);

      expect(result).toEqual("Today");
    });

    it("returns today if the tomorrow of year is the same as tomorrow", () => {
      const tomorrow = new Date();

      // add 1 day to today
      tomorrow.setDate(new Date().getDate() + 1);

      const result = Utils.convertEpochToDate(
        Math.round(tomorrow.getTime() / 1000)
      );

      expect(result).toEqual("Tomorrow");
    });
  });

  describe("outOfRange", () => {
    it("returns true when a card is out of range to the left", () => {
      const results = Utils.outOfRange(2, 3, 9, 3);

      expect(results).toBe(true);
    });

    it("returns true when a card is out of range to the right", () => {
      const results = Utils.outOfRange(7, 3, 9, 3);

      expect(results).toBe(true);
    });

    it("returns false when there is space for the last lone element in the current view", () => {
      const results = Utils.outOfRange(8, 6, 8, 3);

      expect(results).toBe(false);
    });
  });

  describe("convert temperature", () => {
    it("returns celcius when unit is celcius", () => {
      const results = Utils.convertTemperature(TemperatureUnit.C, 200);

      expect(results).toBe("93.33°C");
    });

    it("returns fahernheit as a default", () => {
      const results = Utils.convertTemperature(TemperatureUnit.F, 200);

      expect(results).toBe("200°F");
    });
  });

  describe("computeBarCharTemperatures", () => {
    const data = [{
      arg: 'arg',
      val: 200
    }]
    it("computes celcius temperatures", () => {
      const results = Utils.computeBarCharTemperatures(data, TemperatureUnit.C);

      expect(results).toEqual([{"arg": "arg", "val": 93}]);
    });

    it("returns fahernheit temperatures as a default", () => {
      const results = Utils.computeBarCharTemperatures(data, TemperatureUnit.C);

      expect(results).toEqual([{"arg": "arg", "val": 93}]);
    });
  });

  describe("convert temperature", () => {
    it("returns celcius when unit is celcius", () => {
      const groupedData = {
        1: [
          {
            arg: "4:00:00",
            val: 283.34,
          },
          {
            arg: "5:00:00",
            val: 283.12,
          },
        ],
      };

      const data = [
        {
          dt: 1619665200,
          temp: 283.34,
          feels_like: 282.58,
          pressure: 1005,
          humidity: 83,
          dew_point: 280.59,
          uvi: 0,
          clouds: 98,
          visibility: 10000,
          wind_speed: 3.91,
          wind_deg: 249,
          wind_gust: 11.35,
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "overcast clouds",
              icon: "04n",
            },
          ],
          pop: 0,
        },
        {
          dt: 1619668800,
          temp: 283.12,
          feels_like: 280.91,
          pressure: 1005,
          humidity: 85,
          dew_point: 280.72,
          uvi: 0,
          clouds: 99,
          visibility: 10000,
          wind_speed: 4.47,
          wind_deg: 256,
          wind_gust: 11.7,
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "overcast clouds",
              icon: "04d",
            },
          ],
          pop: 0,
        },
      ];
      const results = Utils.groupHourlyDataByDay(data);

      expect(results).toEqual(groupedData);
    });
  });
});
