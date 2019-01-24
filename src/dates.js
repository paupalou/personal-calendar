import { startOfWeek, addDays } from "date-fns";

const getWeekOfDay = (date) => {
  const firstDayOfWeek = startOfWeek(date, { weekStartsOn: 1 });
  const restOfDays =
    Array.from(Array(6)).map((_,key) => addDays(firstDayOfWeek, key + 1));

  return [ firstDayOfWeek, ...restOfDays ];
};

const getCurrentWeek = () => getWeekOfDay(new Date());

// const getWeekDays = (dates, locale = 'en-US') => {
//   const options = { weekday: 'short', day: 'numeric' };
//   return dates.map(date => date.toLocaleDateString(locale, options));
// }

const formatDay = (date, locale = 'en-US') => {
  const options = { weekday: 'short', day: 'numeric' };
  return date.toLocaleDateString(locale, options);
}


export { getCurrentWeek, getWeekOfDay, formatDay }