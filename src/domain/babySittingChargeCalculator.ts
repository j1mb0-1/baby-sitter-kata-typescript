import { MS_IN_HOUR, roundToHour } from "../helpers/timeUtilities";
import { BabySittingTimeSheet } from "./babySittingTimeSheet";
import { NamedError } from "../app/namedError";

export class BabySittingChargeCalculator {
  calculate(timeSheet: BabySittingTimeSheet) {
    const { startedTime, endedTime, bedTime, job } = timeSheet;
    const {
      midnightTime,
      startTimeToBedTimeRate,
      bedTimeToMidnightRate,
      midnightToEndTimeRate,
    } = job;

    if (!startedTime) {
      throw new CalculateConstraintError(
        "Cannot calulate a timesheet without a started time"
      );
    }

    if (!endedTime) {
      throw new CalculateConstraintError(
        "Cannot calulate a timesheet without an ended time"
      );
    }

    if (!bedTime) {
      throw new CalculateConstraintError(
        "Cannot calulate a timesheet without a bedtime"
      );
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
      (midnightTime.getTime() - chargedBedTime.getTime()) / MS_IN_HOUR;
    const midnightToEndTimeDurationHours: number =
      (chargedEndTime.getTime() - midnightTime.getTime()) / MS_IN_HOUR;

    let totalCharge = 0;
    totalCharge += startedTimeToBedTimeDurationHours * startTimeToBedTimeRate;
    totalCharge += bedTimeToMidnightDurationHours * bedTimeToMidnightRate;
    totalCharge += midnightToEndTimeDurationHours * midnightToEndTimeRate;

    return totalCharge;
  }
}

abstract class BabySittingChargeCalculatorError extends NamedError {}

export class CalculateConstraintError extends BabySittingChargeCalculatorError {
  constructor(message: string | undefined) {
    super(message, "CalculateConstraintError");
  }
}
