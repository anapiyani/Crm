import { useEffect, useRef, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import toast from "react-hot-toast";

import {
  Autocomplete,
  Divider,
  TextField,
  Avatar,
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
import { CreateAppointmentModal, EventDetailsModal } from "@/modals";

import classNames from "classnames";

import { calendarStatuses } from "./data";

import ArrowRightHideIcon from "@/assets/icons/arrow-right-hide.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import PanToolAltIcon from "@/assets/icons/pan_tool_alt.svg";

import classes from "./styles.module.scss";
import "./custom.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getScheduleByDate,
  getSchedules,
} from "@/service/schedule/schedule.service";
import { transformSchedulesToFullCalendar } from "@/utils/transform-data";

const Home = () => {
  const queryClient = useQueryClient();
  const [isHide, setIsHide] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const calendarRef = useRef<FullCalendar | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(
    null
  );
  const [events, setEvents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  const { data: schedulesData, isPending: scheduesDataPending } = useQuery({
    queryKey: ["schedules", selectedDate?.format("YYYY-MM-DD")],
    queryFn: () => getScheduleByDate(dayjs(selectedDate).format("YYYY-MM-DD")),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
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

  if (scheduesDataPending) {
    return (
      <div className="">
        <CircularProgress />
      </div>
    );
  }

  const handleResourceClick = (
    resourceId: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    setSelectedResourceId(resourceId);
    setAnchorEl(event.currentTarget);
  };

  const handleEventClick = (clickInfo: any) => {
    NiceModal.show(EventDetailsModal);
  };

  const handleCloseDropdownMenu = () => {
    setAnchorEl(null);
    setSelectedResourceId(null);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    console.log("calendar ref", calendarRef.current);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date!.toDate());

      queryClient.invalidateQueries({
        queryKey: ["schedules", selectedDate?.format("YYYY-MM-DD")],
      });
    }
  };

  const handlePanelHide = () => {
    setIsHide(!isHide);
  };

  const renderResource = (arg: ResourceApi) => (
    <div
      className={classes["fullcalendar__user"]}
      onClick={(e) => {
        handleResourceClick(arg.id, e);
      }}
    >
      <Avatar>
        {arg.title
          .split(" ")
          .map((word) => word[0])
          .join("")}
      </Avatar>
      <h5 className={classes["fullcalendar__user--name"]}>{arg.title}</h5>
      <div
        className={classNames(
          classes["fullcalendar__user--profession"],
          classes["fullcalendar__user--time"]
        )}
      >
        <img src={PanToolAltIcon} alt="pan-tool" />
        <p>{arg._resource.extendedProps.role}</p>
      </div>
      <p className={classes["fullcalendar__user--time"]}>08:00 - 22:00</p>
    </div>
  );

  const getStatus = () => {
    const statuses = [
      "scheduled",
      "completed",
      "underway",
      "late",
      "no_show",
      "unconfirmed",
    ];
    return statuses[2];
  };

  const handleCalendarDateSelect = (selectInfo: any) => {
    const start = dayjs(selectInfo.start).format("YYYY-MM-DD HH:mm:ss");
    const end = dayjs(selectInfo.end).format("YYYY-MM-DD HH:mm:ss");
    console.log(selectInfo);
    NiceModal.show(CreateAppointmentModal, { start, end });
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
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "resourceTimeGridDay",
              }}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: false,
              }}
              eventContent={(eventInfo) => {
                return (
                  <div
                    className={classNames(
                      classes["fullcalendar__event"],
                      classes[
                        `fullcalendar__event--${eventInfo.event.extendedProps.status}`
                      ]
                    )}
                  >
                    <div
                      className={classNames(
                        classes["fullcalendar__event--header"],
                        classes[
                          `fullcalendar__event--${eventInfo.event.extendedProps.status}--header`
                        ]
                      )}
                    >
                      {eventInfo.timeText}
                    </div>
                    <div className={classes["fullcalendar__event--body"]}>
                      <p>{eventInfo.event.title}</p>
                    </div>
                  </div>
                );
              }}
              eventClick={handleEventClick}
              resources={resources}
              resourceLabelContent={(arg) =>
                renderResource(arg.resource as ResourceApi)
              }
              events={events}
            />
            <ResourceDropdownMenu
              anchorEl={anchorEl}
              onClose={handleCloseDropdownMenu}
              resourceId={selectedResourceId || ""}
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
                    <img src={ArrowLeftIcon} alt="arrow-left" />
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
                      <img src={ArrowRightHideIcon} alt="arrow-right-hide" />
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
