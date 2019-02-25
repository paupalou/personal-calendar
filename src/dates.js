import {
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  subDays,
  addWeeks,
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

function getSurroundingMonths(day, numberOfMonths = 5) {
  const previousMonth = subMonths(day, 1)
  const startDay = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth(),
    1
  );

  const futureMonthsDay = addMonths(day, numberOfMonths);
  const endDay = new Date(
    futureMonthsDay.getFullYear(),
    futureMonthsDay.getMonth(),
    getDaysInMonth(futureMonthsDay)
  );

  return eachDay(startDay, endDay);
}

function getNextWeeks(day, numberOfWeeks = 10) {
  return eachDay(day, addWeeks(day, numberOfWeeks));
}


function getNextMonths(day, numberOfMonths = 1) {
  return eachDay(
    addDays(day, 1),
    subDays(addMonths(day, numberOfMonths), 1)
  );
}

function getStartOfWeek(day, weekStarts = 1) {
  return startOfWeek(day, { weekStartsOn: weekStarts });
}

export {
  getDaysInMonth,
  getCurrentWeek,
  getStartOfWeek,
  getNextWeeks,
  getNextMonths,
  getSurroundingMonths,
  getWeekFromFirstDay,
  getWeekOfDay,
  formatDay
}
