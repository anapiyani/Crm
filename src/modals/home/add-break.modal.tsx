import React, { useState } from "react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ModalWindow from "@/components/modal-window/modal-window";
import { Textarea } from "@mui/joy";
import { useAddBreakToSchedule } from "@/service/schedule/schedule.hook";
import CustomTimePicker from "@/components/time-picker/time-picker-custom";
import classes from "./styles.module.scss";

interface IAddBreakModalProps {
  resourceId: string;
  date: string;
}

const AddBreak: React.FC<IAddBreakModalProps> = ({ resourceId, date }) => {
  const modal = useModal();
  const addBreakToScheduleMutation = useAddBreakToSchedule();
  const [startTime, setStartTime] = useState<string>("08:00");
  const [endTime, setEndTime] = useState<string>("23:00");
  const [comment, setComment] = useState<string>("");

  const handleSaveClick = () => {
    addBreakToScheduleMutation.mutate({
      employee: parseInt(resourceId),
      start_time: startTime,
      end_time: endTime,
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
      afterClose={modal.remove}
    >
      <div className={classes["break-modal"]}>
        <div className={classes["break-modal__time"]}>
          <CustomTimePicker value={startTime} onChange={setStartTime} />
          <CustomTimePicker value={endTime} onChange={setEndTime} />
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
    </ModalWindow>
  );
};

const AddBreakModal = NiceModal.create(AddBreak);
export default AddBreakModal;
