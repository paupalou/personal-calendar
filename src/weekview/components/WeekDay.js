import React from 'react';

export default ({ day }) => (
  <>
    <span className="number">{day.getDate()}</span>
    <span className="name">
      {day.toLocaleDateString('en-US', { weekday: 'short' })}
    </span>
  </>
);
