import React, { useState, useEffect, useRef } from 'react';
import {
  addDays,
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


function Week(props) {
  const today = new Date();

  const [days, setDays] = useState(getWeekOfDay(today));
  const [userTouchStartY, setUserTouchStartY] = useState();
  const [userTouchStartTarget, setUserTouchStartTarget] = useState();
  const weekSelector = useRef();

  useEffect(() => {
    weekSelector.current.addEventListener('touchstart', touchStart);

    return () => {
      weekSelector.current.removeEventListener('touchstart', touchStart);
    }
  },[]);

  useEffect(() => {
    console.log('userTouchStartTarget', userTouchStartTarget);
    console.log('userTouchStartY', userTouchStartY);

    // if (typeof userTouchStartTarget === 'undefined') {
    //   return;
    // }

    weekSelector.current.addEventListener('touchmove', touchMove);
    weekSelector.current.addEventListener('touchend', touchEnd);
    // userTouchStartTarget.addEventListener('touchmove', touchMove);
    // userTouchStartTarget.addEventListener('touchend', touchEnd);

    return () => {
      weekSelector.current.removeEventListener('touchmove', touchMove);
      weekSelector.current.removeEventListener('touchend', touchEnd);
      // userTouchStartTarget.removeEventListener('touchmove', touchMove);
      // userTouchStartTarget.removeEventListener('touchend', touchEnd);
    }
  }, [days, userTouchStartTarget, userTouchStartY]);

  const showPrevWeek = y => {
    const prevWeek = getWeekFromFirstDay(subDays(days[0], 1));
    setUserTouchStartY(y);
    setDays(prevWeek);
  };

  const showNextWeek = y => {
    const nextWeek = getWeekFromFirstDay(days[1]);
    setUserTouchStartY(y);
    setDays(nextWeek);
  };

  function touchStart(event) {
    event.preventDefault();
    const { touches } = event;

    if (touches.length > 1) {
      // it means more than one finger touching screen?
      return;
    }

    const { targetTouches } = event;
    const [touch] = targetTouches;
    const { clientY: y } = touch;

    setUserTouchStartY(y);
    setUserTouchStartTarget(event.target);
  }

  function touchMove(event) {
    event.preventDefault();

    if (userTouchStartY) {

      const { targetTouches } = event;
      const [touch] = targetTouches;
      const { clientY: y } = touch;

      const deltaY = y - userTouchStartY;

      if (deltaY > 10) {
        showPrevWeek(y);
      } else if (-deltaY > 10) {
        showNextWeek(y);
      }
    }
  }

  function touchEnd(event) {
    event.preventDefault();
    setUserTouchStartY(undefined);
    setUserTouchStartTarget(undefined);
  }

  const cx = classNames.bind(styles);
  const scrollBarClass = ({
    scrollbar: true,
    active: userTouchStartTarget
  });

  return (
    <>
      <div className={styles['week-selector']} ref={weekSelector}>
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

      <div className={scrollBarClass} />
    </>
  );
};

export default Week;
