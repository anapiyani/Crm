import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import NiceModal from "@ebay/nice-modal-react";
import toast from "react-hot-toast";
import {
  Autocomplete,
  Divider,
  TextField,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import InputMask from "react-input-mask";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { Cached, Search, AddCircle, Help } from "@mui/icons-material";

import { ResourceApi } from "@fullcalendar/resource/index.js";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import { DateSelectArg, DatesSetArg, EventClickArg } from "@fullcalendar/core";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomTextField from "@/components/textField/textField.component";
import ResourceDropdownMenu from "./_components/resource-dropdown-menu";
import {
  CreateAppointmentModal,
  DeleteBreakModal,
  EventDetailsModal,
  ShiftReportModal,
  AddEmployeeScheduleModal,
  ExportAppointmentsModal,
  ShowDeletedAppointmentsModal,
  ChangeEmployeeModal,
} from "@/modals";

import Icons from "@/assets/icons/icons";
import classNames from "classnames";
import { appoinmentStatuses, calendarStatuses } from "./data";

import classes from "./styles.module.scss";
import "./custom.css";
import { useQuery } from "@tanstack/react-query";
import {
  getEmployeeMonthlySchedule,
  getEmployeeScheduleDates,
  getEmployeeWeeklySchedule,
  getScheduleByDate,
  updateAppointment,
} from "@/service/schedule/schedule.service";
import {
  transformMonthlySchedulesToFullCalendar,
  transformSchedulesToFullCalendar,
} from "@/utils/transform-data";
import EventContent from "./_components/event-content";
import ResourceCard from "./_components/resource-card";
import { getHierarchyEmployeesByDepartment } from "@/service/hierarchy/hierarchy.service";
import { processEmployeeOptions } from "@/utils/process-employees-departments";
import ClientspredictItem from "./_components/clients-predict";
import { getForecastInfo } from "@/service/kassa/kassa.service";
import { IAppointment } from "@/ts/schedule.interface";
import { start } from "repl";

const menuItems = [
  {
    label: "Добавить соотрудника в график",
    modal: AddEmployeeScheduleModal,
  },
  {
    label: "Изменить порядок отображения соотрудников",
    modal: ChangeEmployeeModal,
  },
  {
    label: "Скачать журнал записей",
    modal: ExportAppointmentsModal,
  },
  {
    label: "Посмотреть удаленные записи",
    modal: ShowDeletedAppointmentsModal,
  },
];

const Home: React.FC = () => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const calendarRef = useRef<FullCalendar | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [burgerMenuAnchorEl, setBurgerMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(
    null,
  );
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>("");
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "monthly">(
    "daily",
  );

  // prediction dates
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const [hiden, setHiden] = useState<boolean>(false);

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(e.target.value);
  };

  const onSavePrediction = () => {
    refetchPredictionData();
    setHiden(true);
  };

  const hidePrediction = () => {
    setHiden(false);
    setFromDate(null);
    setToDate(null);
  };

  const {
    data: predictionData,
    isPending: predictionPending,
    refetch: refetchPredictionData,
  } = useQuery({
    queryKey: ["predictionData", onSavePrediction],
    queryFn: () =>
      getForecastInfo({ date_from: fromDate || "", date_to: toDate || "" }),
    enabled: !!fromDate && !!toDate,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: schedulesData,
    isPending: scheduesDataPending,
    refetch: refetchScheduleByDate,
  } = useQuery({
    queryKey: ["schedules", selectedDate?.format("YYYY-MM-DD")],
    queryFn: () => getScheduleByDate(dayjs(selectedDate).format("YYYY-MM-DD")),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const useEmployees = () => {
    return useQuery({
      queryKey: ["employeeDepartmentHierarchyData"],
      queryFn: () => getHierarchyEmployeesByDepartment(),
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  };

  dayjs.extend(timezone);
  dayjs.extend(utc);
  const handleOpenSchedule = (id: number) => {
    setSelectedEmployee(id);
  };

  const { data: employeeDepartmentHierarchyData, isLoading } = useEmployees();

  const employeeOptions = useMemo(() => {
    return employeeDepartmentHierarchyData
      ? processEmployeeOptions(employeeDepartmentHierarchyData, true)
      : [];
  }, [employeeDepartmentHierarchyData]);

  const { data: getEmployeeScheduleData } = useQuery({
    queryKey: ["employeeScheduleData", selectedEmployee],
    queryFn: () => getEmployeeScheduleDates(selectedEmployee || 0),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: getEmployeeMonthlyScheduleData,
    refetch: refetchEmployeeMonthlySchedule,
  } = useQuery({
    queryKey: [
      "employeeMonthlyScheduleData",
      selectedEmployee,
      selectedDate?.format("YYYY-MM"),
    ],
    queryFn: () => getEmployeeMonthlySchedule(selectedEmployee || 0),
    enabled: viewMode === "monthly",
    staleTime: 1000 * 60 * 5,
  });

  const { data: getEmployeeWeeklyScheduleData } = useQuery({
    queryKey: ["employeeWeeklyScheduleData", selectedEmployee],
    queryFn: () => getEmployeeWeeklySchedule(selectedEmployee || 0),
    enabled: viewMode === "weekly",
    staleTime: 1000 * 60 * 5,
  });

  const highlightedDays =
    getEmployeeScheduleData?.map((item) => item.date) || [];

  useEffect(() => {
    if (schedulesData) {
      const { events, resources } =
        transformSchedulesToFullCalendar(schedulesData);
      setEvents(events);
      setResources(resources);
    }
  }, [schedulesData]);

  useEffect(() => {
    if (viewMode === "monthly" && selectedEmployee) {
      refetchEmployeeMonthlySchedule();
    }
  }, [
    selectedDate,
    selectedEmployee,
    viewMode,
    refetchEmployeeMonthlySchedule,
  ]);

  useEffect(() => {
    if (getEmployeeMonthlyScheduleData && selectedDate) {
      const { events, resources } = transformMonthlySchedulesToFullCalendar(
        getEmployeeMonthlyScheduleData.results,
        selectedDate,
      );
      setEvents(events);
      setResources(resources);
    }
  }, [getEmployeeMonthlyScheduleData, selectedDate]);

  const handleDateChange = useCallback((date: Dayjs | null) => {
    setSelectedDate(date);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date!.toDate());
    }
  }, []);

  const handleResourceClick = (
    resourceId: string,
    resourceTitle: string,
    event: React.MouseEvent<HTMLElement>,
  ) => {
    const [resourceEmployeeId, resourceDate] = resourceId.split("-");
    setSelectedResourceId(resourceEmployeeId);
    setSelectedTitle(resourceTitle);
    setAnchorEl(event.currentTarget);
  };

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (clickInfo.event.extendedProps.type === "break") {
      NiceModal.show(DeleteBreakModal, { breakId: Number(clickInfo.event.id) });
    } else {
      NiceModal.show(EventDetailsModal, {
        appointmentId: Number(clickInfo.event.id),
      });
    }
  }, []);

  const handleDatesSet = (arg: DatesSetArg) => {
    const calendarApi = calendarRef.current?.getApi();
    const currentDate = calendarApi?.getDate();
    setSelectedDate(dayjs(currentDate));
  };

  const handleCloseDropdownMenu = () => {
    setAnchorEl(null);
  };

  const handlePanelHide = () => {
    setIsHide(!isHide);
  };

  const handleCalendarDateSelect = (selectInfo: DateSelectArg) => {
    const [resourceEmployeeId, resourceDate] = (
      selectInfo.resource?._resource.id ?? ""
    ).split("-");
    const start = dayjs(selectInfo.start).format("YYYY-MM-DD HH:mm:ss");
    const end = dayjs(selectInfo.end).format("YYYY-MM-DD HH:mm:ss");
    NiceModal.show(CreateAppointmentModal, {
      start,
      end,
      employee: resourceEmployeeId,
    });
  };

  const handleBurgerMenuClick = (event: MouseEvent) => {
    setBurgerMenuAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleCloseBurgerMenu = () => {
    setBurgerMenuAnchorEl(null);
  };

  // Показать запись на неделю
  const handleShowWeeklySchedule = (employeeId: number) => {
    setSelectedEmployee(employeeId);
    setViewMode("weekly");

    const startOfWeek = dayjs(selectedDate).startOf("week");
    const endOfWeek = dayjs(selectedDate).endOf("week");
    const daysInWeek = endOfWeek.diff(startOfWeek, "days") + 1;

    const newResources = [];
    for (let i = 0; i < daysInWeek; i++) {
      const date = startOfWeek.add(i, "day").format("YYYY-MM-DD");
      newResources.push({
        id: `${employeeId}-${date}`,
        title: selectedEmployeeName,
        eventColor: "gray",
        extendedProps: {
          role: "employee",
          resourceId: employeeId,
          date: date,
        },
      });
    }

    setResources(newResources);
  };

  const handleShowMonthlySchedule = (
    employeeId: number,
    employeeName: string,
  ) => {
    setSelectedEmployee(employeeId);
    setViewMode("monthly");
  };

  function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: string[] },
  ) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected = highlightedDays.includes(day.format("YYYY-MM-DD"));

    return (
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{
          backgroundColor: isSelected ? "#A5D6A7" : undefined,
          color: isSelected ? "black" : undefined,
          "&:hover": {
            backgroundColor: isSelected ? "darkgreen" : undefined,
          },
        }}
      />
    );
  }

  const handleBackToDailyView = async () => {
    setSelectedEmployee(undefined);
    setViewMode("daily");
    setResources([]);
    setEvents([]);

    const newResponse = await refetchScheduleByDate();
    if (newResponse.data) {
      const { events, resources } = transformSchedulesToFullCalendar(
        newResponse.data,
      );
      setEvents(events);
      setResources(resources);
    }

    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView("resourceTimeGridDay");
      calendarApi.refetchResources();
    }
  };
  const handleResize = (eventResizeInfo: any) => {
    const eventId = eventResizeInfo.event._def.publicId;
    const start = dayjs(eventResizeInfo.event._instance.range.start)
      .utcOffset(0)
      .format("HH:mm");
    const end = dayjs(eventResizeInfo.event._instance.range.end)
      .utcOffset(0)
      .format("HH:mm");

    const date = dayjs(eventResizeInfo.event._instance.range.start).format(
      "YYYY-MM-DD",
    );

    let data = {
      dates: [date],
      start_times: [start],
      end_times: [end],
    };
    updateAppointment(eventId, data);
  };

  const handleDropElement = (eventDragged: any) => {
    const start = dayjs(eventDragged.event._instance.range.start)
      .utcOffset(0)
      .format("HH:mm");
    const end = dayjs(eventDragged.event._instance.range.end)
      .utcOffset(0)
      .format("HH:mm");

    let data = {
      dates: [
        dayjs(eventDragged.event._instance.range.start).format("YYYY-MM-DD"),
      ],
      start_times: [start],
      end_times: [end],
    };

    updateAppointment(eventDragged.event._def.publicId, data);
  };

  const handleMenuItemClick = (
    modal: any,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
  ) => {
    NiceModal.show(modal);
    setAnchorEl(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={classes["home"]}>
        <div className={classes["home__top"]}>
          <BreadcrumbsCustom />
          <h1 className={classes["home__top__header"]}>Рабочий стол</h1>
        </div>

        <div className={classes["home__main"]}>
          <div className={classes["home__main__calendar"]} ref={containerRef}>
            <FullCalendar
              ref={calendarRef}
              allDaySlot={false}
              nowIndicator={true}
              plugins={[
                resourceTimeGridPlugin,
                interactionPlugin,
                scrollGridPlugin,
              ]}
              initialView="resourceTimeGridDay"
              locale="ru"
              slotMinTime={"07:00:00"}
              editable={true}
              selectable={true}
              selectMirror={true}
              droppable={true}
              eventResizableFromStart={true}
              eventResize={(eventResizeInfo) => {
                handleResize(eventResizeInfo);
              }}
              select={handleCalendarDateSelect}
              datesSet={handleDatesSet}
              eventAllow={(_, draggedEvent) =>
                draggedEvent?.extendedProps.type !== "break"
              }
              eventDrop={(eventDragged) => {
                handleDropElement(eventDragged);
              }}
              customButtons={{
                shiftReport: {
                  text: "Отчет смены",
                  click: () => {
                    NiceModal.show(ShiftReportModal);
                  },
                },
                weekButton: {
                  text: "Неделя",
                  click: function () {
                    setViewMode("weekly");
                    handleShowWeeklySchedule(selectedEmployee!);
                    toast.success("Неделя");
                  },
                },

                burgetMenuButton: {
                  text: "Меню",
                  click: handleBurgerMenuClick,
                },
                settingsButton: {
                  text: "Настройки",
                  click: function () {},
                },
                backToDailyView: {
                  text: "Вернуться к общему журналу",
                  click: handleBackToDailyView,
                },
              }}
              headerToolbar={{
                left: "prev next today shiftReport",
                center: ["weekly", "monthly"].includes(viewMode)
                  ? "backToDailyView"
                  : "title",
                right: "weekButton burgetMenuButton settingsButton",
              }}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: false,
              }}
              selectAllow={(selectInfo) => {
                const [resourceEmployeeId, ...dateParts] = (
                  selectInfo.resource?._resource.id ?? ""
                ).split("-");
                const resourceDate = dateParts.join("-");
                const resource = resources.find(
                  (res) => res.id === `${resourceEmployeeId}-${resourceDate}`,
                );
                return resource?.extendedProps.working || false;
              }}
              dayCellDidMount={(info) => {
                const [resourceEmployeeId, ...dateParts] = (
                  info.resource?._resource.id ?? ""
                ).split("-");
                const resourceDate = dateParts.join("-");
                const resource = resources.find(
                  (res) => res.id === `${resourceEmployeeId}-${resourceDate}`,
                );
                if (resource?.extendedProps.working !== true) {
                  info.el.style.backgroundColor = "#DDE7EE";
                }
              }}
              eventContent={(eventInfo) => (
                <EventContent eventInfo={eventInfo} />
              )}
              eventClick={handleEventClick}
              resources={resources}
              resourceLabelClassNames={classes["user"]}
              resourceLabelContent={(arg) => (
                <ResourceCard
                  arg={arg.resource}
                  handleResourceClick={handleResourceClick}
                  viewMode={viewMode}
                />
              )}
              events={events}
              dayMinWidth={150}
              resourceAreaWidth="150px"
              viewDidMount={() => {
                if (containerRef.current) {
                  containerRef.current.style.overflowX = "scroll";
                }
              }}
            />
            <ResourceDropdownMenu
              anchorEl={anchorEl}
              onClose={handleCloseDropdownMenu}
              resourceId={selectedResourceId || ""}
              username={selectedTitle || ""}
              date={selectedDate?.format("YYYY-MM-DD") || ""}
              handleOpenSchedule={handleOpenSchedule}
              handleMonthSchedule={handleShowMonthlySchedule}
              handleWeekSchedule={handleShowWeeklySchedule}
            />
            <Menu
              anchorEl={burgerMenuAnchorEl}
              open={Boolean(burgerMenuAnchorEl)}
              onClose={handleCloseBurgerMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {menuItems.map(({ label, modal }) => (
                <MenuItem
                  key={label}
                  onClick={() =>
                    handleMenuItemClick(modal, setBurgerMenuAnchorEl)
                  }
                >
                  <div className={classNames(classes["u-font-lg"])}>
                    {label}
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div
            className={
              isHide
                ? classes["home__main__panel--small"]
                : classes["home__main__panel"]
            }
          >
            <div
              className={
                isHide
                  ? classes["home__main__panel__toggle--expanded"]
                  : classes["home__main__panel__toggle"]
              }
            >
              {isHide ? (
                <div
                  onClick={handlePanelHide}
                  className={classNames(
                    classes["u-flex-row"],
                    classes["u-rotate-270"],
                    classes["u-m-md"],
                    classes["u-text-blue"],
                    classes["u-cursor-pointer"],
                  )}
                >
                  <span>Развернуть</span>
                  <div
                    className={classes["home__main__panel__icon--container"]}
                  >
                    <img src={Icons["arrow-left"]} alt="arrow-left" />
                  </div>
                </div>
              ) : (
                <div className={classes["panel"]}>
                  <div
                    className={classNames(
                      classes["u-flex-row"],
                      classes["u-text-blue"],
                      classes["u-cursor-pointer"],
                    )}
                    onClick={handlePanelHide}
                  >
                    <span>Свернуть панель</span>
                    <div>
                      <img
                        src={Icons["arrow-right-hide"]}
                        alt="arrow-right-hide"
                      />
                    </div>
                  </div>

                  {/* sootridniki  */}
                  <div className={classes["panel__employees"]}>
                    <h2 className={classes["u-h2"]}>Сотрудники</h2>
                    <Divider />
                    <Autocomplete
                      sx={{
                        height: "3  rem",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                      options={employeeOptions}
                      getOptionLabel={(option) => option.nodeName}
                      isOptionEqualToValue={(option, value) =>
                        option.nodeId === value.nodeId
                      }
                      value={
                        employeeOptions.find(
                          (option) => option.nodeId === selectedEmployee,
                        ) || null
                      }
                      onChange={(event, value) => {
                        setSelectedEmployee(value?.nodeId);
                        setSelectedEmployeeName(value?.nodeName || "");
                      }}
                      renderOption={(props, option) => (
                        <li
                          {...props}
                          key={option.uniqueKey}
                          style={{
                            pointerEvents:
                              option.nodeType === "department"
                                ? "none"
                                : "auto",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "1.6rem",
                              fontWeight:
                                option.nodeType === "department"
                                  ? "bold"
                                  : "normal",
                              marginLeft:
                                option.nodeType === "department" ? "0" : "1rem",
                            }}
                          >
                            {option.nodeName}
                          </p>
                        </li>
                      )}
                      renderInput={(params) => (
                        <div className={classes["main__lower__auto"]}>
                          <TextField
                            placeholder="Поиск"
                            sx={{
                              height: "40px",
                              "& .MuiInputBase-input": {
                                fontSize: "1.6rem",
                              },
                            }}
                            {...params}
                            className={"main__lower__auto__input"}
                          />
                        </div>
                      )}
                    />
                  </div>

                  {/* calendar */}
                  <div>
                    <DateCalendar
                      value={selectedDate}
                      onChange={handleDateChange}
                      sx={{
                        button: {
                          fontSize: "1.4rem",
                        },
                        span: {
                          fontSize: "1.4rem",
                        },
                        ".MuiPickersArrowSwitcher-root": {
                          gap: "0.4rem",
                        },
                        ".MuiPickersArrowSwitcher-button": {
                          width: "3.5rem",
                          height: "3.5rem",
                          border: "1px solid rgba(0, 0, 0, 0.23)",
                          borderRadius: "5px",
                        },
                        ".MuiPickersCalendarHeader-labelContainer": {
                          fontSize: "1.4rem",
                        },
                      }}
                      slots={{
                        day: ServerDay,
                      }}
                      slotProps={{
                        day: {
                          highlightedDays,
                        } as any,
                      }}
                    />
                    <div className={classes["calendar--status"]}>
                      {calendarStatuses.map((status) => (
                        <div
                          className={classes["calendar--status__item"]}
                          key={status.value}
                        >
                          <div
                            style={{
                              backgroundColor: status.bgColor,
                              height: "1.4rem",
                              width: "1.4rem",
                              border: `3px solid ${status.borderColor}`,
                              borderRadius: "3px",
                            }}
                          ></div>
                          <span>{status.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* news */}
                  <div className={classes["prediction"]}>
                    <h2 className={classes["u-h2"]}>Прогноз выручки</h2>
                    <Divider />
                    <div className={classes["prediction__date-picker"]}>
                      <div
                        className={classes["prediction__date-picker__dates"]}
                      >
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <CustomDatePicker
                            value={fromDate || ""}
                            min={dayjs().format("YYYY-MM-DD")}
                            max={toDate || ""}
                            onChange={handleFromDateChange}
                          />
                        </div>
                        <span
                          className={classes["prediction__date-picker--dash"]}
                        >
                          -
                        </span>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <CustomDatePicker
                            value={toDate || ""}
                            onChange={handleToDateChange}
                            min={fromDate || ""}
                          />
                        </div>
                      </div>
                      <Button
                        variant="contained"
                        sx={{
                          height: "4rem",
                          borderRadius: "4px",
                        }}
                        startIcon={<Cached />}
                        onClick={onSavePrediction}
                      >
                        Расчитать
                      </Button>
                    </div>
                    {hiden && predictionData ? (
                      <div>
                        <p
                          onClick={hidePrediction}
                          className={classes.close_prediction}
                        >
                          Закрыть
                        </p>
                        <div className={classes.predict}>
                          <div className={classes.predict__header}>
                            <p>Итого</p>{" "}
                            <p>{predictionData?.total_revenue} тенге</p>
                          </div>
                          <Divider
                            sx={{ marginTop: "0.5rem", marginBottom: "2rem" }}
                            className={classes.predict__divider}
                          />
                          {predictionData?.daily_revenue.map((item) => (
                            <div>
                              <div className={classes.predict__header}>
                                <p>{item.date}</p>
                                <p>{item.revenue} тенге</p>
                              </div>
                              <Divider
                                sx={{
                                  marginTop: "0.5rem",
                                  marginBottom: "2rem",
                                }}
                                className={classes.predict__divider}
                              />
                              {predictionData?.appointment_details.map(
                                (appointment) =>
                                  appointment.date === item.date ? (
                                    <ClientspredictItem
                                      full_name={appointment.employee}
                                      start_time={appointment.start_time}
                                      end_time={appointment.end_time}
                                      toPay={appointment.revenue}
                                    />
                                  ) : null,
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className={classes["client"]}>
                    <h2 className={classes["u-h2"]}>Клиент</h2>
                    <Divider />
                    <div className={classes["client__id"]}>
                      <CustomTextField
                        label={""}
                        placeholder="Имя / ID / номер карты"
                        size="small"
                        sx={{
                          width: "100%",
                        }}
                      />
                      <Button
                        variant="contained"
                        sx={{
                          height: "4rem",
                          minWidth: "8.5rem",
                          width: "8rem",
                        }}
                      >
                        <Search />
                      </Button>
                    </div>
                    <div className={classes["client__id"]}>
                      <InputMask mask="+7 (999) 999 9999" maskChar=" ">
                        {() => (
                          <CustomTextField
                            label={""}
                            placeholder="Телефон"
                            size="small"
                            sx={{
                              width: "100%",
                            }}
                          />
                        )}
                      </InputMask>
                      <div className={classes["client__id--buttons"]}>
                        <Button
                          variant="outlined"
                          sx={{
                            width: "4rem",
                            minWidth: "4rem",
                            padding: "0",
                            height: "4rem",
                          }}
                        >
                          <Help />
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            width: "4rem",
                            minWidth: "4rem",
                            padding: 0,
                            height: "4rem",
                          }}
                        >
                          <AddCircle />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="outlined"
                      sx={{
                        marginTop: "1rem",
                        width: "100%",
                        height: "4rem",
                        fontWeight: 600,
                        fontSize: "1.4rem",
                      }}
                    >
                      Быстрая продажа
                    </Button>
                  </div>
                  <div className={classes["status--panel"]}>
                    <h2 className={classes["u-h2"]}>Статус записи</h2>
                    <Divider />
                    <div className={classes["appointment--status"]}>
                      {appoinmentStatuses.map((status) => (
                        <div
                          className={classes["appointment--status__item"]}
                          key={status.value}
                        >
                          <div
                            style={{
                              backgroundColor: status.bgColor,
                              height: "1.4rem",
                              width: "1.4rem",
                            }}
                          ></div>
                          <span>{status.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Home;
