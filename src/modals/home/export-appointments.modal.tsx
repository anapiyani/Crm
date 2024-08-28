import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import classes from "./styles.module.scss";
import { Divider } from "@mui/material";
import CustomDatePicker from "@/components/date-picker/date-picker-custom";
import CustomAutoComplete from "@/components/autocomplete/custom-autocomplete.component";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";

const ExportAppointments = () => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Скачивание журнала записей"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      afterClose={modal.remove}
    >
      <div className={classes["export-appointments"]}>
        <h1 className={classes["export-appointments--header"]}>
          Выберите параметры
        </h1>
        <Divider />
        <div className={classes["export-appointments__container"]}>
          <div className={classes["export-appointments__container__item"]}>
            <label className={classes["export-appointments__container--label"]}>
              Дата
            </label>
            <CustomDatePicker onChange={() => {}} />
          </div>
          <CustomAutoComplete
            name={"date_type"}
            selectValue={"label"}
            options={[
              { label: "По дате начала записи", value: "start_date" },
              { label: "По дате создание записи", value: "created_date" },
            ]}
            label="Тип даты"
            fullWidth={true}
            size="small"
            labelClassName={classes["export-appointments__container--label"]}
          />
          <CustomAutoComplete
            name="employees"
            selectValue="label"
            options={[]}
            label="Сотрудники"
            placeholder="Все сотрудники"
            fullWidth={true}
            size="small"
            labelClassName={classes["export-appointments__container--label"]}
          />
          <CustomAutoComplete
            name="online"
            selectValue="label"
            options={[
              { label: "Не важно", value: "all" },
              {
                label: "Да",
                value: true,
              },
              {
                label: "Нет",
                value: false,
              },
            ]}
            label="Онлайн"
            fullWidth={true}
            size="small"
            labelClassName={classes["export-appointments__container--label"]}
          />
          <CustomAutoComplete
            name="is_deleted"
            selectValue="label"
            options={[
              { label: "Да", value: true },
              { label: "Нет", value: false },
            ]}
            label="Удаленные"
            fullWidth={true}
            size="small"
            labelClassName={classes["export-appointments__container--label"]}
          />
          <CustomAutoComplete
            name="status"
            selectValue="label"
            options={[]}
            label="Статус"
            fullWidth={true}
            size="small"
            labelClassName={classes["export-appointments__container--label"]}
          />
          <VerticalTextField
            placeholder={"Имя / телефон / карта / ID"}
            label="Клиент"
            labelClassName={classes["export-appointments__container--label"]}
          />
        </div>
      </div>
    </ModalWindow>
  );
};

const ExportAppointmentsModal = NiceModal.create(ExportAppointments);
export default ExportAppointmentsModal;
