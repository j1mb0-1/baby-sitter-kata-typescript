import {
  addDurationMsToDate,
  getStartOfDayUTC,
  MS_IN_HOUR,
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

    if (job.endTime.getTime() - job.startTime.getTime() > 24 * MS_IN_HOUR) {
      throw new Error("Cannot accept a job that is longer than 24 hours");
    }

    const jobStartDay = getStartOfDayUTC(job.startTime);
    const preferredStartTimeOnJobStartDay: Date = addDurationMsToDate(
      jobStartDay,
      this._startTimeLimitOffsetMs
    );
    if (job.startTime < preferredStartTimeOnJobStartDay) {
      throw new Error(
        "Cannot accept a job that begins before preferred start time"
      );
    }

    const jobEndDay = getStartOfDayUTC(job.endTime);
    if (jobEndDay > jobStartDay) {
      const preferredEndTimeOnJobEndDay: Date = addDurationMsToDate(
        jobEndDay,
        this._endTimeLimitOffsetMs
      );
      if (job.endTime > preferredEndTimeOnJobEndDay) {
        throw new Error(
          "Cannot accept a job that ends after preferred start time"
        );
      }
    }

    this._timeSheet = timeSheet;
  }

  startBabySitting(startedTime: Date) {
    if (this._timeSheet) {
      this._timeSheet.startedTime = startedTime;
    } else {
      throw new Error("Cannot start baby sitting unless job is accepted");
    }
  }

  stopBabySitting(endedTime: Date) {
    if (this._timeSheet) {
      this._timeSheet.endedTime = endedTime;
    } else {
      throw new Error("Cannot stop baby sitting unless job is accepted");
    }
  }

  putKidsToBed(bedTime: Date) {
    if (this._timeSheet) {
      this._timeSheet.bedTime = bedTime;
    } else {
      throw new Error("Cannot got to bed unless job is accepted");
    }
  }
}
