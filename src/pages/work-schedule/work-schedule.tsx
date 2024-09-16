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
import AddPeriod from "@/modals/schedule/add-period.modal";
import NiceModal from "@ebay/nice-modal-react";
import interactionPlugin from "@fullcalendar/interaction";
import DaySettingsModal from "@/modals/schedule/day-settings.modal";
import EmployeSettingsModal from "@/modals/schedule/employee-settings.modal";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const WorkSchedule = () => {
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<
    { id: number; color?: string }[]
  >([]);
  const { id } = useParams<{ id: string }>();

  const employeeQueries = useQueries({
    queries: selectedEmployeeIds.map((user) => {
      return {
        queryKey: ["scheduleEmployees", user.id],
        queryFn: () => getEmployeeScheduleEachDay(user.id),
        refetchOnMount: true,
        enabled: selectedEmployeeIds.length > 0,
        staleTime: 1000 * 60 * 5,
      };
    }),
  });

  const employeesData = useMemo(() => {
    const data = employeeQueries
      .filter((query) => query.isSuccess)
      .map((query) => query.data as IResponseScheduleData[]);
    return data;
  }, [employeeQueries]);

  const handleOpenAddPeriod = () => {
    NiceModal.show(AddPeriod);
  };

  const scheduleDayClick = (date: any) => {
    NiceModal.show(DaySettingsModal, {
      TodayData: dayjs(date.start).format("DD-MM-YYYY"),
    });
  };

  const eventClick = (event: any) => {
    NiceModal.show(EmployeSettingsModal, {
      user_id: event.event.extendedProps.user_id,
      date: event.event.start,
      endDate: event.event.extendedProps.end_time,
    });
  };

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
          height: "100%",
          textWrap: "wrap",
        }}
      >
        <p className={classes.eventText}>
          {eventInfo.timeText} {eventInfo.event.title}
        </p>
      </div>
    );
  };

  const eventData = () => {
    const events = employeesData.flatMap((employeeArray) =>
      employeeArray.map((employee) => ({
        title: `${employee.employee.first_name} ${employee.employee.last_name}`,
        date: employee.date,
        backgroundColor:
          selectedEmployeeIds.find((emp) => emp.id === employee.employee.id)
            ?.color || generateColors(),
        textColor: "black",
        start: employee.start_time,
        extendedProps: {
          user_id: employee.employee.id,
          end_time: employee.end_time,
        },
      }))
    );
    return events;
  };

  const generateColors = () => {
    const r = Math.floor(Math.random() * 56) + 200;
    const g = Math.floor(Math.random() * 56) + 200;
    const b = Math.floor(Math.random() * 56) + 200;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleCheckEmployee = (
    selectedEmployeeIds: { id: number; color?: string | undefined }[]
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
              <Button onClick={handleOpenAddPeriod}>
                <AddIcon /> Добавить период
              </Button>
            </div>
            <hr />
          </div>
          <div className={classes["schedule__content__calendar__dates"]}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale="ru"
              events={eventData()}
              eventColor="#3788d8"
              eventContent={renderEventContent}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: false,
              }}
              timeZone="UTC +6"
              selectable={true}
              select={scheduleDayClick}
              eventClick={(event) => eventClick(event)}
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
                id={id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSchedule;
