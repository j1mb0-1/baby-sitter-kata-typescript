import { BabySittingJob } from "./babySittingJob";
import { BabySittingTimeSheet } from "./babySittingTimeSheet";

describe("baby sitting time sheet", () => {
  it("should create empty time sheet", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const localMidnightTime: Date = new Date("2022-03-28T04:00:00.000Z");

    const job: BabySittingJob = new BabySittingJob(
      startTime,
      endTime,
      localMidnightTime,
      12,
      8,
      16
    );

    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);

    expect(timeSheet.job).toBe(job);
    expect(timeSheet.startedTime).toBeUndefined();
    expect(timeSheet.endedTime).toBeUndefined();
    expect(timeSheet.bedTime).toBeUndefined();
  });

  it("should set started time", () => {
    const timeSheet: BabySittingTimeSheet = createValidatedTimeSheet();

    const startedTime: Date = new Date("2022-03-27T21:00:00.000Z");
    timeSheet.startedTime = startedTime;

    expect(timeSheet.startedTime).toEqual(startedTime);
  });

  it("should not set started time when it is before it's jobs start time", () => {
    const timeSheet: BabySittingTimeSheet = createValidatedTimeSheet();

    const startedTime: Date = new Date("2022-03-27T17:00:00.000Z");

    expect(() => {
      timeSheet.startedTime = startedTime;
    }).toThrowError();
  });

  it("should not set started time when it is after it's jobs end time", () => {
    const timeSheet: BabySittingTimeSheet = createValidatedTimeSheet();

    const startedTime: Date = new Date("2022-03-29T17:00:00.000Z");

    expect(() => {
      timeSheet.startedTime = startedTime;
    }).toThrowError();
  });

  it("should set ended time", () => {
    const timeSheet: BabySittingTimeSheet = createValidatedTimeSheet();

    const endedTime: Date = new Date("2022-03-28T08:00:00.000Z");
    timeSheet.endedTime = endedTime;

    expect(timeSheet.endedTime).toEqual(endedTime);
  });

  it("should not set ended time when it is after it's jobs end time", () => {
    const timeSheet: BabySittingTimeSheet = createValidatedTimeSheet();

    const endedTime: Date = new Date("2022-03-29T17:00:00.000Z");

    expect(() => {
      timeSheet.endedTime = endedTime;
    }).toThrowError();
  });

  it("should not set ended time when it is before it's jobs start time", () => {
    const timeSheet: BabySittingTimeSheet = createValidatedTimeSheet();

    const endedTime: Date = new Date("2022-03-27T20:00:00.000Z");

    expect(() => {
      timeSheet.endedTime = endedTime;
    }).toThrowError();
  });

  it("should set bed time", () => {
    const timeSheet: BabySittingTimeSheet = createValidatedTimeSheet();

    const bedTime: Date = new Date("2022-03-27T23:00:00.000Z");
    timeSheet.bedTime = bedTime;

    expect(timeSheet.bedTime).toEqual(bedTime);
  });

  it("should not set a bed time when it is before it's jobs start time", () => {
    const timeSheet: BabySittingTimeSheet = createValidatedTimeSheet();

    const bedTime: Date = new Date("2022-03-27T20:00:00.000Z");

    expect(() => {
      timeSheet.bedTime = bedTime;
    }).toThrowError();
  });

  it("should not set a bed time when it is after it's jobs end time", () => {
    const timeSheet: BabySittingTimeSheet = createValidatedTimeSheet();

    const bedTime: Date = new Date("2022-03-28T20:00:00.000Z");

    expect(() => {
      timeSheet.bedTime = bedTime;
    }).toThrowError();
  });

  const createValidatedTimeSheet = (): BabySittingTimeSheet => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const localMidnightTime: Date = new Date("2022-03-28T04:00:00.000Z");

    const job: BabySittingJob = new BabySittingJob(
      startTime,
      endTime,
      localMidnightTime,
      12,
      8,
      16
    );
    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    return timeSheet;
  };
});
