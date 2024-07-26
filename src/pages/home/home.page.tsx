import { useCallback, useEffect, useRef, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import toast from "react-hot-toast";

import {
  Autocomplete,
  Divider,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import InputMask from "react-input-mask";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Cached, Search, AddCircle, Help } from "@mui/icons-material";

import { ResourceApi } from "@fullcalendar/resource/index.js";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs, { Dayjs } from "dayjs";

import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomTextField from "@/components/textField/textField.component";
import ResourceDropdownMenu from "./_components/resource-dropdown-menu";
import {
  CreateAppointmentModal,
  DeleteBreakModal,
  EventDetailsModal,
} from "@/modals";
import Icons from "@/assets/icons/icons";

import classNames from "classnames";

import { calendarStatuses } from "./data";

import classes from "./styles.module.scss";
import "./custom.css";
import { useQuery } from "@tanstack/react-query";
import { getScheduleByDate } from "@/service/schedule/schedule.service";
import { transformSchedulesToFullCalendar } from "@/utils/transform-data";
import EventContent from "./_components/event-content";
import { DateSelectArg, DatesSetArg, EventClickArg } from "@fullcalendar/core";
import ResourceCard from "./_components/resource-card";

const Home = () => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const calendarRef = useRef<FullCalendar | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(
    null
  );
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  const { data: schedulesData, isPending: scheduesDataPending } = useQuery({
    queryKey: ["schedules", selectedDate?.format("YYYY-MM-DD")],
    queryFn: () => getScheduleByDate(dayjs(selectedDate).format("YYYY-MM-DD")),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (schedulesData) {
      const { events, resources } =
        transformSchedulesToFullCalendar(schedulesData);
      setEvents(events);
      setResources(resources);
    }
  }, [schedulesData]);

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
    event: React.MouseEvent<HTMLElement>
  ) => {
    setSelectedResourceId(resourceId);
    setSelectedTitle(resourceTitle);
    setAnchorEl(event.currentTarget);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (clickInfo.event.extendedProps.type === "break") {
      NiceModal.show(DeleteBreakModal, { breakId: Number(clickInfo.event.id) });
    } else {
      NiceModal.show(EventDetailsModal);
    }
  };

  const handleDatesSet = (arg: DatesSetArg) => {
    const calendarApi = calendarRef.current?.getApi();
    const currentDate = calendarApi?.getDate();
    setSelectedDate(dayjs(currentDate));
  };

  const handleCloseDropdownMenu = () => {
    setAnchorEl(null);
    setSelectedResourceId(null);
  };

  const handlePanelHide = () => {
    setIsHide(!isHide);
  };

  const handleCalendarDateSelect = (selectInfo: DateSelectArg) => {
    const start = dayjs(selectInfo.start).format("YYYY-MM-DD HH:mm:ss");
    const end = dayjs(selectInfo.end).format("YYYY-MM-DD HH:mm:ss");
    const resourceId = selectInfo.resource?._resource.id;
    console.log(resourceId);
    console.log(selectInfo);
    NiceModal.show(CreateAppointmentModal, {
      start,
      end,
      employee: resourceId,
    });
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
              plugins={[resourceTimeGridPlugin, interactionPlugin]}
              initialView="resourceTimeGridDay"
              locale="ru"
              slotMinTime={"07:00:00"}
              editable={true}
              selectable={true}
              selectMirror={true}
              droppable={true}
              select={handleCalendarDateSelect}
              datesSet={handleDatesSet}
              eventAllow={(_, draggedEvent) =>
                draggedEvent?.extendedProps.type !== "break"
              }
              customButtons={{
                shiftReport: {
                  text: "Отчет смены",
                  click: function () {
                    toast.success("Отчет смены");
                  },
                },
                weekButton: {
                  text: "Неделя",
                  click: function () {
                    toast.success("Неделя");
                  },
                },
                menuButton: {
                  text: "Меню",
                  click: function () {
                    toast.success("Menu");
                  },
                },
                settingsButton: {
                  text: "Настройки",
                  click: function () {},
                },
              }}
              headerToolbar={{
                left: "prev next today shiftReport",
                center: "title",
                right: "weekButton menuButton settingsButton",
              }}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: false,
              }}
              eventContent={(eventInfo) => (
                <EventContent eventInfo={eventInfo} />
              )}
              eventClick={handleEventClick}
              resources={resources}
              resourceLabelContent={(arg) => (
                <ResourceCard
                  arg={arg.resource as ResourceApi}
                  handleResourceClick={handleResourceClick}
                />
              )}
              events={events}
            />
            <ResourceDropdownMenu
              anchorEl={anchorEl}
              onClose={handleCloseDropdownMenu}
              resourceId={selectedResourceId || ""}
              username={selectedTitle || ""}
            />
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
                    classes["u-cursor-pointer"]
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
                      classes["u-cursor-pointer"]
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
                        height: "4rem",
                        marginTop: "1rem",
                      }}
                      disablePortal
                      options={[
                        { label: "The Godfather", id: 1 },
                        { label: "Pulp Fiction", id: 2 },
                      ]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Поиск"
                          variant="outlined"
                        />
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
                      <CustomDatePicker />
                      <span
                        className={classes["prediction__date-picker--dash"]}
                      >
                        -
                      </span>
                      <CustomDatePicker />
                      <Button
                        variant="contained"
                        sx={{
                          height: "4rem",
                          borderRadius: "8px",
                        }}
                      >
                        <Cached />
                      </Button>
                    </div>
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
