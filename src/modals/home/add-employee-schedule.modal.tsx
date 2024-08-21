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
import { useAddEmployeeToSchedule } from "@/service/schedule/schedule.hook";
import toast from "react-hot-toast";

const AddEmployeeSchedule = () => {
  const modal = useModal();
  const [startTime, setStartTime] = useState<string>("08:00");
  const [endTime, setEndTime] = useState<string>("23:00");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const CreateEmployeeMutation = useAddEmployeeToSchedule();

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
    setSelectedDate("");
    setStartTime("08:00");
    setEndTime("23:00");
  };

  useEffect(() => {
    resetStates();
  }, [CreateEmployeeMutation.isSuccess, modal.visible]);

  const handleSubmit = () => {
    if (!selectedEmployee) {
      toast.error("Выберите сотрудника");
      return;
    }
    if (!selectedDate) {
      toast.error("Выберите дату");
      return;
    }
    if (!startTime || !endTime) {
      toast.error("Выберите время");
      return;
    }
    if (startTime >= endTime) {
      toast.error("Время начала должно быть меньше времени окончания");
      return;
    }
    CreateEmployeeMutation.mutate({
      employee_id: selectedEmployee,
      start_time: startTime,
      end_time: endTime,
      date: selectedDate,
    });
    modal.hide();
    CreateEmployeeMutation.isSuccess && CreateEmployeeMutation.reset();
  };

  return (
    <ModalWindow
      title={"Настройки смены"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={handleSubmit}
    >
      <div className={classes["add-employees-schedule"]}>
        <h1 className={classes["add-employees-schedule--header"]}>
          Основные параметры
        </h1>
        <Divider />
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
                  (option) => option.nodeId === selectedEmployee
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
                setSelectedDate(e.target.value);
              }}
            />
          </div>
          <div className={classes["add-employees-schedule__container--time"]}>
            <p className={classes["add-employees-schedule__container--label"]}>
              Время
            </p>
            <CustomTimePicker
              value={startTime}
              onChange={setStartTime}
              size="small"
              withLabel={false}
            />
            <span>-</span>
            <CustomTimePicker
              value={endTime}
              onChange={setEndTime}
              size="small"
              withLabel={false}
            />
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

const AddEmployeeScheduleModal = NiceModal.create(AddEmployeeSchedule);

export default AddEmployeeScheduleModal;
