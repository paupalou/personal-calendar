import React from 'react';
import classNames from 'classnames/bind';

import { getDaysInMonth } from '../../dates';
import styles from './WeekDay.module.scss';

const WeekDay = (props) => {

  const { day, today, selected, firstDayOfMonth, clickHandler } = props;

  const cx = classNames.bind(styles);

  const dayClass = cx({
    day: true,
    today,
    selected,
    firstDayOfMonth,
    even: day.getMonth() % 2 === 0
  });

  const onClick = () => clickHandler(day);

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
          <span>
            {day.toLocaleDateString('en-US', { month: 'long' })}
          </span>

          <span>
            {day.toLocaleDateString('en-US', { month: 'long' })}
          </span>
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

export default WeekDay;
