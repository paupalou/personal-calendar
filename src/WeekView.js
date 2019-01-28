import React, { useState, useEffect, useRef } from 'react';
import {
  isToday,
  isSameDay,
  addWeeks,
  subWeeks,
  isSameMonth,
  addDays,
  subDays
} from 'date-fns';
import { getWeekOfDay } from './dates';
import classNames from 'classnames';

import './WeekView.scss';

const TOP = 'TOP';
const BOTTOM = 'BOTTOM';

const Week = props => {
  const today = new Date();

  const [viewDate, setViewDate] = useState(today);
  const [touchStartY, setTouchStartY] = useState();
  const [lastTouchY, setLastTouchY] = useState();

  const currentWeek = getWeekOfDay(viewDate);
  const [scrollingDays, setScrollingDays] = useState(getWeekOfDay(new Date(viewDate)));
  const [scrollingDirections, setScrollingDirections] = useState([]);

  const scroll = (days, direction) => {
    switch (direction) {
      case TOP:
        setScrollingDays([
          subDays(days[0], 1),
          ...days.slice(0, days.length - 1)
        ]);
        break;
      case BOTTOM:
        setScrollingDays([
          ...days.slice(1, days.length),
          addDays(days.slice(-1).pop(), 1)
        ]);
        break;
      default:
        break;
    }
  };

  const daysColumnEl = useRef();
  const arrows = useRef();

  const wheelMove = (event) => {
    event.deltaY < 0
      ? setViewDate(subWeeks(viewDate, 1))
      : setViewDate(addWeeks(viewDate, 1));
  }

  const touchEnd = (event) => {
    console.log('TOUCH END');
    if (!touchStartY) { return; }

    setTouchStartY(undefined);
    setLastTouchY(undefined);

    setScrollingDays([...currentWeek]);
    setScrollingDirections([]);

    return;

    // const touchEndY = event.changedTouches[0].clientY;
    // if (touchStartY > touchEndY + 40) {
    //   setViewDate(addWeeks(viewDate, 1));
    // } else if (touchStartY < touchEndY - 40) {
    //   setViewDate(subWeeks(viewDate, 1));
    // }

    // setTouchStartY(undefined);
    // setDayDirection(undefined);
  }

  const touchMove = (event) => {
    console.log('touchMove event', event.changedTouches);
    const y = event.changedTouches[0].clientY;

    if (!touchStartY) {
      setTouchStartY(y);
    }

    if (y < lastTouchY) {
      console.log('TOP');
      // setScrollingDirections([...scrollingDirections, TOP]);
      scroll(scrollingDays, TOP);
    } else {
      console.log('BOTTOM');
      // setScrollingDirections([...scrollingDirections, BOTTOM]);
      scroll(scrollingDays, BOTTOM);
    }

    setLastTouchY(y);

    arrows.current.style.top = y - 40 + 'px';
    arrows.current.style.left = '20vw';

    return;

    // console.log('scrollingDirections: ', scrollingDirections);

    const scrollDirectionsLength = scrollingDirections.length;
    // console.log(scrollingDirections);
    if (scrollDirectionsLength >= 5 && scrollDirectionsLength % 5 === 0) {
      const lastScrollDirections = scrollingDirections.slice(
        scrollDirectionsLength - 5
      );
      const movingInDirection = lastScrollDirections.every((item, i) => {
        if (i === 0) {
          return true;
        }
        return item === lastScrollDirections[i-1];
      });


      if (movingInDirection) {
        const dayDirection = scrollingDirections.slice(-1).pop();
        console.log('LAST 5 EQUAL', dayDirection);

        switch (dayDirection) {
          case TOP:
            scroll(scrollingDays, TOP);
            break;
          case BOTTOM:
            scroll(scrollingDays, BOTTOM);
            break;
          default:
            break;
        }
      }
    }

    event.preventDefault();
  }


  // useEffect(() => {
  //   console.log('attaching events');
  //   if ('ontouchstart' in window) {
  //     daysColumnEl.current.addEventListener('touchmove', touchMove);
  //   } else if ('onwheel' in window) {
  //     daysColumnEl.current.addEventListener('wheel', wheelMove);
  //   }

  //   return () => {
  //     console.log('unmount');
  //     daysColumnEl.current.removeEventListener('touchmove', touchMove);
  //     daysColumnEl.current.removeEventListener('wheel', wheelMove);
  //   }
  // },[touchStartY, lastTouchY, scrollingDays]);

  // useEffect(() => {
  //   console.log('attaching events2');
  //   if ('ontouchstart' in window) {
  //     document.addEventListener('touchend', touchEnd);
  //   }

  //   return () => {
  //     console.log('unmount2');
  //     document.removeEventListener('touchend', touchEnd);
  //   }
  // },[touchStartY]);


  const dayColumnClass = classNames({
    days: true,
    scrolling: touchStartY ? true : false
  });

  const days = touchStartY ? scrollingDays : currentWeek;

  // console.log('RERENDER DAYS = ', days);

  return (
    <div id="week-view">

      <div
        className={dayColumnClass}
        ref={daysColumnEl}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        {days.map(day => (
          <Day key={day.getTime()}
            day={day}
            select={props.setSelectedDay}
            selectedDay={props.selectedDay}
          />)
        )}

        <i ref={arrows} className="arrows fas fa-arrows-alt-v" />
      </div>

      <Content week={currentWeek} />

    </div>
  )
};

const Day = ({ day, select, selectedDay, visible }) => {
  const selected = isSameDay(selectedDay, day);
  const dayClass = classNames({
    day: true,
    today: isToday(day),
    selected
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
