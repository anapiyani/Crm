import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "./styles.module.scss";
import classNames from "classnames";
import SaveAutoComplete from "@/components/saveAutoComplete/saveAutoComplete.component";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { processEmployeeOptions } from "@/utils/process-employees-departments";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getHierarchyEmployeesByDepartment } from "@/service/hierarchy/hierarchy.service";
import {
  getMaterials,
  getStorageMaterials,
  getStorages,
} from "@/service/storage/storage.service";
import { Warning } from "@mui/icons-material";
import { useAddMaterialsForVisit } from "@/service/activity/activity.hook";
import {
  IAppointmentMaterials,
  IMaterialsForVisit,
} from "@/ts/activity.interface";

const addMaterials = ({ appointment_id }: { appointment_id: number }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>("");
  const [materials, setMaterials] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedStorage, setSelectedStorage] = useState<number>();
  const addMaterialsMutation = useAddMaterialsForVisit();
  const modal = useModal();

  const materialsQuantityData = useQueries({
    queries: materials.map((item) => ({
      queryKey: ["post", item.value],
      queryFn: () =>
        getStorageMaterials({
          material: Number(item.value),
          storage: selectedStorage || 0,
        }),
      staleTime: Infinity,
    })),
  });

  const materialsQuantity = useMemo(() => {
    return materialsQuantityData.map((result, index) => {
      if (Array.isArray(result.data?.results)) {
        const totalQuantity = result.data.results.reduce(
          (acc, item) => acc + Number(item.quantity),
          0
        );
        return {
          material: materials[index].value,
          quantity: totalQuantity,
        };
      }
      return {
        material: materials[index].value,
        quantity: 0,
      };
    });
  }, [materialsQuantityData, materials]);

  const useEmployees = () => {
    return useQuery({
      queryKey: ["employeeDepartmentHierarchyData"],
      queryFn: () => getHierarchyEmployeesByDepartment(),
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
      ? materialsData.results.map((material) => ({
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

  const onSave = () => {
    const materialsToSend: IMaterialsForVisit[] = materials.map((material) => {
      return {
        material: Number(material.value),
        quantity:
          materialsQuantity.find((item) => item.material === material.value)
            ?.quantity || 0,
        storage: selectedStorage || 0,
        sold_by: selectedEmployee || 0,
      };
    });
    const appointment_materials: IAppointmentMaterials = {
      appointment_materials: materialsToSend,
    };
    addMaterialsMutation.mutate({ appointment_id, appointment_materials });
  };

  useEffect(() => {
    if (selectedStorage) {
      materialsQuantityData.forEach((result) => result.refetch());
    }
  }, [selectedStorage]);

  useEffect(() => {
    if (storagesData && storagesData.results.length > 0 && !selectedStorage) {
      setSelectedStorage(storagesData.results[0].id);
    }
  }, [storagesData, selectedStorage]);

  return (
    <ModalWindow
      title={"Добавить товары"}
      open={modal.visible}
      handleSave={() => {
        onSave();
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
                (option) => option.nodeId === selectedEmployee
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
              classes.materials__materials_show
            )}
          >
            <p>Доступно для продажи:</p>
            <div className={classes.materials__material_find__available}>
              {materials.map((material, index) => (
                <div
                  key={index}
                  className={classes.materials__material_find__available__item}
                >
                  <p>
                    {material.label} -{" "}
                    {materialsQuantity.find(
                      (item) => item.material === material.value
                    )?.quantity || 0}{" "}
                    шт
                  </p>
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
            options={storagesData?.results || []}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <p>{option.name}</p>
              </li>
            )}
            value={
              storagesData?.results.find(
                (option) => option.id === selectedStorage
              ) || null
            }
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
