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
  const [userTouchStart, setUserTouchStart] = useState();
  const weekSelector = useRef();

  useEffect(() => {
    weekSelector.current.addEventListener('touchstart', touchStart);

    const { target } = userTouchStart || {};

    if (target) {
      target.addEventListener('touchmove', touchMove);
      target.addEventListener('touchend', touchEnd);
    }

    return () => {
      weekSelector.current.removeEventListener('touchstart', touchStart);
      if (target) {
        target.removeEventListener('touchmove', touchMove);
        target.removeEventListener('touchend', touchEnd);
      }
    }
  }, [days, userTouchStart]);

  const showPrevWeek = coords => {
    const prevWeek = getWeekFromFirstDay(subDays(days[0], 1));
    setUserTouchStart({ ...userTouchStart, ...coords })
    setDays(prevWeek);
  };

  const showNextWeek = coords => {
    const nextWeek = getWeekFromFirstDay(days[1]);
    setUserTouchStart({ ...userTouchStart, ...coords })
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
    const { clientX: x, clientY: y } = touch;

    setUserTouchStart({ x, y, target: event.target })
  }

  function touchMove(event) {
    event.preventDefault();

    if (userTouchStart) {

      const { targetTouches } = event;
      const [touch] = targetTouches;
      const { clientX: x, clientY: y } = touch;

      const deltaY = y - userTouchStart.y;

      if (deltaY > 30) {
        showPrevWeek({ x, y });
      } else if (-deltaY > 30) {
        showNextWeek({ x, y });
      }
    }
  }

  function touchEnd(event) {
    event.preventDefault();
    setUserTouchStart(undefined);
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
