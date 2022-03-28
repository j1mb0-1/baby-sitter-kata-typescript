import { BabySittingJob } from "./babySittingJob";
import { BabySittingTimeSheet } from "./babySittingTimeSheet";
import { BabySittingChargeCalculator } from "./babySittingChargeCalculator";

describe("baby sitter charge calculator", () => {
  it("should not calculate when timesheet has no started time", () => {
    const timeSheet: BabySittingTimeSheet = createPopulatedTimeSheet();
    timeSheet.startedTime = undefined;

    const babySittingChargeCalculator: BabySittingChargeCalculator =
      new BabySittingChargeCalculator();

    expect(() => {
      babySittingChargeCalculator.calculate(timeSheet);
    }).toThrowError();
  });

  it("should not calculate when timesheet has no ended time", () => {
    const timeSheet: BabySittingTimeSheet = createPopulatedTimeSheet();
    timeSheet.endedTime = undefined;

    const babySittingChargeCalculator: BabySittingChargeCalculator =
      new BabySittingChargeCalculator();

    expect(() => {
      babySittingChargeCalculator.calculate(timeSheet);
    }).toThrowError();
  });

  it("should not calculate when timesheet has no bed time", () => {
    const timeSheet: BabySittingTimeSheet = createPopulatedTimeSheet();
    timeSheet.bedTime = undefined;

    const babySittingChargeCalculator: BabySittingChargeCalculator =
      new BabySittingChargeCalculator();

    expect(() => {
      babySittingChargeCalculator.calculate(timeSheet);
    }).toThrowError();
  });

  /**
   * Happy path
   *
   * Job start scheduled at 5:00 PM EST
   * Job end scheduled exactly at 4:00 AM EST
   * Start to bedtime rate is $12.00
   * Bedtime to midnight rate is $8.00
   * Midnight to end rate is $16.00
   *
   * Started at 5:00 PM EST
   * Ended at 4:00 AM EST
   * Bedtime at 10:00 PM EST
   *
   * Hours between started time and bedtime: 5
   * Hours between bed and midnight: 2
   * Hours between midnight and end: 4
   *
   * Expected Charge: $140.00
   */
  it("should calculate the charge under perfect conditions", () => {
    const timeSheet: BabySittingTimeSheet = createPopulatedTimeSheet();

    const babySittingChargeCalculator: BabySittingChargeCalculator =
      new BabySittingChargeCalculator();

    const charge = babySittingChargeCalculator.calculate(timeSheet);

    expect(charge).toBe(140);
  });

  /**
   * Sitter arrived late
   *
   * Job start scheduled at 5:00 PM EST
   * Job end scheduled at 4:00 AM EST
   * Start to bedtime rate is $12.00
   * Bedtime to midnight rate is $8.00
   * Midnight to end rate is $16.00
   *
   * Started at 5:15 PM EST
   * Ended at 4:00 AM EST
   * Bedtime at 10:00 PM EST
   *
   * Hours between started time and bedtime: 4
   * Hours between bed and midnight: 2
   * Hours between midnight and end: 4
   *
   * Expected Charge: $128.00
   */
  it("should calculate the charge when started late", () => {
    const timeSheet: BabySittingTimeSheet = createPopulatedTimeSheet({
      startedTime: new Date("2022-03-27T21:15:00.000Z"),
    });

    const babySittingChargeCalculator: BabySittingChargeCalculator =
      new BabySittingChargeCalculator();

    const charge = babySittingChargeCalculator.calculate(timeSheet);

    expect(charge).toBe(128);
  });

  /**
   * Sitter finished early
   *
   * Job start scheduled at 5:00 PM EST
   * Job end scheduled at 4:00 AM EST
   * Start to bedtime rate is $12.00
   * Bedtime to midnight rate is $8.00
   * Midnight to end is rate $16.00
   *
   * Started at 5:00 PM EST
   * Ended at 1:30 AM EST
   * Bedtime at 10:00 PM EST
   *
   * Hours between started time and bedtime: 5
   * Hours between bed and midnight: 2
   * Hours between midnight and end: 2
   *
   * Expected Charge: $108.00
   */
  it("should calculate the charge when finished early", () => {
    const timeSheet: BabySittingTimeSheet = createPopulatedTimeSheet({
      endedTime: new Date("2022-03-28T05:30:00.000Z"),
    });

    const babySittingChargeCalculator: BabySittingChargeCalculator =
      new BabySittingChargeCalculator();

    const charge = babySittingChargeCalculator.calculate(timeSheet);

    expect(charge).toBe(108);
  });

  /**
   * Bedtime is mid hour and start to bedtime rate is favorable
   *
   * Job start scheduled at 5:00 PM EST
   * Job end scheduled at 4:00 AM EST
   * Start to bedtime rate is $12.00
   * Bedtime to midnight rate is $8.00
   * Midnight to end rate is $16.00
   *
   * Started at 5:00 PM EST
   * Ended at 4:00 AM EST
   * Bedtime at 10:15 PM EST
   *
   * Hours between started time and bedtime: 6
   * Hours between bed and midnight: 1
   * Hours between midnight and end: 4
   *
   * Expected Charge: $144.00
   */
  it("should calculate the charge when bedtime does not fall on an hour and its rate is lesser than the previous hour's rate", () => {
    const timeSheet: BabySittingTimeSheet = createPopulatedTimeSheet({
      bedTime: new Date("2022-03-28T02:15:00.000Z"),
    });

    const babySittingChargeCalculator: BabySittingChargeCalculator =
      new BabySittingChargeCalculator();

    const charge = babySittingChargeCalculator.calculate(timeSheet);

    expect(charge).toEqual(144);
  });

  /**
   * Bedtime is mid hour and start to bedtime rate is favorable
   *
   * Job start scheduled at 5:00 PM EST
   * Job end scheduled at 4:00 AM EST
   * Start to bedtime rate is $12.00
   * Bedtime to midnight is $20.00
   * Midnight to end is $16.00
   *
   * Started at 5:00 PM EST
   * Ended at 4:00 AM EST
   * Bedtime at 10:15 PM EST
   *
   * Hours between started time and bedtime: 5
   * Hours between bed and midnight = 2
   * Hours between midnight and end = 4
   *
   * Expected Charge: $164.00
   */
  it("should calculate the charge when bedtime does not fall on an hour and its rate is greater than the previous hour's rate", () => {
    const timeSheet: BabySittingTimeSheet = createPopulatedTimeSheet({
      bedTime: new Date("2022-03-28T02:15:00.000Z"),
      bedTimeToMidnightRate: 20,
    });

    const babySittingChargeCalculator: BabySittingChargeCalculator =
      new BabySittingChargeCalculator();

    const charge = babySittingChargeCalculator.calculate(timeSheet);

    expect(charge).toEqual(164);
  });

  /**
   * End time is before midnight
   *
   * Job start scheduled at 5:00 PM EST
   * Job end scheduled exactly at 11:30 PM EST
   * Start to bedtime rate is $12.00
   * Bedtime to midnight rate is $8.00
   * Midnight to end rate is $16.00
   *
   * Started at 5:00 PM EST
   * Ended at 4:00 AM EST
   * Bedtime at 10:00 PM EST
   *
   * Hours between started time and bedtime: 5
   * Hours between bed and midnight: 2
   * Hours between midnight and end: 4
   *
   * Expected Charge: $140.00
   */
  it("should calculate the charge under perfect conditions", () => {
    const timeSheet: BabySittingTimeSheet = createPopulatedTimeSheet();

    const babySittingChargeCalculator: BabySittingChargeCalculator =
      new BabySittingChargeCalculator();

    const charge = babySittingChargeCalculator.calculate(timeSheet);

    expect(charge).toBe(140);
  });

  const createPopulatedTimeSheet = (
    props?:
      | {
          startTime?: Date | undefined;
          endTime?: Date | undefined;
          startedTime?: Date | undefined;
          endedTime?: Date | undefined;
          bedTime?: Date | undefined;
          startTimeToBedTimeRate?: number | undefined;
          bedTimeToMidnightRate?: number | undefined;
          midnightToEndTimeRate?: number | undefined;
        }
      | undefined
  ): BabySittingTimeSheet => {
    const {
      startTime,
      endTime,
      startTimeToBedTimeRate,
      bedTimeToMidnightRate,
      midnightToEndTimeRate,
      startedTime,
      endedTime,
      bedTime,
    } = props || {};
    const job: BabySittingJob = new BabySittingJob(
      startTime || new Date("2022-03-27T21:00:00.000Z"),
      endTime || new Date("2022-03-28T08:00:00.000Z"),
      startTimeToBedTimeRate || 12,
      bedTimeToMidnightRate || 8,
      midnightToEndTimeRate || 16
    );
    const timeSheet: BabySittingTimeSheet = new BabySittingTimeSheet(job);
    timeSheet.startedTime = startedTime || new Date("2022-03-27T21:00:00.000Z");
    timeSheet.endedTime = endedTime || new Date("2022-03-28T08:00:00.000Z");
    timeSheet.bedTime = bedTime || new Date("2022-03-28T02:00:00.000Z");
    return timeSheet;
  };
});
