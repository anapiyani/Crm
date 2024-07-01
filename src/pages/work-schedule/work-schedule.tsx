import React, { useState, useEffect } from "react";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import moment from "moment";
import "moment/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./calendar-toolbar/toolbar";
import classes from "./styles.module.scss";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { parse, format, startOfWeek, getDay } from "date-fns";
import ru from "date-fns/locale/ru";

const locales = {
  ru: ru,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Meeting with John",
    start: new Date(2024, 6, 1, 10, 0), // July 1, 2024, 10:00 AM
    end: new Date(2024, 6, 1, 11, 0), // July 1, 2024, 11:00 AM
  },
  {
    title: "Conference",
    start: new Date(2024, 6, 5, 12, 0), // July 5, 2024, 12:00 PM
    end: new Date(2024, 6, 5, 14, 0), // July 5, 2024, 2:00 PM
  },
];

const WorkSchedule = () => {
  moment.updateLocale("ru", {
    week: {
      dow: 1,
      doy: 4,
    },
  });

  return (
    <div className={classes.schedule}>
      <div className={classes["schedule__content"]}>
        <div className={classes["schedule__content__calendar"]}>
          <div className={classes["schedule__content__calendar__header"]}>
            <BreadcrumbsCustom />
            <h1>График работы</h1>
            <div
              className={classes["schedule__content__calendar__header__top"]}
            >
              <h2>Календарь</h2>
              <Button>
                <AddIcon /> Добавить период
              </Button>
            </div>
            <hr />
          </div>
          <div className={classes["schedule__content__calendar__dates"]}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ minHeight: 600, maxHeight: 1200 }}
              components={{
                event: ({ event }) => (
                  <div>
                    <strong>{event.title}</strong>
                  </div>
                ),
                toolbar: CustomToolbar,
              }}
              popup
            />
          </div>
        </div>
        <div className={classes["schedule__content__filter"]}>
          <div className={classes["schedule__content__filter__header"]}>
            <h1>Сотрудники</h1>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSchedule;
