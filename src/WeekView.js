import React, { useState, useEffect, useRef } from 'react';
import {
  isToday,
  isSameDay,
  addWeeks,
  subWeeks,
  isSameMonth,
  addDays,
  subDays,
  isSameWeek
} from 'date-fns';
import { getWeekOfDay } from './dates';
import classNames from 'classnames';

import './WeekView.scss';

const TOP = 'TOP';
const BOTTOM = 'BOTTOM';

const Week = props => {
  const today = new Date();

  const [viewDate, setViewDate] = useState(today);
  // const [touchStartY, setTouchStartY] = useState();
  // const [lastTouchY, setLastTouchY] = useState();
  const [scrolling, setScrolling] = useState(false);

  const prevWeek = getWeekOfDay(subWeeks(viewDate, 1));
  const currentWeek = getWeekOfDay(viewDate);
  const nextWeek = getWeekOfDay(addWeeks(viewDate, 1));

  const [touchesVAxis, setTouchesVAxis] = useState([]);

  const [scrollingDays, setScrollingDays] = useState(
    getWeekOfDay(viewDate)
  );

  // const [scrollingDirections, setScrollingDirections] = useState([]);

  // const scroll = (days, direction) => {
  //   switch (direction) {
  //     case TOP:
  //       setScrollingDays([
  //         subDays(days[0], 1),
  //         ...days.slice(0, days.length - 1)
  //       ]);
  //       break;
  //     case BOTTOM:
  //       setScrollingDays([
  //         ...days.slice(1, days.length),
  //         addDays(days.slice(-1).pop(), 1)
  //       ]);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const daysColumnEl = useRef();
  const arrows = useRef();

  const wheelMove = (event) => {
    event.deltaY < 0
      ? setViewDate(subWeeks(viewDate, 1))
      : setViewDate(addWeeks(viewDate, 1));
  }

  const touchEnd = (event) => {
    console.log('TOUCH END');
    // if (!touchStartY) { return; }

    // setTouchStartY(undefined);
    // setLastTouchY(undefined);

    // setScrollingDays([...currentWeek]);
    // setScrollingDirections([]);
    // console.log('touchesVAxis: ', touchesVAxis)
    // setTouchesVAxis([]);
    // setScrollingDays(getWeekOfDay(viewDate));
    setScrolling(false);
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
    event.preventDefault();
    console.log('touchMove event');
    setScrolling(true);

    const y = event.changedTouches[0].clientY;

    arrows.current.style.top = y - 40 + 'px';
    arrows.current.style.left = '10vw';

    // console.log('touchMove touchesVAxis: ', touchesVAxis);

    if (touchesVAxis.length < 10) {
      setTouchesVAxis([...touchesVAxis, y]);
    }

    return;

    // console.log(`finished saving 10 touchesVAxis`);
    // // compare
    // if (touchesVAxis[0] > touchesVAxis[touchesVAxis.length -1]) {
    //   console.log('SCROLL TOP')
    //   const previousDay = subDays(scrollingDays[0], 1);
    //   const prevDayIndex = prevWeek.findIndex(
    //     day => isSameDay(day, previousDay)
    //   );

    //   if (prevDayIndex) {
    //     console.log(`day found on index ${prevDayIndex}`);
    //   } else {
    //     console.log('full week LOADED !!!!!!!!');
    //     touchEnd(event);
    //     return;
    //   }

    //   // setScrollingDays([
    //   //   prevWeek[prevDayIndex],
    //   //   ...scrollingDays.slice(0, scrollingDays.length - 1),
    //   // ]);
    // } else {
    //   console.log('SCROLL BOTTOM')
    // }

    // setTouchesVAxis([]);
  }

    // if (!touchStartY) {
    //   setTouchStartY(y);
    // }
    // setScrolling(true);

    // setLastTouchY(y);
    // console.log(lastTouchY);
    // return;

    // if (y < lastTouchY) {
      // console.log('TOP');
      // setScrollingDirections([...scrollingDirections, TOP]);
      // scroll(scrollingDays, TOP);
    // } else {
    //   console.log('BOTTOM');
    //   // setScrollingDirections([...scrollingDirections, BOTTOM]);
    //   scroll(scrollingDays, BOTTOM);
    // }

    // setLastTouchY(y);

    // arrows.current.style.top = y - 40 + 'px';
    // arrows.current.style.left = '12vw';

    // return;

    // console.log('scrollingDirections: ', scrollingDirections);

    // const scrollDirectionsLength = scrollingDirections.length;
    // // console.log(scrollingDirections);
    // if (scrollDirectionsLength >= 5 && scrollDirectionsLength % 5 === 0) {
    //   const lastScrollDirections = scrollingDirections.slice(
    //     scrollDirectionsLength - 5
    //   );
    //   const movingInDirection = lastScrollDirections.every((item, i) => {
    //     if (i === 0) {
    //       return true;
    //     }
    //     return item === lastScrollDirections[i-1];
    //   });


    //   if (movingInDirection) {
    //     const dayDirection = scrollingDirections.slice(-1).pop();
    //     console.log('LAST 5 EQUAL', dayDirection);

    //     switch (dayDirection) {
    //       case TOP:
    //         scroll(scrollingDays, TOP);
    //         break;
    //       case BOTTOM:
    //         scroll(scrollingDays, BOTTOM);
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    // }

  // }


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
    scrolling
  });

  // const days = scrolling ? scrollingDays : currentWeek;

  const checkDirection = directions => {
    return directions[0] > directions[9] ? TOP : BOTTOM;
  }

  // const days = currentWeek;

    //   const previousDay = subDays(scrollingDays[0], 1);
    //   const prevDayIndex = prevWeek.findIndex(
    //     day => isSameDay(day, previousDay)
    //   );

  if (touchesVAxis.length === 10) {
    console.log('NOEW');
    const scrollDirection = checkDirection(touchesVAxis);
    switch (scrollDirection) {
      case TOP:
        const previousDay = subDays(scrollingDays[0], 1);
        const prevDayIndex = prevWeek.findIndex(
          day => isSameDay(day, previousDay)
        );

        if (prevDayIndex > -1) {
          setScrollingDays(
            [
              prevWeek[prevDayIndex],
              ...scrollingDays.slice(0, scrollingDays.length - 1)]
          );
          setTouchesVAxis([]);
        }

        console.log(scrollingDays);
        break;
      default:
    }
  }

    // if (touchesVAxis[0] > touchesVAxis[touchesVAxis.length -1]) {
    //   console.log('SCROLL TOP')
    //   const previousDay = subDays(scrollingDays[0], 1);
    //   const prevDayIndex = prevWeek.findIndex(
    //     day => isSameDay(day, previousDay)
    //   );
  //
  //
  //
  //
  const days = scrolling ?
    []
    : [...prevWeek, ...currentWeek, ...nextWeek];

  const scrollbarClass = classNames({
    scrolling
  });

  return (
    <div id="week-view">
      <div
        className={dayColumnClass}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        { currentWeek.map(day => (
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

      <Content week={currentWeek} />

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
