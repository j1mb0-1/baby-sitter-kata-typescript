import { MS_IN_HOUR } from "../helpers/timeUtilities";
import { AcceptJobError, BabySitter, BabySittingError } from "./babySitter";
import { BabySittingJob } from "./babySittingJob";
import { BabySittingTimeSheet } from "./babySittingTimeSheet";

describe("baby sitter", () => {
  it("should create baby sitter", () => {
    const startTimeLimitOffsetMs: number = 21 * MS_IN_HOUR;
    const endTimeLimitOffsetMs: number = 8 * MS_IN_HOUR;
    const babySitter: BabySitter = new BabySitter(
      startTimeLimitOffsetMs,
      endTimeLimitOffsetMs
    );

    expect(babySitter.startTimeLimitOffsetMs).toBe(startTimeLimitOffsetMs);
    expect(babySitter.endTimeLimitOffsetMs).toBe(endTimeLimitOffsetMs);
  });

  it("should accept a job", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const midnightTime: Date = new Date("2022-03-28T04:00:00.000Z");
    const startTimeLimitOffsetMs: number = 21 * MS_IN_HOUR;
    const endTimeLimitOffsetMs: number = 8 * MS_IN_HOUR;
    const job: BabySittingJob = new BabySittingJob(
      startTime,
      endTime,
      midnightTime,
      12,
      8,
      16
    );
    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    const babySitter: BabySitter = new BabySitter(
      startTimeLimitOffsetMs,
      endTimeLimitOffsetMs
    );

    babySitter.acceptJob(timeSheet);

    expect(babySitter.timeSheet).toBe(timeSheet);
  });

  it("should not accept a job when it starts before its start time", () => {
    const startTimeLimitOffsetMs: number = 21 * MS_IN_HOUR;
    const endTimeLimitOffsetMs: number = 8 * MS_IN_HOUR;
    const midnightTime: Date = new Date("2022-03-28T04:00:00.000Z");
    const startOfToday: Date = new Date("2022-03-27T00:00:00.000Z");
    const startOfTomorrow: Date = new Date(
      startOfToday.getTime() + 24 * MS_IN_HOUR
    );

    const preferredStartTimeToday: Date = new Date(
      startOfToday.getTime() + startTimeLimitOffsetMs
    );
    const jobStartTimeBeforePreferred: Date = new Date(
      preferredStartTimeToday.getTime() - 3 * MS_IN_HOUR
    );

    const preferredEndTimeTomorrow: Date = new Date(
      startOfTomorrow.getTime() + endTimeLimitOffsetMs
    );
    const jobEndTime: Date = new Date(preferredEndTimeTomorrow.getTime());

    const job: BabySittingJob = new BabySittingJob(
      jobStartTimeBeforePreferred,
      jobEndTime,
      midnightTime,
      12,
      8,
      16
    );

    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    const babySitter: BabySitter = new BabySitter(
      startTimeLimitOffsetMs,
      endTimeLimitOffsetMs
    );

    expect(() => {
      babySitter.acceptJob(timeSheet);
    }).toThrow(AcceptJobError);
  });

  it("should not accept a job when it ends after its end time", () => {
    const startTimeLimitOffsetMs: number = 21 * MS_IN_HOUR;
    const endTimeLimitOffsetMs: number = 8 * MS_IN_HOUR;
    const midnightTime: Date = new Date("2022-03-28T04:00:00.000Z");
    const startOfToday: Date = new Date("2022-03-27T00:00:00.000Z");
    const startOfTomorrow: Date = new Date(
      startOfToday.getTime() + 24 * MS_IN_HOUR
    );

    const preferredStartTimeToday: Date = new Date(
      startOfToday.getTime() + startTimeLimitOffsetMs
    );
    const jobStartTime: Date = new Date(preferredStartTimeToday.getTime());

    const preferredEndTimeTomorrow: Date = new Date(
      startOfTomorrow.getTime() + endTimeLimitOffsetMs
    );
    const jobEndTimeAfterPreferred: Date = new Date(
      preferredEndTimeTomorrow.getTime() + 2 * MS_IN_HOUR
    );

    const job: BabySittingJob = new BabySittingJob(
      jobStartTime,
      jobEndTimeAfterPreferred,
      midnightTime,
      12,
      8,
      16
    );

    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    const babySitter: BabySitter = new BabySitter(
      startTimeLimitOffsetMs,
      endTimeLimitOffsetMs
    );

    expect(() => {
      babySitter.acceptJob(timeSheet);
    }).toThrow(AcceptJobError);
  });

  it("should start baby sitting", () => {
    const babySitter: BabySitter = createValidBabySitterWithJob();

    const startedTime: Date = new Date("2022-03-27T21:00:00.000Z");
    babySitter.startBabySitting(startedTime);

    expect(babySitter.timeSheet!.startedTime).toBe(startedTime);
  });

  it("should not start baby sitting when a job has not been accepted", () => {
    const babySitter: BabySitter = createValidBabySitter();

    const startedTime: Date = new Date("2022-03-27T21:00:00.000Z");

    expect(() => {
      babySitter.startBabySitting(startedTime);
    }).toThrow(BabySittingError);
  });

  it("should stop baby sitting", () => {
    const babySitter: BabySitter = createValidBabySitterWithJob();

    const endedTime: Date = new Date("2022-03-28T08:00:00.000Z");
    babySitter.stopBabySitting(endedTime);

    expect(babySitter.timeSheet!.endedTime).toEqual(endedTime);
  });

  it("should not stop baby sitting when a job has not been accepted", () => {
    const babySitter: BabySitter = createValidBabySitter();

    const endedTime: Date = new Date("2022-03-28T08:00:00.000Z");

    expect(() => {
      babySitter.stopBabySitting(endedTime);
    }).toThrow(BabySittingError);
  });

  it("should put kids bed", () => {
    const babySitter: BabySitter = createValidBabySitterWithJob();

    const bedTime: Date = new Date("2022-03-28T01:00:00.000Z");
    babySitter.putKidsToBed(bedTime);

    expect(babySitter.timeSheet!.bedTime).toEqual(bedTime);
  });

  it("should not put kids to bed when a job has not been accepted", () => {
    const babySitter: BabySitter = createValidBabySitter();

    const bedTime: Date = new Date("2022-03-28T01:00:00.000Z");

    expect(() => {
      babySitter.putKidsToBed(bedTime);
    }).toThrow(BabySittingError);
  });

  const createValidBabySitter = (): BabySitter => {
    const startTimeLimitOffsetMs: number = 21 * MS_IN_HOUR;
    const endTimeLimitOffsetMs: number = 8 * MS_IN_HOUR;
    const babySitter: BabySitter = new BabySitter(
      startTimeLimitOffsetMs,
      endTimeLimitOffsetMs
    );
    return babySitter;
  };

  const createValidBabySitterWithJob = (): BabySitter => {
    const babySitter: BabySitter = createValidBabySitter();
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const midnightTime: Date = new Date("2022-03-28T04:00:00.000Z");
    const job: BabySittingJob = new BabySittingJob(
      startTime,
      endTime,
      midnightTime,
      12,
      8,
      16
    );
    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    babySitter.acceptJob(timeSheet);
    return babySitter;
  };
});
