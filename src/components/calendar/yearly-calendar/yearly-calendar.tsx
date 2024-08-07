import React from "react";
import Calendar from "../month-calendar/calendar";
import styles from "./styles.module.scss";

const YearlyCalendar: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <div className={styles.yearly}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Calendar key={index} month={index} year={year} />
      ))}
    </div>
  );
};

export default YearlyCalendar;
