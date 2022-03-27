import { MS_IN_HOUR } from "../helpers/timeUtilities";
import { BabySitter } from "./babySitter";
import { BabySittingJob } from "./babySittingJob";
import { BabySittingTimeSheet } from "./babySittingTimeSheet";

describe("baby sitter", () => {
  const mockNow: Date = new Date("2022-03-27T12:00:00.000Z");

  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(mockNow);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should create baby sitter", () => {
    const preferredStartDayStartDurationMs: number = 17 * MS_IN_HOUR;
    const preferredEndDayEndDurationMs: number = 4 * MS_IN_HOUR;
    const babySitter: BabySitter = new BabySitter(
      preferredStartDayStartDurationMs,
      preferredEndDayEndDurationMs
    );

    expect(babySitter.startDayStartTimeAsDurationMs).toBe(
      preferredStartDayStartDurationMs
    );
    expect(babySitter.endDayEndTimeAsDurationMs).toBe(
      preferredEndDayEndDurationMs
    );
  });

  it("should accept a job", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const preferredStartDayStartDurationMs: number = 21 * MS_IN_HOUR;
    const preferredEndDayEndDurationMs: number = 8 * MS_IN_HOUR;
    const job: BabySittingJob = new BabySittingJob(
      startTime,
      endTime,
      12,
      8,
      16
    );
    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    const babySitter: BabySitter = new BabySitter(
      preferredStartDayStartDurationMs,
      preferredEndDayEndDurationMs
    );

    babySitter.acceptJob(timeSheet);

    expect(babySitter.timeSheet).toBe(timeSheet);
    expect(babySitter.job).toBe(job);
  });

  it("should not accept a job when it is over 24 hours", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T22:00:00.000Z");
    const preferredStartDayStartDurationMs: number = 21 * MS_IN_HOUR;
    const preferredEndDayEndDurationMs: number = 8 * MS_IN_HOUR;
    const job: BabySittingJob = new BabySittingJob(
      startTime,
      endTime,
      12,
      8,
      16
    );
    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    const babySitter: BabySitter = new BabySitter(
      preferredStartDayStartDurationMs,
      preferredEndDayEndDurationMs
    );

    expect(() => {
      babySitter.acceptJob(timeSheet);
    }).toThrowError();
  });

  it("should not accept a job when its start date has passed", () => {
    const startTime: Date = new Date("2022-03-27T11:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const preferredStartDayStartDurationMs: number = 21 * MS_IN_HOUR;
    const preferredEndDayEndDurationMs: number = 8 * MS_IN_HOUR;
    const job: BabySittingJob = new BabySittingJob(
      startTime,
      endTime,
      12,
      8,
      16
    );
    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    const babySitter: BabySitter = new BabySitter(
      preferredStartDayStartDurationMs,
      preferredEndDayEndDurationMs
    );

    expect(() => {
      babySitter.acceptJob(timeSheet);
    }).toThrowError();
  });

  it("should not accept a job when it starts before its start time", () => {
    const preferredStartDayStartDurationMs: number = 21 * MS_IN_HOUR;
    const preferredEndDayEndDurationMs: number = 8 * MS_IN_HOUR;
    const startOfToday: Date = new Date("2022-03-27T00:00:00.000Z");
    const startOfTomorrow: Date = new Date(
      startOfToday.getTime() + 24 * MS_IN_HOUR
    );

    const preferredStartTimeToday: Date = new Date(
      startOfToday.getTime() + preferredStartDayStartDurationMs
    );
    const jobStartTimeBeforePreferred: Date = new Date(
      preferredStartTimeToday.getTime() - 3 * MS_IN_HOUR
    );

    const preferredEndTimeTomorrow: Date = new Date(
      startOfTomorrow.getTime() + preferredEndDayEndDurationMs
    );
    const jobEndTime: Date = new Date(preferredEndTimeTomorrow.getTime());

    const job: BabySittingJob = new BabySittingJob(
      jobStartTimeBeforePreferred,
      jobEndTime,
      12,
      8,
      16
    );

    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    const babySitter: BabySitter = new BabySitter(
      preferredStartDayStartDurationMs,
      preferredEndDayEndDurationMs
    );

    expect(() => {
      babySitter.acceptJob(timeSheet);
    }).toThrowError();
  });

  it("should not accept a job when it ends after its end time", () => {
    const preferredStartDayStartDurationMs: number = 21 * MS_IN_HOUR;
    const preferredEndDayEndDurationMs: number = 8 * MS_IN_HOUR;
    const startOfToday: Date = new Date("2022-03-27T00:00:00.000Z");
    const startOfTomorrow: Date = new Date(
      startOfToday.getTime() + 24 * MS_IN_HOUR
    );

    const preferredStartTimeToday: Date = new Date(
      startOfToday.getTime() + preferredStartDayStartDurationMs
    );
    const jobStartTime: Date = new Date(preferredStartTimeToday.getTime());

    const preferredEndTimeTomorrow: Date = new Date(
      startOfTomorrow.getTime() + preferredEndDayEndDurationMs
    );
    const jobEndTimeAfterPreferred: Date = new Date(
      preferredEndTimeTomorrow.getTime() + 2 * MS_IN_HOUR
    );

    const job: BabySittingJob = new BabySittingJob(
      jobStartTime,
      jobEndTimeAfterPreferred,
      12,
      8,
      16
    );

    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    const babySitter: BabySitter = new BabySitter(
      preferredStartDayStartDurationMs,
      preferredEndDayEndDurationMs
    );

    expect(() => {
      babySitter.acceptJob(timeSheet);
    }).toThrowError();
  });
});