export const MS_IN_SECONDS = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;

export const MS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECONDS;
export const MS_IS_MIN = SECONDS_IN_MINUTE * MS_IN_SECONDS;

export const getStartOfDay = (date: Date): Date => {
  let newDate: Date = new Date(date.getTime());
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};

export const addDurationMsToDate = (date: Date, durationMs: number): Date => {
  const newDate: Date = new Date(date.getTime() + durationMs);
  return newDate;
};

export const roundToHour = (date: Date, round: "floor" | "ceil"): Date => {
  let newDate: Date;
  if (round === "floor") {
    newDate = new Date(Math.floor(date.getTime() / MS_IN_HOUR) * MS_IN_HOUR);
  } else {
    newDate = new Date(Math.ceil(date.getTime() / MS_IN_HOUR) * MS_IN_HOUR);
  }
  return newDate;
};
