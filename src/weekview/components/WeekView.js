import React from 'react';

import Week from './Week';
import styles from './WeekView.module.scss';

export default (props) => (
  <div className={styles.container}>
    <Week
      selectedDay={props.selectedDay}
      setSelectedDay={props.setSelectedDay}
    />

    <div className={styles.content}>
      <span className="filler" />
      <div></div>

      <div className="day-tasks">
        <div> 12:00 </div>
        <div> Random Task </div>
      </div>

      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span className="filler" />
    </div>
  </div>
);
