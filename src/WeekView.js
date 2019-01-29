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

const Week = props => {
  const today = new Date();

  const [days, setDays] = useState(getWeekOfDay(today));
  const [scrolling, setScrolling] = useState(false);
  const [scrollInterval, setScrollInterval] = useState();

  const [origin, setOrigin] = useState();

  const [scrollingDays, setScrollingDays] = useState(
    getWeekOfDay(today)
  );

  const [scrollingFirstDay, setScrollingFirstDay] = useState(
    getWeekOfDay(today)[0]
  );

  const daysColumn = useRef();
  const arrows = useRef();

  // const wheelMove = (event) => {
  //   event.deltaY < 0
  //     ? setViewDate(subWeeks(viewDate, 1))
  //     : setViewDate(addWeeks(viewDate, 1));
  // }

  useEffect(() => {
    daysColumn.current.addEventListener('touchmove', touchMove);

    return () => {
      console.log('unmounting');
      daysColumn.current.removeEventListener('touchmove', touchMove);
    }
  }, [origin, scrollingFirstDay, scrollInterval]);

  const touchEnd = (event) => {
    console.log('TOUCH END');
    setScrolling(false);
    setDays(getWeekOfDay(scrollingFirstDay));
    setOrigin(undefined);
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(undefined);
    }
  }

  const touchStart = (event) => {
    setOrigin(event.changedTouches[0].clientY);
  }

  const touchMove = (event) => {
    console.log('touchMove');
    const y = event.changedTouches[0].clientY;
    console.log(`touchMove event y ${y} origin ${origin}`)

    event.preventDefault();
    setScrolling(true);

    arrows.current.style.top = y - 40 + 'px';
    arrows.current.style.left = '10vw';

    // if (origin < y) {
    // console.log('scrolling top to previousDay = ', previousDay)
    // console.log('scrollingDays', scrollingDays)

    let interval;
    if (!scrollInterval) {
      interval = setInterval(() => {
        const previousDay = subDays(scrollingFirstDay, 1);

        console.log('fire interval func', Math.random())
        // setScrollingDays([
        //   previousDay,
        //   ...scrollingDays.slice(0, scrollingDays.length - 1)
        // ]);
        setScrollingFirstDay(previousDay, 1);
      }, 1000);

      setScrollInterval(interval);
    }



    // } else {
      // const nextDay = addDays(scrollingDays.slice(-1).pop(), 1);

      // setInterval(() => {
      //   setScrollingDays([
      //     ...scrollingDays.slice(1, scrollingDays.length),
      //     nextDay
      //   ]);
      // }, 500)
    // }

    setOrigin(y);
  }

  const daysColumnClass = classNames({
    days: true,
    scrolling
  });

  const scrollbarClass = classNames({
    scrolling
  });

  const sDays = [scrollingFirstDay];

  Array(6).fill(0,0).forEach((_, i) => sDays[i+1] = addDays(sDays[i], 1));

  console.log('sdays', sDays);

  return (
    <div id="week-view">
      <div
        ref={daysColumn}
        className={daysColumnClass}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
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
          sDays.map(day => (
          <Day key={day.getTime()}
            day={day}
            select={props.setSelectedDay}
            selectedDay={props.selectedDay}
          />)
        )}
      </div>

      <Content week={sDays} />

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
