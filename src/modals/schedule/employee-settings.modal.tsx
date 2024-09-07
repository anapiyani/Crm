import React, { useEffect, useMemo, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import { Autocomplete, Divider, TextField } from "@mui/material";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomTimePicker from "@/components/time-picker/time-picker-custom";
import classes from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getHierarchyEmployeesByDepartment } from "@/service/hierarchy/hierarchy.service";
import { processEmployeeOptions } from "@/utils/process-employees-departments";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useChangeSchedule } from "@/service/schedule/schedule.hook";
import { IScheduleEmployeeChange } from "@/ts/schedule.interface";

const EmployeSettings = ({
  user_id,
  date,
  endDate,
}: {
  user_id: string;
  date: string;
  endDate: string;
}) => {
  const mutation = useChangeSchedule();
  const modal = useModal();
  const [selectedEmployee, setSelectedEmployee] = useState<
    number | null | undefined
  >(null);
  const [choosenDate, setChoosenDate] = useState<string>(date);
  const [startHour, setStartHour] = useState<string>(
    dayjs(date).format("HH:mm"),
  );
  const [endHour, setEndHour] = useState<string>(
    dayjs(endDate).format("HH:mm"),
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

  useEffect(() => {
    if (user_id && employeeOptions.length > 0) {
      const defaultEmployee = employeeOptions.find(
        (option) => option.nodeId === parseInt(user_id),
      );
      if (defaultEmployee) {
        setSelectedEmployee(defaultEmployee.nodeId);
      }
    }
  }, [user_id, employeeOptions]);

  const handleStartDate = () => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const handleStartHour = () => {
    return dayjs(date).isValid() ? dayjs(date).format("HH:mm") : "00:00";
  };

  const handleEndHour = () => {
    return dayjs(endDate).isValid() ? dayjs(endDate).format("HH:mm") : "00:00";
  };

  const handleSubmit = () => {
    const form: IScheduleEmployeeChange = {
      employeeId: selectedEmployee!,
      date: dayjs(choosenDate).format("YYYY-MM-DD"),
      start_time: startHour,
      end_time: endHour,
    };
    mutation.mutate(form);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      modal.hide();
    }
  });

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
                setSelectedEmployee(value?.nodeId || null);
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
            <CustomDatePicker
              onChange={(value) => setChoosenDate(value.target.value)}
              defaultValue={handleStartDate()}
            />
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
                fullWidth={true}
                disabled
                value={{
                  value: "Только выбранная дата",
                  label: "Только выбранная дата",
                }}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                options={[
                  {
                    value: "Только выбранная дата",
                    label: "Только выбранная дата",
                  },
                ]}
                onChange={(event, value) => {
                  console.log(value);
                }}
                renderInput={(params) => (
                  <div className={classes["main__lower__auto"]}>
                    <TextField
                      placeholder="Только выбранная дата"
                      sx={{
                        height: "40px",
                        width: "200px",
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
            <div style={{ width: "12rem" }}>
              <CustomTimePicker
                size="small"
                value={handleStartHour()}
                onChange={(e) => setStartHour(e)}
              />{" "}
            </div>
            <div style={{ width: "12rem" }}>
              <CustomTimePicker
                size="small"
                value={handleEndHour()}
                onChange={(e) => setEndHour(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

const EmployeSettingsModal = NiceModal.create(EmployeSettings);

export default EmployeSettingsModal;
