import {
  getStartOfDay,
  addDurationMsToDate,
  MS_IN_HOUR,
  roundToHour,
} from "./timeUtilities";

describe("time utilities", () => {
  describe("getStartOfDay", () => {
    it("should return the start of the day", () => {
      const date: Date = new Date("2022-03-27T15:03:20.489Z");
      const expectedDate: Date = new Date("2022-03-27T00:00:00.000Z");

      const actualDate: Date = getStartOfDay(date);

      expect(actualDate).toEqual(expectedDate);
    });

    it("should handle the start of the day", () => {
      const date: Date = new Date("2022-03-27T00:00:00.000Z");
      const expectedDate: Date = new Date("2022-03-27T00:00:00.000Z");

      const actualDate: Date = getStartOfDay(date);

      expect(actualDate).toEqual(expectedDate);
    });

    it("should handle the end of the day", () => {
      const date: Date = new Date("2022-03-27T23:59:59.999Z");
      const expectedDate: Date = new Date("2022-03-27T00:00:00.000Z");

      const actualDate: Date = getStartOfDay(date);

      expect(actualDate).toEqual(expectedDate);
    });
  });

  describe("addDurationMsToDate", () => {
    it("should add ms to date", () => {
      const date: Date = new Date("2022-03-27T15:03:20.489Z");
      const durationMs: number = 8 * MS_IN_HOUR;
      const expectedDate: Date = new Date("2022-03-27T23:03:20.489Z");

      const actualDate: Date = addDurationMsToDate(date, durationMs);

      expect(actualDate).toEqual(expectedDate);
    });
  });

  describe("roundToHour", () => {
    it("should round date down to hour when closer to hour", () => {
      const date: Date = new Date("2022-03-27T15:03:20.489Z");
      const expectedDate: Date = new Date("2022-03-27T15:00:00.000Z");

      const actualDate: Date = roundToHour(date, "floor");

      expect(actualDate).toEqual(expectedDate);
    });

    it("should round date down to hour when closer to next hour", () => {
      const date: Date = new Date("2022-03-27T15:55:20.489Z");
      const expectedDate: Date = new Date("2022-03-27T15:00:00.000Z");

      const actualDate: Date = roundToHour(date, "floor");

      expect(actualDate).toEqual(expectedDate);
    });

    it("should not round date down to hour when already at hour", () => {
      const date: Date = new Date("2022-03-27T15:00:00.000Z");
      const expectedDate: Date = new Date("2022-03-27T15:00:00.000Z");

      const actualDate: Date = roundToHour(date, "floor");

      expect(actualDate).toEqual(expectedDate);
    });

    it("should round date up to hour when closer to prev hour", () => {
      const date: Date = new Date("2022-03-27T15:03:20.489Z");
      const expectedDate: Date = new Date("2022-03-27T16:00:00.000Z");

      const actualDate: Date = roundToHour(date, "ceil");

      expect(actualDate).toEqual(expectedDate);
    });

    it("should round date up to hour when closer to hour", () => {
      const date: Date = new Date("2022-03-27T15:55:20.489Z");
      const expectedDate: Date = new Date("2022-03-27T16:00:00.000Z");

      const actualDate: Date = roundToHour(date, "ceil");

      expect(actualDate).toEqual(expectedDate);
    });

    it("should not round date up to hour when already at hour", () => {
      const date: Date = new Date("2022-03-27T15:00:00.000Z");
      const expectedDate: Date = new Date("2022-03-27T15:00:00.000Z");

      const actualDate: Date = roundToHour(date, "ceil");

      expect(actualDate).toEqual(expectedDate);
    });
  });
});
