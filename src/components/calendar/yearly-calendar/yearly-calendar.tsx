import React from "react";
import Calendar from "../month-calendar/calendar";
import styles from "./styles.module.scss";

const YearlyCalendar = ({
  working_day,
  holidays,
  sickLeaves,
  timeOffs,
  trainings,
  vacations,
}: {
  working_day?: string[];
  holidays?: string[];
  sickLeaves?: string[];
  timeOffs?: string[];
  trainings?: string[];
  vacations?: string[];
}) => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.yearly}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Calendar
          key={index}
          month={index}
          year={year}
          selectedDates={working_day}
          holidays={holidays}
        />
      ))}
    </div>
  );
};

export default YearlyCalendar;
