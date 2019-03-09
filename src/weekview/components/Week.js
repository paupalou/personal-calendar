import React, { useState, useEffect, useRef } from 'react';
import {
  isSameDay,
  isToday,
  isFirstDayOfMonth
} from 'date-fns';

import {
  getStartOfWeek,
  getSurroundingMonths,
  getNextMonth
} from '../../dates';
import DayBox from './DayBox';

import styles from './Week.module.scss';

function Week(props) {
  const today = new Date();
  const weekStartOfToday = getStartOfWeek(today);

  const [days, setDays] = useState(() => getSurroundingMonths(today));
  const daysRef = useRef();
  const scrolling = useRef()
  const timeout = useRef()

  useEffect(() => {
    const firstElementDayofWeek = document.getElementById(
      `${weekStartOfToday.getTime()}`
    );

    daysRef.current.scrollTop = firstElementDayofWeek.offsetTop;
  }, []);

  function addMonths() {
    setDays([...days, ...getNextMonth(days[days.length - 1])]);
  }

  function onScroll() {
    const { scrollTop, scrollHeight, clientHeight } = daysRef.current;
    const diff =
      ((scrollHeight - clientHeight - scrollTop) / scrollHeight) * 100;

    if (diff < 1) {
      requestAnimationFrame(addMonths);
    }

    if (scrolling.current) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => scrolling.current = false, 500);
    } else {
      scrolling.current = true;
    }
  }

  return (
    <div className={styles['week-selector']}>

      <div className={styles.days} ref={daysRef} onScroll={onScroll}>
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
