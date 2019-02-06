import React from 'react';

import Week from './Week';

export default (props) => (
  <div id="week-view">
    <Week
      selectedDay={props.selectedDay}
      setSelectedDay={props.setSelectedDay}
    />

    <div id="week-content">
      <span className="filler" />
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span className="filler" />
    </div>
  </div>
);
