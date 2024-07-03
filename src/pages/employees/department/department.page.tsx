import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, CircularProgress, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import { getDepartment } from "@/service/department/department.service";
import toast from "react-hot-toast";
import { IDepartment, IRoles } from "@/ts/types";
import {
  useUpdateRole,
  useDeleteRole,
} from "@/service/department/department.hook";

const Department = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["departmentData"],
    queryFn: getDepartment,
    staleTime: 300,
  });
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();

  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null,
  );
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const [positionName, setPositionName] = useState<string>("");

  if (isError) {
    const errorMessage = "Произошла ошибка при получении данных.";
    toast.error(errorMessage);
  }

  const handleDepartmentClick = (departmentId: number) => {
    setSelectedDepartment(departmentId);
    setSelectedPosition(null);
    setPositionName("");
  };

  const handlePositionClick = (positionId: number) => {
    const department = data?.results.find(
      (dept: IDepartment) => dept.id === selectedDepartment,
    );
    const position = department?.roles.find(
      (role: IRoles) => role.id === positionId,
    );
    setSelectedPosition(positionId);
    setPositionName(position ? position.name : "");
  };

  const handlePositionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPositionName(event.target.value);
  };

  const selectedDepartmentData = data?.results.find(
    (dept: IDepartment) => dept.id === selectedDepartment,
  );

  const handleSaveClick = () => {
    if (selectedPosition !== null && selectedDepartment !== null) {
      updateRoleMutation.mutate({
        id: selectedPosition,
        name: positionName,
        department: selectedDepartment,
      });
    }
  };

  const handleDeleteClick = () => {
    if (selectedPosition !== null) {
      deleteRoleMutation.mutate(selectedPosition);
    }
  };

  return (
    <div className={classes["department"]}>
      <div className={classes["department__header"]}>
        <BreadcrumbsCustom />
        <h1>Отделы - Редактирование должности</h1>
      </div>
      <div className={classes["department__content"]}>
        <div className={classes["department__content__column"]}>
          <div className={classes["department__content__column__header"]}>
            <h2>Отделы</h2>
            <Divider />
          </div>
          <div className={classes["department__content__column__items"]}>
            {isPending ? <CircularProgress /> : ""}
            <ul>
              {data?.results.map((item: IDepartment) => (
                <li key={item.id}>
                  <Button
                    onClick={() => handleDepartmentClick(item.id)}
                    className={
                      selectedDepartment === item.id ? classes["selected"] : ""
                    }
                  >
                    {item.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={classes["department__content__column"]}>
          <div className={classes["department__content__column__header"]}>
            <h2>
              Должность <Button>+ Добавить</Button>
            </h2>
            <Divider />
          </div>
          <div className={classes["department__content__column__items"]}>
            <ul>
              {selectedDepartmentData?.roles.map((position: IRoles) => (
                <li key={position.id}>
                  <Button
                    onClick={() => handlePositionClick(position.id)}
                    className={
                      selectedPosition === position.id
                        ? classes["selected"]
                        : ""
                    }
                  >
                    {position.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={classes["department__content__column"]}>
          <div className={classes["department__content__column__header"]}>
            <h2>Редактировать должность</h2>
            <Divider />
          </div>
          <div className={classes["department__content__column__items"]}>
            <div
              className={classes["department__content__column__items__inputs"]}
            >
              <VerticalTextField
                label="Название"
                placeholder="Ученик парикмахера"
                value={positionName}
                onChange={handlePositionNameChange}
                addClassName={classes["changeInput"]}
              />
            </div>
            <div
              className={classes["department__content__column__items__btns"]}
            >
              <Button
                onClick={handleDeleteClick}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Удалить
              </Button>
              <Button
                onClick={handleSaveClick}
                variant="contained"
                startIcon={<CheckIcon />}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
