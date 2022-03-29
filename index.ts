import {
  CommandLineArgumentParser,
  CommandLineArgumentQuery,
} from "./src/app/commandLineArgumentParser";
import { BabySitter } from "./src/domain/babySitter";
import { BabySittingChargeCalculator } from "./src/domain/babySittingChargeCalculator";
import { BabySittingJob } from "./src/domain/babySittingJob";
import { BabySittingTimeSheet } from "./src/domain/babySittingTimeSheet";
import {
  addDurationMsToDate,
  getStartOfDayUTC,
  getTimezoneOffsetMs,
  MS_IN_HOUR,
  MS_IS_MIN,
} from "./src/helpers/timeUtilities";
import { ChargeReporter } from "./src/app/chargeReporter";
import { ErrorReporter } from "./src/app/errorReporter";

const setDefaultConfigurationFromLocalTime = (
  startedTime: Date,
  endedTime: Date,
  timeZoneOffsetMin?: number | undefined
) => {
  const timeZoneOffsetMs = timeZoneOffsetMin
    ? timeZoneOffsetMin * MS_IS_MIN
    : getTimezoneOffsetMs();
  const startTimeLimitOffsetMs = 17 * MS_IN_HOUR + timeZoneOffsetMs;
  const endTimeLimitOffsetMs = 4 * MS_IN_HOUR + timeZoneOffsetMs;
  const startDay = getStartOfDayUTC(startedTime);
  const endDay = getStartOfDayUTC(endedTime);
  const scheduledStartTime = addDurationMsToDate(
    startDay,
    startTimeLimitOffsetMs
  );
  const scheduledEndTime = addDurationMsToDate(endDay, endTimeLimitOffsetMs);
  const midnightTime = new Date(endDay.getTime() + timeZoneOffsetMs);
  return {
    scheduledStartTime,
    scheduledEndTime,
    midnightTime,
    startTimeLimitOffsetMs,
    endTimeLimitOffsetMs,
  };
};

const runApp = () => {
  const errorReporter: ErrorReporter = new ErrorReporter();
  const chargeReporter: ChargeReporter = new ChargeReporter();
  const commandLineArgumentParser: CommandLineArgumentParser =
    new CommandLineArgumentParser();
  const babySittingChargeCalculator: BabySittingChargeCalculator =
    new BabySittingChargeCalculator();

  try {
    const args = process.argv.slice(2);
    const commandLineArgumentQueries: CommandLineArgumentQuery[] = [
      {
        id: "startedTime",
        flag: "-started-time",
        type: "Date",
      },
      {
        id: "endedTime",
        flag: "-ended-time",
        type: "Date",
      },
      {
        id: "bedTime",
        flag: "-bed-time",
        type: "Date",
      },
      {
        id: "timeZoneOffsetMin",
        flag: "-time-zone-offset-min",
        type: "number",
        optional: true,
      },
    ];

    const results: Record<string, any> = commandLineArgumentParser.parse(
      commandLineArgumentQueries,
      args
    );

    const startedTime: Date = results["startedTime"];
    const endedTime: Date = results["endedTime"];
    const bedTime: Date = results["bedTime"];
    const timeZoneOffsetMin: number | undefined = results["timeZoneOffsetMin"];

    const {
      scheduledStartTime,
      scheduledEndTime,
      midnightTime,
      startTimeLimitOffsetMs,
      endTimeLimitOffsetMs,
    } = setDefaultConfigurationFromLocalTime(
      startedTime,
      endedTime,
      timeZoneOffsetMin
    );

    const babySitter = new BabySitter(
      startTimeLimitOffsetMs,
      endTimeLimitOffsetMs
    );

    const babySittingJob: BabySittingJob = new BabySittingJob(
      scheduledStartTime,
      scheduledEndTime,
      midnightTime,
      12,
      8,
      16
    );

    const babySittingTimeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(
      babySittingJob
    );

    babySitter.acceptJob(babySittingTimeSheet);
    babySitter.startBabySitting(startedTime);
    babySitter.putKidsToBed(bedTime);
    babySitter.stopBabySitting(endedTime);

    const charge: number =
      babySittingChargeCalculator.calculate(babySittingTimeSheet);

    chargeReporter.report(charge);
  } catch (e: any) {
    errorReporter.report(e);
  }
};

runApp();
