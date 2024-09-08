import React, { useMemo, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import { Autocomplete, Divider, TextField } from "@mui/material";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomTimePicker from "@/components/time-picker/time-picker-custom";
import classes from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getHierarchyEmployeesByDepartment } from "@/service/hierarchy/hierarchy.service";
import { processEmployeeOptions } from "@/utils/process-employees-departments";
import classNames from "classnames";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Define the type for schedule options and weekdays
interface ScheduleOption {
  label: string;
  pattern: number[] | string;
  isParent?: boolean;
}

type WeekDays =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface WeekDayTimes {
  monday: {
    checked: boolean;
    startTime: string | null;
    endTime: string | null;
  };
  tuesday: {
    checked: boolean;
    startTime: string | null;
    endTime: string | null;
  };
  wednesday: {
    checked: boolean;
    startTime: string | null;
    endTime: string | null;
  };
  thursday: {
    checked: boolean;
    startTime: string | null;
    endTime: string | null;
  };
  friday: {
    checked: boolean;
    startTime: string | null;
    endTime: string | null;
  };
  saturday: {
    checked: boolean;
    startTime: string | null;
    endTime: string | null;
  };
  sunday: {
    checked: boolean;
    startTime: string | null;
    endTime: string | null;
  };
}

// Helper function to capitalize the first letter of a string
const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const DaySettings = () => {
  const modal = useModal();
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [selectedPattern, setSelectedPattern] = useState<ScheduleOption | null>(
    { label: "Только выбранная дата", pattern: "only_choosen_date" },
  );

  const [weekDayTimes, setWeekDayTimes] = useState<WeekDayTimes>({
    monday: { checked: false, startTime: null, endTime: null },
    tuesday: { checked: false, startTime: null, endTime: null },
    wednesday: { checked: false, startTime: null, endTime: null },
    thursday: { checked: false, startTime: null, endTime: null },
    friday: { checked: false, startTime: null, endTime: null },
    saturday: { checked: false, startTime: null, endTime: null },
    sunday: { checked: false, startTime: null, endTime: null },
  });

  const scheduleOptions: ScheduleOption[] = useMemo(
    () => [
      { label: "Популярные", pattern: [], isParent: true },
      { label: "Только выбранная дата", pattern: "only_choosen_date" },
      { label: "По дням недели", pattern: "week_days" },
      { label: "Выбрать на календаре", pattern: "choose_on_calendar" },
      { label: "2 через 2", pattern: [2, 2] },
      { label: "5 через 2", pattern: [5, 2] },
      { label: "2 через 5", pattern: [2, 5] },
      { label: "4 через 4", pattern: [4, 4] },
      { label: "Каждый день", pattern: "every_day" },
      { label: "Все", pattern: [], isParent: true },
      { label: "1 через 1", pattern: [1, 1] },
      { label: "1 через 2", pattern: [1, 2] },
      { label: "1 через 3", pattern: [1, 3] },
      { label: "1 через 4", pattern: [1, 4] },
      { label: "1 через 5", pattern: [1, 5] },
      { label: "1 через 6", pattern: [1, 6] },
      { label: "2 через 1", pattern: [2, 1] },
      { label: "2 через 3", pattern: [2, 3] },
      { label: "2 через 4", pattern: [2, 4] },
      { label: "3 через 1", pattern: [3, 1] },
      { label: "3 через 3", pattern: [3, 3] },
      { label: "3 через 4", pattern: [3, 4] },
      { label: "3 через 5", pattern: [3, 5] },
      { label: "4 через 1", pattern: [4, 1] },
      { label: "4 через 2", pattern: [4, 2] },
      { label: "4 через 3", pattern: [4, 3] },
      { label: "5 через 1", pattern: [5, 1] },
      { label: "5 через 2", pattern: [5, 2] },
      { label: "5 через 3", pattern: [5, 3] },
      { label: "6 через 1", pattern: [6, 1] },
      { label: "6 через 2", pattern: [6, 2] },
      { label: "7 через 7", pattern: [7, 7] },
      { label: "Сложные", pattern: [], isParent: true },
      { label: "2 - 2 - 3 - 3", pattern: [2, 2, 3, 3] },
      { label: "2 - 2 - 3 - 2 - 2 - 3", pattern: [2, 2, 3, 2, 2, 3] },
    ],
    [],
  );

  const useEmployees = () => {
    return useQuery({
      queryKey: ["employeeDepartmentHierarchyData"],
      queryFn: () => getHierarchyEmployeesByDepartment(),
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  };

  const { data: employeeDepartmentHierarchyData, isLoading } = useEmployees();

  const employeeOptions = useMemo(() => {
    return employeeDepartmentHierarchyData
      ? processEmployeeOptions(employeeDepartmentHierarchyData, true)
      : [];
  }, [employeeDepartmentHierarchyData]);

  const resetStates = () => {
    setSelectedEmployee(undefined);
  };

  // This function will transform the `weekDayTimes` state into the desired format
  const formatWeekdayTimes = () => {
    const formattedTimes: { [key: string]: [string, string] } = {};

    Object.keys(weekDayTimes).forEach((day) => {
      const weekDay = weekDayTimes[day as WeekDays];
      if (weekDay.checked && weekDay.startTime && weekDay.endTime) {
        formattedTimes[capitalize(day)] = [weekDay.startTime, weekDay.endTime];
      }
    });

    return formattedTimes;
  };

  const handleSubmit = () => {
    if (selectedPattern) {
      const patternQuery = {
        pattern: selectedPattern.pattern,
        label: selectedPattern.label,
      };

      const formattedTimes = formatWeekdayTimes();

      console.log("Saving pattern:", patternQuery.pattern);
      console.log("Formatted Weekday Times:", formattedTimes);
    }
  };

  const handlePatternChange = (
    event: React.SyntheticEvent,
    value: ScheduleOption | null,
  ) => {
    if (!value?.isParent) {
      setSelectedPattern(value);
    }
  };

  const handleWeekdayChange = (
    day: WeekDays,
    field: keyof WeekDayTimes["monday"],
    value: any,
  ) => {
    setWeekDayTimes((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  return (
    <ModalWindow
      title={"Добавить период"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={handleSubmit}
      afterClose={modal.remove}
    >
      <div className={classes["add-employees-schedule"]}>
        <div className={classes["add-employees-schedule__container"]}>
          <h1 className={classes["add-employees-schedule--header"]}>
            Основные параметры
          </h1>
          <Divider />
          <div className={classes["add-employees-schedule__container--data"]}>
            <p className={classes["add-employees-schedule__container--label"]}>
              Сотрудник
            </p>
            <Autocomplete
              size="small"
              options={employeeOptions}
              getOptionLabel={(option) => option.nodeName}
              isOptionEqualToValue={(option, value) =>
                option.nodeId === value.nodeId
              }
              fullWidth={true}
              value={
                employeeOptions.find(
                  (option) => option.nodeId === selectedEmployee,
                ) || null
              }
              onChange={(event, value) => {
                setSelectedEmployee(value?.nodeId);
              }}
              renderOption={(props, option) => (
                <li
                  {...props}
                  key={option.uniqueKey}
                  style={{
                    pointerEvents:
                      option.nodeType === "department" ? "none" : "auto",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1.6rem",
                      fontWeight:
                        option.nodeType === "department" ? "bold" : "normal",
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
          <div className={classes["add-employees-schedule__container--data"]}>
            <p className={classes["add-employees-schedule__container--label"]}>
              Дата
            </p>
            <div>
              <CustomDatePicker />
            </div>
          </div>
          <div
            className={classes["add-employees-schedule__container--data"]}
          ></div>
          <h1 className={classes["add-employees-schedule--header"]}>
            Автоматический график
          </h1>
          <Divider />
          <div className={classes["add-employees-schedule__container--data"]}>
            <p className={classes["add-employees-schedule__container--label"]}>
              График
            </p>
            <div>
              <Autocomplete
                size="small"
                fullWidth
                options={scheduleOptions}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
                value={selectedPattern}
                onChange={handlePatternChange}
                renderOption={(props, option) => (
                  <li
                    {...props}
                    key={option.label}
                    style={{
                      fontWeight: option.isParent ? "bold" : "normal",
                      pointerEvents: option.isParent ? "none" : "auto",
                    }}
                  >
                    {option.label}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Выберите тип периода"
                    sx={{
                      height: "40px",
                      width: "300px",
                      "& .MuiInputBase-input": {
                        fontSize: "1.6rem",
                      },
                    }}
                    className={classes["main__lower__auto__input"]}
                  />
                )}
              />
            </div>

            {(selectedPattern?.pattern === "only_choosen_date" ||
              selectedPattern?.pattern === "every_day" ||
              Array.isArray(selectedPattern?.pattern)) && (
              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ width: "12rem" }}>
                  <CustomTimePicker
                    size="small"
                    onChange={(value) => console.log("Start time:", value)}
                  />
                </div>
                <div style={{ width: "12rem" }}>
                  <CustomTimePicker
                    size="small"
                    onChange={(value) => console.log("End time:", value)}
                  />
                </div>
              </div>
            )}
          </div>
          {selectedPattern?.pattern === "choose_on_calendar" && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                onChange={(e) => console.log(e.$d)}
                sx={{
                  marginTop: "1rem",
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
          )}

          {/* Weekday selection */}
          {selectedPattern?.pattern === "week_days" && (
            <div>
              <div>
                {[
                  { label: "Понедельник", value: "monday" },
                  { label: "Вторник", value: "tuesday" },
                  { label: "Среда", value: "wednesday" },
                  { label: "Четверг", value: "thursday" },
                  { label: "Пятница", value: "friday" },
                  { label: "Суббота", value: "saturday" },
                  { label: "Воскресенье", value: "sunday" },
                ].map((day) => (
                  <div
                    key={day.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginTop: "2rem",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      id={day.value}
                      name={day.value}
                      checked={weekDayTimes[day.value as WeekDays]?.checked}
                      onChange={(e) =>
                        handleWeekdayChange(
                          day.value as WeekDays,
                          "checked",
                          e.target.checked,
                        )
                      }
                    />
                    <label
                      htmlFor={day.value}
                      style={{
                        width: "8rem",
                        fontSize: "1.6rem",
                        marginRight: "2rem",
                      }}
                    >
                      {day.label}
                    </label>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <div style={{ width: "10rem" }}>
                        <CustomTimePicker
                          size="small"
                          onChange={(value) =>
                            handleWeekdayChange(
                              day.value as WeekDays,
                              "startTime",
                              value,
                            )
                          }
                        />
                      </div>
                      <div style={{ width: "10rem", gap: "1rem" }}>
                        <CustomTimePicker
                          size="small"
                          onChange={(value) =>
                            handleWeekdayChange(
                              day.value as WeekDays,
                              "endTime",
                              value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{ marginTop: "2rem" }}
                className={classes["add-employees-schedule__container--data"]}
              >
                <p
                  className={
                    classes["add-employees-schedule__container--label"]
                  }
                >
                  Период
                </p>
                <Autocomplete
                  size="small"
                  fullWidth={true}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  options={[
                    { value: "week", label: "Неделя" },
                    { value: "2 weeks", label: "2 Недели" },
                    { value: "month", label: "Месяц" },
                    { value: "2 months", label: "2 Месяца" },
                    { value: "3 months", label: "3 Месяца" },
                    { value: "half year", label: "Полгода" },
                  ]}
                  onChange={(event, value) => {
                    console.log(value);
                  }}
                  renderInput={(params) => (
                    <div className={classes["main__lower__auto"]}>
                      <TextField
                        placeholder="Выберите тип периода"
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
            </div>
          )}
        </div>
      </div>
    </ModalWindow>
  );
};

const DaySettingsModal = NiceModal.create(DaySettings);

export default DaySettingsModal;
