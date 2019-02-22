import {
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  eachDay,
  getDaysInMonth
} from 'date-fns';
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

function getSurroundingWeeks(day, numberOfWeeks = 10) {
  return eachDay(
    subWeeks(day, numberOfWeeks),
    addWeeks(day, numberOfWeeks)
  );
}

function getStartOfWeek(day, weekStarts = 1) {
  return startOfWeek(day, { weekStartsOn: weekStarts });
}

export {
  getDaysInMonth,
  getCurrentWeek,
  getStartOfWeek,
  getSurroundingWeeks,
  getWeekFromFirstDay,
  getWeekOfDay,
  formatDay
}
