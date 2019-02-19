import React, { useState, useEffect, useRef } from 'react';
import {
  subDays,
  isSameDay,
  isToday,
  isFirstDayOfMonth
} from 'date-fns';
import classNames from 'classnames/bind';

import { getWeekOfDay, getWeekFromFirstDay } from '../../dates';
import CurrentMonth from './CurrentMonth';
import WeekDay from './WeekDay';

import styles from './Week.module.scss';

const SCROLL_PX_SIZE = 5;

function Week(props) {
  const today = new Date();

  const [days, setDays] = useState(getWeekOfDay(today));
  const [userTouchY, setUserTouchY] = useState();
  const [prevY, setPrevY] = useState();

  const weekScrollbar = useRef();

  useEffect(() => {
    weekScrollbar.current.addEventListener('touchstart', touchStart);
    weekScrollbar.current.addEventListener('touchmove', touchMove);
    weekScrollbar.current.addEventListener('touchend', touchEnd);
    weekScrollbar.current.addEventListener('touchcancel', touchEnd);

    return () => {
      weekScrollbar.current.removeEventListener('touchstart', touchStart);
      weekScrollbar.current.removeEventListener('touchmove', touchMove);
      weekScrollbar.current.removeEventListener('touchend', touchEnd);
      weekScrollbar.current.removeEventListener('touchcancel', touchEnd);
    }
  },[]);

  useEffect(() => {
    if (typeof userTouchY === 'undefined') {
      return;
    }

    if (typeof prevY === 'undefined') {
      setPrevY(userTouchY);
      return;
    }

    if (prevY === userTouchY) {
      return;
    }

    const distanceTraveled = prevY - userTouchY;

    if (distanceTraveled > SCROLL_PX_SIZE) {
      setPrevY(userTouchY);
      showPrevDay();
    } else if (-distanceTraveled > SCROLL_PX_SIZE) {
      setPrevY(userTouchY);
      showNextDay();
    }
  }, [userTouchY, prevY, days])

  function showPrevDay()  {
    const prevDayWeek = getWeekFromFirstDay(subDays(days[0], 1));
    setDays(prevDayWeek);
  }

  function showNextDay() {
    const nextDayWeek = getWeekFromFirstDay(days[1]);
    setDays(nextDayWeek);
  }

  function touchStart(event) {
    event.preventDefault();
  }

  function touchMove(event) {
    event.preventDefault();
    const [touch] = event.targetTouches;
    setUserTouchY(touch.clientY);
  }

  function touchEnd(event) {
    event.preventDefault();
    setUserTouchY(undefined);
    setPrevY(undefined);
  }

  const cx = classNames.bind(styles);
  const scrollBarClass = cx({
    scrollbar: true,
    active: typeof userTouchY !== 'undefined'
  });

  return (
    <>
      <div className={styles['week-selector']}>
        <CurrentMonth week={days} />

        <div className={styles.days}>
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
          )};
        </div>
      </div>

      <div className={scrollBarClass} ref={weekScrollbar} />
    </>
  );
};

export default Week;
