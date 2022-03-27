import { BabySittingTimeSheet } from "./babySittingTimeSheet";

export class BabySitter {
  readonly preferredStartDayStartDurationMs: number;
  readonly preferredEndDayEndDurationMs: number;

  private _timeSheet: BabySittingTimeSheet | undefined;

  constructor(
    preferredStartDayStartDurationMs: number,
    preferredEndDayEndDurationMs: number
  ) {
    this.preferredStartDayStartDurationMs = preferredStartDayStartDurationMs;
    this.preferredEndDayEndDurationMs = preferredEndDayEndDurationMs;
  }

  acceptJob(timeSheet: BabySittingTimeSheet) {
    const now: Date = new Date();
    if (timeSheet.job.startTime < now) {
      throw new Error("Cannot accept a job that has already started");
    }
    this._timeSheet = timeSheet;
  }

  get timeSheet() {
    return this._timeSheet;
  }

  get job() {
    return this._timeSheet?.job;
  }
}
