import React, { useState, useEffect } from 'react';
import { isToday, isSameDay, addWeeks, subWeeks, isSameMonth } from 'date-fns';
import { getWeekOfDay } from './dates';
import classNames from 'classnames';

import './WeekView.scss';

const Week = props => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);
  const [touchStartY, setTouchStartY] = useState();

  useEffect(() => {
    const daysColumnEl = document.querySelector('.days');
    const foo = (event) => {
      event.deltaY < 0
        ? setViewDate(subWeeks(viewDate, 1))
        : setViewDate(addWeeks(viewDate, 1));
    }

    const touchEnd = (event) => {
      if (!touchStartY) {
        return;
      }

      const touchEndY = event.changedTouches[0].clientY;
      if (touchStartY > touchEndY + 20) {
        setViewDate(addWeeks(viewDate, 1));
      } else if (touchStartY < touchEndY - 20) {
        setViewDate(subWeeks(viewDate, 1));
      }

      setTouchStartY(undefined);
    }

    const touchMove = (event) => {
      if (!touchStartY) {
        setTouchStartY(event.changedTouches[0].clientY);
      }
    }


    if ('ontouchstart' in window) {
      daysColumnEl.addEventListener('touchend', touchEnd);
      daysColumnEl.addEventListener('touchmove', touchMove);
    } else if ('onwheel' in window) {
      daysColumnEl.addEventListener('wheel', foo);
    }

    return () => {
      daysColumnEl.removeEventListener('touchend', touchEnd);
      daysColumnEl.removeEventListener('touchmove', touchMove);
      daysColumnEl.removeEventListener('wheel', foo);
    }
  }, [touchStartY, viewDate])

  const week = getWeekOfDay(viewDate);
  const days = week.map((day) => {
    return (
      <Day key={day.getTime()}
        day={day}
        select={props.setSelectedDay}
        selectedDay={props.selectedDay}
      />
    )
  });

  return (
    <div id="week-view">
      <div className="days">
        {days}
      </div>

      <Content week={week} />

    </div>
  )
};

const Day = ({ day, select, selectedDay }) => {
  const dayClass = classNames({
    day: true,
    today: isToday(day),
    selected: isSameDay(selectedDay, day)
  })
  const selectDay = () => select(day);

  return (
    <div className={dayClass} onClick={selectDay}>
      <span className="number">{day.getDate()}</span>
      <span className="name">
        {day.toLocaleDateString('en-US', { weekday: 'short' })}
      </span>
    </div>
  );
};

const Content = props => {
  const len = props.week
    .map(day => isSameMonth(props.week[0], day))
    .filter(sameMonth => sameMonth === true).length;

  let monthOfWeek = props.week[0].toLocaleDateString(
    'en-US', { month: 'long' }
  );

  let yearOfWeek = props.week[0].toLocaleDateString(
    'en-US', { year: 'numeric' }
  )

  if (len < 4) {
    monthOfWeek = props.week[len].toLocaleDateString(
      'en-US', { month: 'long' }
    );

    yearOfWeek = props.week[len].toLocaleDateString(
      'en-US', { year: 'numeric' }
    )
  }

  return (
    <div className="content">
      <div className="content-title">
        <span className="month">{ monthOfWeek }</span>
        <span className="year">{ yearOfWeek }</span>
      </div>
    </div>
  )
}

export default Week;
