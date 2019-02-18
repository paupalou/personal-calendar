import { startOfWeek, addDays } from 'date-fns';
import { generateArrayOf } from './utils';

function getWeekOfDay(date) {
  const firstDayOfWeek = startOfWeek(date, { weekStartsOn: 1 });
  const restOfDays = generateArrayOf(6).map((_, key) =>
    addDays(firstDayOfWeek, key + 1)
  );

  return [firstDayOfWeek, ...restOfDays];
}

function getCurrentWeek() {
  return getWeekOfDay(new Date());
}

function getWeekFromFirstDay(date) {
  const restOfDays = generateArrayOf(6)
    .map((_, key) => addDays(date, key + 1));

  return [ date, ...restOfDays];
}

function formatDay(date, locale = 'en-US') {
  const options = { weekday: 'short', day: 'numeric' };
  return date.toLocaleDateString(locale, options);
}

export {
  getCurrentWeek,
  getWeekFromFirstDay,
  getWeekOfDay,
  formatDay
}
