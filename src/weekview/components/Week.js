import React, { useState, useEffect, useRef } from 'react';
import {
  isSameDay,
  isToday,
  isFirstDayOfMonth
} from 'date-fns';
import debounce from 'lodash/debounce';

import {
  getStartOfWeek,
  getSurroundingWeeks,
  getWeekOfDay,
  getWeekFromFirstDay
} from '../../dates';
import CurrentMonth from './CurrentMonth';
import WeekDay from './WeekDay';

import styles from './Week.module.scss';

const SCROLL_PX_SIZE = 5;

function Week(props) {
  const today = new Date();
  const weekStartOfToday = getStartOfWeek(today);

  const [days, setDays] = useState(() => getSurroundingWeeks(today));
  const [weekStartIndex, setWeekStartIndex] = useState(
    () => days.findIndex(day => isSameDay(day, weekStartOfToday))
  );

  const daysRef = useRef();

  useEffect(() => {
    const firstElementDayofWeek = daysRef.current.childNodes[weekStartIndex];
    daysRef.current.scrollTop = firstElementDayofWeek.offsetTop;

    // const debounced = debounce(sayFirstDay, 50);

    // daysRef.current.addEventListener('scroll', debounced);

    // return () => {
    //   daysRef.current.removeEventListener('scroll', debounced);
    // }
  },[])

  // function getWeekStartIndex() {
  //   return weekStartIndex;
  // }

  // function sayFirstDay(e) {
  //   const index = getWeekStartIndex();
  //   const { scrollTop } = e.target;
  //   const dayHeight = e.target.clientHeight / 7;
  //   const newIndex = Math.floor(scrollTop / dayHeight);
  //   // const newIndex = Math.floor(scrollTop / (600/7));

  //   if(index !== newIndex) {
  //     setWeekStartIndex(newIndex);
  //   }
  // }

  // function showPrevDay()  {
  //   setWeekStartIndex(weekStartIndex - 1);
  // }

  // function showNextDay() {
  //   setWeekStartIndex(weekStartIndex + 1);
  // }

  // const week = days.slice(weekStartIndex, weekStartIndex + 7);
// <CurrentMonth days={days} weekStartIndex={weekStartIndex} />

  return (
    <>
      <div className={styles['week-selector']}>
        <div />

        <div className={styles.days} ref={daysRef}>
          {
            days.map((day, index) =>
            <WeekDay
              day={day}
              today={isToday(day)}
              selected={isSameDay(props.selectedDay, day)}
              firstDayOfMonth={isFirstDayOfMonth(day) && index !== 0}
              clickHandler={props.setSelectedDay}
              key={day.getTime()}
            />
          )}
        </div>
      </div>

    </>
  );
};

export default Week;
