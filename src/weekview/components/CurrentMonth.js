import React from 'react';
import { isSameMonth } from 'date-fns';
import classNames from 'classnames';

const CurrentMonth = ({ week }) => {
  const len = week
    .map(day => isSameMonth(week[0], day))
    .filter(sameMonth => sameMonth === true).length;

  const renderTwoMonths = len === 7 ? false : true;

  const months = Array.from(Array(renderTwoMonths ? 2 : 1)).map((_, index) => {
    const weekDayIndex = index < 1 ? 0 : len;
    const key =
      'month-' +
      `${week[weekDayIndex].getMonth()}-` +
      `${week[weekDayIndex].getFullYear()}`;

    const className = classNames({
      month: true,

      even: renderTwoMonths
        ? week[len - 1 + index].getMonth() % 2 === 0
        : week[0].getMonth() % 2 === 0,

      odd: renderTwoMonths
        ? week[len - 1 + index].getMonth() % 2 !== 0
        : week[0].getMonth() % 2 !== 0,

      secondMonth: index > 0,
      [`len${len}`]: index === 0,
      [`len${7 - len}`]: index > 0
    });

    return (
      <div key={key} className={className}>
        {week[weekDayIndex].toLocaleDateString('en-US', { month: 'long' })}
      </div>
    );
  });

  return <div className="weekMonths">{months}</div>;
};

export default CurrentMonth;
