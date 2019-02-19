import React from 'react';
import classNames from 'classnames/bind';

import styles from './WeekDay.module.scss';

const WeekDay = (props) => {

  const { day, today, selected, firstDayOfMonth, clickHandler } = props;

  const cx = classNames.bind(styles);

  const className = cx({
    day: true,
    today,
    selected,
    firstDayOfMonth
  });

  const onClick = () => clickHandler(day);

  return (
    <div className={className} onClick={onClick}>
      <span className={styles.number}>{day.getDate()}</span>
      <span className={styles.name}>
        {day.toLocaleDateString('en-US', { weekday: 'short' })}
      </span>
    </div>
  );
};

export default WeekDay;
