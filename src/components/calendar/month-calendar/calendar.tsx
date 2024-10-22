import React from "react";
import styles from "./style.module.scss";

interface Day {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isHoliday: boolean;
  isSickLeave: boolean;
  isTimeOff: boolean;
  isTraining: boolean;
  isVacation: boolean;
}

interface MonthProps {
  month: number;
  year: number;
  selectedDates?: string[];
  holidays?: string[];
  sickLeaves?: string[];
  timeOffs?: string[];
  trainings?: string[];
  vacations?: string[];
}

const MonthlyCalendar: React.FC<MonthProps> = ({
  month,
  year,
  selectedDates,
  holidays,
  sickLeaves,
  timeOffs,
  trainings,
  vacations,
}) => {
  const today = new Date();
  const currentMonth = new Date(year, month);

  const daysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const dayOfWeek = (date: Date): number => {
    return (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
  };

  const parseDates = (dates?: string[]): Date[] => {
    return (
      dates?.map((date) => {
        const [day, month, year] = date.split(".");
        return new Date(`${year}-${month}-${day}`);
      }) || []
    );
  };

  const formattedSelectedDates = parseDates(selectedDates);
  const formattedHolidays = parseDates(holidays);
  const formattedSickLeaves = parseDates(sickLeaves);
  const formattedTimeOffs = parseDates(timeOffs);
  const formattedTrainings = parseDates(trainings);
  const formattedVacations = parseDates(vacations);

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
        isSelected: false,
        isHoliday: false,
        isSickLeave: false,
        isTimeOff: false,
        isTraining: false,
        isVacation: false,
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(year, month, i);

      const isSelected = formattedSelectedDates.some(
        (selectedDate) =>
          selectedDate.toDateString() === currentDate.toDateString()
      );
      const isHoliday = formattedHolidays.some(
        (holiday) => holiday.toDateString() === currentDate.toDateString()
      );
      const isSickLeave = formattedSickLeaves.some(
        (sickLeave) => sickLeave.toDateString() === currentDate.toDateString()
      );
      const isTimeOff = formattedTimeOffs.some(
        (timeOff) => timeOff.toDateString() === currentDate.toDateString()
      );
      const isTraining = formattedTrainings.some(
        (training) => training.toDateString() === currentDate.toDateString()
      );
      const isVacation = formattedVacations.some(
        (vacation) => vacation.toDateString() === currentDate.toDateString()
      );

      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: today.toDateString() === currentDate.toDateString(),
        isSelected,
        isHoliday,
        isSickLeave,
        isTimeOff,
        isTraining,
        isVacation,
      });
    }

    const totalDisplayedDays = days.length;
    const daysToAdd = (7 - (totalDisplayedDays % 7)) % 7;
    for (let i = 1; i <= daysToAdd; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isHoliday: false,
        isSickLeave: false,
        isTimeOff: false,
        isTraining: false,
        isVacation: false,
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
            } ${day.isToday ? styles.today : ""} ${
              day.isSelected ? styles.selected : ""
            } ${day.isHoliday ? styles.holiday : ""} ${
              day.isSickLeave ? styles.sickLeave : ""
            } ${day.isTimeOff ? styles.timeOff : ""} ${
              day.isTraining ? styles.training : ""
            } ${day.isVacation ? styles.vacation : ""}`}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyCalendar;
