import React from "react";
import styles from "./style.module.scss";

interface Day {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

interface MonthProps {
  month: number;
  year: number;
}

const MonthlyCalendar: React.FC<MonthProps> = ({ month, year }) => {
  const today = new Date();
  const currentMonth = new Date(year, month);

  const daysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const dayOfWeek = (date: Date): number => {
    return (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  };

  const generateDays = (): Day[] => {
    const days: Day[] = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = dayOfWeek(currentMonth);

    const prevMonth = new Date(year, month - 1);
    const daysInPrevMonth = daysInMonth(prevMonth);

    for (let i = 1; i <= firstDay; i++) {
      days.push({
        date: new Date(
          prevMonth.getFullYear(),
          prevMonth.getMonth(),
          daysInPrevMonth - firstDay + i
        ),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
        isToday:
          today.toDateString() === new Date(year, month, i).toDateString(),
      });
    }

    const totalDisplayedDays = days.length;
    const daysToAdd = (7 - (totalDisplayedDays % 7)) % 7;
    for (let i = 1; i <= daysToAdd; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  };

  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const days = generateDays();

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        {currentMonth.toLocaleDateString("ru-RU", { month: "long" })}
      </div>
      <div className={styles.weekdays}>
        {weekdays.map((day, index) => (
          <div key={index} className={styles.weekday}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${styles.day} ${
              !day.isCurrentMonth ? styles.notCurrent : ""
            } ${day.isToday ? styles.today : ""}`}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
