export const MS_IN_SECONDS = 1000;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;

export const MS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECONDS;

export const getStartOfDay = (date: Date): Date => {
  let newDate: Date = new Date(date.getTime());
  newDate.setUTCHours(0, 0, 0, 0);
  return newDate;
};

export const addDurationMsToDate = (date: Date, durationMs: number): Date => {
  const newDate: Date = new Date(date.getTime() + durationMs);
  return newDate;
};
