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

  const currentWeek = getWeekOfDay(viewDate);
  const [scrolling, setScrolling] = useState(false);
  const [scrollingDays, setScrollingDays] = useState(currentWeek);
  const [scrollingDirections, setScrollingDirections] = useState([]);

  const daysColumnEl = useRef();
  const arrows = useRef();

  useEffect(() => {
    console.log('useEffect');
    const wheelMove = (event) => {
      event.deltaY < 0
        ? setViewDate(subWeeks(viewDate, 1))
        : setViewDate(addWeeks(viewDate, 1));
    }


    const touchEnd = (event) => {
      console.log('TOUCH END 1');
      if (!touchStartY) { return; }
      console.log('TOUCH END 2');

      setScrolling(false);
      setScrollingDays([...currentWeek]);
      setScrollingDirections([]);

      // const touchEndY = event.changedTouches[0].clientY;
      // if (touchStartY > touchEndY + 40) {
      //   setViewDate(addWeeks(viewDate, 1));
      // } else if (touchStartY < touchEndY - 40) {
      //   setViewDate(subWeeks(viewDate, 1));
      // }

      setTouchStartY(undefined);
      // setDayDirection(undefined);
    }

    const touchMove = (event) => {
      // console.log('toucmove');
      console.log('scrollingDirections', scrollingDirections);
      // const x = event.changedTouches[0].clientX;
      const y = event.changedTouches[0].clientY;
      // console.log('y: ', y);

      if (!touchStartY) {
        console.log('notouchstarty')
        setTouchStartY(y);
      }

      if (y > 40 && y + 40 < daysColumnEl.current.clientHeight) {

        if(!scrolling) { setScrolling(true); }

        if (y < touchStartY) {
          setScrollingDirections([...scrollingDirections, TOP]);
        } else {
          setScrollingDirections([...scrollingDirections, BOTTOM]);
        }

        arrows.current.style.top = y - 40 + 'px';
        arrows.current.style.left = '20vw';

        const scrollDirectionsLength = scrollingDirections.length;
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
                console.log('scrolling TOP');
                setScrollingDays([
                  subDays(scrollingDays[0], 1),
                  ...scrollingDays.slice(0, scrollingDays.length - 1)
                ]);
                break;
              case BOTTOM:
                console.log('scrolling BOTTOM');
                console.log('dates = ',
                  [...scrollingDays.slice(1, scrollingDays.length),
                  addDays(scrollingDays.slice(-1).pop(), 1)]
                )
                setScrollingDays([
                  ...scrollingDays.slice(1, scrollingDays.length),
                  addDays(scrollingDays.slice(-1).pop(), 1)
                ]);
                break;
              default:
            }
          }
        }
      }

      event.preventDefault();
    }


    if ('ontouchstart' in window) {
      daysColumnEl.current.addEventListener('touchend', touchEnd);
      daysColumnEl.current.addEventListener('touchmove', touchMove);
    } else if ('onwheel' in window) {
      daysColumnEl.current.addEventListener('wheel', wheelMove);
    }

    return () => {
      console.log('REMOVING EVENTS')
      daysColumnEl.current.removeEventListener('touchend', touchEnd);
      daysColumnEl.current.removeEventListener('touchmove', touchMove);
      daysColumnEl.current.removeEventListener('wheel', wheelMove);
    }
  // }, [touchStartY, viewDate, scrolling, scrollingDays])
  }, [touchStartY, viewDate, scrolling, scrollingDays, scrollingDirections])


  const dayColumnClass = classNames({
    days: true,
    scrolling
  });

  const days = scrolling ? scrollingDays : currentWeek;

  return (
    <div id="week-view">

      <div className={dayColumnClass} ref={daysColumnEl}>
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
