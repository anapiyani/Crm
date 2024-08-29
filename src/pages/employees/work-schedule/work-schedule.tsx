import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import AddIcon from "@mui/icons-material/Add";
import { Button, TextField } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import classes from "./styles.module.scss";

const WorkSchedule = () => {
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
              events={[
                {
                  title: "Event 1",
                  date: "2024-08-28",
                },

                {
                  title: "Event 2",
                  date: "2024-08-29",
                },
              ]}
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
            {/* // hier will filter schebe */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSchedule;
