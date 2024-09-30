import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import classes from "./styles.module.scss";
import {
  Autocomplete,
  Button,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomTimePicker from "@/components/time-picker/time-picker-custom";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";
import RoleEmployeeCheckbox from "@/components/role-employee-checkbox/role-employee-checkbox";
import { Link } from "react-router-dom";
import { Chat } from "@mui/icons-material";

interface IOption {
  label: string;
  value: number;
}

const NotificationPage = () => {
  const pageSizeOptions: IOption[] = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

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
        <div className={classes.notification__main__content}>
          <div className={classes.notification__main__content__client}>
            <p>Клиент</p>
            <TextField
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  fontSize: "14px",
                },
              }}
              size="small"
              placeholder="Имя / ID / телефон / карта"
            />
          </div>
        </div>
      </div>
      <div className={classes.notification__main}>
        <div className={classes.notification__main__search}>
          <Button variant="outlined">Сбросить</Button>
          <Button variant="contained">Поиск</Button>
          <Button variant="contained">Создать напоминание</Button>
        </div>
      </div>
      <div className={classes.notification__main__tables}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ФИО</TableCell>
              <TableCell>Контакты</TableCell>
              <TableCell>Возрасть</TableCell>
              <TableCell>Дата рождения</TableCell>
              <TableCell>Должность</TableCell>
              <TableCell>Действ.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>
                <Link to={`/notifications/`} className={classes.name_link}>
                  Алимя Алимов
                </Link>
              </TableCell>
              <TableCell>
                +7 (700) 323 32 12 <br />
                aigulmarieva1@gmail.com
              </TableCell>
              <TableCell>
                <p>50</p>
              </TableCell>
              <TableCell>
                <p>24.08.1978</p>
              </TableCell>
              <TableCell>Тех. персонал</TableCell>
              <TableCell>
                <Link to={"/"}>
                  <Chat />
                </Link>{" "}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.notification__main__tables__container}>
          <div className={classes.notification__main__tables__container__row}>
            <p className={classes.notification__main__tables__container__label}>
              Показано 10 из 99 записей
            </p>
            <div>
              <div className={classes.tableSettings}>
                Показывать
                <select name="pageSize" id="pageSize">
                  {pageSizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                записей
              </div>
            </div>
            <Pagination
              count={10}
              page={1}
              variant="outlined"
              shape="rounded"
              boundaryCount={1}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
