import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import classes from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getStorages } from "@/service/storage/storage.service";
import { IStorage } from "@/ts/storage.interface";
import toast from "react-hot-toast";
import { useState } from "react";
import ModalWindow from "@/components/modal-window/modal-window";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import { useAddStorage, useEditStorage } from "@/service/storage/storage.hook";

const StorageSettings = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["storageData"],
    queryFn: getStorages,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const StorageMutation = useAddStorage();
  const EditMutation = useEditStorage();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string | undefined>("");
  const [employee, setEmployee] = useState<string | undefined | null>("");
  const [clickedStorageId, setClickedStorageId] = useState<number | null>(null);

  const addModalHandler = () => {
    setOpenAddModal(true);
  };
  const editModalOpen = (
    id: number,
    name: string,
    type: string,
    employee: string | null
  ) => {
    setOpenEditModal(true);
    setName(name);
    setType(type);
    setEmployee(employee);
    setClickedStorageId(id);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setClickedStorageId(null);
  };

  const handleSaveModal = () => {
    setOpenAddModal(false);
    StorageMutation.mutate({ name, type, employee });
    setName("");
    setType("");
    setEmployee("");
    setClickedStorageId(null);
  };

  const editSaveModal = () => {
    setClickedStorageId(null);
    setName("");
    setType("");
    setEmployee("");
    setClickedStorageId(null);
    setOpenEditModal(false);
    EditMutation.mutate({
      name: name,
      type: type,
      employee: employee,
      id: clickedStorageId,
    });
  };

  return (
    <div className={classes["settings"]}>
      <BreadcrumbsCustom />
      <div className={classes["settings__content"]}>
        <div className={classes["settings__content__storages"]}>
          <div className={classes["settings__content__storages__header"]}>
            <h1>Склады</h1>{" "}
            <Button onClick={addModalHandler}>+ Добавить</Button>
          </div>
          <Divider />
          <div className={classes["settings__content__storages__items"]}>
            <ul>
              {isPending ? (
                <CircularProgress className={classes.loading} />
              ) : error ? (
                toast.error("Ошибка загрузки данных")
              ) : (
                data?.map((storage: IStorage) => (
                  <li key={storage.id}>
                    <Button
                      onClick={() =>
                        editModalOpen(
                          storage.id,
                          storage.name,
                          storage.type,
                          storage.employee
                        )
                      }
                    >
                      <p>{storage.name}</p> <span>{storage.type}</span>
                    </Button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className={classes["settings__content__storages"]}>
          <div className={classes["settings__content__storages__header"]}>
            <h1>Информация</h1>
          </div>
          <Divider />
          <div className={classes["settings__content__storages__items"]}>
            <ul>
              <li>
                Типы складов <br />
                <span>
                  На данной странице осуществляется управление складами, которые
                  могут быть 4 типов:
                </span>
              </li>
              <li>
                1) <strong>только хранение</strong> – используется только для
                хранения материалов (материалы с данного склада нельзя
                использовать в работе либо выставлять для продажи на витрину);
              </li>
              <li>
                2) <strong>только использование</strong> – используется только
                для материалов, которые расходуются при оказании тех или иных
                услуг (материалы с данного склада не используются для хранения
                или для продажи с витрины);
              </li>
              <li>
                3) <strong>только продажа</strong> – используется только для
                материалов, которые продаются на витрине (материалы с данного
                склада не используются для хранения или для списания при
                оказании услуг);
              </li>
              <li>
                4) <strong>использование и продажа</strong> – используется
                только для материалов, которые можно и продать с витрины и
                списать при оказании тех или иных услуг (материалы с данного
                склада не используются для хранения).
              </li>
              <li>
                Связь с сотрудником <br />
                <span>
                  Если к складу привязан сотрудник, который оказывает услугу, то
                  материалы, используемые в данной услуге, автоматически будут
                  списываться со склада, закреплённого за сотрудником.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {openAddModal ? (
        <ModalWindow
          handleSave={() => handleSaveModal()}
          title={"Добавить склад"}
          open={openAddModal}
          handleClose={handleAddModalClose}
          children={
            <div>
              <div className={classes["main__lower__auto"]}>
                <VerticalTextField
                  fullWidth
                  label="Название"
                  placeholder="Введите название должности"
                  style={{ width: "30rem", marginLeft: "1rem" }}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Autocomplete
                sx={{
                  "& .MuiAutocomplete-inputRoot": {
                    padding: "3px 0px 3px 0px",
                    fontSize: "1.4rem",
                    marginLeft: "5.9rem",
                    width: "30rem",
                  },
                }}
                options={[
                  { label: "Sale Only", value: "sale_only" },
                  { label: "Use and Sale", value: "use_and_sale" },
                  { label: "Storage Only", value: "storage_only" },
                  { label: "Use Only", value: "use_only" },
                ]}
                onChange={(e, value) => setType(value?.value)}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <div className={classes["main__lower__auto"]}>
                    <p className={classes["main__lower__auto__label"]}>Тип</p>
                    <TextField
                      sx={{ height: "40px" }}
                      {...params}
                      placeholder="Только использование"
                      className={"main__lower__auto__input"}
                    ></TextField>
                  </div>
                )}
              />
              <Autocomplete
                sx={{
                  "& .MuiAutocomplete-inputRoot": {
                    padding: "3px 0px 3px 0px",
                    fontSize: "1.4rem",
                    marginLeft: "0.6rem",
                    width: "30rem",
                  },
                }}
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                  { label: "Option 4", value: "4" },
                  { label: "Option 5", value: "5" },
                ]}
                onChange={(e, value) => setEmployee(value?.value)}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <div className={classes["main__lower__auto"]}>
                    <p className={classes["main__lower__auto__label"]}>
                      Сотрудник
                    </p>
                    <TextField
                      sx={{ height: "40px" }}
                      {...params}
                      placeholder="Без связи с сотрудником"
                      className={"main__lower__auto__input"}
                    ></TextField>
                  </div>
                )}
              />
            </div>
          }
        />
      ) : null}
      {openEditModal ? (
        <ModalWindow
          title={"Редактировать склад"}
          open={openEditModal}
          handleClose={handleAddModalClose}
          handleSave={() => editSaveModal()}
          children={
            <div>
              <div className={classes["main__lower__auto"]}>
                <VerticalTextField
                  fullWidth
                  label="Название"
                  placeholder="Введите название должности"
                  style={{ width: "30rem", marginLeft: "1rem" }}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <Autocomplete
                sx={{
                  "& .MuiAutocomplete-inputRoot": {
                    padding: "3px 0px 3px 0px",
                    fontSize: "1.4rem",
                    marginLeft: "5.9rem",
                    width: "30rem",
                  },
                }}
                options={[
                  { label: "Sale Only", value: "sale_only" },
                  { label: "Use and Sale", value: "use_and_sale" },
                  { label: "Storage Only", value: "storage_only" },
                  { label: "Use Only", value: "use_only" },
                ]}
                onChange={(e, value) => setType(value?.value)}
                value={{ label: type, value: type }}
                getOptionLabel={(option) => option.label ?? ""}
                renderInput={(params) => (
                  <div className={classes["main__lower__auto"]}>
                    <p className={classes["main__lower__auto__label"]}>Тип</p>
                    <TextField
                      sx={{ height: "40px" }}
                      {...params}
                      placeholder="Только использование"
                      className={"main__lower__auto__input"}
                    ></TextField>
                  </div>
                )}
              />
              <Autocomplete
                sx={{
                  "& .MuiAutocomplete-inputRoot": {
                    padding: "3px 0px 3px 0px",
                    fontSize: "1.4rem",
                    marginLeft: "0.6rem",
                    width: "30rem",
                  },
                }}
                options={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                  { label: "Option 4", value: "4" },
                  { label: "Option 5", value: "5" },
                ]}
                onChange={(e, value) => setEmployee(value?.value)}
                value={{ label: employee, value: employee }}
                getOptionLabel={(option) => option.label ?? ""}
                renderInput={(params) => (
                  <div className={classes["main__lower__auto"]}>
                    <p className={classes["main__lower__auto__label"]}>
                      Сотрудник
                    </p>
                    <TextField
                      sx={{ height: "40px" }}
                      {...params}
                      placeholder="Без связи с сотрудником"
                      className={"main__lower__auto__input"}
                    ></TextField>
                  </div>
                )}
              />
            </div>
          }
        />
      ) : null}
    </div>
  );
};

export default StorageSettings;
