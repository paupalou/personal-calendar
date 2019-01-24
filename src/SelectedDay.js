import React from 'react';

const SelectedDay = ({ day }) => {
  return (
    <div className="selected-day">
      <span className="number">{day.getDate()}</span>
      <span className="name">
        {day.toLocaleDateString('en-US', { weekday: 'short' })}
      </span>
    </div>
  );
};

export default SelectedDay;
