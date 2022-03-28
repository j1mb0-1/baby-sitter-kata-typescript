export class BabySittingJob {
  private _startTime: Date;
  private _endTime: Date;
  private _localMidnightTime: Date;
  private _startTimeToBedTimeRate: number;
  private _bedTimeToMidnightRate: number;
  private _midnightToEndTimeRate: number;

  constructor(
    startTime: Date,
    endTime: Date,
    localMidnightTime: Date,
    startTimeToBedTimeRate: number,
    bedTimeToMidnightRate: number,
    midnightToEndTimeRate: number
  ) {
    this._startTime = startTime;
    if (endTime <= startTime)
      throw new Error("Job end time cannot be before start time");
    this._endTime = endTime;
    if (startTime >= localMidnightTime)
      throw new Error("Job cannot start after midnight");
    if (endTime <= localMidnightTime)
      throw new Error("Job cannot end before midnight");
    this._localMidnightTime = localMidnightTime;
    if (startTimeToBedTimeRate < 0)
      throw new Error("Job start time to bedtime rate cannot be negative");
    this._startTimeToBedTimeRate = startTimeToBedTimeRate;
    if (bedTimeToMidnightRate < 0)
      throw new Error("Job bedtime to midnight rate cannot be negative");
    this._bedTimeToMidnightRate = bedTimeToMidnightRate;
    if (midnightToEndTimeRate < 0)
      throw new Error("Job midnight to end time rate cannot be negative");
    this._midnightToEndTimeRate = midnightToEndTimeRate;
  }

  get startTime(): Date {
    return this._startTime;
  }

  get endTime(): Date {
    return this._endTime;
  }

  get localMidnightTime(): Date {
    return this._localMidnightTime;
  }

  get startTimeToBedTimeRate(): number {
    return this._startTimeToBedTimeRate;
  }

  get bedTimeToMidnightRate(): number {
    return this._bedTimeToMidnightRate;
  }

  get midnightToEndTimeRate(): number {
    return this._midnightToEndTimeRate;
  }
}
