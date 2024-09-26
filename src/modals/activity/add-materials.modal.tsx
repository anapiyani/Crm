import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import classNames from "classnames";
import SaveAutoComplete from "@/components/saveAutoComplete/saveAutoComplete.component";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { processEmployeeOptions } from "@/utils/process-employees-departments";
import { useQuery } from "@tanstack/react-query";
import { getHierarchyEmployeesByDepartment } from "@/service/hierarchy/hierarchy.service";
import { getMaterials, getStorages } from "@/service/storage/storage.service";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import { Warning } from "@mui/icons-material";

const addMaterials = () => {
  const modal = useModal();
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>("");
  const [materials, setMaterials] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedStorage, setSelectedStorage] = useState<number>();

  const useEmployees = () => {
    return useQuery({
      queryKey: ["employeeDepartmentHierarchyData"],
      queryFn: () => getHierarchyEmployeesByDepartment(),
      staleTime: 1000 * 60 * 5,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });
  };

  const {
    data: storagesData,
    isPending: storagesPending,
    error: storagesError,
  } = useQuery({
    queryKey: ["storageData"],
    queryFn: getStorages,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: materialsData, isPending: materialsPending } = useQuery({
    queryKey: ["materialsData"],
    queryFn: getMaterials,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const materialsOptions = useMemo(() => {
    return materialsData
      ? materialsData.map((material) => ({
          label: material.name,
          value: material.id.toString(),
        }))
      : [];
  }, [materialsData]);

  const { data: employeeDepartmentHierarchyData, isLoading } = useEmployees();

  const employeeOptions = useMemo(() => {
    return employeeDepartmentHierarchyData
      ? processEmployeeOptions(employeeDepartmentHierarchyData, true)
      : [];
  }, [employeeDepartmentHierarchyData]);

  const savedMaterials = (materials: { label: string; value: string }[]) => {
    setMaterials(materials);
  };

  useEffect(() => {
    console.log(selectedStorage);
  }, [selectedStorage]);

  return (
    <ModalWindow
      title={"Добавить товары"}
      open={modal.visible}
      handleSave={() => {
        modal.hide();
      }}
      handleClose={() => modal.hide()}
      className={classNames(classes["u-p-0"], classes["choose-service-modal"])}
      isFront={true}
    >
      <div className={classes.materials}>
        <div className={classes.materials__material_find}>
          <p>Продал товары</p>
          <Autocomplete
            size="small"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              width: "500px",
            }}
            options={employeeOptions}
            getOptionLabel={(option) => option.nodeName}
            isOptionEqualToValue={(option, value) =>
              option.nodeId === value.nodeId
            }
            value={
              employeeOptions.find(
                (option) => option.nodeId === selectedEmployee,
              ) || null
            }
            onChange={(event, value) => {
              setSelectedEmployee(value?.nodeId);
              setSelectedEmployeeName(value?.nodeName || "");
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
                    marginLeft: option.nodeType === "department" ? "0" : "1rem",
                  }}
                >
                  {option.nodeName}
                </p>
              </li>
            )}
            renderInput={(params) => (
              <div className={classes["main__lower__auto"]}>
                <TextField
                  placeholder="Выберите сотрудника"
                  sx={{
                    height: "40px",
                    width: "100%",
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
        <div className={classes.materials__material_find}>
          <p>Товары</p>
          <SaveAutoComplete
            materials={materialsOptions}
            savedMaterialsFunc={savedMaterials}
          />
        </div>
        {materials.length > 0 && (
          <div
            className={classNames(
              classes.materials__material_find,
              classes.materials__materials_show,
            )}
          >
            <p>Доступно для продажи:</p>
            <div className={classes.materials__material_find__available}>
              {materials.map((material, index) => (
                <div
                  key={index}
                  className={classes.materials__material_find__available__item}
                >
                  <p>{material.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={classes.materials__material_find}>
          <p>Списать товары</p>
          <Autocomplete
            size="small"
            sx={{
              marginTop: "2rem",
              marginBottom: "1rem",
              width: "500px",
            }}
            options={storagesData || []}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <p style={{ fontSize: "1.6rem" }}>{option.name}</p>
              </li>
            )}
            value={storagesData?.find(
              (option) => option.id === selectedStorage,
            )}
            onChange={(event, value) => {
              setSelectedStorage(value?.id);
            }}
            renderInput={(params) => (
              <div className={classes["main__lower__auto"]}>
                <TextField
                  placeholder="Выберите склад"
                  sx={{
                    height: "40px",
                    width: "100%",
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
        <div className={classes.materials__alert}>
          <div className={classes.materials__alert__texts}>
            <Warning color="warning" />
            <p>
              Если в списке нет товара, который вы хотите продать, убедитесь,
              что на складе товар в наличии (если нет, воспользуйтесь страницей
              "Закупка товара") и что в карте материала разрешена продажа товара
              (значение "Может быть товаром" должно быть "да").
            </p>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(addMaterials);
