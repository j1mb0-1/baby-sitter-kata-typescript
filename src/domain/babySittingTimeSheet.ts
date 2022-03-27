import { BabySittingJob } from "./babySittingJob";

export class BabySittingTimeSheet {
  private _job: BabySittingJob;
  private _startedTime: Date | undefined;
  private _endedTime: Date | undefined;
  private _bedTime: Date | undefined;

  constructor(job: BabySittingJob) {
    this._job = job;
  }

  get job(): BabySittingJob {
    return this._job;
  }

  get startedTime(): Date | undefined {
    return this._startedTime;
  }

  set startedTime(value: Date | undefined) {
    if (value && value < this._job.startTime) {
      throw Error(
        "Cannot record a started time that is before a job's start time"
      );
    }
    if (value && value > this._job.endTime) {
      throw Error(
        "Cannot record a started time that is after a job's end time"
      );
    }
    this._startedTime = value;
  }

  get endedTime(): Date | undefined {
    return this._endedTime;
  }

  set endedTime(value: Date | undefined) {
    if (value && value < this._job.startTime) {
      throw Error(
        "Cannot record an ended time that is before a job's start time"
      );
    }
    if (value && value > this._job.endTime) {
      throw Error("Cannot record an ended time that is after a job's end time");
    }
    this._endedTime = value;
  }

  get bedTime(): Date | undefined {
    return this._bedTime;
  }

  set bedTime(value: Date | undefined) {
    if (value && value < this._job.startTime) {
      throw Error("Cannot record a bed time that is before a job's start time");
    }
    if (value && value > this._job.endTime) {
      throw Error("Cannot record an bed time that is after a job's end time");
    }
    this._bedTime = value;
  }
}
