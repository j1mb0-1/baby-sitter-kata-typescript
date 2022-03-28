import { NamedError } from "../app/namedError";
import {
  addDurationMsToDate,
  getStartOfDayUTC,
} from "../helpers/timeUtilities";
import { BabySittingTimeSheet } from "./babySittingTimeSheet";

export class BabySitter {
  private _startTimeLimitOffsetMs: number;
  private _endTimeLimitOffsetMs: number;
  private _timeSheet: BabySittingTimeSheet | undefined;

  constructor(startTimeLimitOffsetMs: number, endTimeLimitOffsetMs: number) {
    this._startTimeLimitOffsetMs = startTimeLimitOffsetMs;
    this._endTimeLimitOffsetMs = endTimeLimitOffsetMs;
  }

  get startTimeLimitOffsetMs(): number {
    return this._startTimeLimitOffsetMs;
  }

  get endTimeLimitOffsetMs(): number {
    return this._endTimeLimitOffsetMs;
  }

  get timeSheet() {
    return this._timeSheet;
  }

  acceptJob(timeSheet: BabySittingTimeSheet) {
    const { job } = timeSheet;

    const jobStartDay = getStartOfDayUTC(job.startTime);
    const preferredStartTimeOnJobStartDay: Date = addDurationMsToDate(
      jobStartDay,
      this._startTimeLimitOffsetMs
    );
    if (job.startTime < preferredStartTimeOnJobStartDay) {
      throw new AcceptJobError(
        `The job starts before the Baby Sitter's start time. 
        Job start time: ${job.startTime} Baby Sitter start time ${preferredStartTimeOnJobStartDay}`
      );
    }

    const jobEndDay = getStartOfDayUTC(job.endTime);
    if (jobEndDay > jobStartDay) {
      const preferredEndTimeOnJobEndDay: Date = addDurationMsToDate(
        jobEndDay,
        this._endTimeLimitOffsetMs
      );
      if (job.endTime > preferredEndTimeOnJobEndDay) {
        throw new AcceptJobError(
          `The job ends after the Baby Sitter's end time. 
          Job end time: ${job.endTime}, Baby Sitter end time ${preferredEndTimeOnJobEndDay}`
        );
      }
    }

    this._timeSheet = timeSheet;
  }

  startBabySitting(startedTime: Date) {
    if (this._timeSheet) {
      this._timeSheet.startedTime = startedTime;
    } else {
      throw new BabySittingError(
        "The Baby Sitter cannot start until a job has been accepted"
      );
    }
  }

  stopBabySitting(endedTime: Date) {
    if (this._timeSheet) {
      this._timeSheet.endedTime = endedTime;
    } else {
      throw new BabySittingError(
        "The Baby Sitter cannot end a job unless a job has been accepted"
      );
    }
  }

  putKidsToBed(bedTime: Date) {
    if (this._timeSheet) {
      this._timeSheet.bedTime = bedTime;
    } else {
      throw new BabySittingError(
        "The Baby Sitter cannot put kids to bed unless a job has been accepted"
      );
    }
  }
}

abstract class BabySitterError extends NamedError {}

export class AcceptJobError extends BabySitterError {
  constructor(message: string | undefined) {
    super(message, "AcceptJobError");
  }
}

export class BabySittingError extends BabySitterError {
  constructor(message: string | undefined) {
    super(message, "BabySittingError");
  }
}
