import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import { Button, Divider } from "@mui/material";
import { Add, Clear, Chat, AttachMoney, Done } from "@mui/icons-material";
import classes from "./styles.module.scss";

interface ICreateAppointmentModalProps {
  start: string;
  end: string;
}

const CreateAppointmentModal: React.FC<ICreateAppointmentModalProps> = ({
  start,
  end,
}) => {
  const modal = useModal();

  const buttonClass = {
    fontSize: "1.1rem",
    fontWeight: 600,
    height: "4rem",
  };

  return (
    <ModalWindow
      title={"Запись клиента"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-full-zero"]}
      withButtons={false}
    >
      <div className={classes["create-appointment"]}>
        <p className={classes["create-appointment__params-text"]}>
          Основные параметры
        </p>
        <Divider />
        <div></div>
        <div className={classes["create-appointment__services"]}>
          <p className={classes["create-appointment__params-text"]}>Услуги</p>
          <Button
            variant="text"
            startIcon={<Add />}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Выбрать услуги
          </Button>
        </div>
        <Divider />

        <div className={classes["create-appointment__buttons"]}>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            sx={buttonClass}
            onClick={() => modal.hide()}
          >
            Отменить
          </Button>
          <div className={classes["create-appointment__buttons--right"]}>
            <Button
              variant="outlined"
              sx={{
                ...buttonClass,
                minWidth: "4rem",
                padding: "0",
              }}
            >
              <Chat />
            </Button>
            <Button
              variant="outlined"
              sx={{
                ...buttonClass,
                minWidth: "4rem",
                padding: "0",
              }}
            >
              <AttachMoney />
            </Button>
            <Button variant="outlined" sx={buttonClass}>
              Продажа товаров
            </Button>
            <Button variant="contained" startIcon={<Done />} sx={buttonClass}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(CreateAppointmentModal);
