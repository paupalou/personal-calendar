import React, { useState, useEffect, useRef } from 'react';
import {
  isSameDay,
  isToday,
  isFirstDayOfMonth
} from 'date-fns';

import {
  getStartOfWeek,
  getSurroundingMonths
} from '../../dates';
import DayBox from './DayBox';

import styles from './Week.module.scss';

function Week(props) {
  const today = new Date();
  const weekStartOfToday = getStartOfWeek(today);

  const [days] = useState(() => getSurroundingMonths(today));
  const [weekStartIndex] = useState(
    () => days.findIndex(day => isSameDay(day, weekStartOfToday))
  );

  const daysRef = useRef();

  useEffect(() => {
    const firstElementDayofWeek = daysRef.current.childNodes[weekStartIndex];
    daysRef.current.scrollTop = firstElementDayofWeek.offsetTop;
  }, []);

  return (
    <div className={styles['week-selector']}>

      <div className={styles.days} ref={daysRef}>
        {
          days.map((day, index) =>
            <DayBox
              day={day}
              dayIndex={index}
              today={isToday(day)}
              selected={isSameDay(props.selectedDay, day)}
              firstDayOfMonth={isFirstDayOfMonth(day)}
              borderSeparator={isFirstDayOfMonth(day) && index !== 0}
              clickHandler={props.setSelectedDay}
              key={day.getTime()}
            />
          )}
        </div>
      </div>
  );
};

export default Week;
