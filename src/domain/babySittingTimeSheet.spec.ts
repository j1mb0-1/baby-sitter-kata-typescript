import { BabySittingJob } from "./babySittingJob";
import { BabySittingTimeSheet } from "./babySittingTimeSheet";

describe("baby sitting time sheet", () => {
  it("should create empty time sheet", () => {
    const startTime: Date = new Date("2022-03-27T21:00:00.000Z");
    const endTime: Date = new Date("2022-03-28T08:00:00.000Z");
    const job: BabySittingJob = new BabySittingJob(
      startTime,
      endTime,
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
});
