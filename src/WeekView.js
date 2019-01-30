import React, { useEffect, useState, useRef } from 'react';
import {
  isToday,
  isSameDay,
  isSameMonth,
  addDays,
  subDays,
} from 'date-fns';
import { getWeekOfDay } from './dates';
import classNames from 'classnames';

import './WeekView.scss';

import { debounce } from './utils';

const Week = props => {
  const today = new Date();

  const [days, setDays] = useState(getWeekOfDay(today));
  const [scrolling, setScrolling] = useState(false);
  const [origin, setOrigin] = useState();
  const [scrollingDays, setScrollingDays] = useState(
    getWeekOfDay(today)
  );

  const daysColumn = useRef();
  const arrows = useRef();

  // const wheelMove = (event) => {
  //   event.deltaY < 0
  //     ? setViewDate(subWeeks(viewDate, 1))
  //     : setViewDate(addWeeks(viewDate, 1));
  // }

  useEffect(() => {
    console.log('adding listeners');

    daysColumn.current.addEventListener('touchstart', touchStart);
    daysColumn.current.addEventListener('touchmove', touchMove);
    daysColumn.current.addEventListener('touchend', touchEnd);

    return () => {
      console.log('removing listeners');
      daysColumn.current.removeEventListener('touchstart', touchStart);
      daysColumn.current.removeEventListener('touchmove', touchMove);
      daysColumn.current.removeEventListener('touchend', touchEnd);
    }
  }, [origin, scrollingDays]);


  const touchEnd = (event) => {
    event.preventDefault();
    console.log('TOUCH END');
    setOrigin(undefined);
    setScrolling(false);
    setDays(scrollingDays);
  }

  const touchStart = (event) => {
    event.preventDefault();
    console.log('touchStart');
    setOrigin(event.changedTouches[0].clientY);
  }

  const touchMove = (event) => {
    event.preventDefault();
    if (typeof origin === 'undefined') {
      return;
    }
    const y = event.changedTouches[0].clientY;
    console.log(`touchMove ${origin}`);

    setScrolling(true);

    arrows.current.style.top = y - 40 + 'px';
    arrows.current.style.left = '10vw';

    const previousDay = subDays(scrollingDays[0], 1);
    const nextDay = addDays(scrollingDays[scrollingDays.length - 1], 1);

    if (origin > y) {
      setScrollingDays([
        previousDay,
        ...scrollingDays.slice(0, scrollingDays.length - 1)
      ]);
    } else {
      setScrollingDays([
        ...scrollingDays.slice(1, scrollingDays.length),
        nextDay
      ]);
    }

    setOrigin(y);
  }

  const daysColumnClass = classNames({
    days: true,
    scrolling
  });

  const scrollbarClass = classNames({
    scrolling
  });

  return (
    <div id="week-view">
      <div
        ref={daysColumn}
        className={daysColumnClass}
      >
        { days.map(day => (
          <Day key={day.getTime()}
            day={day}
            select={props.setSelectedDay}
            selectedDay={props.selectedDay}
          />)
        )}
        <i ref={arrows} className="arrows fas fa-arrows-alt-v" />
      </div>

      <div id="week-scrollbar" className={scrollbarClass}>
        {
          scrollingDays.map(day => (
          <Day key={day.getTime()}
            day={day}
            select={props.setSelectedDay}
            selectedDay={props.selectedDay}
          />)
        )}
      </div>

      <Content week={scrollingDays} />

    </div>
  )
};

const Day = ({ day, select, selectedDay, visible }) => {
  const selected = isSameDay(selectedDay, day);
  const dayClass = classNames({
    day: true,
    today: isToday(day),
    selected,
    visible
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
