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
      <div className="days">
        <button onClick={showPrevWeek}><i class="fas fa-chevron-up" /></button>
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
        <button onClick={showNextWeek}><i class="fas fa-chevron-down" /></button>
      </div>

      <Content week={days} />
    </div>
  )
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
