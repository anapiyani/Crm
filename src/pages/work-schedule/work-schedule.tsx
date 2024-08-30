import React, { useState, useEffect, useMemo } from "react";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import AddIcon from "@mui/icons-material/Add";
import { Button, TextField } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import classes from "./styles.module.scss";
import RoleEmployeeCheckbox from "@/components/role-employee-checkbox/role-employee-checkbox";
import { getEmployeeScheduleEachDay } from "@/service/schedule/schedule.service";
import { useQueries } from "@tanstack/react-query";
import { IResponseScheduleData } from "@/ts/schedule.interface";

const WorkSchedule = () => {
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<
    { id: number; color?: string }[]
  >([]);

  const employeeQueries = useQueries({
    queries: selectedEmployeeIds.map((user) => {
      return {
        queryKey: ["user", user.id],
        queryFn: () => getEmployeeScheduleEachDay(user.id),
        enabled: selectedEmployeeIds.length > 0,
        staleTime: 1000 * 60 * 5,
      };
    }),
  });

  const employeesData = useMemo(() => {
    return employeeQueries
      .filter((query) => query.isSuccess)
      .map((query) => query.data.results as IResponseScheduleData[]);
  }, [employeeQueries]);

  const renderEventContent = (eventInfo: any) => {
    return (
      <div
        style={{
          backgroundColor: eventInfo.event.backgroundColor,
          color: eventInfo.event.textColor,
          padding: "2px",
          overflow: "hidden",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p className={classes.eventText}>
          {eventInfo.timeText} {eventInfo.event.title}
        </p>
      </div>
    );
  };

  const eventData = useMemo(() => {
    return employeesData.flatMap((employeeArray) =>
      employeeArray.map((employee) => ({
        title: `${employee.employee.first_name} ${employee.employee.last_name}`,
        date: employee.date,
        backgroundColor:
          selectedEmployeeIds.find((emp) => emp.id === employee.employee.id)
            ?.color || generateColors(),
        textColor: "black",
        start: employee.start_time,
      })),
    );
  }, [employeesData, selectedEmployeeIds]);

  const generateColors = () => {
    const r = Math.floor(Math.random() * 56) + 200;
    const g = Math.floor(Math.random() * 56) + 200;
    const b = Math.floor(Math.random() * 56) + 200;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleCheckEmployee = (
    selectedEmployeeIds: { id: number; color?: string | undefined }[],
  ) => {
    setSelectedEmployeeIds(selectedEmployeeIds);
  };

  return (
    <div className={classes["schedule"]}>
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
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locale="ru"
              events={eventData}
              eventColor="#3788d8"
              eventContent={renderEventContent}
              eventTimeFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: "narrow",
              }}
            />
          </div>
        </div>
        <div className={classes["schedule__content__filter"]}>
          <div className={classes["schedule__content__filter__header"]}>
            <h1>Сотрудники</h1>
            <hr />
          </div>
          <div className={classes["schedule__content__filter__content"]}>
            <TextField
              variant="outlined"
              placeholder="Введите текст для поиска..."
              type="text"
              className={classes["schedule__content__filter__content__field"]}
            ></TextField>
            <div
              className={classes["schedule__content__filter__content__items"]}
            >
              <RoleEmployeeCheckbox
                onEmployeeSelectionChange={handleCheckEmployee}
                generateColors={generateColors}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSchedule;
