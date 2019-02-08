import React from 'react';

import Week from './Week';
import styles from './WeekView.module.scss';

export default props => (
  <div className={styles.container}>
    <Week
      selectedDay={props.selectedDay}
      setSelectedDay={props.setSelectedDay}
    />

    <div className={styles['day-content']}>
      <span className="filler" />
      <div />

      <div className={styles['day-tasks']}>
        <div>
          <span> 12:00 </span>
          <span> Random Task </span>
        </div>
      </div>

      <div />
      <div />
      <div />
      <div />
      <div />
      <span className="filler" />
    </div>
  </div>
);
