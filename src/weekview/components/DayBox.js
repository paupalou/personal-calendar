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
    today,
    selected,
    firstDayOfMonth: borderSeparator,
    even: day.getMonth() % 2 === 0
  });

  const onClick = () => clickHandler(day);

  // const locale = navigator.language;
  const locale = 'en-US';

  return (
    <>
      {
        firstDayOfMonth &&
        <div
          id={`${day.getMonth()}|${day.getFullYear()}`}
          className={styles.startOfMonth}
          style={{
            height: `calc(calc(90vh /7) * ${getDaysInMonth(day)})`,
          }}
        >
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
