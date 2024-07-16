import { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Divider,
  TextField,
  Avatar,
  Button,
} from "@mui/material";
import InputMask from "react-input-mask";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { ResourceApi } from "@fullcalendar/resource/index.js";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs, { Dayjs } from "dayjs";

import { Cached, Search, AddCircle, Help } from "@mui/icons-material";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomTextField from "@/components/textField/textField.component";

import classNames from "classnames";

import { calendarStatuses } from "./data";

import ArrowRightHideIcon from "@/assets/icons/arrow-right-hide.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import PanToolAltIcon from "@/assets/icons/pan_tool_alt.svg";
import classes from "./styles.module.scss";
import "./custom.css";

const Home = () => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const calendarRef = useRef<FullCalendar | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (calendarRef.current && date) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date.toDate());
    }
  };

  const handlePanelHide = () => {
    setIsHide(!isHide);
  };

  const renderResource = (arg: ResourceApi) => (
    <div className={classes["fullcalendar__user"]}>
      <Avatar>H</Avatar>
      <h5 className={classes["fullcalendar__user--name"]}>{arg.title}</h5>
      <div
        className={classNames(
          classes["fullcalendar__user--profession"],
          classes["fullcalendar__user--time"]
        )}
      >
        <img src={PanToolAltIcon} alt="pan-tool" />
        <p>профессия</p>
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

  return (
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
                    classes[`fullcalendar__event--${getStatus()}`]
                  )}
                >
                  <div
                    className={classNames(
                      classes["fullcalendar__event--header"],
                      classes[`fullcalendar__event--${getStatus()}--header`]
                    )}
                  >
                    {eventInfo.timeText}
                  </div>
                  <div className={classes["fullcalendar__event--body"]}>
                    <p>{eventInfo.event.title}</p>
                    <p>location</p>
                  </div>
                </div>
              );
            }}
            resources={[
              { id: "a", title: "Nurik" },
              { id: "b", title: "Django" },
              { id: "c", title: "Yesset" },
              { id: "d", title: "Yesset" },
              { id: "e", title: "Yesset" },
              { id: "f", title: "Yesset" },
              { id: "g", title: "Yesset" },
              { id: "h", title: "Yesset" },
              { id: "i", title: "Yesset" },
            ]}
            resourceLabelContent={(arg) =>
              renderResource(arg.resource as ResourceApi)
            }
            events={[
              {
                id: "1",
                resourceId: "a",
                title: "event 1",
                start: "2024-07-12T14:00:00",
                end: "2024-07-12T18:00:00",
              },
              {
                id: "2",
                resourceId: "b",
                title: "event 2",
                start: "2024-07-12T14:00:00",
                end: "2024-07-12T18:00:00",
              },
              {
                id: "3",
                resourceId: "c",
                title: "event 3",
                start: "2024-07-10T14:00:00",
                end: "2024-07-10T18:00:00",
              },
            ]}
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
                <div className={classes["home__main__panel__icon--container"]}>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                  </LocalizationProvider>
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
                    <span className={classes["prediction__date-picker--dash"]}>
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
                      sx={{ height: "4rem", minWidth: "8.5rem", width: "8rem" }}
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
  );
};

export default Home;
