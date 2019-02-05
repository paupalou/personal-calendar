import React, { useState } from 'react';
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
import CurrentMonth from './CurrentMonth'
import WeekDay from './WeekDay'

import './WeekView.scss';

export default (props) => {
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
    <div id="week-selector">
      <button onClick={showPrevWeek}>
        <i className="fas fa-chevron-up" />
      </button>

      <CurrentMonth week={days} />

      <div className="days">
        <PoseGroup>
          {
            days.map((day, index) => {
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
              )
            })
          }

        </PoseGroup>
      </div>

      <button onClick={showNextWeek}>
        <i className="fas fa-chevron-down" />
      </button>
    </div>
  )
};
