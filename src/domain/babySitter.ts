import {
  addDurationMsToDate,
  getStartOfDay,
  MS_IN_HOUR,
  MS_IS_MIN,
} from "../helpers/timeUtilities";
import { BabySittingTimeSheet } from "./babySittingTimeSheet";

export class BabySitter {
  private _startDayStartTimeAsDurationMs: number;
  private _endDayEndTimeAsDurationMs: number;

  private _timeSheet: BabySittingTimeSheet | undefined;

  constructor(
    startDayStartTimeAsDurationMs: number,
    endDayEndTimeAsDurationMs: number
  ) {
    this._startDayStartTimeAsDurationMs = startDayStartTimeAsDurationMs;
    this._endDayEndTimeAsDurationMs = endDayEndTimeAsDurationMs;
  }

  get startDayStartTimeAsDurationMs(): number {
    return this._startDayStartTimeAsDurationMs;
  }

  get endDayEndTimeAsDurationMs(): number {
    return this._endDayEndTimeAsDurationMs;
  }

  get timeSheet() {
    return this._timeSheet;
  }

  get job() {
    return this._timeSheet?.job;
  }

  acceptJob(timeSheet: BabySittingTimeSheet) {
    const now: Date = new Date();
    const { job } = timeSheet;
    if (now > job.startTime) {
      throw new Error("Cannot accept a job that has already started");
    }

    if (job.endTime.getTime() - job.startTime.getTime() > 24 * MS_IN_HOUR) {
      throw new Error("Cannot accept a job that is longer than 24 hours");
    }

    const jobStartDay = getStartOfDay(job.startTime);
    const preferredStartTimeOnJobStartDay: Date = addDurationMsToDate(
      jobStartDay,
      this._startDayStartTimeAsDurationMs
    );
    if (job.startTime < preferredStartTimeOnJobStartDay) {
      throw new Error(
        "Cannot accept a job that begins before preferred start time"
      );
    }

    const jobEndDay = getStartOfDay(job.endTime);
    if (jobEndDay > jobStartDay) {
      const preferredEndTimeOnJobEndDay: Date = addDurationMsToDate(
        jobEndDay,
        this._endDayEndTimeAsDurationMs
      );
      if (job.endTime > preferredEndTimeOnJobEndDay) {
        throw new Error(
          "Cannot accept a job that ends after preferred start time"
        );
      }
    }

    const midnightUTC: Date = getStartOfDay(job.endTime);
    const timezoneOffsetMin: number =
      midnightUTC.getTimezoneOffset() * MS_IS_MIN;
    const localMidnight: Date = new Date(
      midnightUTC.getTime() + timezoneOffsetMin
    );

    if (localMidnight <= job.startTime || localMidnight >= job.endTime) {
      throw new Error("Cannot accept a job that that is not overnight");
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
