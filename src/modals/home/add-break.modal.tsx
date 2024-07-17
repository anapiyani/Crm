import React from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import classes from "./styles.module.scss";
import { Textarea } from "@mui/joy";

interface IAddBreakModalProps {
  resourceId: string;
}

const AddBreakModal: React.FC<IAddBreakModalProps> = ({ resourceId }) => {
  const modal = useModal();
  return (
    <ModalWindow
      title={"Добавить перерыв"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={classes["break-modal"]}>
          <div className={classes["break-modal__time"]}>
            <TimePicker
              label="Basic time picker"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": {
                  fontSize: "1.6rem",
                },
              }}
            />
            <TimePicker
              label="basic time picker"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": {
                  fontSize: "1.6rem",
                },
              }}
            />
          </div>
          <div>
            <Textarea
              variant="outlined"
              sx={{ height: "6.4rem", borderRadius: "4px", fontSize: "1.6rem" }}
              placeholder="Комментарий"
            />
          </div>
        </div>
      </LocalizationProvider>
    </ModalWindow>
  );
};

export default NiceModal.create(AddBreakModal);
