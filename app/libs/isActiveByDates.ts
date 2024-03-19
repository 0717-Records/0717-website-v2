import { isToday, startOfDay, isBefore } from 'date-fns';

interface isActiveByDateProps {
  startDate?: Date | null;
  endDate?: Date | null;
}

const isActiveByDates = ({ startDate, endDate }: isActiveByDateProps): boolean => {
  if (!startDate && !endDate) return true;
  const today = startOfDay(new Date());
  const checkStartDate = startOfDay(startDate || new Date());
  const checkEndDate = endDate ? startOfDay(endDate) : null;

  if (checkEndDate && isBefore(checkEndDate, checkStartDate))
    throw new Error('End Date before Start Date supplied!');

  const hasStarted = isToday(checkStartDate) || isBefore(checkStartDate, today);
  const hasEnded = checkEndDate && isBefore(checkEndDate, today);

  return hasStarted && !hasEnded;
};

export default isActiveByDates;
