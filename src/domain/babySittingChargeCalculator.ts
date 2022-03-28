import {
  getStartOfDayUTC,
  MS_IN_HOUR,
  MS_IS_MIN,
  roundToHour,
} from "../helpers/timeUtilities";
import { BabySittingTimeSheet } from "./babySittingTimeSheet";

export class BabySittingChargeCalculator {
  calculate(timeSheet: BabySittingTimeSheet) {
    const { startedTime, endedTime, bedTime, job } = timeSheet;
    const {
      endTime,
      localMidnightTime,
      startTimeToBedTimeRate,
      bedTimeToMidnightRate,
      midnightToEndTimeRate,
    } = job;

    if (!startedTime) {
      throw new Error("Cannot calulate a timesheet with no started time");
    }

    if (!endedTime) {
      throw new Error("Cannot calulate a timesheet with no ended time");
    }

    if (!bedTime) {
      throw new Error("Cannot calulate a timesheet with no bedtime");
    }

    const chargedStartedTime = roundToHour(startedTime, "ceil");
    const chargedBedTime = roundToHour(
      bedTime,
      startTimeToBedTimeRate > bedTimeToMidnightRate ? "ceil" : "floor"
    );
    const chargedEndTime = roundToHour(endedTime, "ceil");

    const startedTimeToBedTimeDurationHours: number =
      (chargedBedTime.getTime() - chargedStartedTime.getTime()) / MS_IN_HOUR;
    const bedTimeToMidnightDurationHours: number =
      (localMidnightTime.getTime() - chargedBedTime.getTime()) / MS_IN_HOUR;
    const midnightToEndTimeDurationHours: number =
      (chargedEndTime.getTime() - localMidnightTime.getTime()) / MS_IN_HOUR;

    let totalCharge = 0;
    totalCharge += startedTimeToBedTimeDurationHours * startTimeToBedTimeRate;
    totalCharge += bedTimeToMidnightDurationHours * bedTimeToMidnightRate;
    totalCharge += midnightToEndTimeDurationHours * midnightToEndTimeRate;

    return totalCharge;
  }
}
