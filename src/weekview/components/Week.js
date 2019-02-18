import React, { useState, useEffect, useRef } from 'react';
import {
  addDays,
  subDays,
  isSameDay,
  isToday,
  isFirstDayOfMonth
} from 'date-fns';
import classNames from 'classnames';

import { getWeekOfDay, getWeekFromFirstDay } from '../../dates';
import CurrentMonth from './CurrentMonth';
import WeekDay from './WeekDay';

import './WeekView.scss';


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
    if (typeof userTouchStartTarget === 'undefined') {
      return;
    }

    userTouchStartTarget.addEventListener('touchmove', touchMove);
    userTouchStartTarget.addEventListener('touchend', touchEnd);

    return () => {
      userTouchStartTarget.removeEventListener('touchmove', touchMove);
      userTouchStartTarget.removeEventListener('touchend', touchEnd);
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

  return (
    <div id="week-selector" ref={weekSelector}>
      <CurrentMonth week={days} />

      <div className="days">
        {days.map((day, index) => {
          const selected = isSameDay(props.selectedDay, day);
          const dayClass = classNames({
            day: true,
            today: isToday(day),
            selected,
            firstDayOfMonth: isFirstDayOfMonth(day) && index !== 0
          });

          return (
            <div
              className={dayClass}
              key={day.getTime()}
              onClick={() => props.setSelectedDay(day)}
            >
              <WeekDay day={day} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Week;
