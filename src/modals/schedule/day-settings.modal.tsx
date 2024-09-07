import React, { useEffect, useMemo, useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Divider,
  TextField,
} from "@mui/material";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomTimePicker from "@/components/time-picker/time-picker-custom";
import classes from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getHierarchyEmployeesByDepartment } from "@/service/hierarchy/hierarchy.service";
import { processEmployeeOptions } from "@/utils/process-employees-departments";
import toast from "react-hot-toast";
import classNames from "classnames";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";

const DaySettings = () => {
  const modal = useModal();
  const [selectedEmployee, setSelectedEmployee] = useState<number>();

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

  // useEffect(() => {
  // resetStates();
  // }, [mutation.isSuccess, modal.visible]);

  const handleSubmit = () => {
    console.log("submit");
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
            <p
              className={classNames(
                classes["add-employees-schedule__container--label"],
                classes.timetext,
              )}
            >
              Фактическое время работы
            </p>
            <div style={{ width: "12rem" }}>
              <CustomTimePicker
                size="small"
                onChange={(value) => console.log(value)}
              />
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
                  console.log(value);
                }}
                renderInput={(params) => (
                  <div className={classes["main__lower__auto"]}>
                    <TextField
                      placeholder="Выберите тип периода"
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
                onChange={(value) => console.log(value)}
              />{" "}
            </div>
            <div style={{ width: "12rem" }}>
              <CustomTimePicker
                size="small"
                onChange={(value) => console.log(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

const DaySettingsModal = NiceModal.create(DaySettings);

export default DaySettingsModal;
