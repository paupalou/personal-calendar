import React from 'react';
import classNames from 'classnames/bind';
import { getYear, format } from 'date-fns';

import { getDaysInMonth } from '../../dates';
import styles from './DayBox.module.scss';

const DayBox = (props) => {

  const {
    day,
    today,
    selected,
    borderSeparator,
    firstDayOfMonth,
    clickHandler
  } = props;

  const cx = classNames.bind(styles);

  const dayClass = cx({
    day: true,
    'vh-fix': true,
    today,
    selected,
    firstDayOfMonth: borderSeparator,
    even: day.getMonth() % 2 === 0
  });

  const onClick = () => clickHandler(day);

  // const locale = navigator.language;
  const locale = 'en-US';
  const id = `${day.getMonth()}|${day.getFullYear()}`;
  const calendarEl = document.getElementById('calendar');
  const dayHeight = ((calendarEl.clientHeight / 100) * 90) / 7;
  const monthHeight = dayHeight * getDaysInMonth(day);
  const monthStyle = { height: monthHeight };

  return (
    <>
      {
        firstDayOfMonth &&
        <div id={id} className={styles.startOfMonth} style={monthStyle}>
          <span>{format(day, 'MMMM', { locale })}</span>
          <span>{format(day, 'MMMM', { locale })}</span>

          <span><b>{getYear(day)}</b></span>

          <span>{format(day, 'MMMM', { locale })}</span>
          <span>{format(day, 'MMMM', { locale })}</span>

        </div>
      }
      <div className={dayClass} onClick={onClick}>
        <span className={styles.number}>{day.getDate()}</span>
        <span className={styles.name}>
          {day.toLocaleDateString('en-US', { weekday: 'short' })}
        </span>
      </div>
    </>
  );
};

export default DayBox;
