import React from 'react';

import Week from './Week';

export default (props) => (
  <div id="week-view">
    <Week
      selectedDay={props.selectedDay}
      setSelectedDay={props.setSelectedDay}
    />

    <div id="week-content">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
