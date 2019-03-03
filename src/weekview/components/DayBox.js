import React from 'react';
import classNames from 'classnames/bind';

import MonthIndicator from './MonthIndicator';
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

  return (
    <>
      { firstDayOfMonth && <MonthIndicator day={day} locale={locale} /> }
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
