import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";
import { Autocomplete, Divider, TextField } from "@mui/material";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomTimePicker from "@/components/time-picker/time-picker-custom";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";
import RoleEmployeeCheckbox from "@/components/role-employee-checkbox/role-employee-checkbox";

const NotificationPage = () => {
  return (
    <div className={classes.notification}>
      <div className={classes.notification__header}>
        <BreadcrumbsCustom></BreadcrumbsCustom>
        <h1>Расширенный поиск</h1>
      </div>
      <div className={classes.notification__main}>
        <div className={classes.notification__main__content}>
          <div className={classes.notification__main__content__header}>
            <h2>Основная информация</h2>
            <Divider />
          </div>
          <div className={classes.notification__main__content__body}>
            <div className={classes.notification__main__content__body__item}>
              <p>Дата</p>
              <div
                className={
                  classes.notification__main__content__body__item__datePicker
                }
              >
                <CustomDatePicker style={{ width: "100%" }} />
                <span>-</span>
                <CustomDatePicker style={{ width: "100%" }} />
              </div>
            </div>
            <div className={classes.notification__main__content__body__item}>
              <p>Время</p>
              <div
                className={
                  classes.notification__main__content__body__item__datePicker
                }
              >
                <CustomTimePicker
                  size="small"
                  onChange={(value) => console.log(value)}
                />
                <span>-</span>
                <CustomTimePicker
                  size="small"
                  onChange={(value) => console.log(value)}
                />
              </div>
            </div>
            <div className={classes.notification__main__content__body__item}>
              <p>Статус</p>
              <Autocomplete
                sx={{
                  width: "320px",
                  "& .MuiInputBase-root": {
                    fontSize: "14px",
                  },
                }}
                size="small"
                options={["Посещение", "Звонок", "СМС", "E-mail"]}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      fontSize: "14px",
                      "& .MuiInputBase-root": {
                        fontSize: "14px",
                      },
                    }}
                    placeholder="Любой"
                    {...params}
                  />
                )}
              />
            </div>
            <div className={classes.notification__main__content__body__item}>
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  gap: "2rem",
                  justifyContent: "start",
                }}
              >
                <p>Тип</p>
                <div>
                  <div
                    className={
                      classes.notification__main__content__body__item__methods
                    }
                  >
                    <input type="checkbox" value="cash" />
                    <span className={classes["checkLabel"]}>
                      Оплата наличными
                    </span>
                  </div>
                  <div
                    className={
                      classes.notification__main__content__body__item__methods
                    }
                  >
                    <input type="checkbox" value="card" />
                    <span className={classes["checkLabel"]}>
                      Оплата по карте
                    </span>
                  </div>
                  <div
                    className={
                      classes.notification__main__content__body__item__methods
                    }
                  >
                    <input type="checkbox" value="check" />
                    <span className={classes["checkLabel"]}>Оплата чеками</span>
                  </div>
                  <div
                    className={
                      classes.notification__main__content__body__item__methods
                    }
                  >
                    <input type="checkbox" value="checking_account" />
                    <span className={classes["checkLabel"]}>
                      С расчетного счета
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.notification__main__content}>
          <div className={classes.notification__main__content__header}>
            <h2>Сотрудники</h2>
            <Divider />
          </div>
          <div className={classes.notification__main__content__body}>
            <TextField
              sx={{
                width: "100%",
                marginBottom: "1rem",
                "& .MuiInputBase-root": {
                  fontSize: "14px",
                },
              }}
              size="small"
              placeholder="Поиск"
            />
            <RoleEmployeeCheckbox
              onEmployeeSelectionChange={(
                selectedEmployeeIds: { id: number; color?: string }[],
              ) => {
                console.log(selectedEmployeeIds);
              }}
            />
          </div>
        </div>
        <div className={classes.notification__main__content}>
          <div className={classes.notification__main__content__header}>
            <h2>Информация</h2>
            <Divider />
          </div>
          <div className={classes.notification__main__content__body}>
            <p className={classes.notification__main__content__body__box}>
              В данном разделе вы можете найти, посмотреть, отредактировать либо
              создать новое напоминание для сотрудников. <br /> Если в блоке
              "Сотрудники" отмечен администратор, поиск будет происходить по
              автору напоминания, в противном случае - по напоминаниям с типом
              "Посещение" по мастеру.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
