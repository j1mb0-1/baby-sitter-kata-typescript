export class BabySittingJob {
  readonly startTime: Date;
  readonly endTime: Date;
  readonly startTimeToBedTimeRate: number;
  readonly bedTimeToMidnightRate: number;
  readonly midnightToEndTimeRate: number;

  constructor(
    startTime: Date,
    endTime: Date,
    startTimeToBedTimeRate: number,
    bedTimeToMidnightRate: number,
    midnightToEndTimeRate: number
  ) {
    this.startTime = startTime;
    if (endTime <= startTime)
      throw new Error("Job end time cannot be before start time");
    this.endTime = endTime;
    if (startTimeToBedTimeRate < 0)
      throw new Error("Job start time to bedtime rate cannot be negative");
    this.startTimeToBedTimeRate = startTimeToBedTimeRate;
    if (bedTimeToMidnightRate < 0)
      throw new Error("Job bedtime to midnight rate cannot be negative");
    this.bedTimeToMidnightRate = bedTimeToMidnightRate;
    if (midnightToEndTimeRate < 0)
      throw new Error("Job midnight to end time rate cannot be negative");
    this.midnightToEndTimeRate = midnightToEndTimeRate;
  }
}
