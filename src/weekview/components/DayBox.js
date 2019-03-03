import React from 'react';
import classNames from 'classnames/bind';
import { getYear, format } from 'date-fns';

import { getDaysInMonth } from '../../dates';
import styles from './DayBox.module.scss';

const DayBox = React.memo((props) => {
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
  const calendarEl = document.getElementById('calendar');
  const dayHeight = ((calendarEl.clientHeight / 100) * 90) / 7;
  const monthHeight = dayHeight * getDaysInMonth(day);
  const monthStyle = {
    height: monthHeight
  };
  const month = format(day, 'MMMM', { locale });
  const monthId = `${day.getMonth()}|${day.getFullYear()}`;

  return (
    <>
      {
        firstDayOfMonth &&
        <div id={monthId} className={styles.startOfMonth} style={monthStyle}>
          <span>{month}</span>
          <span>{month}</span>
          <span><b>{getYear(day)}</b></span>
          <span>{month}</span>
          <span>{month}</span>
        </div>
      }
      <div id={day.getTime()} className={dayClass} onClick={onClick}>
        <span className={styles.number}>{day.getDate()}</span>
        <span className={styles.name}>
          {day.toLocaleDateString('en-US', { weekday: 'short' })}
        </span>
      </div>
    </>
  );
});

export default DayBox;
