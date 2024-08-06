import React, { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Textarea } from "@mui/joy";
import { useAddBreakToSchedule } from "@/service/schedule/schedule.hook";
import { Dayjs } from "dayjs";
import classes from "./styles.module.scss";

interface IAddBreakModalProps {
  resourceId: string;
  date: string;
}

const AddBreak: React.FC<IAddBreakModalProps> = ({ resourceId, date }) => {
  const modal = useModal();
  const addBreakToScheduleMutation = useAddBreakToSchedule();
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [comment, setComment] = useState<string>("");

  const handleSaveClick = () => {
    addBreakToScheduleMutation.mutate({
      employee: parseInt(resourceId),
      start_time: startTime?.format("HH:mm") || "",
      end_time: endTime?.format("HH:mm") || "",
      break_note: comment,
      date: date,
    });
  };

  return (
    <ModalWindow
      title={"Добавить перерыв"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      handleSave={() => {
        handleSaveClick();
        modal.hide();
      }}
      className={classes["u-p-0"]}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={classes["break-modal"]}>
          <div className={classes["break-modal__time"]}>
            <TimePicker
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": {
                  fontSize: "1.6rem",
                },
              }}
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              format="HH:mm"
            />
            <TimePicker
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": {
                  fontSize: "1.6rem",
                },
              }}
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              format="HH:mm"
            />
          </div>
          <div>
            <Textarea
              variant="outlined"
              sx={{ height: "6.4rem", borderRadius: "4px", fontSize: "1.6rem" }}
              placeholder="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
      </LocalizationProvider>
    </ModalWindow>
  );
};

const AddBreakModal = NiceModal.create(AddBreak);
export default AddBreakModal;
