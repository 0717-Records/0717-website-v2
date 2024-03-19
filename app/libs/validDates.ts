import { compareAsc, startOfDay } from 'date-fns';

const validDates = (startDate: Date, endDate: Date) => {
  const startOfDayStartDate = startOfDay(startDate);
  const startOfDayEndDate = startOfDay(endDate);
  return compareAsc(startOfDayStartDate, startOfDayEndDate) !== 1;
};

export default validDates;
