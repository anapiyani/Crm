import { useState } from "react";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classNames from "classnames";
import { Autocomplete, Divider, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";


import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "moment/locale/ru";
import "react-big-calendar/lib/css/react-big-calendar.css";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import ArrowRightHideIcon from "@/assets/icons/arrow-right-hide.svg";
import "./custom.css";

const Home = () => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handlePanelHide = () => {
    setIsHide(!isHide);
  };

  return (
    <div className={classes["home"]}>
      <div className={classes["home__top"]}>
        <BreadcrumbsCustom />
        <h1 className={classes["home__top__header"]}>Рабочий стол</h1>
      </div>

      <div className={classes["home__main"]}>
        <div className={classes["home__main__calendar"]}>
          <FullCalendar
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
            resources={[
              { id: "a", title: "Room A" },
              { id: "b", title: "Room B" },
              { id: "c", title: "Room C" },
            ]}
            events={[
              {
                id: "1",
                resourceId: "a",
                title: "event 1",
                start: "2024-07-10T14:00:00",
                end: "2024-07-10T18:00:00",
              },
              {
                id: "2",
                resourceId: "b",
                title: "event 2",
                start: "2024-07-10T14:00:00",
                end: "2024-07-10T18:00:00",
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
                  classes["u-text-blue"]
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
                    classes["u-text-blue"]
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
                  <h2>Сотрудники</h2>
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
                        ".MuiDateCalendar-root": {
                          fontSize: "1.5rem",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>

                {/* news */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
