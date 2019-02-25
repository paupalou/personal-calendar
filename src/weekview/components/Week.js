import React, { useState, useEffect, useRef } from 'react';
import {
  isSameDay,
  isToday,
  isFirstDayOfMonth
} from 'date-fns';

import {
  getStartOfWeek,
  getSurroundingMonths,
  getNextMonths
} from '../../dates';
import DayBox from './DayBox';

import styles from './Week.module.scss';

function Week(props) {
  const today = new Date();
  const weekStartOfToday = getStartOfWeek(today);

  const [days, setDays] = useState(() => getSurroundingMonths(today));
  const [weekStartIndex] = useState(
    () => days.findIndex(day => isSameDay(day, weekStartOfToday))
  );

  const daysRef = useRef();
  const scrolling = useRef()
  const timeout = useRef()

  useEffect(() => {
    const firstElementDayofWeek = daysRef.current.childNodes[weekStartIndex];
    daysRef.current.scrollTop = firstElementDayofWeek.offsetTop;
  }, []);

  // useEffect(() => {
  //   scrolling.current = 
  // })
  //
  function addMonths() {
    console.log('adding');
    setDays([...days, ...getNextMonths(days[days.length - 1], 2)]);
  }

  function onScroll(e) {
    // console.log('scrolling: ', scrolling.current);
    // console.log(daysRef.current.scrollTop);
    // console.log('Height: ', daysRef.current.clientHeight);

    const { scrollTop, scrollHeight, clientHeight } = daysRef.current;
    if ((scrollHeight - clientHeight) - scrollTop < 600) {
      // console.log('BOTTOM');
      // load extra month
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
