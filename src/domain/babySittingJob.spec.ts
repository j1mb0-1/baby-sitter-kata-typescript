import { BabySittingJob } from "./babySittingJob";

describe("baby sitting job", () => {
  it("should create new job", () => {
    const startTime: Date = new Date(1648349661512);
    const endTime: Date = new Date(1648349662000);
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
    const startTime: Date = new Date(1648349661512);
    const endTime: Date = new Date(1648349661000);
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
    const startTime: Date = new Date(1648349661512);
    const endTime: Date = new Date(1648349661000);
    const startTimeToBedTimeRate: number = 0;
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
    const startTime: Date = new Date(1648349661512);
    const endTime: Date = new Date(1648349661000);
    const startTimeToBedTimeRate: number = 12;
    const bedTimeToMidnightRate: number = 0;
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
    const startTime: Date = new Date(1648349661512);
    const endTime: Date = new Date(1648349661000);
    const startTimeToBedTimeRate: number = 12;
    const bedTimeToMidnightRate: number = 0;
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
});
