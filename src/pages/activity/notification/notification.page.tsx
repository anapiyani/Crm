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
import RoleEmployeeCheckbox from "@/components/role-employee-checkbox/role-employee-checkbox";
import { Link } from "react-router-dom";
import { Chat } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NiceModal from "@ebay/nice-modal-react";
import createNotification from "@/modals/activity/create-notification";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { INotificationGet } from "@/ts/activity.interface";
import dayjs from "dayjs";
import { searchEmployee } from "@/service/employee/employee.service";
import { useQuery } from "@tanstack/react-query";
import { IOptions } from "@/ts/employee.interface";
import StepInput from "@/pages/employees/salary/_components/step-input/step-input.component";
import {
  searchNotifications,
  searchVisits,
} from "@/service/activity/activity.service";

interface IOption {
  label: string;
  value: number;
}

const NotificationPage = () => {
  const { register, handleSubmit, control, setValue, getValues } =
    useForm<INotificationGet>();

  const [page_size, setPage_size] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [formData, setFormData] = useState<INotificationGet>({
    customer: 0,
    date_from: "",
    date_to: "",
    employee: [],
    page_size,
    page,
    status: "Любой",
    time_from: "",
    time_to: "",
    type: [],
  });

  const pageSizeOptions: IOption[] = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  const onHandleCreateNotification = () => {
    NiceModal.show(createNotification);
  };

  const { data: employeeData } = useQuery({
    queryKey: ["employeeData"],
    queryFn: () => searchEmployee({ role: "customer" }),
  });

  const employeeOptions: IOptions[] =
    employeeData?.results.map((item) => ({
      label: item.first_name + " " + item.last_name,
      value: item.user_id.toString(),
    })) || [];

  const {
    data: notificationData,
    isLoading: notificationLoading,
    refetch: notificationRefetch,
  } = useQuery({
    queryKey: ["notificationData", formData, page_size, page],
    queryFn: () =>
      searchNotifications({
        ...formData,
        page_size,
        page,
      }),
    enabled: false,
  });

  const onSubmit = (data: INotificationGet) => {
    if (!data.time_from || !data.time_to) {
      data.time_from = "9:00";
      data.time_to = "9:00";
    }

    const newFormData = {
      ...data,
      page_size,
      page,
    };

    setFormData(newFormData);
    notificationRefetch();
  };

  console.log(notificationData);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={classes.notification}>
        <div className={classes.notification__header}>
          <BreadcrumbsCustom></BreadcrumbsCustom>
          <h1>Расширенный поиск</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.notification__main}>
            <div className={classes.notification__main__content}>
              <div className={classes.notification__main__content__header}>
                <h2>Основная информация</h2>
                <Divider />
              </div>
              <div className={classes.notification__main__content__body}>
                <div
                  className={classes.notification__main__content__body__item}
                >
                  <p>Дата</p>
                  <div
                    className={
                      classes.notification__main__content__body__item__datePicker
                    }
                  >
                    <Controller
                      name="date_from"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          format="DD.MM.YYYY"
                          label="Выберите дату"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "16px",
                            },
                          }}
                          onChange={(e) => {
                            //  @ts-ignore
                            const date = e.$d;
                            field.onChange(dayjs(date).format("YYYY-MM-DD"));
                          }}
                          slotProps={{
                            textField: {
                              size: "small",
                              sx: {
                                fontSize: "1.4rem",
                                "& .MuiInputBase-root": {
                                  fontSize: "1.5rem",
                                },

                                "& .MuiFormLabel-root": {
                                  fontSize: "1.5rem",
                                },
                              },
                            },
                          }}
                        />
                      )}
                    />
                    <span>-</span>
                    <Controller
                      name="date_to"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          format="DD.MM.YYYY"
                          label="Выберите дату"
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "16px",
                            },
                          }}
                          onChange={(e) => {
                            //  @ts-ignore
                            const date = e.$d;
                            field.onChange(dayjs(date).format("YYYY-MM-DD"));
                          }}
                          slotProps={{
                            textField: {
                              size: "small",
                              sx: {
                                fontSize: "1.4rem",
                                "& .MuiInputBase-root": {
                                  fontSize: "1.5rem",
                                },

                                "& .MuiFormLabel-root": {
                                  fontSize: "1.5rem",
                                },
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div
                  className={classes.notification__main__content__body__item}
                >
                  <p>Время</p>
                  <div
                    className={
                      classes.notification__main__content__body__item__datePicker
                    }
                  >
                    <Controller
                      name="time_from"
                      control={control}
                      render={({ field }) => (
                        <CustomTimePicker
                          size="small"
                          onChange={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    <span>-</span>
                    <Controller
                      name="time_to"
                      control={control}
                      render={({ field }) => (
                        <CustomTimePicker
                          size="small"
                          onChange={(value) => field.onChange(value)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div
                  className={classes.notification__main__content__body__item}
                >
                  <p>Статус</p>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        sx={{
                          width: "320px",
                          "& .MuiInputBase-root": {
                            fontSize: "14px",
                          },
                        }}
                        size="small"
                        options={[
                          "Любой",
                          "Необходимо позвонить клиенту",
                          "Клиенту уже позвонили",
                          "Клиент не берет трубку",
                        ]}
                        onChange={(e, value) => field.onChange(value)}
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
                    )}
                  />
                </div>
                <div
                  className={classes.notification__main__content__body__item}
                >
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
                        <input
                          type="checkbox"
                          value="Посещение"
                          {...register("type")}
                        />
                        <span className={classes["checkLabel"]}>Посещение</span>
                      </div>
                      <div
                        className={
                          classes.notification__main__content__body__item__methods
                        }
                      >
                        <input
                          type="checkbox"
                          value="Услуга"
                          {...register("type")}
                        />
                        <span className={classes["checkLabel"]}>Услуга</span>
                      </div>
                      <div
                        className={
                          classes.notification__main__content__body__item__methods
                        }
                      >
                        <input
                          type="checkbox"
                          value="День рождения"
                          {...register("type")}
                        />
                        <span className={classes["checkLabel"]}>
                          День рождения
                        </span>
                      </div>
                      <div
                        className={
                          classes.notification__main__content__body__item__methods
                        }
                      >
                        <input
                          type="checkbox"
                          value="Лист ожидания"
                          {...register("type")}
                        />
                        <span className={classes["checkLabel"]}>
                          Лист ожидания
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
                    setValue(
                      "employee",
                      selectedEmployeeIds.map((item) => item.id),
                    );
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
                  В данном разделе вы можете найти, посмотреть, отредактировать
                  либо создать новое напоминание для сотрудников. <br /> Если в
                  блоке "Сотрудники" отмечен администратор, поиск будет
                  происходить по автору напоминания, в противном случае - по
                  напоминаниям с типом "Посещение" по мастеру.
                </p>
              </div>
            </div>
            <div className={classes.notification__main__content}>
              <div className={classes.notification__main__content__client}>
                <Controller
                  name="customer"
                  control={control}
                  render={({ field }) => (
                    <StepInput
                      {...field}
                      placeholder="Имя / ID / Телефон / карта"
                      labelName="Клиент"
                      isAutoComplete={true}
                      options={employeeOptions || []}
                      onChange={(value) => {
                        field.onChange(Number(value?.value));
                      }}
                      selectedOption={
                        employeeOptions?.find(
                          (option) => Number(option.value) === field.value,
                        ) || null
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className={classes.notification__main}>
            <div className={classes.notification__main__search}>
              <Button type="reset" variant="outlined">
                Сбросить
              </Button>
              <Button type="submit" variant="contained">
                Поиск
              </Button>
              <Button onClick={onHandleCreateNotification} variant="contained">
                Создать напоминание
              </Button>
            </div>
          </div>
        </form>
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
              <p
                className={classes.notification__main__tables__container__label}
              >
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
    </LocalizationProvider>
  );
};

export default NotificationPage;
