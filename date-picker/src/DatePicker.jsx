import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";

export default function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="date-picker-container">
        <button
          className="date-picker-button"
          onClick={() => setIsOpen((e) => !e)}
        >
          {value == null ? "Select a date" : format(value, "MMM do, yyy")}
        </button>
        {isOpen && <DatePickerModal value={value} onChange={onChange} />}
      </div>
    </>
  );
}

function DatePickerModal({ value, onChange }) {
  const [visibleMonth, setVisibleMonth] = useState(value || new Date());

  const visibleDates = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(visibleMonth)),
        end: endOfWeek(endOfMonth(visibleMonth)),
      }),
    [visibleMonth]
  );

  function showPreviousMonth() {
    setVisibleMonth((currentMonth) => {
      return addMonths(currentMonth, -1);
    });
  }

  function showNextMonth() {
    setVisibleMonth((currentMonth) => {
      return addMonths(currentMonth, 1);
    });
  }

  return (
    <>
      <div className="date-picker">
        <div className="date-picker-header">
          <button
            className="prev-month-button month-button"
            onClick={showPreviousMonth}
          >
            &larr;
          </button>
          <div className="current-month">
            {format(visibleMonth, "MMMM - yyyy")}
          </div>
          <button
            className="next-month-button month-button"
            onClick={showNextMonth}
          >
            &rarr;
          </button>
        </div>
        <div className="date-picker-grid-header date-picker-grid">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="date-picker-grid-dates date-picker-grid">
          {visibleDates.map((date) => {
            return (
              <button
                onClick={() => onChange(date)}
                key={date.toDateString()}
                className={`date ${
                  !isSameMonth(date, visibleMonth) &&
                  "date-picker-other-month-date"
                } 
                ${isToday(date) && "today"}

                ${isSameDay(value, date) && "selected"}
                `}
              >
                {format(date, "d")}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
