import ModalWindow from "@/components/modal-window/modal-window";
import { Form } from "react-router-dom";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import VerticalTextField from "@/components/textfield-vertical/textfield-vertical";
import classes from "./styles.module.scss";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { createRoom } from "@/service/rooms/rooms.service";
import { useState } from "react";
import { useCreateRoom } from "@/service/rooms/rooms.hook";

const CreateCabinetModal = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const CreateRoomMutation = useCreateRoom();

  const handleSave = (name: string, is_online: boolean) => {
    CreateRoomMutation.mutate({
      id: 5,
      name: name,
      available_online: is_online,
      services: [3],
    });
  };

  const modal = useModal();
  return (
    <ModalWindow
      title={"Добавить кабинет"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        handleSave(roomName, isOnline);
        modal.hide();
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <VerticalTextField
          label={"Название"}
          placeholder={"Введите название кабинета"}
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
        />
        <RadioGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            gap: "2rem",
            marginLeft: "2rem",
            fontSize: "1.6rem",
          }}
          value={isOnline}
          onChange={(e) => setIsOnline(e.target.value === "true")}
        >
          Доступен онлайн
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Да"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "1.6rem",
              },
              "& .MuiSvgIcon-root": {
                height: "2rem",
                width: "2rem",
              },
            }}
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Нет"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "1.6rem",
              },
              "& .MuiSvgIcon-root": {
                height: "2rem",
                width: "2rem",
              },
            }}
          />
        </RadioGroup>
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(CreateCabinetModal);
