import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CulturalCalendar = () => {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-[var(--primaryColor)] mb-2">📅 Cultural Calendar</h3>
      <Calendar />
      <p className="text-xs text-gray-500 mt-2">Tap a date to explore holidays, festivals, and rituals.</p>
    </div>
  );
};

export default CulturalCalendar;
