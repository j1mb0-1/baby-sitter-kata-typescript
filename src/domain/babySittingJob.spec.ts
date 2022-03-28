import { BabySittingJob } from "./babySittingJob";

describe("baby sitting job", () => {
  it("should create new job", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const startTimeToBedTimeRate: number = 12;
    const bedTimeToMidnightRate: number = 8;
    const midnightToEndTimeRate: number = 16;

    const job: BabySittingJob = new BabySittingJob(
      startTime,
      endTime,
      startTimeToBedTimeRate,
      bedTimeToMidnightRate,
      midnightToEndTimeRate
    );

    expect(job.startTime).toBe(startTime);
    expect(job.endTime).toBe(endTime);
    expect(job.startTimeToBedTimeRate).toBe(startTimeToBedTimeRate);
    expect(job.bedTimeToMidnightRate).toBe(bedTimeToMidnightRate);
    expect(job.midnightToEndTimeRate).toBe(midnightToEndTimeRate);
  });

  it("should not create new job when end time is before start time", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-27T20:00:00.000Z");
    const startTimeToBedTimeRate: number = 12;
    const bedTimeToMidnightRate: number = 8;
    const midnightToEndTimeRate: number = 16;

    expect(() => {
      new BabySittingJob(
        startTime,
        endTime,
        startTimeToBedTimeRate,
        bedTimeToMidnightRate,
        midnightToEndTimeRate
      );
    }).toThrowError();
  });

  it("should not create new job when start time to bed time rate is negative", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const startTimeToBedTimeRate: number = -1;
    const bedTimeToMidnightRate: number = 8;
    const midnightToEndTimeRate: number = 16;

    expect(() => {
      new BabySittingJob(
        startTime,
        endTime,
        startTimeToBedTimeRate,
        bedTimeToMidnightRate,
        midnightToEndTimeRate
      );
    }).toThrowError();
  });

  it("should not create new job when bedtime to midnight rate is negative", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const startTimeToBedTimeRate: number = 12;
    const bedTimeToMidnightRate: number = -1;
    const midnightToEndTimeRate: number = 16;

    expect(() => {
      new BabySittingJob(
        startTime,
        endTime,
        startTimeToBedTimeRate,
        bedTimeToMidnightRate,
        midnightToEndTimeRate
      );
    }).toThrowError();
  });

  it("should not create new job when midnight to end time rate is negative", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const startTimeToBedTimeRate: number = 12;
    const bedTimeToMidnightRate: number = 8;
    const midnightToEndTimeRate: number = -1;

    expect(() => {
      new BabySittingJob(
        startTime,
        endTime,
        startTimeToBedTimeRate,
        bedTimeToMidnightRate,
        midnightToEndTimeRate
      );
    }).toThrowError();
  });
});
