import React from 'react';
import { getYear, format } from 'date-fns';
import { getDaysInMonth } from '../../dates';

import styles from './MonthIndicator.module.scss';

const MonthIndicator = ({ day, locale }) => {
  const calendarEl = document.getElementById('calendar');
  const dayHeight = ((calendarEl.clientHeight / 100) * 90) / 7;
  const monthHeight = dayHeight * getDaysInMonth(day);
  const monthStyle = {
    height: monthHeight
  };
  const month = format(day, 'MMMM', { locale });
  const monthId = `${day.getMonth()}|${day.getFullYear()}`;

  return (
    <div id={monthId} className={styles.startOfMonth} style={monthStyle}>
      <span>{month}</span>
      <span>{month}</span>
      <span><b>{getYear(day)}</b></span>
      <span>{month}</span>
      <span>{month}</span>
    </div>
  );
}

export default React.memo(MonthIndicator);
