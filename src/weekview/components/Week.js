import React, { useState, useEffect, useRef } from 'react';
import {
  addWeeks,
  subWeeks,
  isSameDay,
  isToday,
  isFirstDayOfMonth
} from 'date-fns';
import classNames from 'classnames';
import posed, { PoseGroup } from 'react-pose';

import { getWeekOfDay } from '../../dates';
import CurrentMonth from './CurrentMonth';
import WeekDay from './WeekDay';

import './WeekView.scss';

function Week(props) {
  const today = new Date();
  const weekSelector = useRef();

  const [days, setDays] = useState(getWeekOfDay(today));
  const [userTouchStart, setUserTouchStart] = useState();
  const [userTouchEnd, setUserTouchEnd] = useState();

  useEffect(() => {
    console.log('adding effects');
    const { target } = userTouchStart || {};
    if (target) {
      target.addEventListener('touchmove', touchMove);
      target.addEventListener('touchend', touchEnd);
    }

    return () => {
      if (target) {
        console.log('target found');
        target.removeEventListener('touchmove', touchMove);
        target.removeEventListener('touchend', touchEnd);
      }
    }
  }, [userTouchStart]);


  const showPrevWeek = event => {
    const prevWeek = getWeekOfDay(subWeeks(days[0], 1));
    setDays(prevWeek);
  };

  const showNextWeek = event => {
    const nextWeek = getWeekOfDay(addWeeks(days[0], 1));
    setDays(nextWeek);
  };

  const AnimatedDay = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
  });

  function touchStart(event) {
    console.log('touchStart');
    const { touches } = event;

    if (touches.length > 1) {
      // it means more than one finger touching screen?
      return;
    }

    const timestamp = new Date().getTime();
    const { targetTouches } = event;
    const [touch] = targetTouches;
    const { clientX: x, clientY: y } = touch;
    setUserTouchStart({ timestamp, x, y, target: event.target });
  }

  function touchMove(event) {
    console.log('touchMove (start) :', userTouchStart);
    if (userTouchStart) {
      event.preventDefault();

      const { targetTouches } = event;
      const [touch] = targetTouches;
      const { clientX: x, clientY: y } = touch;

      debugger;
      setUserTouchEnd({x, y});
    }
  }

  function touchEnd(event) {
    console.log('touchEnd');

    const now = new Date().getTime();
    const deltaTime = now - userTouchStart.timestamp;
    const deltaX = userTouchEnd.x - userTouchStart.x;
    const deltaY = userTouchEnd.y - userTouchStart.y;

    if (deltaTime > 500) {
      return;
    }

    if (deltaY > 100 && Math.abs(deltaX) < 100) {
      console.log('swipe down');
    } else if (-deltaY > 100 && Math.abs(deltaX) < 100) {
      console.log('swipe up');
    }
  }

  return (
    <div id="week-selector" onTouchStart={touchStart} ref={weekSelector}>
      <CurrentMonth week={days} />

      <div className="days">
        <PoseGroup>
          {days.map((day, index) => {
            const selected = isSameDay(props.selectedDay, day);
            const dayClass = classNames({
              day: true,
              today: isToday(day),
              selected,
              firstDayOfMonth: isFirstDayOfMonth(day) && index !== 0
            });

            return (
              <AnimatedDay
                className={dayClass}
                key={day.getTime()}
                onClick={() => props.setSelectedDay(day)}
              >
                <WeekDay day={day} />
              </AnimatedDay>
            );
          })}
        </PoseGroup>
      </div>
    </div>
  );
};

export default Week;
