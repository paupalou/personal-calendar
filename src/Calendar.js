import React, { useState, lazy, Suspense } from 'react';
import Div100vh from 'react-div-100vh';

import './Calendar.scss';

const WeekView = lazy(() => import('./weekview'));
const MonthView = lazy(() => import('./monthview'));

const Calendar = props => {
  const today = new Date();

  const [viewMode, setViewMode] = useState('week');
  const [selectedDay, setSelectedDay] = useState(today);

  return (
    <Div100vh id="calendar">
      <Suspense fallback={<div> Loading ...</div>}>
        {viewMode === 'week' && (
          <WeekView selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        )}

        {viewMode === 'month' && <MonthView />}
      </Suspense>

      <CalendarPicker mode={viewMode} toggle={setViewMode} />
    </Div100vh>
  );
};

const CalendarPicker = ({ mode, toggle, setViewDate }) => (
  <div className="calendar-picker">
    {mode === 'week' && (
      <button onClick={() => toggle('month')}>
        <i className="fas fa-calendar-alt" />
      </button>
    )}

    {mode === 'month' && (
      <button onClick={() => toggle('week')}>
        <i className="fas fa-calendar-week" />
      </button>
    )}
  </div>
);

export default Calendar;
