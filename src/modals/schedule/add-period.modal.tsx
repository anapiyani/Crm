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
import classNames from "classnames";

const AddPeriodModal = () => {
  const modal = useModal();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [periodType, setPeriodType] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [isTransfer, setIsTransfer] = useState<boolean>(false);
  const [selectedTransferEmployee, setSelectedTransferEmployee] = useState<
    number | undefined
  >(undefined);

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
    setStartDate("");
    setEndDate("");
    setPeriodType("");
  };

  // useEffect(() => {
  // resetStates();
  // }, [mutation.isSuccess, modal.visible]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (value === "transfer") {
      setIsTransfer(checked);
    }
  };

  const handleSubmit = () => {
    // it shows a modal window with the title "Настройки смены" and the following fields:
    // selected Employee: selectedEmployee
    // start date: startDate
    // end date: endDate
    // period type: periodType
    // transfer: isTransfer
    // selected transfer employee: selectedTransferEmployee
    // if all fields are filled, it calls createPeriod.mutate()
    // if not, it shows a toast with the text "Заполните все поля"
    // after that, it resets all states
    const formData = {
      employeeId: selectedEmployee,
      startDate,
      endDate,
      periodType,
      ...(isTransfer && { transferEmployeeId: selectedTransferEmployee }),
    };
    console.log(formData);
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
            <CustomDatePicker
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStartDate(e.target.value);
              }}
            />
            <span>-</span>
            <CustomDatePicker
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
          <div className={classes["add-employees-schedule__container--data"]}>
            <p className={classes["add-employees-schedule__container--label"]}>
              Тип периода
            </p>
            <Autocomplete
              size="small"
              fullWidth={true}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              options={[
                { value: "Сотрудник заболел", label: "Сотрудник заболел" },
                {
                  value: "Сотрудник в отпуске",
                  label: "Сотрудник в отпуске",
                },
                {
                  value: "Сотрудник взял отгул",
                  label: "Сотрудник взял отгул",
                },
                {
                  value: "Сотрудник на обучении",
                  label: "Сотрудник на обучении",
                },
              ]}
              onChange={(event, value) => {
                setPeriodType(value!.value);
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
          <div
            className={classNames(
              classes["add-employees-schedule__container--data"],
              classes.checkbox,
            )}
          >
            <input
              type="checkbox"
              value="transfer"
              onChange={handleCheckboxChange}
            />{" "}
            <p className={classes["add-employees-schedule__container--label"]}>
              Перенести записи на другого сотрудника
            </p>
          </div>
          {isTransfer && (
            <div
              className={classNames(
                classes["add-employees-schedule__container--data"],
                classes.transfer,
              )}
            >
              <p
                className={classes["add-employees-schedule__container--label"]}
              >
                Перенести на
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
                  setSelectedTransferEmployee(value?.nodeId);
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
                      placeholder="Фамилия Имя, Должность "
                      sx={{
                        height: "40px",
                        "& .MuiInputBase-input": {
                          fontSize: "1.6rem",
                        },
                      }}
                      {...params}
                      className={"main__lower__auto__input"}
                    />
                    <p className={classes.info_text}>
                      При переносе записей на другого сотрудника он будет
                      поставлен в график автоматически в те дни, на которые есть
                      записи клиентов.
                    </p>
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </ModalWindow>
  );
};

const AddPeriod = NiceModal.create(AddPeriodModal);

export default AddPeriod;
