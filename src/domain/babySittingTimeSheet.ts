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

  get endedTime(): Date | undefined {
    return this._endedTime;
  }

  get bedTime(): Date | undefined {
    return this._bedTime;
  }
}
