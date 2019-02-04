import React, { useState } from 'react';
import {
  isToday,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks
} from 'date-fns';
import { getWeekOfDay } from './dates';
import classNames from 'classnames';
import posed, { PoseGroup } from 'react-pose';

import './WeekView.scss';

const Week = props => {
  const today = new Date();

  const [days, setDays] = useState(getWeekOfDay(today));

  const showPrevWeek = (event) => {
    const prevWeek = getWeekOfDay(subWeeks(days[0], 1));
    setDays(prevWeek)
  }

  const showNextWeek = (event) => {
    const nextWeek = getWeekOfDay(addWeeks(days[0], 1));
    setDays(nextWeek);
  }

  const AnimatedDay = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  });

  return (
    <div id="week-view">
      <button onClick={showPrevWeek}><i className="fas fa-chevron-up" /></button>
      <CurrentMonth week={days} />

      <div className="days">
        <PoseGroup>
          {
            days.map(day => {
              const selected = isSameDay(props.selectedDay, day);
              const dayClass = classNames({
                day: true,
                today: isToday(day),
                selected
              });

              return (
                <AnimatedDay
                  className={dayClass}
                  key={day.getTime()}
                  onClick={() => props.setSelectedDay(day)}
                >
                  <Day day={day} />
                </AnimatedDay>
              )
            })
          }

        </PoseGroup>
      </div>

      <button onClick={showNextWeek}><i className="fas fa-chevron-down" /></button>
      <div></div>
    </div>
  )
};

const CurrentMonth = ({ week }) => {
  const len = week
    .map(day => isSameMonth(week[0], day))
    .filter(sameMonth => sameMonth === true).length;

  let monthsInWeek = 1;
  if (len !== 7) {
    // two different months on same week
    monthsInWeek += 1;
  }

  const months = Array(monthsInWeek).fill(0).map((_, index) => {
    const weekDayIndex = index < 1 ? 0 : len;
    const key = 'month-' +
      `${week[weekDayIndex].getMonth()}-` +
      `${week[weekDayIndex].getFullYear()}`;

    const className = classNames({
      month: true,
      first: index === 0,
      second: index > 0,
      [`len${len}`]: index === 0,
      [`len${7-len}`]: index > 0
    })

    return (
      <div
        key={key}
        className={className}
      >
        {week[weekDayIndex].toLocaleDateString('en-US', { month: 'long' })}
      </div>
    )
  })

  return <div className="weekMonths">{months}</div>;
};

const Day = ({ day }) => (
  <>
    <span className="number">{day.getDate()}</span>
    <span className="name">
      {day.toLocaleDateString('en-US', { weekday: 'short' })}
    </span>
  </>
);

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
