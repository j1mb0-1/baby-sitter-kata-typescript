import { MS_IN_HOUR } from "../helpers/timeUtilities";
import { NamedError } from "../app/namedError";

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
    if (endTime <= startTime) {
      throw new JobConstraintError(
        `Job end time cannot be before start time. 
        Start time: ${startTime} End time: ${endTime}`
      );
    }
    if (endTime.getTime() - startTime.getTime() > 24 * MS_IN_HOUR) {
      throw new JobConstraintError(
        `Job cannot last longer than 24 hours. 
        Start time: ${startTime} End time: ${endTime}`
      );
    }
    if (startTime >= localMidnightTime) {
      throw new JobConstraintError(
        `Job cannot start after midnight. 
        Start time: ${startTime} End time: ${endTime}`
      );
    }
    if (endTime <= localMidnightTime) {
      throw new JobConstraintError(
        `Job cannot end before midnight. 
        Start time: ${startTime} End time: ${endTime}`
      );
    }
    if (startTimeToBedTimeRate < 0) {
      throw new JobConstraintError(
        `Job cannot have a negative start time to bedtime rate. 
        Rate: ${startTimeToBedTimeRate}`
      );
    }
    if (bedTimeToMidnightRate < 0) {
      throw new JobConstraintError(
        `Job cannot have a negative bedtime time to midnight rate. 
        Rate: ${bedTimeToMidnightRate}`
      );
    }
    if (midnightToEndTimeRate < 0) {
      throw new JobConstraintError(
        `Job cannot have a negative midnight time to end time rate. 
        Rate: ${midnightToEndTimeRate}`
      );
    }

    this._startTime = startTime;
    this._endTime = endTime;
    this._localMidnightTime = localMidnightTime;
    this._startTimeToBedTimeRate = startTimeToBedTimeRate;
    this._bedTimeToMidnightRate = bedTimeToMidnightRate;
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

abstract class BabySittingJobError extends NamedError {}

export class JobConstraintError extends BabySittingJobError {
  constructor(message: string | undefined) {
    super(message, "JobConstraintError");
  }
}
